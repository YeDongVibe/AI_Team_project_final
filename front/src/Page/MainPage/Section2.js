import {Icon} from '../../Component'
import {Canvas, useLoader} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import {Suspense} from 'react'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {RotateModel} from '../../Component'
import * as THREE from 'three'

export function Section2() {
  return (
    <section className="relative flex w-full h-screen bg-gray-200">
      <div className="w-1/3 h-full">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <RotateModel path="plastic_water_bottle/scene.gltf" />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
      <div className="flex items-center justify-center w-2/3 h-full">
        {/* 수치 애니메이션 */}
        <div>
          일일 탄소 배출량 : <span className="">1234</span>
        </div>
      </div>
      <Icon name="arrow_downward" className="absolute text-3xl font-bold left-1/2 bottom-6 animate-bounce" />
    </section>
  )
}
