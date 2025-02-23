import { useState, useEffect } from "react";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";

const DEFAULT_FONT_SIZE = 16;

const extractMermaidCode = (responseText) => {
  const regex = /```mermaid\s*([\s\S]*?)```/;
  const match = responseText?.match(regex);
  return match ? match[1].trim() : responseText.trim();
};

export function useExcalidraw() {
  const [mounted, setMounted] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedElements = localStorage.getItem("excalidrawElements");
    if (savedElements && excalidrawAPI) {
      excalidrawAPI.updateScene({ elements: JSON.parse(savedElements) });
    }
  }, [excalidrawAPI]);

  const MermaidToExcali = async (diagramDefinition) => {
    try {
      // const diagramDefinition = `
      //   graph LR
      //     A[React] --> B[ReactDOM]
      //     A --> C[React Native]
      //     A --> D[Next.js]
      //     A --> E[Create React App]
      //     A --> F[Redux]
      //     F --> G[React-Redux]
      //     A --> H[React Router]
      //     A --> I[Hooks]
      //     A --> J[Context API]
      // `;
      const { elements } = await parseMermaidToExcalidraw(diagramDefinition, {
        fontSize: DEFAULT_FONT_SIZE,
      });
      const excalidrawElements = convertToExcalidrawElements(elements);
      if (excalidrawAPI) {
        excalidrawAPI.updateScene({
          elements: [
            ...excalidrawAPI.getSceneElements(),
            ...excalidrawElements,
          ],
        });
      }
    } catch (e) {
      console.error("Error converting Mermaid to Excalidraw:", e);
    }
  };

  useEffect(() => {
    if (excalidrawAPI) {
      excalidrawAPI.updateLibrary({ libraryItems: [] });
      const onChange = () => {
        const elements = excalidrawAPI.getSceneElements();
        localStorage.setItem("excalidrawElements", JSON.stringify(elements));
      };
      excalidrawAPI.onChange(onChange);
      return () => {
        excalidrawAPI.off("change", onChange);
      };
    }
  }, [excalidrawAPI]);

  const handleGenerate = async() => {
    setIsGenerating(true);
    try {
      const res = await fetch(`/api/generate`,{
        method:"POST" ,
        body : JSON.stringify(prompt) ,
      })
      const {result ,msg ,status} = await res.json();
      // console.log(result ,msg,status ,"reponse");
      const a =    extractMermaidCode(result)
      if(a){
        MermaidToExcali(a)
      }
      console.log(a,"res")
      setIsGenerating(false);
      setIsModalOpen(false);
      setPrompt("");
    } catch (error) {
      setIsGenerating(false);
      setIsModalOpen(false);
      setPrompt("");
    }
  };

  return {
    mounted,
    excalidrawAPI,
    setExcalidrawAPI,
    isModalOpen,
    setIsModalOpen,
    prompt,
    setPrompt,
    isGenerating,
    handleGenerate,
    MermaidToExcali,
  };
}

export default useExcalidraw;
