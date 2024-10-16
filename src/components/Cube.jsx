import { Html, useHelper } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MeshBVHHelper } from 'three-mesh-bvh'

function Cube({ cubeMeshRef }) {
    // const cubeMeshRef = useRef();
    const cubeGeometry = useRef();

    useEffect(() => {
        if (cubeMeshRef.current && cubeGeometry.current) {
            // Construct the BVH for the cube geometry.
            cubeMeshRef.current.geometry.computeBoundsTree();

            // Set the color to the geometry so that we can take control of each face and vertex to change color. Read readme.
            // Position attribute of the geometry stores the information about the vertexes, like count(number of vertexes), array(containing position of each vertes (x,y,z)) etc
            const colors = new Float32Array(cubeGeometry.current.attributes.position.count * 3) // Inorder to store color(r,g,b) for each vertex we need space of (no of vertex * 3(3 for 3 color shades rgb)
            colors.fill(0.2) // Fill is the array method that sets the whole array to the given value. In our case color white (1,1,1).
            // Now we are set to update the color attribure of the geometry
            cubeGeometry.current.setAttribute('color', new THREE.BufferAttribute(colors, 3))

            // Also remove/delete the computed bvh tree once the component unmounts.
            return () => {
                if (cubeMeshRef.current) {
                    cubeMeshRef.current.geometry.disposeBoundsTree()
                }
            }
        }
    }, []);

    // This helper is used to cast the boxes.
    useHelper(cubeMeshRef,MeshBVHHelper)

    return (
        <>
            <mesh position={[0, 1  / 2, 0]} ref={cubeMeshRef}>
                <torusKnotGeometry args={[1, 0.4, 1200, 300]}  ref={cubeGeometry}/>
                {/* <boxGeometry args={[1, 1, 1, 15, 15, 15]} ref={cubeGeometry} /> */}
                <meshStandardMaterial vertexColors={true} />
            </mesh>
        </>
    )
}

export default Cube