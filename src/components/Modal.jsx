import { Loader2, Wand2 } from "lucide-react"

export default  function Modal({ prompt, setPrompt, handleGenerate, isGenerating, setIsModalOpen }) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-95 animate-in">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Generate Content</h2>
  
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
  
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition ${
              isGenerating || !prompt ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 size={20} />
                <span>Generate</span>
              </>
            )}
          </button>
  
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-2 w-full text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
  
  