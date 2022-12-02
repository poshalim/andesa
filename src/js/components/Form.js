export class Form {
    #checkboxIsChecked
    #form
    #hasACheckbox
    #pathNameForRedirect

    static forms = document.querySelectorAll('.form')

    constructor(pathNameForRedirect) {
        this.#checkboxIsChecked = false
        this.#form = null
        this.#hasACheckbox
        this.#pathNameForRedirect = pathNameForRedirect
    }

    init(form) {
        if (form) {
            form.addEventListener('submit', this.validation.bind((this), form))
            form.addEventListener('input', this.inputsValidation)
        }
    }

    inputsValidation({ target }) {
        if (target.classList.contains('form__input')) {
            if (!target.value) target.closest('.form__input-group').classList.add('form__input-group--error')
            else target.closest('.form__input-group').classList.remove('form__input-group--error')
        }
    }

    #checkboxValidation() {
        const formCheckBox = this.#form.querySelector('.form__checkbox')
        if (formCheckBox) {
            this.#hasACheckbox = true
            if (!formCheckBox.checked) {
                formCheckBox.closest('.form__checkbox-group').classList.add('form__checkbox-group--error')
                this.#checkboxIsChecked = false
            } else {
                formCheckBox.closest('.form__checkbox-group').classList.remove('form__checkbox-group--error')
                this.#checkboxIsChecked = true
            }
        }
    }

    validation(form, e) {
        e.preventDefault()
        this.#form = form
        this.#checkboxValidation()
        const formInputs = this.#form.querySelectorAll('.form__input')
        const emptyInputs = Array.from(formInputs).filter(input => input.value === '')

        if (this.#hasACheckbox) {
            if (!this.#checkboxIsChecked || emptyInputs.length) {
                emptyInputs.forEach(emptyInput => emptyInput.closest('.form__input-group').classList.add('form__input-group--error'))
            } else if (this.#pathNameForRedirect) {
                window.location.href = this.#pathNameForRedirect
            }
        } else {
            if (emptyInputs.length) {
                emptyInputs.forEach(emptyInput => emptyInput.closest('.form__input-group').classList.add('form__input-group--error'))
            } else if (this.#pathNameForRedirect) {
                window.location.href = this.#pathNameForRedirect
            }
        }
    }

    clearFields() {
        const inputs = document.querySelectorAll('.form__input-group--error')
        inputs.forEach(input => input.classList.remove('form__input-group--error'))
        const checkboxes = document.querySelectorAll('.form__checkbox-group--error')
        checkboxes.forEach(checkbox => checkbox.classList.remove('form__checkbox-group--error'))
    }
}

export const form = new Form()

export class FormWithSwitchingTabs extends Form {
    constructor(pathNameForRedirect) {
        super(pathNameForRedirect)
    }

    init(tabsWrapper) {
        if (tabsWrapper) {
            const tabsItems = tabsWrapper.querySelectorAll('.tabs__tab-item[data-tab-content-number]')
            tabsItems.forEach(tabItem => {
                tabItem.addEventListener('input', this.inputsValidation)
                tabItem.addEventListener('submit', this.validation.bind((this), tabItem))
            })
        }
    }
}

export default {
    Form, form, FormWithSwitchingTabs
}
