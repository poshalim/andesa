import { persistanceStorage } from "../helpers/persistanceStorage.js"
import { miniCart } from "./MiniCart.js"
import { products } from '../store/products.js'
import Swiper, { Thumbs } from 'swiper'
import { Tabs } from '../components/Tabs.js'
import { Modal } from "../components/Modal.js"


const app = document.querySelector('.main')
// формирование страницы товара
class ProductPage {

    init(code) {
        this.render(code) // рендер страницы товара

        const productTabs = new Tabs('product') // инициализация вкладок
        productTabs.init()

        // открытие/закрытие модального окна "Быстрый заказ"
        const quickOrderModalBlock = document.querySelector('.quickOrder')
        const quickOrderBtn = document.querySelector('.quick-order-btn')
        const quickOrderModal = new Modal(quickOrderModalBlock, quickOrderBtn)
        quickOrderModal.init()
    }

    render(code) {
        let { name, img, currentPrice, oldPrice, manufacturer, isHit, isNovetly } = products[code]
        document.title = `${name}`

        let amountOfDiscount = Math.trunc((1 - currentPrice / oldPrice) * 100)
        if (oldPrice > currentPrice && amountOfDiscount > 4) amountOfDiscount = `-${amountOfDiscount}%`
        else amountOfDiscount = ''

        if (oldPrice < currentPrice) oldPrice = ''
        else oldPrice = `${oldPrice.toLocaleString()} р.`

        let itemLabelHit = ''
        if (isHit) itemLabelHit = `<div class="item-labels__hit">Хит</div>`

        let itemLabelNovetly = ''
        if (isNovetly) itemLabelNovetly = `<div class="item-labels__novelty">Новинка</div>`

        // отображение шаблона страницы товара с подставленными данными
        const productTemplate = document.querySelector('#product')
        const productClone = productTemplate.content.cloneNode(true)
        const productSection = productClone.querySelector(".product")

        productSection.querySelector('.breadcrumbs__product-name').innerHTML = name
        productSection.querySelector('.breadcrumbs__product-name').href = `#/product/${code}/`
        productSection.querySelector('.product__name').innerHTML = name
        productSection.querySelector('.product__labels').innerHTML = `${itemLabelHit} ${itemLabelNovetly}`
        productSection.querySelectorAll('.product__img-wrapper').forEach(el => {
            const productImg = document.createElement('img')
            productImg.src = img
            productImg.classList.add('product__img')
            productImg.alt = 'фото товара'
            el.append(productImg)
        })
        productSection.querySelectorAll('.product__img-thumbs-wrapper').forEach(el => {
            const productImgThumbs = document.createElement('img')
            productImgThumbs.src = img
            productImgThumbs.classList.add('product__img-thumbs')
            productImgThumbs.alt = 'фото товара'
            el.append(productImgThumbs)
        })
        productSection.querySelector('.product__code').innerHTML = `Артикул: <b>${code}</b>`
        productSection.querySelector('.catalog-item__current-price').innerHTML = `${currentPrice.toLocaleString()} р.`
        productSection.querySelector('.catalog-item__old-price').innerHTML = oldPrice
        productSection.querySelector('.product__discount').innerHTML = amountOfDiscount
        productSection.querySelector('.product__manufacturer-value').innerHTML = manufacturer

        app.innerHTML = productSection.outerHTML

        this.#swipersInit()
        // this.#clickBuy(code)
    }

    #clickBuy(code) {
        const addToCart = document.querySelector('.product__add-to-cart')
        addToCart.addEventListener('click', e => {
            e.preventDefault()

            let productsInTheCart = persistanceStorage.getProducts()

            const index = Object.keys(productsInTheCart).indexOf(code)
            if (index === -1) productsInTheCart[code] = 1
            else productsInTheCart[code]++

            localStorage.setItem('productsInTheCart', JSON.stringify(productsInTheCart))

            miniCart.setCartAmountItems(productsInTheCart)
            miniCart.renderMiniCartItems()

            window.location.href = 'cart.html'
        })
    }

    #swipersInit() {
        const ProductThumbsSwiper = new Swiper(".product__thumbs-swiper", {
            spaceBetween: 10,
            slidesPerView: "auto",
        })

        const productSwiper = new Swiper(".product__swiper", {
            modules: [Thumbs],
            spaceBetween: 10,
            thumbs: {
                swiper: ProductThumbsSwiper,
            },
        })
    }
}

export const productPage = new ProductPage()

export default {
    productPage
}