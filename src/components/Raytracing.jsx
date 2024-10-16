import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { changeVertexPosition } from '../utils/changeVertexPosition/changeVertexPosition';
import { changeVertexColor } from '../utils/changeVertexColor/changeVertexColor';

function Raytracing({ onIntersection, setEnablesControls, intersection }) {
    const { camera, scene } = useThree();
    const raycaster = useRef(new THREE.Raycaster());
    const [mousePos, setMousePos] = useState(new THREE.Vector3())

    useFrame(() => {
        if (intersection && mousePos) {
            const { face, object } = intersection;
            const geometry = object.geometry;

            const facesArray = [face.a,face.b,face.c]
            facesArray.map(vertex => {
                changeVertexPosition(geometry,vertex,mousePos)
                changeVertexColor(geometry,vertex,[1,1,1])
            })
        }
    })

    const updateIntersection = (isMouseEventUp) => {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.current.setFromCamera(mouse, camera);
        const intersects = !isMouseEventUp ? raycaster.current.intersectObjects(scene.children.filter(child => child.type === "Mesh"), false) : [];

        if (intersects.length > 0) {
            setEnablesControls(false)
        } else {
            setEnablesControls(true)
        }
        onIntersection(intersects[0])
    }

    useEffect(() => {
        document.addEventListener('pointerdown', () => {
            console.log("Mouse down")
            updateIntersection(false)
        });

        document.addEventListener('pointermove', () => {
            console.log("Mouse move")
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            mouse.z = 0.5;
            setMousePos(mouse);
        })

        document.addEventListener('pointerup', () => {
            console.log("Mouse up")
            updateIntersection(true)
        })
    }, [])

    return null;
}

export default Raytracing