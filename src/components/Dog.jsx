// import React from 'react'
// import * as THREE from 'three'
// import {Canvas, useThree} from '@react-three/fiber'
// import {OrbitControls, useGLTF, useTexture} from '@react-three/drei'
// import { texture } from 'three/src/nodes/accessors/TextureNode.js'

// const DogModel = () => {
//     const scene = useGLTF("/models/dog.drc.glb")
//     useThree(({camera}) => {
//         camera.position.z = 0.6
//     })

// const [normalMap, sampleMatCap] = useTexture(["/dog_normals.jpg", "/mat-2.png"],
//     ([normal, matcap]) => {
//         normal.flipY = false
//         matcap.colorSpace = THREE.SRGBColorSpace
//     })
//     texture.normalMap.flipY = false
//     texture.sampleMatCap.colorSpace = THREE.SRGBColorSpace

//     // to make sure the material is applied to all the meshes in the model, we traverse the scene and check for any child whose name includes "DOG". If we find such a child, we set its material to a new MeshMatcapMaterial that uses the normal map and matcap texture we loaded.
//     scene.scene.traverse((child)=>{
//         if(child.name.includes("DOG")){
//             child.material = new THREE.MeshMatcapMaterial({
//                 normalMap: texture.normalMap,
//                 matcap: texture.sampleMatCap
//             })
//         }
//     })
//     return (
//         <>
//             <primitive object={scene.scene} position={[0.25, -0.55, 0]} rotation={[0, Math.PI/3.9, 0]} />
//             <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
//             <OrbitControls/>
//         </>
//     )
// }

// const Dog = () => {
//   return (
//     <Canvas>
//         <DogModel/>
//     </Canvas>
//   )
// }

// export default Dog











import React,{useEffect, useRef} from 'react'
import * as THREE from 'three'
import {Canvas, useThree} from '@react-three/fiber'
import {OrbitControls, useGLTF, useTexture, useAnimations} from '@react-three/drei'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const DogModel = () => {
    const scene = useGLTF("/models/dog.drc.glb")
    useThree(({camera}) => {
        camera.position.z = 0.6
    })

    const {actions} = useAnimations(scene.animations, scene.scene)
    useEffect(()=>{
        actions["Take 001"].play()
    }, [actions])

    const [normalMap, sampleMatCap, branchMap, branchNormalMap] = useTexture(["/dog_normals.jpg", "/mat-2.png","/branches_diffuse.jpg","/branches_normals.jpg"])
    if(normalMap) normalMap.flipY = false
    if(sampleMatCap) sampleMatCap.colorSpace = THREE.SRGBColorSpace

    const dogMaterial = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMatCap    
    })

    const branchMaterial = new THREE.MeshStandardMaterial({
        normalMap: branchNormalMap,  
        map: branchMap
    })

    const dogRef = useRef(scene.scene)
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-1",
                endTrigger: "#section-3",
                start: "top top",
                end: "bottom bottom",
                markers: true,
                scrub: true,
            }
        })
        tl.to(dogRef.current.position,{
            z: "-=0.75",
            y: "+=0.1"
        })
        .to(dogRef.current.rotation,{
            x: `+=${Math.PI/15}`
        })
        .to(dogRef.current.rotation,{
            y: `-=${Math.PI}`
        },"third")
        .to(dogRef.current.position,{
            x: "-=0.5",
            z: "+=0.6",
            y: "-=0.05"
        },"third")
    }, [])

    scene.scene.traverse((child)=>{
        if(child.name.includes("DOG_BODY")){
            child.material = dogMaterial
        }
        if(child.name.includes("BRANCHS")){
            child.material = branchMaterial
        }
    })

    return (
        <>
            <primitive object={scene.scene} position={[0.25, -0.55, 0]} rotation={[0, Math.PI/3.9, 0]} />
            <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
            <OrbitControls/>
        </>
    )
}

const Dog = () => {
  return (
        <DogModel/>
  )
}

export default Dog