import React, {useRef} from 'react'
import {useFrame, useLoader} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import {OrbitControls, Stars, useGLTF} from '@react-three/drei'

export const RotateModel = ({path}) => {
  const modelRef = useRef()
  const gltf = useGLTF(path)

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.02
    }
  })

  return (
    <mesh ref={modelRef} scale={0.05}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}
