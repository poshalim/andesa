import { persistanceStorage } from "../helpers/persistanceStorage.js"
import { miniCart } from "./MiniCart.js"
import { products } from '../store/products.js'
import { toggleElementVisibility } from '../helpers/toggleElementVisibility.js'
import { handleTouchStart, handleTouchMove } from '../helpers/swipeClose.js'

const app = document.querySelector('.main')

// формирование товаров на странице Каталог
class CatalogPage {
    #classNameBtnActive
    #labelAddBtn
    #labelRemoveBtn

    constructor() {
        this.#classNameBtnActive = 'add-to-cart--active'
        this.#labelAddBtn = 'Добавить в корзину'
        this.#labelRemoveBtn = 'Удалить из корзины'
    }

    init() {
        const htmlCatalog = document.querySelector('#catalog').innerHTML
        app.innerHTML = htmlCatalog

        catalogPage.render() // рендер страницы Каталог

        const filters = {
            category: new Set(),
            manufacturer: new Set(),
        }

        const filterMenu = document.querySelector('.catalog-filter__menu')
        if (filterMenu) {
            filterMenu.addEventListener('change', ({ target }) => {
                if (target.closest('.catalog-filter__checkbox')) {
                    const [prop, value] = target.name.split('-')
                    filters[prop][target.checked ? 'add' : 'delete']('' + value)
                    catalogPage.findServices(filters);
                }
            })
        }

        // добавление товара в корзину
        const catalogItems = document.querySelector('.catalog__items')
        catalogItems.addEventListener('click', ({ target }) => {
            if (target.closest('.add-to-cart')) {
                catalogPage.handleSetLocationStorage(target, target.dataset.code)
            }
        })



        // открытие/закрытие фильтра на экранах меньше 1260
        const catalogContent = document.querySelector('.catalog__content')
        catalogContent.addEventListener('click', (e) => toggleElementVisibility('catalog-filter__btn', 'close', 'catalog-filter__menu', e))

        // закрытие фильтра свайпом
        const filterBodyBlock = document.querySelector('.catalog-filter__menu')
        filterBodyBlock.addEventListener('touchstart', handleTouchStart, false)
        filterBodyBlock.addEventListener('touchmove', function (event) {
            handleTouchMove.call((this), 'up', 'catalog-filter__menu--active', event)
        }, false)
    }

    handleSetLocationStorage(btn, code) {
        const { pushProduct, productsInTheCart } = persistanceStorage.putProducts(code)

        if (pushProduct) {
            btn.classList.add(this.#classNameBtnActive)
            btn.textContent = this.#labelRemoveBtn
        }
        else {
            btn.classList.remove(this.#classNameBtnActive)
            btn.textContent = this.#labelAddBtn
        }


        miniCart.setCartAmountItems(productsInTheCart)
        miniCart.renderMiniCartItems()
    }

    findServices(filters) {
        let filterProducts = products
        for (const filter in filters) {
            const filterSet = filters[filter]
            filterProducts = Object.entries(filterProducts).filter(item => {
                return filterSet.size === 0 || filterSet.has(item[1][filter])
            })
            filterProducts = Object.fromEntries(filterProducts)
        }
        this.render(filterProducts)
    }

    render(filterProducts = products) {
        const productsInTheCart = persistanceStorage.getProducts()
        let htmlCatalog = ''

        Object.entries(filterProducts).forEach(([code, { name, currentPrice, oldPrice, img, isHit, isNovetly, descriptionShort }]) => {
            let activeClassBtn = ''
            let activeTextBtn = ''

            if (Object.keys(productsInTheCart).indexOf(code) === -1) {
                activeTextBtn = this.#labelAddBtn
            } else {
                activeClassBtn = ' ' + this.#classNameBtnActive
                activeTextBtn = this.#labelRemoveBtn
            }

            let amountOfDiscount = Math.trunc((1 - currentPrice / oldPrice) * 100)
            if (oldPrice > currentPrice && amountOfDiscount > 4) amountOfDiscount = `-${amountOfDiscount}%`
            else amountOfDiscount = ''

            if (oldPrice < currentPrice) oldPrice = ''
            else oldPrice = `${oldPrice.toLocaleString()} р.`

            let catalogItemLabelHit = ''
            if (isHit) catalogItemLabelHit = `<div class="item-labels__hit">Хит</div>`

            let catalogItemLabelNovetly = ''
            if (isNovetly) catalogItemLabelNovetly = `<div class="item-labels__novelty">Новинка</div>`

            htmlCatalog += `
            <li class="catalog__item catalog-item">
              <a class="catalog-item__img-container" href="#/product/${code}/">
                <div class="catalog-item__labels item-labels">
                  ${catalogItemLabelHit}
                  ${catalogItemLabelNovetly}
                </div>
                <img class="catalog-item__img" src="${img}" alt="фото товара">
              </a>
              <div class="catalog-item__description">
                <a class="catalog-item__name" href="#/product/${code}/">${name}</a>
                <p class="catalog-item__text">${descriptionShort}</p>
                <div class="catalog-item__price">
                  <p class="catalog-item__current-price">${currentPrice.toLocaleString()} р.</p>
                  <p class="catalog-item__old-price">${oldPrice}</p>
                  <p class="catalog-item__discount">${amountOfDiscount}</p>
                </div>
                <button class="catalog-item__btn add-to-cart${activeClassBtn}" data-code="${code}">
                  ${activeTextBtn}
                </button>
              </div>
            </li>
            `
        })

        const catalogItems = document.querySelector('.catalog__items')
        catalogItems.innerHTML = htmlCatalog
    }
}

export const catalogPage = new CatalogPage()

export default {
    catalogPage
}