// Прелоадер
class Spinner {

    handleClear() {
        document.querySelectorAll('.spinner-container').forEach(spinner => spinner.outerHTML = '')
    }

    render() {
        const html = `
      <div class="spinner-container">
        <img class="spinner__img" src="../img/spinner.svg" />
        </div>
        `

        const spinnerWrappers = document.querySelectorAll('.spinner-wrapper')
        if (spinnerWrappers) spinnerWrappers.forEach(spinnerWrapper => spinnerWrapper.insertAdjacentHTML('beforeend', html))

    }
}

export const spinner = new Spinner()


export default {
    spinner
}