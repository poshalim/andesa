import { persistanceStorage } from "../helpers/persistanceStorage.js"
import { products } from '../store/products.js'


// Формирование товаров в мини-корзине в header
export class MiniCart {

  setCartAmountItems(productsInTheCart) {
    const cartAmountItemsEl = document.querySelector('.cart__amount-items')

    if (Object.values(productsInTheCart).length !== 0) {
      const cartAmountItems = Object.values(productsInTheCart).reduce((acc, num) => acc + num)
      cartAmountItemsEl.textContent = cartAmountItems
    }
    else cartAmountItemsEl.textContent = 0
  }

  getTotalSum(productsInTheCart) {
    const cartItemTotal = []
    Object.entries(productsInTheCart).forEach(productInTheCart => {
      cartItemTotal.push(products[productInTheCart[0]].currentPrice * productInTheCart[1])
    })
    if (cartItemTotal.length > 0) return cartItemTotal.reduce((acc, num) => acc + num)
    else return 0
  }

  renderMiniCartItems() {
    const productsInTheCart = persistanceStorage.getProducts()
    let htmlMiniCart = ''

    Object.entries(productsInTheCart).forEach(([code, amount]) => {
      const { img, name, currentPrice } = products[code]
      htmlMiniCart += `
        <li class="cart__item">
          <a class="cart__item-link" href="catalog.html#/product/${code}/">
            <img class="cart__item-img" src="${img}" alt="фото товара">
            <div class="cart__item-info">
              <p class="cart__item-name">${name}</p>
              <p class="cart__item-code">${code}</p>
            </div>
            <div class="cart__item-sum">
              <p class="cart__item-price">${currentPrice.toLocaleString()} р.</p>
              <p class="cart__item-amount">${amount} шт.</p>
            </div>
          </a>
        </li>
        `
    })

    const miniCartItems = document.querySelector('.cart__items')
    miniCartItems.innerHTML = htmlMiniCart

    const miniCartTotalSum = document.querySelector('.cart__item-total')
    const totalSum = this.getTotalSum(productsInTheCart)

    if (totalSum > 0) miniCartTotalSum.textContent = `Итого: ${totalSum.toLocaleString()} р.`
    else miniCartTotalSum.textContent = 'Сложите в корзину нужные товары'
  }
}

export const miniCart = new MiniCart()

export default { miniCart }