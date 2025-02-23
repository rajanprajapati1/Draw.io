"use client";

import dynamic from "next/dynamic";
import { Loader2, Wand2 } from "lucide-react";
import useExcalidraw from "../hooks/UseExcalidraw";
import Modal from "./Modal";
import Button from "./Button";

const Excalidraw = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw)
);

export default function ExcalidrawWrapper() {
  const {
    mounted,
    setExcalidrawAPI,
    isModalOpen,
    setIsModalOpen,
    prompt,
    setPrompt,
    isGenerating,
    handleGenerate,
    MermaidToExcali,
  } = useExcalidraw();

  if (!mounted) return null;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {isModalOpen && (
        <Modal
          handleGenerate={handleGenerate}
          isGenerating={isGenerating}
          prompt={prompt}
          setIsModalOpen={setIsModalOpen}
          setPrompt={setPrompt}
        />
      )}
      <Excalidraw
        theme="light"
        initialData={{}}
        renderTopRightUI={() => (
          <Button
            MermaidToExcali={MermaidToExcali}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      />
    </div>
  );
}
