import { isWebp } from "./helpers/isWebp.js"
import { spinner } from './components/Spinner.js'
import { getProducts } from './store/products.js'
import { render } from './helpers/render.js'
import AOS from 'aos';
AOS.init({
    delay: 200,
    once: true,
});



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




const path = window.location.pathname.split('/')
if (path[path.length - 1] === 'contacts.html') {

    let map;

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 59.97, lng: 30.33 },
            zoom: 16,
        });
    }

    window.initMap = initMap;
}





