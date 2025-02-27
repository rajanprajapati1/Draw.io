import { Loader2, Wand2 } from "lucide-react";

export default function Modal({ prompt, setPrompt, handleGenerate, isGenerating, setIsModalOpen }) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 animate-in zoom-in-95">
                <h2 className="text-xl font-semibold text-gray-900 mb-5">Generate Diagram</h2>

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your flow diagram or sequence diagram (e.g., 'Flow of user authentication process' or 'Sequence of payment gateway integration')"
                    className="w-full h-32 p-3 border border-gray-200 rounded-md resize-none text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />

                <p className="text-xs text-gray-500 mt-2 mb-4">
                    Provide a detailed description to generate a flow diagram or sequence diagram.
                </p>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium shadow-md transition duration-200 ${
                        isGenerating || !prompt
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:bg-blue-700 active:bg-blue-800"
                    }`}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Generating Diagram...</span>
                        </>
                    ) : (
                        <>
                            <Wand2 size={18} />
                            <span>Generate Diagram</span>
                        </>
                    )}
                </button>

                <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800 transition duration-150"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}