import { useState, useEffect } from "react";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";

const DEFAULT_FONT_SIZE = 16;
const ICONS_CDN_URL = "https://cdn.simpleicons.org";

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
    if (excalidrawAPI) {
      const savedElements = localStorage.getItem("excalidrawElements");
      if (savedElements) {
        try {
          const parsedElements = JSON.parse(savedElements);
          excalidrawAPI.updateScene({ elements: parsedElements });
          console.log("Scene restored from localStorage:", parsedElements);
        } catch (error) {
          console.error("Error parsing saved elements from localStorage:", error);
          localStorage.removeItem("excalidrawElements"); 
        }
      }
    }
  }, [excalidrawAPI]);

  // Store scene in localStorage before page unload
  useEffect(() => {
    if (!excalidrawAPI) return;

    const handleBeforeUnload = () => {
      const sceneElements = excalidrawAPI.getSceneElements();
      if (sceneElements && sceneElements.length > 0) {
        localStorage.setItem("excalidrawElements", JSON.stringify(sceneElements));
        console.log("Scene saved to localStorage before unload:", sceneElements);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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
      if (excalidrawAPI) {
        const textElement = {
          type: "text",
          x: 100,
          y: 100,
          width: 500,
          height: 200,
          angle: 0,
          strokeColor: "#000000",
          backgroundColor: "transparent",
          fillStyle: "hachure",
          strokeWidth: 1,
          strokeStyle: "solid",
          roughness: 1,
          opacity: 100,
          groupIds: [],
          frameId: null,
          roundness: null,
          seed: Math.floor(Math.random() * 100000),
          version: 1,
          versionNonce: Math.floor(Math.random() * 100000),
          isDeleted: false,
          boundElements: null,
          updated: Date.now(),
          link: null,
          locked: false,
          text: `Failed to render diagram. Here's the Mermaid code:\n\n${diagramDefinition}`,
          fontSize: 16,
          fontFamily: 1,
          textAlign: "left",
          verticalAlign: "top",
        }

        excalidrawAPI.updateScene({
          elements: [...excalidrawAPI.getSceneElements(), textElement],
        })
      }
    }
  };

  useEffect(() => {
    if (excalidrawAPI) {
      excalidrawAPI.updateLibrary({ libraryItems: [] });
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
  const getRandomPosition = () => {
    const canvasWidth = 800;
    const canvasHeight = 600; 
    const padding = 100;
    const size = 100;

    const x = Math.floor(Math.random() * (canvasWidth - size - padding)) + padding / 2;
    const y = Math.floor(Math.random() * (canvasHeight - size - padding)) + padding / 2;

    return { x, y };
  };
  const renderIconInExcalidraw = async (title, slug, hex ,icon) => {
    if (!excalidrawAPI) return;
    const imageUrl = `${ICONS_CDN_URL}/${title}/${hex}`;
    console.log(imageUrl,"imageUrl")

    try {
      const response = await fetch(imageUrl);
      const svgText = await response.text();
      const base64Data = `data:image/svg+xml;base64,${btoa(svgText)}`;
      const fileId = `${title}-${Date.now()}`;
      excalidrawAPI.addFiles([
        {
          id: fileId,
          dataURL: base64Data,
          mimeType: "image/svg+xml",
          created: Date.now(),
        },
      ]);
      const uniqueId = `${title}-${Math.random().toString(36).substr(2, 9)}`;
      const { x, y } = getRandomPosition();
      const imageElement = {
        id: uniqueId, 
        type: "image",
        x:100,
        y:100,
        width: 100,
        height: 100,
        angle: 0,
        strokeColor: "transparent",
        backgroundColor: "transparent",
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: null,
        seed: Math.floor(Math.random() * 100000),
        version: 1,
        versionNonce: Math.floor(Math.random() * 100000),
        isDeleted: false,
        boundElements: null,
        updated: Date.now(),
        link: null,
        locked: false,
        fileId,
        status: "saved",
        scale: [1, 1],
      };

      excalidrawAPI.updateScene({
        elements: [...excalidrawAPI.getSceneElements(), imageElement],
      });

      console.log(`Inserted ${title} icon!`);
    } catch (error) {
      console.error(`Failed to insert ${title} icon:`, error);
    }
  };

  // const storeSceneInApi = async (sceneElements) => {
  //   if (!sceneElements || sceneElements.length === 0) return; // Skip if no elements

  //   try {
  //     const response = await fetch("/api/store/redis", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //                 diagramData: JSON.stringify(sceneElements), 
  //       }),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.error || "Failed to store scene");
  //     }

  //     console.log("Scene stored successfully on refresh/unload:", result);
  //   } catch (error) {
  //     console.error("Error storing scene in API:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (!excalidrawAPI) return;

  //   const handleBeforeUnload = () => {
  //     const sceneElements = excalidrawAPI.getSceneElements();
  //     localStorage.setItem("excalidrawElements", JSON.stringify(sceneElements));
  //     // storeSceneInApi(sceneElements);
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [excalidrawAPI]);



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
    renderIconInExcalidraw

  };
}

export default useExcalidraw;
