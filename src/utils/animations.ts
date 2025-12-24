import gsap from 'gsap'
import * as THREE from 'three'

// Animation durations
export const durations = {
  cut: 2,
  highlight: 0.3,
  viewReset: 0.5,
  separation: 0.3,
}

// Easing functions
export const easings = {
  cut: 'power2.out',
  highlight: 'power2.inOut',
  viewReset: 'power2.out',
  separation: 'linear',
}

// Animate cutting plane
export function animateCuttingPlane(
  plane: THREE.Mesh,
  size: number,
  onComplete?: () => void
): gsap.core.Tween {
  const startPos = -size / 2 - 0.5
  const endPos = size / 2 + 0.5

  return gsap.fromTo(
    plane.position,
    { x: startPos },
    {
      x: endPos,
      duration: durations.cut,
      ease: easings.cut,
      onComplete,
    }
  )
}

// Animate camera to target position
export function animateCameraToPosition(
  camera: THREE.Camera,
  targetPosition: THREE.Vector3,
  _targetLookAt: THREE.Vector3,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ onComplete })

  tl.to(camera.position, {
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    duration: durations.viewReset,
    ease: easings.viewReset,
  })

  return tl
}

// Animate cube separation
export function animateCubeSeparation(
  cubeGroup: THREE.Group,
  targetPositions: THREE.Vector3[],
  onUpdate?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline()

  cubeGroup.children.forEach((child, index) => {
    if (targetPositions[index]) {
      tl.to(
        child.position,
        {
          x: targetPositions[index].x,
          y: targetPositions[index].y,
          z: targetPositions[index].z,
          duration: durations.separation,
          ease: easings.separation,
          onUpdate,
        },
        0
      )
    }
  })

  return tl
}

// Animate highlight glow effect
export function animateHighlight(
  material: THREE.Material,
  isHighlighted: boolean
): gsap.core.Tween {
  const meshMaterial = material as THREE.MeshStandardMaterial

  return gsap.to(meshMaterial, {
    emissiveIntensity: isHighlighted ? 0.3 : 0,
    duration: durations.highlight,
    ease: easings.highlight,
  })
}

// Animate opacity for non-highlighted cubes
export function animateOpacity(
  material: THREE.Material,
  opacity: number
): gsap.core.Tween {
  return gsap.to(material, {
    opacity,
    duration: durations.highlight,
    ease: easings.highlight,
  })
}

// Kill all GSAP animations
export function killAllAnimations(): void {
  gsap.killTweensOf('*')
}
