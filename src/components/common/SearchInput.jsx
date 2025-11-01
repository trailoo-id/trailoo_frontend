"use client"

import { Search, X } from "lucide-react"

export default function SearchInput({ value, onChange, placeholder }) {
  const handleClear = () => {
    onChange({ target: { value: "" } })
  }

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 h-6 w-6 lg:h-7 lg:w-7 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-14 lg:h-16 pl-14 lg:pl-16 pr-14 lg:pr-16 text-lg lg:text-xl border-2 border-gray-200 rounded-xl focus:border-[#009178] focus:outline-none focus:ring-2 focus:ring-[#009178]/20 transition-all"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 lg:right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Clear search"
        >
          <X className="h-5 w-5 lg:h-6 lg:w-6 text-gray-500" />
        </button>
      )}
    </div>
  )
}
