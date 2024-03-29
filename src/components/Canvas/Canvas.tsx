import { FC, useEffect, useState } from 'react'
import Sketch from 'react-p5'
import P5 from 'p5'
import { computeFourierSeries, functionFromPoints } from '../../computations'
import { add, Complex } from 'mathjs'
import _ from 'lodash'
import { useColorModeValue } from '@chakra-ui/react'
import EventController from './EventController'
import { getImageEdgePath } from '../../vision'


/**
     * Adjusts a coordinate pair centred about (0,0) to be centred about the centre of the canvas
     * @param x number
     * @param y number
     * @returns [number, number] tuple of numbers with values adjusted to display on canvas
     */
const centreCoords = (
    x: number,
    y: number,
    scaling: number,
    offset: { x: number, y: number }
): [number, number] => {
    // return [(x * scaling) + offset.x, (-y * scaling) + offset.y] as [number, number]
    return [(x * scaling) + offset.x, (-y * scaling) + offset.y] as [number, number]
}

/**
 * Appends <p> to <points> because an anonymous function doesn't seem to work
 * @param p [number, number] coordinate pair
 * @returns [number, number][] original array with <p> appended
 */
const addToPoints = (points: Array<[number, number]>, p: [number, number]) => {
    return [...points, p]
}

/**
 * Plot a line of color <lineColor> in order of the coordinate pairs provided in <points>
 * @param p5 
 * @param points [number, number][] array of coordinate pairs
 * @param lineColor string of the line color
 */
const plotPoints = (
    p5: P5,
    points: Array<[number, number]>,
    lineColor: string,
    scaling: number,
    offset: { x: number, y: number }
) => {
    p5.stroke(lineColor)
    p5.strokeWeight(1)
    for (let i = 1; i < points.length; i++) {
        const [x1, y1] = centreCoords(
            points[i - 1][0],
            points[i - 1][1],
            scaling,
            offset
        )
        const [x2, y2] = centreCoords(
            points[i][0],
            points[i][1],
            scaling,
            offset
        )
        p5.line(x1, y1, x2, y2)
    }
}

type CanvasProps = {
    n: number,
    t: number,
    setT: (n: number) => void,
    mode: string,
    setMode: (m: string) => void,
    lineColor: string,
    drawCircles: boolean,
    drawerIsOpen: boolean,
    showUserInput: boolean,
    image: string,
    setCurrVectorSum: (coords: [number, number]) => void,
    mathFunction: ((t: number) => Complex) | undefined,
    setMathFunction: (f: ((t: number) => Complex) | undefined) => void
}

type FourierCoefficients = (t: number) => Complex[]

