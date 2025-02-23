import { Wand2 } from 'lucide-react'
import React from 'react'

const Button = ({ setIsModalOpen,MermaidToExcali }) => {
    return (
      <button
        onClick={() => setIsModalOpen(true)}
        // onClick={MermaidToExcali} // Call function here
        className="flex items-center gap-2 px-2 py-1.5 bg-white box-shadow rounded-md transition"
      >
        <Wand2 size={20} className="text-gray-700" />
        <span className="text-gray-700 font-medium">Generate</span>
      </button>
    )
  }
  
  
export default Button