import { useCubeStore, selectStats } from '../hooks/useCubeStore'
import { categoryColors, categoryNames } from '../utils/calculations'

const CATEGORIES = [0, 1, 2, 3, 4]

export default function CategoryFilter() {
  const cubes = useCubeStore((state) => state.cubes)
  const highlightCategory = useCubeStore((state) => state.highlightCategory)
  const setHighlightCategory = useCubeStore((state) => state.setHighlightCategory)

  const stats = selectStats(cubes)

  return (
    <div className="grid grid-cols-2 gap-2">
      {CATEGORIES.map((category) => {
        const isActive = highlightCategory === category
        const count = stats[category] || 0
        const color = categoryColors[category]
        const name = categoryNames[category]

        return (
          <button
            key={category}
            onClick={() => setHighlightCategory(category)}
            disabled={count === 0}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
              isActive
                ? 'ring-2 ring-offset-1'
                : count === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: isActive ? `${color}20` : '#f3f4f6',
              borderColor: isActive ? color : 'transparent',
              borderWidth: '2px',
              boxShadow: isActive ? `0 0 0 2px ${color}` : 'none',
            }}
          >
            <span
              className="flex items-center gap-1.5"
              style={{ color: isActive ? color : '#374151' }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span>{name}</span>
            </span>
            <span
              className="text-xs font-semibold px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: isActive ? color : '#e5e7eb',
                color: isActive ? 'white' : '#6b7280',
              }}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
