import { persistanceStorage } from "../helpers/persistanceStorage.js"
import { miniCart } from "./MiniCart.js"
import { products } from '../store/products.js'

// формирование товаров на странице Корзина
export default class CartPage {

    init() {
        const cartPageBlock = document.querySelector('.cartPage')
        if (cartPageBlock) {
            this.render()
            const cartPageItemsBlock = cartPageBlock.querySelector('.cartPage__items')
            if (cartPageItemsBlock) {
                cartPageItemsBlock.addEventListener('click', ({ target }) => {
                    if (target.closest('.cartPage-item__amount-minus')) {
                        this.#decreaseAmountProduct(target.closest('.cartPage-item').dataset.code)
                    } else if (target.closest('.cartPage-item__amount-plus')) {
                        this.#increaseAmountProduct(target.closest('.cartPage-item').dataset.code)
                    } else if (target.closest('.cartPage-item__remove-from-cart')) {
                        this.#removeProductFromCart(target.closest('.cartPage-item').dataset.code)
                    }
                })
            }
        }
    }

    #increaseAmountProduct(code) {
        const { productsInTheCart } = persistanceStorage.increaseAmountProduct(code)

        this.render()

        miniCart.setCartAmountItems(productsInTheCart)
        miniCart.renderMiniCartItems()
    }

    #decreaseAmountProduct(code) {
        const { productsInTheCart } = persistanceStorage.decreaseAmountProduct(code)

        this.render()

        miniCart.setCartAmountItems(productsInTheCart)
        miniCart.renderMiniCartItems()
    }

    #removeProductFromCart(code) {
        const { productsInTheCart } = persistanceStorage.removeProductFromCart(code)

        this.render()

        miniCart.setCartAmountItems(productsInTheCart)
        miniCart.renderMiniCartItems()

    }

    render() {
        const productsInTheCart = persistanceStorage.getProducts()
        let htmlCartPage = ''
        Object.entries(productsInTheCart).forEach(([code, amount]) => {

            const { img, name, currentPrice, descriptionShort, descriptionFull } = products[code]

            htmlCartPage += `
        <li class="cartPage__item cartPage-item" data-code="${code}">
          <img class="cartPage-item__img" src="${img}" alt="фото товара">
          <div class="cartPage-item__info">
            <p class="cartPage-item__code">${code}</p>
            <p class="cartPage-item__description cartPage-item__description--small">${name} ${descriptionShort}</p>
            <p class="cartPage-item__description cartPage-item__description--big">${name} ${descriptionFull}</p>
            <p class="cartPage-item__price">${currentPrice.toLocaleString()} р.</p>
              <div class="cartPage-item__footer">
                <div class="cartPage-item__amount">
                  <button class="cartPage-item__amount-btn cartPage-item__amount-minus">-</button>
                  <div class="cartPage-item__amount-value">${amount}</div>
                  <button class="cartPage-item__amount-btn cartPage-item__amount-plus">+</button>
                </div>
                <p class="cartPage-item__item-sum">${(amount * currentPrice).toLocaleString()} р.</p>
              </div>
            <div class="cartPage-item__remove-from-cart">
              <img class=cartPage-item__remove-icon src="../img/cart/cart-icon.svg" alt="кнопка удаления товара">
            </div>
          </div>
        </li>
        `
        })

        const cartPageItems = document.querySelector('.cartPage__items')
        cartPageItems.innerHTML = htmlCartPage

        const cartPageContent = document.querySelector('.cartPage__content')
        const cartPageTotalSum = document.querySelector('.cartPage-item__total-sum')
        const totalSum = miniCart.getTotalSum(productsInTheCart)

        if (totalSum > 0) {
            cartPageTotalSum.textContent = `Итого: ${totalSum.toLocaleString()} р.`
        } else {
            cartPageContent.classList.add('cartPage__content--empty')
            cartPageContent.textContent = 'Сложите в корзину нужные товары'
        }
    }
}