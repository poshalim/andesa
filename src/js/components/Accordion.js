export class Accordion {
    #wrapper
    #textOpened
    #textClosed

    constructor(wrapper) {
        this.#wrapper = wrapper || null
        this.#textOpened = 'Открыть'
        this.#textClosed = 'Закрыть'
    }

    init() {
        if (this.#wrapper) {
            this.#wrapper.addEventListener('click', this.#toggle.bind((this)))
        }
    }

    #toggle({ target }) {
        if (target.closest('.accordion__btn-toggle')) {
            const currentAccordionBtn = target.closest('.accordion__btn-toggle')
            const currentAccordionItem = target.closest('.accordion__item')
            const currentAccordionBody = currentAccordionItem.querySelector('.accordion__body')
            if (currentAccordionBody.style.maxHeight) {
                currentAccordionBody.style.maxHeight = null
                currentAccordionBtn.querySelector('.accordion__btn-text').textContent = this.#textOpened
                currentAccordionBtn.querySelector('.accordion__btn-arrow').style.transform = 'rotate(0deg)'
            } else {
                currentAccordionBody.style.maxHeight = currentAccordionBody.scrollHeight + 'px'
                currentAccordionBtn.querySelector('.accordion__btn-text').textContent = this.#textClosed
                currentAccordionBtn.querySelector('.accordion__btn-arrow').style.transform = 'rotate(180deg)'
            }
        }
    }
}

export default {
    Accordion
}