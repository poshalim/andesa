let x1 = null
let y1 = null


export function handleTouchStart(event) {
    const firstTouch = event.touches[0]
    x1 = firstTouch.clientX
    y1 = firstTouch.clientY
}

export function handleTouchMove(direction, activeClass, event) {
    switch (direction) {
        case 'right':
            if (!x1) {
                return false
            }
            let x2 = event.touches[0].clientX
            let xDiff = x2 - x1
            if (xDiff > 100) {
                this.classList.remove(activeClass)
            }
            break
        case 'up':
            if (!y1) {
                return false
            }
            let y2 = event.touches[0].clientY
            let yDiff = y2 - y1
            if (yDiff < -100) {
                this.classList.remove(activeClass)
            }

            break
    }
}

export default {
    handleTouchStart, handleTouchMove
}