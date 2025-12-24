interface HelpModalProps {
  onClose: () => void
}

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">使用帮助</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {/* Basic Operations */}
          <section>
            <h3 className="font-semibold text-gray-800 mb-2">基础操作</h3>
            {/* Desktop */}
            <ul className="hidden sm:block space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="font-medium text-gray-700">鼠标左键拖拽:</span>
                <span>旋转立方体</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-gray-700">鼠标滚轮:</span>
                <span>缩放视图</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-gray-700">右键拖拽:</span>
                <span>平移视图</span>
              </li>
            </ul>
            {/* Mobile */}
            <ul className="sm:hidden space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="font-medium text-gray-700">单指拖动:</span>
                <span>旋转立方体</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-gray-700">双指捏合:</span>
                <span>缩放视图</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-gray-700">双指拖动:</span>
                <span>平移视图</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-gray-700">点击设置图标:</span>
                <span>打开控制面板</span>
              </li>
            </ul>
          </section>

          {/* Usage Flow */}
          <section>
            <h3 className="font-semibold text-gray-800 mb-2">典型使用流程</h3>
            <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>选择立方体尺寸（如 3×3×3）</li>
              <li>点击「涂满外表面」模拟题目条件</li>
              <li>点击「切割动画」观看切割过程</li>
              <li>拖动「分离程度」滑块展开立方体</li>
              <li>点击分类按钮（0面、1面、2面、3面+）高亮查看</li>
              <li>展开统计面板确认各类数量</li>
            </ol>
          </section>

          {/* Paint Mode */}
          <section>
            <h3 className="font-semibold text-gray-800 mb-2">涂色模式</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>点击「涂色模式」按钮进入/退出涂色状态</li>
              <li>在涂色模式下，点击立方体外表面可以涂色/取消涂色</li>
              <li>「涂满外表面」一键将所有外露面涂黑</li>
              <li>「清除所有涂色」恢复初始状态</li>
            </ul>
          </section>

          {/* Category Explanation */}
          <section>
            <h3 className="font-semibold text-gray-800 mb-2">分类说明</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-gray-700">0面:</span>
                <span className="text-gray-600">内部块（完全无涂色）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-gray-700">1面:</span>
                <span className="text-gray-600">面心块（1个涂色面）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-700">2面:</span>
                <span className="text-gray-600">棱块（2个涂色面）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-gray-700">3面:</span>
                <span className="text-gray-600">角块（3个涂色面）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-gray-700">4面+:</span>
                <span className="text-gray-600">特殊情况（自定义涂色）</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  )
}
