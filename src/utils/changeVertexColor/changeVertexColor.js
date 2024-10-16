/**
 * 
 * @param {*} geometry - Geometry on which the color needs to be changed.
 * @param {*} vertex - Vertex whose color needs to be changed.
 * @param {*} color - Array of RGB values.
 */
export const changeVertexColor = (geometry, vertex, color) => {
    const existingColors = geometry.attributes.color;
    existingColors.setXYZ(vertex,color[0],color[1], color[2])
    existingColors.needsUpdate = true
}