import { CubeData, FaceKey } from './cubeGenerator'

// Get statistics for painted faces
export function getStats(cubes: CubeData[]): Record<number, number> {
  const stats: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }

  cubes.forEach((cube) => {
    const paintedCount = getPaintedFaceCount(cube)
    const key = paintedCount >= 4 ? 4 : paintedCount
    stats[key]++
  })

  return stats
}

// Get number of painted faces for a cube
export function getPaintedFaceCount(cube: CubeData): number {
  return Object.values(cube.faces).filter(Boolean).length
}

// Get cubes by painted face count category
export function getCubesByCategory(
  cubes: CubeData[],
  category: number
): CubeData[] {
  return cubes.filter((cube) => {
    const count = getPaintedFaceCount(cube)
    if (category === 4) return count >= 4
    return count === category
  })
}

// Category colors
export const categoryColors: Record<number, string> = {
  0: '#9CA3AF', // Gray
  1: '#3B82F6', // Blue
  2: '#22C55E', // Green
  3: '#EF4444', // Red
  4: '#A855F7', // Purple
}

// Category names
export const categoryNames: Record<number, string> = {
  0: '0面',
  1: '1面',
  2: '2面',
  3: '3面',
  4: '4面+',
}

// Face directions for Three.js geometry
export const faceDirections: Record<FaceKey, { axis: string; sign: number }> = {
  right: { axis: 'x', sign: 1 },
  left: { axis: 'x', sign: -1 },
  top: { axis: 'y', sign: 1 },
  bottom: { axis: 'y', sign: -1 },
  front: { axis: 'z', sign: 1 },
  back: { axis: 'z', sign: -1 },
}

// Face index mapping for BoxGeometry
// BoxGeometry face order: +x, -x, +y, -y, +z, -z
export const faceIndexMap: Record<FaceKey, number> = {
  right: 0,
  left: 1,
  top: 2,
  bottom: 3,
  front: 4,
  back: 5,
}

// Material colors
export const colors = {
  wood: '#E8DCC4',
  painted: '#1A1A1A',
  hoverHighlight: '#FFD700',
  transparent: 'rgba(255, 255, 255, 0.3)',
}
