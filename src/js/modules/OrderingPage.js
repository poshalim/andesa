import { persistanceStorage } from "../helpers/persistanceStorage.js"
import { miniCart } from "./MiniCart.js"
import { products } from '../store/products.js'

// формирование товаров в корзине на странице Оформление заказа
class OrderingPage {

    init() {
        const orderingBlock = document.querySelector('.ordering')
        if (orderingBlock) {
            this.render()
        }
    }

    render() {
        const productsInTheCart = persistanceStorage.getProducts()
        let htmlOrdering = ''

        Object.entries(productsInTheCart).forEach(([code, amount]) => {

            const { img, name, currentPrice } = products[code]

            htmlOrdering += `
        <li class="ordering__item ordering-item">
          <a href="catalog.html#/product/${code}/">
            <img class="ordering-item__img" src="${img}" alt="фото товара">
          </a>
          <a class="ordering-item__info" href="catalog.html#/product/${code}/">
            <p class="ordering-item__name">${name}</p>
            <p class="ordering-item__code">${code}</p>
          </a>
          <div class="ordering-item__sum">
            <p class="ordering-item__price">${currentPrice.toLocaleString()} р.</p>
            <p class="ordering-item__amount">${amount} шт.</p>
          </div>
        </li>
      `
        })
        const orderingItems = document.querySelector('.ordering__items')
        orderingItems.innerHTML = htmlOrdering

        const orderingTotalSum = document.querySelector('.ordering__total-sum')
        const totalSum = miniCart.getTotalSum(productsInTheCart)

        if (totalSum > 0) orderingTotalSum.textContent = `Итого: ${totalSum.toLocaleString()} р.`
        else orderingTotalSum.textContent = 'Сложите в корзину нужные товары'
    }
}

export const orderingPage = new OrderingPage()

export default {
    orderingPage
}