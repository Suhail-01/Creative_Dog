import React,{useEffect, useRef} from 'react'
import * as THREE from 'three'
import {useThree} from '@react-three/fiber'
import {OrbitControls, useGLTF, useTexture, useAnimations} from '@react-three/drei'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DogModel = () => {
    const scene = useGLTF("/models/dog.drc.glb")

    useThree(({camera}) => {
        camera.position.z = 0.6
    })

    const {actions} = useAnimations(scene.animations, scene.scene)

    useEffect(()=>{
        if(actions && actions["Take 001"]){
            actions["Take 001"].play()
        }
    }, [actions])

    const [normalMap, sampleMatCap, branchMap, branchNormalMap] = useTexture([
        "/dog_normals.jpg",
        "/matcap/mat-2.png",
        "/branches_diffuse.jpg",
        "/branches_normals.jpg"
    ])

    if(normalMap) normalMap.flipY = false
    if(sampleMatCap) sampleMatCap.colorSpace = THREE.SRGBColorSpace

    const [
        mat1,mat2,mat3,mat4,mat5,
        mat6,mat7,mat8,mat9,mat10,
        mat11,mat12,mat13,mat14,mat15,
        mat16,mat17,mat18,mat19,mat20
    ] = (useTexture([
        "/matcap/mat-1.png",
        "/matcap/mat-2.png",
        "/matcap/mat-3.png",
        "/matcap/mat-4.png",
        "/matcap/mat-5.png",
        "/matcap/mat-6.png",
        "/matcap/mat-7.png",
        "/matcap/mat-8.png",
        "/matcap/mat-9.png",
        "/matcap/mat-10.png",
        "/matcap/mat-11.png",
        "/matcap/mat-12.png",
        "/matcap/mat-13.png",
        "/matcap/mat-14.png",
        "/matcap/mat-15.png",
        "/matcap/mat-16.png",
        "/matcap/mat-17.png",
        "/matcap/mat-18.png",
        "/matcap/mat-19.png",
        "/matcap/mat-20.png",
    ])).map(texture => {
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })

    const material = useRef({
        uMatcap1: { value: mat19 },
        uMatcap2: { value: mat2 },
        uProgress: { value: 1.0 }
    })

    function onBeforeCompile(shader) {
        shader.uniforms.uMatcapTexture1 = material.current.uMatcap1
        shader.uniforms.uMatcapTexture2 = material.current.uMatcap2
        shader.uniforms.uProgress = material.current.uProgress

        shader.fragmentShader = shader.fragmentShader.replace(
            "void main() {",
            `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `
        )

        shader.fragmentShader = shader.fragmentShader.replace(
            "vec4 matcapColor = texture2D( matcap, uv );",
            `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );

          float transitionFactor  = 0.2;

          float progress = smoothstep(
            uProgress - transitionFactor,
            uProgress,
            (vViewPosition.x+vViewPosition.y)*0.5 + 0.5
          );

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `
        )
    }

    const dogMaterial = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: mat2
    })

    dogMaterial.onBeforeCompile = onBeforeCompile

    const branchMaterial = new THREE.MeshStandardMaterial({
        normalMap: branchNormalMap,  
        map: branchMap
    })

    useEffect(() => {
        document.querySelector('.title[img-title="Tomorrowland"]').addEventListener("mouseenter", () => {
            material.current.uMatcap1.value = mat19
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector('.title[img-title="Navy Pier"]').addEventListener("mouseenter", () => {
            material.current.uMatcap1.value = mat8
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector('.title[img-title="MSI Chicago"]').addEventListener("mouseenter", () => {
            material.current.uMatcap1.value = mat9
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector('.title[img-title="This Was Louises Phone"]').addEventListener("mouseenter", () => {
            material.current.uMatcap1.value = mat12
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector('.title[img-title="KIKK Festival 2018"]').addEventListener("mouseenter", () => {
            material.current.uMatcap1.value = mat10
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector('.title[img-title="The Kennedy Center"]').addEventListener("mouseenter", () => {
            material.current.uMatcap1.value = mat8
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector('.title[img-title="Royal Opera Of Wallonia"]').addEventListener("mouseenter", () => {
            material.current.uMatcap1.value = mat13
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector('.titles').addEventListener("mouseleave", () => {
            material.current.uMatcap1.value = mat2
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
    }, [])

    const dogRef = useRef(scene.scene)

    useGSAP(() => {
        if(!dogRef.current) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-1",
                endTrigger: "#section-3",
                start: "top top",
                end: "bottom bottom",
                // markers: true,
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

        gsap.to(material.current.uProgress, {
            value: 0,
            scrollTrigger: {
                trigger: "#section-1",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        })

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
            <primitive 
                ref={dogRef}
                object={scene.scene} 
                position={[0.25, -0.55, 0]} 
                rotation={[0, Math.PI/3.9, 0]} 
            />
            <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
        </>
    )
}

const Dog = () => {
  return <DogModel/>
}

export default Dog