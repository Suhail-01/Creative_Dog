import { useEffect, useRef } from 'react'

const Cursor = () => {
    const cursorRef = useRef(null)
    const followerRef = useRef(null)

    useEffect(() => {
        const cursor = cursorRef.current
        const follower = followerRef.current

        let mouseX = 0, mouseY = 0
        let followerX = 0, followerY = 0

        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`
        }

        const animate = () => {
            followerX += (mouseX - followerX) * 0.08
            followerY += (mouseY - followerY) * 0.08
            follower.style.transform = `translate(${followerX}px, ${followerY}px)`
            requestAnimationFrame(animate)
        }

        document.addEventListener('mousemove', onMouseMove)
        animate()

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    return (
        <>
            <div ref={cursorRef} className="cursor" />
            <div ref={followerRef} className="cursor-follower" />
        </>
    )
}

export default Cursor