import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CubeScene from './CubeScene'
import { useRef } from 'react'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

export default function Canvas3D() {
  const controlsRef = useRef<OrbitControlsImpl>(null)

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  // Expose reset function globally for use by control panel
  if (typeof window !== 'undefined') {
    (window as unknown as { resetCameraView: () => void }).resetCameraView = handleResetView
  }

  return (
    <Canvas>
      {/* 调整相机位置，更好的等轴测视角 */}
      <PerspectiveCamera makeDefault position={[6, 5, 6]} fov={45} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={4}
        maxDistance={25}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-10, -10, -10]} intensity={0.3} />

      {/* Background */}
      <color attach="background" args={['#F8FAFC']} />

      {/* Main Scene */}
      <CubeScene />
    </Canvas>
  )
}
