"use client";

import useExcalidraw from "../hooks/UseExcalidraw";
import Modal from "./Modal";
import Button from "./Button";
import {Excalidraw } from '../constants/Excalidraw'
import Screen from './Screen';
import { PanelRight } from "lucide-react";
import { useState } from "react";
import IconsPanel from './IconPanel';

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
    excalidrawAPI ,
    renderIconInExcalidraw
  } = useExcalidraw();
  const [showIconsPanel, setShowIconsPanel] = useState(false)
  if (!mounted) return null;

  return (
    <div style={{ height: "100vh", width: "100%",color:"black" }} className="cus">
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
        initialData={{
          appState: {  viewBackgroundColor: "#6c5ce7" },
        }}
        renderTopRightUI={() => (
          <Button
            MermaidToExcali={MermaidToExcali}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      >
        
       <Screen/>
      </Excalidraw>
      {showIconsPanel && (
          <div className="w-80 overflow-y-auto bg-white">
            <IconsPanel
               onIconSelect={(title, slug, hex ,icon) => {
                renderIconInExcalidraw(title, slug, hex ,icon);
              }}
            />
          </div>
        )}
      <button
            variant="outline"
            onClick={() => setShowIconsPanel(!showIconsPanel)}
            className="flex items-center gap-2"
          >
            <PanelRight className="h-4 w-4" />
            {showIconsPanel ? "Hide Icons" : "Show Icons"}
          </button>
    </div>
  );
}
