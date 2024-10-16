import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Brush({ radius = 0.5, cubeMeshRef, enableControls, setEnablesControls, setIntersection }) {
  const { camera, scene } = useThree();
  const brushRef = useRef();
  const [isMousePointerDown, setIsMousePointerDown] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const raycaster = useRef(new THREE.Raycaster());

  // Use effect used to add the event listenns for mouse movement and pointer up/down
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', () => { setIsMousePointerDown(true) })
    window.addEventListener('pointerup', () => setIsMousePointerDown(false))

    return () => {
      window.removeEventListener('pointerdown', setIsMousePointerDown)
      window.removeEventListener("pointerup", setIsMousePointerDown)
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (brushRef.current) {
      // Update the raycaster with the current mouse position
      raycaster.current.setFromCamera(mouse, camera);

      // Find intersections
      const intersects = raycaster.current.intersectObjects(scene.children.filter(child => child === cubeMeshRef.current), false)

      // If intersection and mousePointerDown them disable orbital controls.
      if (intersects.length > 0 && isMousePointerDown ) {
        setEnablesControls(false)
        setIntersection(intersects)
      }
      if(isMousePointerDown && !enableControls){
        setEnablesControls(false)
      }
      if(!isMousePointerDown){
        setEnablesControls(true)
        setIntersection([])
      }


      // If intersection happens and we are too close too the object such that the sphere goes inside the mesh, to avoid that we are setting the brush's position to the mesh instead of being distance-x away from the camera.
      if (intersects.length > 0) {
        // Get the intersection point closest to the camera
        const intersection = intersects[0];
        // Update brush position to the intersection point
        brushRef.current.position.copy(intersection.point);
      } else {
        // If no intersection,position the brush distance-x away from the camera
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = 2; // Distance from camera to brush
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        brushRef.current.position.copy(pos); // Update brush position
      }

      // Make the brush face the camera
      brushRef.current.quaternion.copy(camera.quaternion);
      // Update brush scale
      brushRef.current.scale.set(radius, radius, radius);
    }
  });

  return (
    <mesh ref={brushRef}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshBasicMaterial color="red" transparent opacity={0.5} />
    </mesh>
  );
}

export default Brush;