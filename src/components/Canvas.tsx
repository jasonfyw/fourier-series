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

    }, [])

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas