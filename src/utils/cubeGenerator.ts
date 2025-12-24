export type FaceKey = 'top' | 'bottom' | 'front' | 'back' | 'left' | 'right'

export interface CubeData {
  id: string
  position: { x: number; y: number; z: number }
  faces: Record<FaceKey, boolean>
}

export function generateCubes(size: number): CubeData[] {
  const cubes: CubeData[] = []

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        cubes.push({
          id: `${x}-${y}-${z}`,
          position: { x, y, z },
          faces: {
            top: false,
            bottom: false,
            front: false,
            back: false,
            left: false,
            right: false,
          },
        })
      }
    }
  }

  return cubes
}

// Check if a face is on the outer surface of the large cube
export function isOuterFace(
  position: { x: number; y: number; z: number },
  face: FaceKey,
  size: number
): boolean {
  const n = size - 1
  const { x, y, z } = position

  switch (face) {
    case 'top':
      return y === n
    case 'bottom':
      return y === 0
    case 'front':
      return z === n
    case 'back':
      return z === 0
    case 'left':
      return x === 0
    case 'right':
      return x === n
    default:
      return false
  }
}

// Get the position type of a cube (corner, edge, face, inner)
export type CubePositionType = 'corner' | 'edge' | 'face' | 'inner'

export function getCubePositionType(
  position: { x: number; y: number; z: number },
  size: number
): CubePositionType {
  const n = size - 1
  const { x, y, z } = position

  // Count how many coordinates are on the boundary
  let boundaryCount = 0
  if (x === 0 || x === n) boundaryCount++
  if (y === 0 || y === n) boundaryCount++
  if (z === 0 || z === n) boundaryCount++

  if (boundaryCount === 3) return 'corner'
  if (boundaryCount === 2) return 'edge'
  if (boundaryCount === 1) return 'face'
  return 'inner'
}

// Get visual position with separation
export function getVisualPosition(
  position: { x: number; y: number; z: number },
  size: number,
  separationLevel: number
): { x: number; y: number; z: number } {
  const offset = (size - 1) / 2
  const separation = separationLevel / 100

  // 基础间距：未分离时方块之间的间距（0.6让方块更紧密）
  const baseSpacing = 0.6
  // 分离时的最大间距
  const maxSpacing = 1.8

  // 根据分离程度插值计算当前间距
  const currentSpacing = baseSpacing + (maxSpacing - baseSpacing) * separation

  // Base position (centered at origin)
  const baseX = (position.x - offset) * currentSpacing
  const baseY = (position.y - offset) * currentSpacing
  const baseZ = (position.z - offset) * currentSpacing

  return {
    x: baseX,
    y: baseY,
    z: baseZ,
  }
}
