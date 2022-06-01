import { FC, useEffect, useState } from 'react'
import Sketch from 'react-p5'
import P5 from 'p5'
import { computeFourierSeries, functionFromPoints } from '../computations'
import { add, Complex } from 'mathjs'
import _ from 'lodash'

type CanvasProps = { 
    mode: string, 
    setMode: (m: string) => void,
    lineColor: string,
    drawCircles: boolean,
    points: Array<[number, number]>,
    setPoints: (points: [number, number][]) => void
}

type FourierCoefficients = (t: number) => Complex[]

const Canvas: FC<CanvasProps> = props => {

    const step = 0.001
    const [n, setN] = useState<number>(25)
    const [t, setT] = useState<number>(0)
    const [fourierCoefficients, setFourierCoefficients] = useState <FourierCoefficients>(() => () => [])
    const [fourierComputedPoints, setFourierComputedPoints] = useState<Array<[number, number]>>([])
    const [addToFourierComputedPoints, setAddToFourierComputedPoints] = useState<boolean>(true)

    /**
     * Setup P5 Sketch 
     * @param p5 
     * @param parentRef 
     */
    const setup = (p5: P5, parentRef: Element ) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(parentRef);
        p5.frameRate(60)
    }

    /**
     * Draw function for P5 sketch, updates on an infinite loop
     * @param p5 
     */
    const draw = (p5: P5) => {
        // input mode: allow user to draw using cursor
        if (props.mode === 'input') {
            p5.stroke(props.lineColor)

            // add the cursor's coordinates to the set of points and draw the line
            if (p5.mouseIsPressed === true && (p5.mouseX > 200 || p5.mouseY > 40)) {
                // <props.points> is the array of coordinate pairs centred about (0,0)
                // so the cursor's position needs to be offset and reflected across the x-axis in order for the
                // first quadrant to be located in the top right (on the P5 canvas, it's the bottom right)
                props.setPoints(addToPoints([p5.mouseX - window.innerWidth / 2, -p5.mouseY + window.innerHeight / 2]))
                p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
            }
        } else if (props.mode === 'animate') {
            // clear the canvas
            p5.clear()
            // plot user-inputted line
            plotPoints(p5, props.points, props.lineColor)

            // get fourier coefficients for the current <t>            
            let fourier_t = fourierCoefficients(t)

            // add to the line generated by the fourier series if it has not yet been fully created
            // the line being drawn out by the tip of the vectors is the sum of all the vectors
            if (addToFourierComputedPoints) {
                const endpoint = fourier_t.reduce((a, b) => add(a, b))
                setFourierComputedPoints((fourierComputedPoints: Array<[number, number]>) => [...fourierComputedPoints, [endpoint.re, endpoint.im]])
            }
            
            // plot the line generate so far by the fourier series
            plotPoints(p5, fourierComputedPoints, '#aa5151')

            /*
            Render lines for each vector in the Fourier series
            */
            // set starting point to 0, 0
            let [lx1, ly1] = [0, 0]

            // iterate <i> such that its absolute value descends by one every other index from n // 2 to 0
            // while oscillating between negative and positive
            // e.g.: for n=7: [-3, 3, -2, 2, -1, 1, 0]
            for (const i of _.range(1, n+1).map(m => Math.pow(-1, m) * Math.floor(m / 2))) {
                // get the value in the Fourier series at index <i>
                // const vector = fourier_t[i < 0 ? fourier_t.length + i : i]
                const vector = fourier_t.at(i) as Complex

                // set the endpoint of the vector
                let lx2 = vector.re + lx1
                let ly2 = vector.im + ly1

                // draw the singular vector
                p5.stroke('#a2a2a2')
                p5.line(...centreCoords(lx2, ly2), ...centreCoords(lx1, ly1))

                if (props.drawCircles) {
                    p5.noFill()
                    p5.stroke('#424242')
                    const r = Math.round(Math.hypot(lx2 - lx1, ly2 - ly1))
                    p5.circle(...centreCoords(lx1, ly1), 2 * r)
                }

                lx1 = lx2
                ly1 = ly2
            }
            
            // increment the value of t, 0 ≤ t ≤ 1 and rollover to 0 when it reaches 1
            if (t >= 1) {
                setT(0)
                setAddToFourierComputedPoints(false)
            } else {
                setT(t + step)
            }
        }
    }

    /**
     * Adjusts a coordinate pair centred about (0,0) to be centred about the centre of the canvas
     * @param x number
     * @param y number
     * @returns [number, number] tuple of numbers with values adjusted to display on canvas
     */
    const centreCoords = (x: number, y: number): [number, number] => {
        return [x + window.innerWidth / 2, -y + window.innerHeight / 2] as [number, number]
    }

    /**
     * Appends <p> to <props.points> because an anonymous function doesn't seem to work
     * @param p [number, number] coordinate pair
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
        plotPoints(p5, props.points, props.lineColor)
    }

    /**
     * Plot a line of color <lineColor> in order of the coordinate pairs provided in <points>
     * @param p5 
     * @param points [number, number][] array of coordinate pairs
     * @param lineColor string of the line color
     */
    const plotPoints = (p5: P5, points: Array<[number, number]>, lineColor: string) => {
        p5.stroke(lineColor)
        p5.strokeWeight(1)
        for (let i = 1; i < points.length; i++) {
            const [x1, y1] = centreCoords(points[i - 1][0], points[i - 1][1])
            const [x2, y2] = centreCoords(points[i][0], points[i][1])
            p5.line(x1, y1, x2, y2)
        }
    }


    useEffect(() => {
        /* Get Fourier series function when animation button pressed */
        if (props.mode === 'processing') {
            const f = computeFourierSeries(
                n,
                functionFromPoints(props.points)
            )
            setFourierCoefficients(() => (t: number) => f(t))
            props.setMode('animate')
        }
    }, [fourierCoefficients, props, n])
  

    return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}

export default Canvas