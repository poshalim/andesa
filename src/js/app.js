import { isWebp } from "./helpers/isWebp.js"
import { spinner } from './components/Spinner.js'
import { getProducts } from './store/products.js'
import { render } from './helpers/render.js'
import AOS from 'aos';
AOS.init({
    once: true,
});



// Добавление класса webp к body, если браузер поддерживает формат .webp для картинок
isWebp()
spinner.render() // рендер прелоадера



// Получение каталога товаров, корзины, рендеринг
const init = async () => {
    const isOk = await getProducts() // получение каталога товаров и статус выполнения
    if (isOk) {
        spinner.handleClear() // удаление прелоадера
        render() // рендер динамических элементов страницы
    }
}

init()



let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 59.97, lng: 30.33 },
        zoom: 16,
    });
}

window.initMap = initMap;


