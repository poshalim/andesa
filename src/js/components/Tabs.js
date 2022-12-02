import { form } from './Form.js'

export class Tabs {
    #blockClassName
    #block
    #tabsContent
    #tabsBtns
    #isForm

    constructor(blockClassName, isForm) {
        this.#blockClassName = blockClassName
        this.#block = document.querySelector(`.${blockClassName}`) || null
        this.#tabsContent = null
        this.#tabsBtns = null
        this.#isForm = isForm || false // является ли контент вкладок формами
    }

    init() {
        if (this.#block) {
            this.#tabsContent = this.#block.querySelectorAll(`.${this.#blockClassName}-tabs__item`) // вкладки с контентом
            this.#tabsBtns = this.#block.querySelector(`.${this.#blockClassName}-tabs__btns`) // wrapper кнопок для переключения
            if (this.#tabsBtns && this.#tabsContent) {
                this.#tabsBtns.addEventListener('click', this.#switching.bind((this)))
            }
        }
    }

    #switching({ target }) {
        const tabsBtn = this.#tabsBtns.querySelectorAll(`.${this.#blockClassName}-tabs__btn`) // кнопки для переключения вкладок
        const classActive = `${this.#blockClassName}-tabs__btn--active` // класс активной кнопки
        const targetButton = target.closest(`.${this.#blockClassName}-tabs__btn`) // кнопка по которой совершено нажатие
        if (targetButton) {
            tabsBtn.forEach(tabBtn => {
                if (targetButton === tabBtn) {
                    targetButton.classList.add(classActive) // добавление активной вкладки для кнопки по которой совершено нажатие
                    this.#tabsContent.forEach(tabContent => { // перебор всех вкладок с контентом
                        if (tabContent.dataset.tabContentNumber === targetButton.dataset.tabBtnNumber) {
                            tabContent.style.display = 'block' // отображение активной вкладки
                            if (this.#isForm) {
                                const formBtnSubmit = document.querySelector(`.${this.#blockClassName}__submit`)
                                formBtnSubmit.setAttribute('form', tabContent.id) // привязка кнопки к активной форме
                                form.clearFields()
                            }
                        } else {
                            tabContent.style.display = 'none'
                        }
                    })

                } else {
                    tabBtn.classList.remove(classActive)
                }
            })
        }
    }
}

export default {
    Tabs
}
