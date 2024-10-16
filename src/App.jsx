import * as THREE from 'three';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh'
import { Canvas } from '@react-three/fiber'
import Helper from './components/Helper'
import Cube from './components/Cube'
import './App.css'
import Raytracing from './components/Raytracing';
import { useEffect, useRef, useState } from 'react';
import Brush from './components/Brush';
import Paint from './components/Paint';
import Gui from './components/Gui';
import { color } from 'three/examples/jsm/nodes/Nodes.js';

// In order to use the BVh replace the original Raycasting functions with the updated BVH raycasting functions.
THREE.Mesh.prototype.raycast = acceleratedRaycast
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree; // This method constructs the BVH for a geometry.
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree; // This line allows geometries to clean up their BVH structure when it is no longer needed.

function App() {
  const cubeMeshRef = useRef()
  const [enableControls, setEnablesControls] = useState(true)
  const [intersection, setIntersection] = useState([]);
  const [intersectionPoints, setIntersectionPoints] = useState([]);
  const [guiVariables, setGuiVariables] = useState({
    radius: 0.1,
    paintBrushColor: { r: 0.5, g: 0.1, b: 0.3 }
  })

  useEffect(() => {
    console.log("Gui variables: ", guiVariables)
  }, [guiVariables])

  return (
    <>
      <Canvas style={{ height: '100vh', width: '100vw', background: '#272727' }}>
        <Helper enableControls={enableControls} />
        <Cube cubeMeshRef={cubeMeshRef} />
        <Gui guiVariables={guiVariables} setGuiVariables={setGuiVariables} />
        {/* <Raytracing onIntersection={setIntersection} setEnablesControls={setEnablesControls} intersection={intersection}/> */}
        <Brush radius={guiVariables.radius} cubeMeshRef={cubeMeshRef} enableControls={enableControls} setEnablesControls={setEnablesControls} setIntersection={setIntersection} />
        <Paint intersection={intersection} paintBrushColor={guiVariables.paintBrushColor} />
      </Canvas>
    </>
  )
}

export default App
