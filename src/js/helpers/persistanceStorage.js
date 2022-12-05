// взаимодействие с содержимым локального хранилища (товары в корзине)
class PersistanceStorage {
    #keyName

    constructor() {
        this.#keyName = 'productsInTheCart'
    }

    getProducts() {
        const productsLocalStorage = localStorage.getItem(this.#keyName)
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage)
        }
        else return {}
    }

    setProducts(data) {
        localStorage.setItem(this.#keyName, JSON.stringify(data))
    }

    putProducts(code) {
        let productsInTheCart = this.getProducts()
        let pushProduct = false

        const index = Object.keys(productsInTheCart).indexOf(code)
        if (index === -1) {
            productsInTheCart[code] = 1
            pushProduct = true
        }
        else delete productsInTheCart[code]

        this.setProducts(productsInTheCart)

        return { pushProduct, productsInTheCart }
    }


    increaseAmountProduct(code) {
        let productsInTheCart = this.getProducts()
        productsInTheCart[code] += 1
        this.setProducts(productsInTheCart)

        return { productsInTheCart }
    }

    decreaseAmountProduct(code) {
        let productsInTheCart = this.getProducts()

        if (productsInTheCart[code] > 1) productsInTheCart[code] -= 1
        else delete productsInTheCart[code]
        this.setProducts(productsInTheCart)

        return { productsInTheCart }
    }

    removeProductFromCart(code) {
        let productsInTheCart = this.getProducts()

        delete productsInTheCart[code]
        this.setProducts(productsInTheCart)

        return { productsInTheCart }
    }
}

export const persistanceStorage = new PersistanceStorage()

export default {
    persistanceStorage
}