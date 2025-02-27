"use client"

import { useState, useMemo } from "react"
import * as icons from "simple-icons"
import { Search } from "lucide-react"


const topIconSlugs = [
  "google",
  "netflix",
  "microsoft",
  "amazon",
  "facebook",
  "twitter",
  "apple",
  "youtube",
  "linkedin",
  "instagram",
]

export default function IconsPanel({ onIconSelect }) {
  const iconList = Object.values(icons)
  const [search, setSearch] = useState("")

  const topIcons = useMemo(() => iconList.filter((icon) => topIconSlugs.includes(icon.slug)), [iconList])

  const filteredIcons = useMemo(() => {
    return iconList.filter((icon) => icon.title.toLowerCase().includes(search.toLowerCase()))
  }, [search, iconList])


  return (
    <div className="p-4 w-[400px] h-[50vh] rounded-md overflow-y-auto shadow-2xl iconcontainer absolute bg-white top-28 left-20 z-[99999]">
      <h2 className="text-lg font-semibold mb-4">Icons</h2>

      <div className="relative mb-4 border gap-2 flex items-center px-2 py-2">
        <Search className=" text-gray-500" />
        <input
          type="text"
          placeholder="Ex. Node , Vercel , Meta"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" outline-none border-none"
        />
      </div>

      {!search && (
        <>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Popular Icons</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {topIcons.map((icon) => (
              <div
                key={icon.slug}
                className="flex flex-col items-center p-2 border rounded-md hover:bg-muted cursor-pointer transition-colors"
                onClick={() => onIconSelect(icon.slug, icon.path, icon.hex)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill={`#${icon.hex}`}
                >
                  <path d={icon.path} />
                </svg>
                <p className="text-xs mt-1 text-center truncate w-full">{icon.title}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {search && (
        <>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Search Results</h3>
          <div className="grid grid-cols-3 gap-3">
            {filteredIcons.slice(0, 30).map((icon) => (
              <div
                key={icon.slug}
                className="flex flex-col items-center p-2 border rounded-md hover:bg-muted cursor-pointer transition-colors"
                onClick={() => onIconSelect(icon.slug, icon.path, icon.hex)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill={`#${icon.hex}`}
                >
                  <path d={icon.path} />
                </svg>
                <p className="text-xs mt-1 text-center truncate w-full">{icon.title}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