const Canvas: FC<CanvasProps> = props => {

    const step = 0.001
    const colorMode = useColorModeValue('light', 'dark')
    const colors = {
        userLine: {
            light: '#101010',
            dark: '#efefef'
        },
        fourierLine: {
            light: '#ee5c5c',
            dark: '#aa5151'
        },
        vectorRadius: {
            light: '#5a5a5a',
            dark: '#b2b2b2'
        },
        vectorCircle: {
            light: '#c9c9c9',
            dark: '#484848'
        }
    }

    const [p5, setP5] = useState<P5>()
    const [n, setN] = useState<number>(props.n)
    let t = props.t
    let setT = props.setT
    const [points, setPoints] = useState<Array<[number, number]>>([])
    const [fourierCoefficients, setFourierCoefficients] = useState<FourierCoefficients>(() => () => [])
    const [fourierComputedPoints, setFourierComputedPoints] = useState<Array<[number, number]>>([])
    const [addToFourierComputedPoints, setAddToFourierComputedPoints] = useState<boolean>(true)

    const [offset, setOffset] = useState<{ x: number, y: number }>({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    const [scaling, setScaling] = useState<number>(1)
    const [mouseDown, setMouseDown] = useState<boolean>(false)
    const [touchPrevPos, setTouchPrevPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
    const [pinchPrevDist, setPinchPrevDist] = useState<number>(0)
    const [animPaused, setAnimPaused] = useState<boolean>(false)

    /**
     * Setup P5 Sketch 
     * @param p5 
     * @param parentRef 
     */
    const setup = (p5: P5, parentRef: Element) => {
        setP5(p5)
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(parentRef);
        p5.frameRate(60)
    }

    /**
     * Draw function for P5 sketch, updates on an infinite loop
     * @param p5 
     */
    const draw = (p5: P5) => {
        switch (props.mode) {
            /* 
            Input mode: allow user to draw using cursor
            */
            case 'input': {
                if (!props.drawerIsOpen) {

                    // add the cursor's coordinates to the set of points and draw the line
                    if (p5.mouseIsPressed === true && (p5.mouseX > 220 || p5.mouseY > 34)) {
                        // <points> is the array of coordinate pairs centred about (0,0)
                        // so the cursor's position needs to be offset and reflected across the x-axis in order for the
                        // first quadrant to be located in the top right (on the P5 canvas, it's the bottom right)
                        setPoints(
                            addToPoints(
                                points,
                                [p5.mouseX - window.innerWidth / 2, -p5.mouseY + window.innerHeight / 2],
                            )
                        )

                        plotPoints(
                            p5,
                            points,
                            colors.userLine[colorMode],
                            scaling,
                            offset
                        )
                    }
                }
                break
            }

            /*
            Animate mode: perform computations, drawing, and frame rendering
            */
            case 'animate': {
                // clear the canvas
                p5.clear()
                // plot user-inputted line
                if (props.showUserInput) {
                    plotPoints(
                        p5,
                        points,
                        colors.userLine[colorMode],
                        scaling,
                        offset
                    )
                }

                // get fourier coefficients for the current <t>            
                let fourier_t = fourierCoefficients(t)

                // add to the line generated by the fourier series if it has not yet been fully created
                // the line being drawn out by the tip of the vectors is the sum of all the vectors
                if (addToFourierComputedPoints) {
                    const endpoint = fourier_t.reduce((a, b) => add(a, b))
                    setFourierComputedPoints((fourierComputedPoints: Array<[number, number]>) => [...fourierComputedPoints, [endpoint.re, endpoint.im]])
                }

                // plot the line generate so far by the fourier series
                plotPoints(
                    p5,
                    fourierComputedPoints.slice(1),
                    colors.fourierLine[colorMode],
                    scaling,
                    offset
                )

                /*
                Render lines for each vector in the Fourier series
                */
                // set starting point to 0, 0
                let [lx1, ly1] = [0, 0]

                // iterate <i> such that its absolute value descends by one every other index from n // 2 to 0
                // while oscillating between negative and positive
                // e.g.: for n=7: [-3, 3, -2, 2, -1, 1, 0]
                for (const i of _.range(1, n + 1).map(m => Math.pow(-1, m) * Math.floor(m / 2))) {
                    // get the value in the Fourier series at index <i>
                    // const vector = fourier_t[i < 0 ? fourier_t.length + i : i]
                    const vector = fourier_t.at(i) as Complex

                    // set the endpoint of the vector
                    let lx2 = vector.re + lx1
                    let ly2 = vector.im + ly1

                    // draw the singular vector
                    p5.stroke(colors.vectorRadius[colorMode])
                    p5.line(
                        ...centreCoords(lx2, ly2, scaling, offset),
                        ...centreCoords(lx1, ly1, scaling, offset)
                    )

                    if (props.drawCircles) {
                        p5.noFill()
                        p5.stroke(colors.vectorCircle[colorMode])
                        const r = Math.round(Math.hypot(lx2 - lx1, ly2 - ly1))
                        p5.circle(
                            ...centreCoords(lx1, ly1, scaling, offset),
                            2 * r * scaling
                        )
                    }

                    lx1 = lx2
                    ly1 = ly2
                }
                props.setCurrVectorSum([lx1, ly1])

                // stop adding redundant points if all points have been computed
                setAddToFourierComputedPoints(fourierComputedPoints.length > (1 / step) + 1 ? false : true)

                // increment the value of t, 0 ≤ t ≤ 1 and rollover to 0 when it reaches 1
                if (!animPaused) {
                    if (t >= 1) {
                        setT(0)
                    } else {
                        setT(t + step)
                    }
                }
                break
            }
        }
    }

    /**
     * Update Sketch dimensions on windowResize event 
     * @param p5 
     */
    const windowResized = (p5: P5) => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight);

        // render the line because canvas gets cleared on resize
        plotPoints(
            p5,
            points,
            colors.userLine[colorMode],
            scaling,
            offset
        )
    }


    /**
     * Hook to handle changes made in the settings and in the current mode
     */
    useEffect(() => {
        switch (props.mode) {
            case 'input': {
                if (p5) {
                    plotPoints(
                        p5,
                        points,
                        colors.userLine[colorMode],
                        scaling,
                        offset
                    )
                }
                break
            }

            /* Get Fourier series function when animation button pressed */
            case 'processing': {
                // if there is an image uploaded, use that as the source of points
                if (props.image) {
                    getImageEdgePath(props.image).then(coordinates => {
                        setPoints(coordinates)
                        const f = computeFourierSeries(
                            n,
                            functionFromPoints(coordinates.reverse())
                        )
                        setFourierCoefficients(() => (t: number) => f(t))
                        props.setMode('animate')
                    })
                } else if (props.mathFunction !== undefined) {
                    const f = computeFourierSeries(
                        n,
                        props.mathFunction
                    )
                    setPoints([])
                    setFourierCoefficients(() => (t: number) => f(t))
                    props.setMode('animate')
                } else {
                    // if there is no image but inputted points, compute the fourier series and begin animating
                    if (points.length > 0) {
                        const f = computeFourierSeries(
                            n,
                            functionFromPoints(points.reverse())
                        )
                        setFourierCoefficients(() => (t: number) => f(t))
                        props.setMode('animate')
                    } else {
                        // revert back to input if no points have been inputted
                        props.setMode('input')
                    }
                }
                break
            }

            /* Reset all parameters to default and clear the canvas */
            case 'reset': {
                setT(0)
                setPoints([])
                setFourierComputedPoints([])
                setAddToFourierComputedPoints(true)
                setFourierCoefficients(() => () => [])
                setOffset({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
                setScaling(1)
                props.setMode('input')
                props.setCurrVectorSum([0, 0])
                props.setMathFunction(undefined)

                if (p5) {
                    p5.clear()
                }
                break
            }

        }

        if (props.n !== n) {
            if (props.mode === 'animate') {
                const f = computeFourierSeries(
                    props.n,
                    functionFromPoints(points)
                )
                setFourierCoefficients(() => (t: number) => f(t))
                setFourierComputedPoints([])
                setAddToFourierComputedPoints(true)
            }
            setN(props.n)
        }
    }, [
        fourierCoefficients,
        props,
        points,
        fourierComputedPoints,
        n,
        p5,
        colorMode,
        offset,
        scaling,
        colors.userLine,
        setT
    ])


    return (
        <>
            <Sketch setup={setup} draw={draw} windowResized={windowResized} />
            <EventController
                mode={props.mode}
                mouseDown={mouseDown}
                setMouseDown={setMouseDown}
                offset={offset}
                setOffset={setOffset}
                scaling={scaling}
                setScaling={setScaling}
                touchPrevPos={touchPrevPos}
                setTouchPrevPos={setTouchPrevPos}
                pinchPrevDist={pinchPrevDist}
                setPinchPrevDist={setPinchPrevDist}
                animPaused={animPaused}
                setAnimPaused={setAnimPaused}
            />
        </>
    )
}

export default Canvas