// переключение видимости блока по нажатию (меню, фильр)
export const toggleElementVisibility = (btnOpenClassName, btnCloseClassName, bodyClassName, { target }) => {
    if (window.innerWidth < 1260) {
        const bodyBlock = document.querySelector(`.${bodyClassName}`)
        if (bodyBlock) {
            if (target.closest(`.${btnOpenClassName}`)) {
                bodyBlock.classList.add(`${bodyClassName}--active`)
                document.body.classList.add('_locked')
            }
            if (target.closest(`.${btnCloseClassName}`)) {
                bodyBlock.classList.remove(`${bodyClassName}--active`)
                document.body.classList.remove('_locked')
            }
        }
    }
}

export default {
    toggleElementVisibility
}