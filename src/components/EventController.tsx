import { FC, useEffect } from 'react'

type EventControllerProps = {
    mode: string,
    mouseDown: boolean,
    setMouseDown: (b: boolean) => void,
    offset: { x: number, y: number },
    setOffset: (offset: { x: number, y: number }) => void,
    scaling: number,
    setScaling: (s: number) => void
    touchPrevPos: { x: number, y: number },
    setTouchPrevPos: (prevPos: { x: number, y: number }) => void,
    pinchPrevDist: number,
    setPinchPrevDist: (d: number) => void,

}

const EventController: FC<EventControllerProps> = props => {

    /**
     * Hook to create, handle, and remove event listeners for panning and zooming while animating
     */
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (props.mouseDown && props.mode === 'animate') {
                props.setOffset({ x: props.offset.x + e.movementX, y: props.offset.y + e.movementY })
            }
        }
        const handleMouseDown = () => { props.setMouseDown(true) }
        const handleMouseUp = () => { props.setMouseDown(false) }

        const handleTouchMove = (e: TouchEvent) => {
            if (props.mouseDown && props.mode === 'animate') {
                const touch = e.touches[0]
                const dx = touch.screenX - props.touchPrevPos.x
                const dy = touch.screenY - props.touchPrevPos.y
                props.setOffset({ x: props.offset.x + dx, y: props.offset.y + dy })
                props.setTouchPrevPos({ x: touch.screenX, y: touch.screenY })

                if (e.touches.length === 2) {
                    const dist = Math.hypot(
                        e.touches[0].pageX - e.touches[1].pageX,
                        e.touches[0].pageY - e.touches[1].pageY
                    )
                    const delta = Math.sign(dist - props.pinchPrevDist)
                    props.setScaling(props.scaling + (delta * 0.033 * props.scaling))
                    props.setPinchPrevDist(dist)
                }
            }
        }
        const handleTouchStart = (e: TouchEvent) => {
            props.setMouseDown(true)
            const touch = e.touches[0]
            props.setTouchPrevPos({ x: touch.screenX, y: touch.screenY })
        }
        const handleTouchEnd = (e: TouchEvent) => {
            props.setMouseDown(false)
            props.setTouchPrevPos({ x: 0, y: 0 })
        }

        const handleWheel = (e: WheelEvent) => {
            if (props.mode === 'animate') {
                const delta = Math.sign(e.deltaY)
                props.setScaling(props.scaling + (delta * 0.033 * props.scaling))
            }
        }

        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mousemove', handleMouseMove)

        window.addEventListener('touchstart', handleTouchStart)
        window.addEventListener('touchend', handleTouchEnd)
        window.addEventListener('touchmove', handleTouchMove)

        window.addEventListener('wheel', handleWheel)

        return () => {
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mousemove', handleMouseMove)

            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
            window.removeEventListener('touchmove', handleTouchMove)

            window.removeEventListener('wheel', handleWheel)
        }
    }, [props])

    return <></>
}

export default EventController