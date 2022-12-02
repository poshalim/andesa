import { catalogPage } from "../modules/CatalogPage.js"
import { productPage } from "../modules/ProductPage.js"

// роутинг некоторых страниц
export const locationResolver = (location, code) => {
    switch (location) {
        case "/catalog.html":
            catalogPage.init() // рендер и инициализация элементов на странице

            break
        case `#/product/${code}/`:
            productPage.init(code) // рендер и инициализация элементов на странице
            break
    }
}

export default {
    locationResolver
}


