import { useRef } from 'react'
import gsap from 'gsap'
import SizeSelector from './SizeSelector'
import PaintControls from './PaintControls'
import CategoryFilter from './CategoryFilter'
import SeparationSlider from './SeparationSlider'
import { useCubeStore } from '../hooks/useCubeStore'

export default function ControlPanel() {
  const isCut = useCubeStore((state) => state.isCut)
  const isAnimating = useCubeStore((state) => state.isAnimating)
  const setCut = useCubeStore((state) => state.setCut)
  const setAnimating = useCubeStore((state) => state.setAnimating)
  const setSeparationLevel = useCubeStore((state) => state.setSeparationLevel)
  const reset = useCubeStore((state) => state.reset)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  const handleCut = () => {
    setCut(true)
    setAnimating(true)

    // 使用 GSAP 在3秒内将分离程度从0动画到100
    const obj = { value: 0 }
    animationRef.current = gsap.to(obj, {
      value: 100,
      duration: 3,
      ease: 'power2.out',
      onUpdate: () => {
        setSeparationLevel(Math.round(obj.value))
      },
      onComplete: () => {
        setAnimating(false)
      }
    })
  }

  const handleReset = () => {
    // 取消正在进行的动画
    if (animationRef.current) {
      animationRef.current.kill()
      animationRef.current = null
    }
    setAnimating(false)
    reset()
  }

  const handleResetView = () => {
    const win = window as unknown as { resetCameraView?: () => void }
    if (win.resetCameraView) {
      win.resetCameraView()
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Size Selector */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">尺寸设置</h3>
        <SizeSelector />
      </section>

      {/* Operations */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">操作</h3>
        <div className="space-y-2">
          <button
            onClick={handleCut}
            disabled={isCut || isAnimating}
            className={`w-full px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isCut || isAnimating
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
            }`}
          >
            <span>{isAnimating ? '⏳' : '▶'}</span>
            <span>{isAnimating ? '切割中...' : '切割动画'}</span>
          </button>
          <button
            onClick={handleReset}
            className="w-full px-4 py-2.5 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            <span>重置</span>
          </button>
          <div className="mt-3">
            <SeparationSlider />
          </div>
        </div>
      </section>

      {/* Paint Controls */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">涂色</h3>
        <PaintControls />
      </section>

      {/* Category Filter */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">分类查看</h3>
        <CategoryFilter />
      </section>

      {/* View Controls */}
      <section>
        <button
          onClick={handleResetView}
          className="w-full px-4 py-2.5 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>⟲</span>
          <span>重置视角</span>
        </button>
      </section>
    </div>
  )
}
