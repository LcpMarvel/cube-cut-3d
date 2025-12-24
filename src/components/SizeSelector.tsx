import { useCubeStore } from '../hooks/useCubeStore'
import { useState } from 'react'

const PRESET_SIZES = [2, 3, 4, 5]

export default function SizeSelector() {
  const size = useCubeStore((state) => state.size)
  const setSize = useCubeStore((state) => state.setSize)
  const [customSize, setCustomSize] = useState('')

  const handlePresetClick = (newSize: number) => {
    setSize(newSize)
    setCustomSize('')
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomSize(value)

    const num = parseInt(value, 10)
    if (!isNaN(num) && num >= 2 && num <= 10) {
      setSize(num)
    }
  }

  return (
    <div className="space-y-3">
      {/* Preset buttons */}
      <div className="grid grid-cols-4 gap-2">
        {PRESET_SIZES.map((presetSize) => (
          <button
            key={presetSize}
            onClick={() => handlePresetClick(presetSize)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              size === presetSize && customSize === ''
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {presetSize}×{presetSize}×{presetSize}
          </button>
        ))}
      </div>

      {/* Custom input */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">自定义:</span>
        <input
          type="number"
          min={2}
          max={10}
          value={customSize}
          onChange={handleCustomChange}
          placeholder={size.toString()}
          className="w-16 px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <span className="text-sm text-gray-500">(2-10)</span>
      </div>

      {/* Current size display */}
      <div className="text-xs text-gray-500">
        当前: {size}×{size}×{size} = {size ** 3} 个小块
      </div>
    </div>
  )
}
