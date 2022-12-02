export let products = {}

// получение каталога продуктов
export const getProducts = async () => {
    try {
        const response = await fetch('../files/server/products.json')
        if (!response.ok) throw new Error("Ошибка в получении данных о продуктах")
        products = await response.json()
    } catch (error) {
        console.log(error)
    }
}

export default {
    products, getProducts
}