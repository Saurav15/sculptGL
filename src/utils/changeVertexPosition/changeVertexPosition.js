export const changeVertexPosition = (geometry, vertex, mouse) => {
    console.log("Mosue: ", mouse)
    const existingVertexPosition = geometry.attributes.position;
    existingVertexPosition.setXYZ(vertex,mouse.x, mouse.y, mouse.z);
    existingVertexPosition.needsUpdate = true
}