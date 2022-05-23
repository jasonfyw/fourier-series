import React, { FC, useRef, useEffect } from 'react'

const Canvas: FC<any> = props => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        // getContext can return null, so check for that case.
        if (!ctx) {
            throw new Error("getContext('2d') failed");
        }
        // resize the canvas when window is resized
        const resize = () => {
            canvas.width = window.innerWidth - 4
            canvas.height = window.innerHeight - 4
        }
        resize()
        window.addEventListener('resize', resize)


        // cleanup component by removing event listener when unmounted
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas