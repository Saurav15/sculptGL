import { useEffect } from 'react'
import { changeVertexColor } from '../utils/changeVertexColor/changeVertexColor';

function Paint({ intersection, paintBrushColor }) {
    useEffect(() => {
        if (intersection.length > 0) {
            intersection.map(intersectingItem => {
                const { face, object } = intersectingItem;
                const geometry = object.geometry;
                const facesArray = [face.a, face.b, face.c]
                facesArray.map(vertex => {
                    changeVertexColor(geometry, vertex, [paintBrushColor.r,paintBrushColor.g,paintBrushColor.b])
                })
            })
        }
    }, [intersection])
    return null
}

export default Paint