import { isWebp } from "./helpers/isWebp.js"
import { spinner } from './components/Spinner.js'
import { getProducts } from './store/products.js'
import { render } from './helpers/render.js'



// Добавление класса webp к body, если браузер поддерживает формат .webp для картинок
isWebp()
spinner.render() // рендер прелоадера



// Получение каталога товаров, корзины, рендеринг
const init = async () => {
    await getProducts() // получение каталога товаров
    spinner.handleClear() // удаление прелоадера
    render() // рендер динамических элементов страницы
}

init()


if (window.location.pathname === '/contacts.html') {
    let myMap;
    ymaps.ready(function () {
        myMap = new ymaps.Map("map", {
            center: [59.97, 30.33],
            zoom: 16
        })
    })
}



