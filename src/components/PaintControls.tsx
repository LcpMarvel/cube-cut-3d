import { useCubeStore } from '../hooks/useCubeStore'

// 立方体示意图组件
function CubeIcon({ top, right, front, title }: { top: string; right: string; front: string; title: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 32 32" className="flex-shrink-0">
      <title>{title}</title>
      {/* 顶面 */}
      <polygon points="16,4 28,10 16,16 4,10" fill={top} stroke="#555" strokeWidth="0.5" />
      {/* 左面 */}
      <polygon points="4,10 16,16 16,28 4,22" fill={front} stroke="#555" strokeWidth="0.5" />
      {/* 右面 */}
      <polygon points="16,16 28,10 28,22 16,28" fill={right} stroke="#555" strokeWidth="0.5" />
    </svg>
  )
}

// 切片示意图（中间一圈）
function SliceIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 32 32" className="flex-shrink-0">
      <title>中间一圈</title>
      {/* 顶面 - 三条横纹，中间黑 */}
      <polygon points="16,4 28,10 16,16 4,10" fill="#F5E6D3" stroke="#555" strokeWidth="0.5" />
      <polygon points="12,7 20,7 22,11 10,11" fill="#1A1A1A" />
      {/* 左面 - 三条竖纹，中间黑 */}
      <polygon points="4,10 16,16 16,28 4,22" fill="#F5E6D3" stroke="#555" strokeWidth="0.5" />
      <polygon points="8,12 12,14 12,25 8,23" fill="#1A1A1A" />
      {/* 右面 */}
      <polygon points="16,16 28,10 28,22 16,28" fill="#E8D4C0" stroke="#555" strokeWidth="0.5" />
      <polygon points="20,14 24,12 24,23 20,25" fill="#1A1A1A" />
    </svg>
  )
}

const WOOD = '#F5E6D3'
const WOOD_DARK = '#E8D4C0'
const BLACK = '#1A1A1A'

export default function PaintControls() {
  const isPaintMode = useCubeStore((state) => state.isPaintMode)
  const togglePaintMode = useCubeStore((state) => state.togglePaintMode)
  const paintAllOuterFaces = useCubeStore((state) => state.paintAllOuterFaces)
  const clearAllPaint = useCubeStore((state) => state.clearAllPaint)
  const paintTopFace = useCubeStore((state) => state.paintTopFace)
  const paintFourSides = useCubeStore((state) => state.paintFourSides)
  const paintTopAndBottom = useCubeStore((state) => state.paintTopAndBottom)
  const paintMiddleSlice = useCubeStore((state) => state.paintMiddleSlice)

  // 快捷涂色：先清除再应用
  const quickPaint = (paintFn: () => void) => {
    clearAllPaint()
    paintFn()
  }

  return (
    <div className="space-y-3">
      {/* Paint Mode Toggle */}
      <button
        onClick={togglePaintMode}
        className={`w-full px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
          isPaintMode
            ? 'bg-amber-500 text-white ring-2 ring-amber-300 ring-offset-2'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <span>🖌</span>
        <span>{isPaintMode ? '退出涂色模式' : '涂色模式'}</span>
      </button>

      {isPaintMode && (
        <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
          提示：点击立方体外表面进行涂色/取消涂色
        </p>
      )}

      {/* Quick Actions with Icons - Grid Layout */}
      <div className="space-y-1.5">
        <p className="text-xs text-gray-500 font-medium">快捷涂色</p>
        <div className="grid grid-cols-5 gap-1">
          <button
            onClick={() => quickPaint(paintAllOuterFaces)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 transition-all duration-200 flex items-center justify-center"
            title="涂满外表面（6面）"
          >
            <CubeIcon top={BLACK} right={BLACK} front={BLACK} title="涂满外表面" />
          </button>

          <button
            onClick={() => quickPaint(paintTopFace)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
            title="只涂一面"
          >
            <CubeIcon top={WOOD} right={WOOD_DARK} front={BLACK} title="只涂一面" />
          </button>

          <button
            onClick={() => quickPaint(paintTopAndBottom)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
            title="相对两面"
          >
            <CubeIcon top={WOOD} right={BLACK} front={BLACK} title="相对两面" />
          </button>

          <button
            onClick={() => quickPaint(paintFourSides)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
            title="四侧面（不涂上下）"
          >
            <CubeIcon top={WOOD} right={BLACK} front={BLACK} title="四侧面" />
          </button>

          <button
            onClick={() => quickPaint(paintMiddleSlice)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
            title="中间一圈"
          >
            <SliceIcon />
          </button>
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={clearAllPaint}
        className="w-full px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-all duration-200"
      >
        🗑️ 清除涂色
      </button>
    </div>
  )
}
