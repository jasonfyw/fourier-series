import { FC } from 'react'
import Sketch from 'react-p5'
import P5 from 'p5'

type CanvasProps = { 
    mode: string, 
    lineColor: string, 
    points: Array<[number, number]>,
    setPoints: (points: [number, number][]) => void
}

const Canvas: FC<CanvasProps> = props => {

    /**
     * Setup P5 Sketch 
     * @param p5 
     * @param parentRef 
     */
    const setup = (p5: P5, parentRef: Element ) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(parentRef);
    }

    /**
     * Draw function for P5 sketch, updates on an infinite loop
     * @param p5 
     */
    const draw = (p5: P5) => {
        // input mode: allow user to draw using cursor
        if (props.mode === 'input') {
            p5.stroke(props.lineColor)

            if (p5.mouseIsPressed === true) {
                props.setPoints(addToPoints([p5.mouseX, p5.mouseY]))
                p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
            }
        }
    }

    /**
     * Appends <p> to <props.points> because an anonymous function doesn't seem to work
     * @param p 
     * @returns [number, number][] original array with <p> appended
     */
    const addToPoints = (p: [number, number]) => {
        return [...props.points, p]
    }
    
    /**
     * Update Sketch dimensions on windowResize event 
     * @param p5 
     */
    const windowResized = (p5: P5) => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight);

        // render the line because canvas gets cleared on resize
        for (let i = 1; i < props.points.length; i++) {
            p5.line(props.points[i - 1][0], props.points[i - 1][1], props.points[i][0], props.points[i][1])
        }
    }
  

    // return <canvas ref={canvasRef}/>
    return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}

export default Canvas