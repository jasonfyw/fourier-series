import React, { FC, useRef, useEffect, useState } from 'react'

type CanvasProps = { mode: string }

const Canvas: FC<CanvasProps> = props => {
    const [mode, setMode] = useState(props.mode)
    const [canvas, setCanvas] = useState<HTMLCanvasElement>(document.createElement('canvas'))
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>(document.createElement('canvas').getContext('2d')!)

    const [drawing, setDrawing] = useState<boolean>(false)
    const [points, setPoints] = useState<Array<[number,number]>>([])

    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    
    /*
    Event handlers for user input
    */
    const dragEventHandler = (e: MouseEvent) => {
        if (drawing) {
            setPoints(points => [...points, [e.pageX, e.pageY]])
        }
        redraw()
    }
    const mouseDownEventHandler = (e: MouseEvent) => {
        setDrawing(true)
        redraw()
    }
    const mouseUpEventHandler = (e: MouseEvent) => {
        setDrawing(false)
        redraw()
    }
    
    const addEventHandlers = () => {
        canvas.addEventListener('mousedown', mouseDownEventHandler);
        canvas.addEventListener('mousemove', dragEventHandler);
        canvas.addEventListener('mouseup', mouseUpEventHandler)
    }
    
    const beginUserInput = () => {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1
        
        addEventHandlers()
    }


    /*
    Drawing lines
    */
    const redraw = () => {
        if (points.length > 0) {
            // go to initial position
            ctx.beginPath()
            ctx.moveTo(points[0][0], points[0][1])
            
            for (const [x, y] of points) {
                ctx.lineTo(x, y)
                ctx.stroke()
            }
            ctx.closePath()
        }
    }
    
    // component did mount/unmount
    useEffect(() => {
        setCanvas(canvasRef.current as HTMLCanvasElement)
        setCtx(canvas.getContext('2d') as CanvasRenderingContext2D)

        const resize = () => {
            canvas.width = window.innerWidth - 4
            canvas.height = window.innerHeight - 4
        }
        resize()
        window.addEventListener('resize', resize)

        beginUserInput()

        // cleanup component by removing event listener when unmounted
        return () => {
            window.removeEventListener('resize', resize)
            canvas.removeEventListener('mousedown', mouseDownEventHandler);
            canvas.removeEventListener('mousemove', dragEventHandler);
            canvas.removeEventListener('mouseup', mouseUpEventHandler)
        }
    }, [canvas, drawing, points, canvas, ctx])

    // TODO: change <mode> when updated


  

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas