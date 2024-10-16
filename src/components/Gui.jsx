import { useEffect } from 'react';
import GUI from 'lil-gui';

function Gui({ guiVariables, setGuiVariables }) {
    useEffect(() => {
        const gui = new GUI();

        // Brush GUI
        const brushFolder = gui.addFolder('Brush Settings');
        brushFolder.add(guiVariables, 'radius', 0.1, 2, 0.1).onChange((value) => {
            setGuiVariables((prev) => ({ ...prev, radius: value }));
        });
        brushFolder.open();

        // Paint Gui
        const paintFolder = gui.addFolder('Paint Settings')
        paintFolder.addColor(guiVariables, 'paintBrushColor', 1).onChange((value) => {
            setGuiVariables((prev) => ({ ...prev, paintBrushColor: value}));
        });

        return () => {
            gui.destroy();
        };
    }, [guiVariables, setGuiVariables]);

    return null;
}

export default Gui;