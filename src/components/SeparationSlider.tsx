import { useCubeStore } from '../hooks/useCubeStore'

export default function SeparationSlider() {
  const separationLevel = useCubeStore((state) => state.separationLevel)
  const setSeparationLevel = useCubeStore((state) => state.setSeparationLevel)
  const isCut = useCubeStore((state) => state.isCut)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeparationLevel(Number(e.target.value))
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
        分离程度:
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={separationLevel}
        onChange={handleChange}
        disabled={!isCut}
        className={`flex-1 ${!isCut ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <span className="text-sm text-gray-600 w-12 text-right">
        {separationLevel}%
      </span>
    </div>
  )
}
