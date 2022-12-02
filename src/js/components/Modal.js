import { form } from './Form.js'

export class Modal {
    #modal
    #buttonClick

    constructor(modal, buttonClick) {
        this.#modal = modal
        this.#buttonClick = buttonClick
        this.isOpen = false
    }

    init() {
        if (this.#buttonClick && this.#modal) {
            this.#buttonClick.addEventListener('click', this.#open.bind(this))
            this.#modal.addEventListener('click', this.#close.bind(this))
        }
    }

    #open() {
        const modals = document.querySelectorAll('.modal')
        modals.forEach(modal => modal.classList.remove('modal--active'))
        this.#modal.classList.add('modal--active')
        document.body.classList.add('_locked')
        this.isOpen = true
    }

    #close({ target, keyCode }) {
        if (this.isOpen) {
            const currentModal = document.querySelector('.modal--active')
            if (target.classList.contains('modal__bg') || target.closest('.modal__close') || keyCode === 27) {
                currentModal.closest('.modal').classList.remove('modal--active')
                document.body.classList.remove('_locked')
                this.isOpen = false
                form.clearFields()
            }
        }
    }

    closeAll() {
        const activeModals = document.querySelectorAll('.modal--active')
        activeModals.forEach(activeModal => {
            console.log(activeModal)
            activeModal.classList.remove('modal--active')
            document.body.classList.remove('_locked')
        })
    }
}

export const modal = new Modal()

export default {
    Modal, modal
}