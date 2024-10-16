import { OrbitControls } from '@react-three/drei'
import React from 'react'

function Helper({ enableControls }) {
    return (
        <>
            <axesHelper args={[5]} />
            <OrbitControls enabled={enableControls} />
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 5]} />
        </>
    )
}

export default Helper