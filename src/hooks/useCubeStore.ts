import { create } from 'zustand'
import { generateCubes, CubeData, FaceKey } from '../utils/cubeGenerator'

interface CubeStore {
  // Cube configuration
  size: number
  cubes: CubeData[]

  // View state
  separationLevel: number
  isCut: boolean
  isAnimating: boolean

  // Interaction mode
  isPaintMode: boolean
  highlightCategory: number | null

  // Stats panel
  isStatsExpanded: boolean

  // Actions
  setSize: (size: number) => void
  setSeparationLevel: (level: number) => void
  setCut: (isCut: boolean) => void
  setAnimating: (isAnimating: boolean) => void
  togglePaintMode: () => void
  setHighlightCategory: (category: number | null) => void
  toggleStatsExpanded: () => void
  toggleFacePaint: (cubeId: string, face: FaceKey) => void
  paintAllOuterFaces: () => void
  clearAllPaint: () => void
  reset: () => void
  // 快捷涂色方法
  paintTopFace: () => void
  paintBottomFace: () => void
  paintFourSides: () => void
  paintTopAndBottom: () => void
  paintFrontAndBack: () => void
  paintLeftAndRight: () => void
  paintMiddleSlice: () => void
}

const DEFAULT_SIZE = 3

export const useCubeStore = create<CubeStore>((set, get) => ({
  // Initial state
  size: DEFAULT_SIZE,
  cubes: generateCubes(DEFAULT_SIZE),
  separationLevel: 0,
  isCut: false,
  isAnimating: false,
  isPaintMode: false,
  highlightCategory: null,
  isStatsExpanded: false,

  // Actions
  setSize: (size: number) => {
    set({
      size,
      cubes: generateCubes(size),
      isCut: false,
      separationLevel: 0,
      highlightCategory: null,
    })
  },

  setSeparationLevel: (level: number) => {
    set({ separationLevel: level })
  },

  setCut: (isCut: boolean) => {
    set({ isCut })
  },

  setAnimating: (isAnimating: boolean) => {
    set({ isAnimating })
  },

  togglePaintMode: () => {
    set((state) => ({ isPaintMode: !state.isPaintMode }))
  },

  setHighlightCategory: (category: number | null) => {
    set((state) => ({
      highlightCategory: state.highlightCategory === category ? null : category,
    }))
  },

  toggleStatsExpanded: () => {
    set((state) => ({ isStatsExpanded: !state.isStatsExpanded }))
  },

  toggleFacePaint: (cubeId: string, face: FaceKey) => {
    set((state) => ({
      cubes: state.cubes.map((cube) =>
        cube.id === cubeId
          ? {
              ...cube,
              faces: {
                ...cube.faces,
                [face]: !cube.faces[face],
              },
            }
          : cube
      ),
    }))
  },

  paintAllOuterFaces: () => {
    const { size, cubes } = get()
    const n = size - 1

    set({
      cubes: cubes.map((cube) => {
        const { x, y, z } = cube.position
        return {
          ...cube,
          faces: {
            top: y === n,
            bottom: y === 0,
            front: z === n,
            back: z === 0,
            left: x === 0,
            right: x === n,
          },
        }
      }),
    })
  },

  clearAllPaint: () => {
    set((state) => ({
      cubes: state.cubes.map((cube) => ({
        ...cube,
        faces: {
          top: false,
          bottom: false,
          front: false,
          back: false,
          left: false,
          right: false,
        },
      })),
    }))
  },

  reset: () => {
    const { size } = get()
    set({
      cubes: generateCubes(size),
      separationLevel: 0,
      isCut: false,
      isPaintMode: false,
      highlightCategory: null,
    })
  },

  // 只涂正前面
  paintTopFace: () => {
    const { size, cubes } = get()
    const n = size - 1
    set({
      cubes: cubes.map((cube) => ({
        ...cube,
        faces: {
          ...cube.faces,
          front: cube.position.z === n,
        },
      })),
    })
  },

  // 只涂底面
  paintBottomFace: () => {
    const { cubes } = get()
    set({
      cubes: cubes.map((cube) => ({
        ...cube,
        faces: {
          ...cube.faces,
          bottom: cube.position.y === 0,
        },
      })),
    })
  },

  // 涂四个侧面（前后左右）
  paintFourSides: () => {
    const { size, cubes } = get()
    const n = size - 1
    set({
      cubes: cubes.map((cube) => {
        const { x, z } = cube.position
        return {
          ...cube,
          faces: {
            ...cube.faces,
            front: z === n,
            back: z === 0,
            left: x === 0,
            right: x === n,
          },
        }
      }),
    })
  },

  // 涂左右两面
  paintTopAndBottom: () => {
    const { size, cubes } = get()
    const n = size - 1
    set({
      cubes: cubes.map((cube) => ({
        ...cube,
        faces: {
          ...cube.faces,
          left: cube.position.x === 0,
          right: cube.position.x === n,
        },
      })),
    })
  },

  // 涂前面和后面
  paintFrontAndBack: () => {
    const { size, cubes } = get()
    const n = size - 1
    set({
      cubes: cubes.map((cube) => ({
        ...cube,
        faces: {
          ...cube.faces,
          front: cube.position.z === n,
          back: cube.position.z === 0,
        },
      })),
    })
  },

  // 涂左面和右面
  paintLeftAndRight: () => {
    const { size, cubes } = get()
    const n = size - 1
    set({
      cubes: cubes.map((cube) => ({
        ...cube,
        faces: {
          ...cube.faces,
          left: cube.position.x === 0,
          right: cube.position.x === n,
        },
      })),
    })
  },

  // 涂中间一层切片的外表面（在大立方体外露的面，形成一圈腰带）
  paintMiddleSlice: () => {
    const { size, cubes } = get()
    const n = size - 1
    const mid = Math.floor((size - 1) / 2) // 中间层的x坐标

    set({
      cubes: cubes.map((cube) => {
        const { x, y, z } = cube.position
        const isMiddleSlice = x === mid

        if (!isMiddleSlice) {
          return cube
        }

        // 中间层的方块，涂它们在大立方体外露的面（上下前后）
        return {
          ...cube,
          faces: {
            ...cube.faces,
            top: y === n,
            bottom: y === 0,
            front: z === n,
            back: z === 0,
          },
        }
      }),
    })
  },
}))

// Selectors
export const selectStats = (cubes: CubeData[]): Record<number, number> => {
  const stats: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }

  cubes.forEach((cube) => {
    const paintedCount = Object.values(cube.faces).filter(Boolean).length
    const key = paintedCount >= 4 ? 4 : paintedCount
    stats[key]++
  })

  return stats
}

export const getPaintedFaceCount = (cube: CubeData): number => {
  return Object.values(cube.faces).filter(Boolean).length
}
