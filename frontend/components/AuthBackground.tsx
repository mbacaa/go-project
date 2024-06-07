'use client'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
} from '@react-three/postprocessing'
import { BlendFunction, ChromaticAberrationEffect } from 'postprocessing'

export default function AuthBackground() {
	return (
		<div className="h-screen">
			<Canvas
				camera={{
					fov: 100,
					near: 0.1,
					far: 100,
				}}
			>
				<Scene />
			</Canvas>
		</div>
	)
}

const COUNT = 800
const XY_BOUNDS = 45
const Z_BOUNDS = 20
const CONSTANT_VELOCITY = 0.0035
const CHROMATIC_ABBERATION_OFFSET = 0.0001
const generatePos = () => {
	return (Math.random() - 0.5) * XY_BOUNDS
}

function Scene() {
	const meshRef = useRef<THREE.InstancedMesh>()
	const effectsRef = useRef<ChromaticAberrationEffect>()

	useEffect(() => {
		if (!meshRef.current) return

		const t = new THREE.Object3D()
		let j = 0
		for (let i = 0; i < COUNT * 3; i += 3) {
			t.position.x = generatePos()
			t.position.y = generatePos()
			t.position.z = (Math.random() - 0.5) * Z_BOUNDS
			t.updateMatrix()
			meshRef.current.setMatrixAt(j++, t.matrix)
		}
	}, [])

	const temp = new THREE.Matrix4()
	const tempPos = new THREE.Vector3()
	const tempObject = new THREE.Object3D()
	const tempColor = new THREE.Color()

	useFrame(() => {
		if (!meshRef.current) return

		for (let i = 0; i < COUNT; i++) {
			meshRef.current.getMatrixAt(i, temp)

			tempPos.setFromMatrixPosition(temp)
			if (tempPos.z > Z_BOUNDS / 2) {
				tempPos.z = -Z_BOUNDS / 2
			} else {
				tempPos.z += CONSTANT_VELOCITY
			}
			tempObject.position.set(tempPos.x, tempPos.y, tempPos.z)

			tempObject.updateMatrix()
			meshRef.current.setMatrixAt(i, tempObject.matrix)

			if (tempPos.z > 0) {
				tempColor.r = tempColor.g = tempColor.b = 1
			} else {
				tempColor.r =
					tempColor.g =
					tempColor.b =
						1 - tempPos.z / (-Z_BOUNDS / 2)
			}
			meshRef.current.setColorAt(i, tempColor)
		}

		meshRef.current.instanceMatrix.needsUpdate = true
		if (meshRef.current.instanceColor)
			meshRef.current.instanceColor.needsUpdate = true
	})

	return (
		<>
			<color args={['#000000']} attach="background" />
			<instancedMesh
				ref={meshRef as any}
				args={[undefined, undefined, COUNT]}
				matrixAutoUpdate
			>
				<sphereGeometry args={[0.05]} />
				<meshBasicMaterial color={[1.1, 1.2, 1.8]} toneMapped={false} />
			</instancedMesh>
			<EffectComposer>
				<Bloom luminanceThreshold={0.1} mipmapBlur />
				<ChromaticAberration
					ref={effectsRef as any}
					blendFunction={BlendFunction.NORMAL}
					offset={
						new THREE.Vector2(
							CHROMATIC_ABBERATION_OFFSET,
							CHROMATIC_ABBERATION_OFFSET
						)
					}
					radialModulation={true}
					modulationOffset={0.2}
				/>
			</EffectComposer>
		</>
	)
}
