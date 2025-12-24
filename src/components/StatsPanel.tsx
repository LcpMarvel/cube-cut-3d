import { useCubeStore, selectStats } from '../hooks/useCubeStore'
import { categoryColors, categoryNames } from '../utils/calculations'

export default function StatsPanel() {
  const size = useCubeStore((state) => state.size)
  const cubes = useCubeStore((state) => state.cubes)
  const isStatsExpanded = useCubeStore((state) => state.isStatsExpanded)
  const toggleStatsExpanded = useCubeStore((state) => state.toggleStatsExpanded)

  const stats = selectStats(cubes)
  const totalCubes = size ** 3

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={toggleStatsExpanded}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2 font-medium text-gray-700">
          <span>📊</span>
          <span>统计</span>
        </span>
        <span
          className={`text-gray-400 transition-transform duration-200 ${
            isStatsExpanded ? 'rotate-90' : ''
          }`}
        >
          ▶
        </span>
      </button>

      {/* Expanded Content */}
      {isStatsExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
          {/* Basic Info */}
          <div className="pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">立方体尺寸：</span>
              <span className="font-medium text-gray-800">
                {size}×{size}×{size}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">小块总数：</span>
              <span className="font-medium text-gray-800">{totalCubes}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Distribution by painted faces */}
          <div>
            <p className="text-sm text-gray-600 mb-2">按涂色面数分布：</p>
            <div className="space-y-1.5">
              {[0, 1, 2, 3, 4].map((category) => {
                const count = stats[category] || 0
                const percentage = totalCubes > 0 ? (count / totalCubes) * 100 : 0

                return (
                  <div key={category} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: categoryColors[category] }}
                    />
                    <span className="text-sm text-gray-600 w-12">
                      {categoryNames[category]}：
                    </span>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: categoryColors[category],
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800 w-8 text-right">
                      {count}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
