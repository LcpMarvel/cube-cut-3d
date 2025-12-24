import Canvas3D from './components/Canvas3D'
import ControlPanel from './components/ControlPanel'
import HelpModal from './components/HelpModal'
import { useState, useEffect, useRef } from 'react'

function App() {
  const [showHelp, setShowHelp] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // 检测屏幕尺寸
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // 大屏幕时自动关闭移动端菜单
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <div className="w-full h-full flex flex-col bg-slate-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <span className="text-xl md:text-2xl flex-shrink-0">🎲</span>
          <h1 className="text-lg md:text-xl font-bold text-gray-800 truncate">CubeCut 3D</h1>
          <span className="text-xs md:text-sm text-gray-500 hidden sm:inline">立方体切割可视化教学工具</span>
        </div>
        <button
          onClick={() => setShowHelp(true)}
          className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span>?</span>
          <span className="hidden sm:inline">帮助</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* 3D Canvas Area */}
        <div className="flex-1 relative">
          <Canvas3D />
        </div>

        {/* Control Panel - Desktop */}
        <aside className="hidden md:block w-72 bg-white border-l border-gray-200 overflow-y-auto">
          <ControlPanel />
        </aside>

        {/* Mobile - 浮动菜单按钮 */}
        {isMobile && !menuOpen && (
          <button
            onClick={() => setMenuOpen(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-2 py-4 rounded-l-xl shadow-lg transition-all duration-200 flex flex-col items-center gap-1"
            aria-label="打开控制面板"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-medium writing-vertical">控制</span>
          </button>
        )}

        {/* Control Panel - Mobile Slide-out */}
        {isMobile && (
          <>
            {/* 遮罩层 */}
            <div
              className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
                menuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setMenuOpen(false)}
            />
            {/* 滑出菜单 */}
            <div
              ref={menuRef}
              className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out ${
                menuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {/* 菜单头部 */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">控制面板</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="关闭菜单"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* 菜单内容 */}
              <div className="overflow-y-auto h-[calc(100%-57px)]">
                <ControlPanel />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Help Modal */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  )
}

export default App
