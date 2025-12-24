import { useRef, useMemo, useState } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'
import { useCubeStore, getPaintedFaceCount } from '../hooks/useCubeStore'
import { getVisualPosition, FaceKey, isOuterFace } from '../utils/cubeGenerator'
import { categoryColors } from '../utils/calculations'

// Face index to FaceKey mapping
const indexToFaceKey: FaceKey[] = ['right', 'left', 'top', 'bottom', 'front', 'back']

// Colors
const WOOD_COLOR = new THREE.Color('#F5E6D3') // 更淡更粉的木色
const PAINTED_COLOR = new THREE.Color('#1A1A1A')
const HOVER_COLOR = new THREE.Color('#FFD700')
const EDGE_COLOR = '#8B7355' // 边框颜色调整

interface SingleCubeProps {
  cubeData: ReturnType<typeof useCubeStore.getState>['cubes'][0]
  visualPosition: { x: number; y: number; z: number }
  size: number
  isPaintMode: boolean
  isHighlighted: boolean
  isDimmed: boolean
  highlightColor: string | null
}

function SingleCube({
  cubeData,
  visualPosition,
  size,
  isPaintMode,
  isHighlighted,
  isDimmed,
  highlightColor,
}: SingleCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hoveredFaceIndex, setHoveredFaceIndex] = useState<number | null>(null)
  const toggleFacePaint = useCubeStore((state) => state.toggleFacePaint)

  // Create materials for each face
  const materials = useMemo(() => {
    return indexToFaceKey.map((faceKey, index) => {
      const isPainted = cubeData.faces[faceKey]
      const isOuter = isOuterFace(cubeData.position, faceKey, size)
      const isHovered = hoveredFaceIndex === index && isPaintMode && isOuter

      const material = new THREE.MeshStandardMaterial({
        color: isHovered
          ? HOVER_COLOR
          : isPainted
            ? PAINTED_COLOR
            : WOOD_COLOR,
        roughness: isPainted ? 0.3 : 0.7,
        metalness: isPainted ? 0.1 : 0,
        transparent: isDimmed,
        opacity: isDimmed ? 0.2 : 1,
      })

      // Add emissive for highlight
      if (isHighlighted && highlightColor) {
        material.emissive = new THREE.Color(highlightColor)
        material.emissiveIntensity = 0.3
      }

      return material
    })
  }, [cubeData.faces, hoveredFaceIndex, isPaintMode, isDimmed, isHighlighted, highlightColor, size, cubeData.position])

  // Handle pointer events
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isPaintMode) {
      setHoveredFaceIndex(null)
      return
    }

    event.stopPropagation()
    const faceIndex = event.face ? Math.floor(event.faceIndex! / 2) : null

    if (faceIndex !== null) {
      const faceKey = indexToFaceKey[faceIndex]
      if (isOuterFace(cubeData.position, faceKey, size)) {
        setHoveredFaceIndex(faceIndex)
      } else {
        setHoveredFaceIndex(null)
      }
    }
  }

  const handlePointerLeave = () => {
    setHoveredFaceIndex(null)
  }

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!isPaintMode) return

    event.stopPropagation()
    const faceIndex = event.face ? Math.floor(event.faceIndex! / 2) : null

    if (faceIndex !== null) {
      const faceKey = indexToFaceKey[faceIndex]
      if (isOuterFace(cubeData.position, faceKey, size)) {
        toggleFacePaint(cubeData.id, faceKey)
      }
    }
  }

  // Edge color based on state
  const edgeColor = isHighlighted && highlightColor ? highlightColor : EDGE_COLOR

  return (
    <mesh
      ref={meshRef}
      position={[visualPosition.x, visualPosition.y, visualPosition.z]}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <boxGeometry args={[0.56, 0.56, 0.56]} />
      {materials.map((material, index) => (
        <primitive key={index} object={material} attach={`material-${index}`} />
      ))}
      {/* 添加边框线 */}
      <Edges
        scale={1}
        threshold={15}
        color={edgeColor}
        lineWidth={isHighlighted ? 2 : 1}
      />
    </mesh>
  )
}


export default function CubeScene() {
  const cubes = useCubeStore((state) => state.cubes)
  const size = useCubeStore((state) => state.size)
  const separationLevel = useCubeStore((state) => state.separationLevel)
  const isPaintMode = useCubeStore((state) => state.isPaintMode)
  const highlightCategory = useCubeStore((state) => state.highlightCategory)
  const isCut = useCubeStore((state) => state.isCut)

  const groupRef = useRef<THREE.Group>(null)

  // Calculate visual positions for all cubes
  const cubePositions = useMemo(() => {
    return cubes.map((cube) =>
      getVisualPosition(cube.position, size, isCut ? separationLevel : 0)
    )
  }, [cubes, size, separationLevel, isCut])

  return (
    <group ref={groupRef}>
      {/* Render all small cubes */}
      {cubes.map((cube, index) => {
        const paintedCount = getPaintedFaceCount(cube)
        const category = paintedCount >= 4 ? 4 : paintedCount

        const isHighlighted =
          highlightCategory !== null && category === highlightCategory
        const isDimmed =
          highlightCategory !== null && category !== highlightCategory

        return (
          <SingleCube
            key={cube.id}
            cubeData={cube}
            visualPosition={cubePositions[index]}
            size={size}
            isPaintMode={isPaintMode}
            isHighlighted={isHighlighted}
            isDimmed={isDimmed}
            highlightColor={isHighlighted ? categoryColors[category] : null}
          />
        )
      })}

    </group>
  )
}
