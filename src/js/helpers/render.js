import { persistanceStorage } from "./persistanceStorage.js"
import Swiper from 'swiper'
import { Modal, modal } from '../components/Modal.js'
import { Form, form, FormWithSwitchingTabs } from '../components/Form.js'
import { Tabs } from '../components/Tabs.js'
import { Accordion } from '../components/Accordion.js'
import { miniCart } from '../modules/MiniCart.js'
import CartPage from '../modules/CartPage.js'
import { orderingPage } from '../modules/OrderingPage.js'
import { products } from '../store/products.js'
import { locationResolver } from '../router/index.js'
import { handleTouchStart, handleTouchMove } from '../helpers/swipeClose.js'


// вызов рендера, инициализации и получение данных 
export const render = () => {
    const productsInTheCart = persistanceStorage.getProducts()

    // открытие/закрытие меню
    const menu = document.querySelector('.menu')
    menu.addEventListener('click', ({ target }) => {
        if (target.closest('.menu__head')) {
            menu.classList.toggle('menu--active')
            document.body.classList.toggle('_locked')
        }
    })

    // закрытие меню свайпом
    const menuBodyBlock = document.querySelector('.menu__body')
    menuBodyBlock.addEventListener('touchstart', handleTouchStart, false)
    menuBodyBlock.addEventListener('touchmove', function (event) {
        handleTouchMove.call((menu), 'right', 'menu--active', event)
    }, false)




    // инициализация свайпера на главной странице
    const catalogBoxSwiper = new Swiper('.catalog-box__items', {
        slidesPerView: "auto",
        spaceBetween: 30,
    })

    document.addEventListener('keyup', modal.close) // закрытие модального окна на Escape


    // открытие/закрытие модального окна Авторизация
    const authorizationModalBlock = document.querySelector('.authorization')
    const authorizationBtn = document.querySelector('.header-navigation__auth')
    const authorizationModal = new Modal(authorizationModalBlock, authorizationBtn)
    authorizationModal.init()

    // открытие/закрытие модального окна Восстановление пароля
    const recoveryModalBlock = document.querySelector('.recovery')
    const recoveryBtn = document.querySelector('.authorization__btn-recovery')
    const recoveryModal = new Modal(recoveryModalBlock, recoveryBtn)
    recoveryModal.init()

    // открытие/закрытие модального окна Регистрация
    const registrationModalBlock = document.querySelector('.registration')
    const registrationBtn = document.querySelector('.authorization__reg-btn')
    const registrationModal = new Modal(registrationModalBlock, registrationBtn)
    registrationModal.init()

    // открытие/закрытие модального окна "Быстрый заказ"
    const quickOrderModalBlock = document.querySelector('.quickOrder')
    const quickOrderBtn = document.querySelector('.quick-order-btn')
    const quickOrderModal = new Modal(quickOrderModalBlock, quickOrderBtn)
    quickOrderModal.init()



    // инициализация валидации форм без вкладок
    const authorizationFormBlock = document.querySelector('.authorization__form')
    const authorizationForm = new Form()
    authorizationForm.init(authorizationFormBlock)

    const recoveryFormBlock = document.querySelector('.recovery__form')
    const recoveryForm = new Form()
    recoveryForm.init(recoveryFormBlock)

    const subscribeFormBlock = document.querySelector('.subscribe__form')
    const subscribeForm = new Form()
    subscribeForm.init(subscribeFormBlock)

    const equipmentSelectionFormBlock = document.querySelector('.equipment-selection__form')
    const equipmentSelectionForm = new Form()
    equipmentSelectionForm.init(equipmentSelectionFormBlock)

    const contactsFormBlock = document.querySelector('.contacts__form')
    const contactsForm = new Form()
    contactsForm.init(contactsFormBlock)

    const quickOrderFormBlock = document.querySelector('.quickOrder__form ')
    const quickOrderForm = new Form('order-formed.html')
    quickOrderForm.init(quickOrderFormBlock)




    // инициализация валидации форм с переключением вкладок
    const orderingTabsWrapper = document.querySelector('.ordering-tabs__wrapper')
    const orderingForm = new FormWithSwitchingTabs('order-formed.html')
    orderingForm.init(orderingTabsWrapper)

    const registrationTabsWrapper = document.querySelector('.registration-tabs__wrapper')
    const registrationForm = new FormWithSwitchingTabs()
    registrationForm.init(registrationTabsWrapper)





    // инициализация блоков с переключением вкладок
    const orderingTabs = new Tabs('ordering', true)
    orderingTabs.init()

    const experienceTabs = new Tabs('experience')
    experienceTabs.init()

    const registrationTabs = new Tabs('registration', true)
    registrationTabs.init()

    const personalAccountTabs = new Tabs('personal-account')
    personalAccountTabs.init()





    // инициализация аккордиона на странице Опыт
    const accordionWrapperBlock = document.querySelector('.experience-accordion__wrapper')
    const accordionExperience = new Accordion(accordionWrapperBlock)
    accordionExperience.init()



    // формирование мини-корзины в header
    miniCart.setCartAmountItems(productsInTheCart)
    miniCart.getTotalSum(productsInTheCart)
    miniCart.renderMiniCartItems()



    // инициализация и рендер страницы Корзина
    const cartPage = new CartPage()
    cartPage.init()




    // инициализация и рендер страницы Оформление заказа
    orderingPage.init()




    let location = window.location.hash // роутинг некоторых страниц
    let code = Object.keys(products).filter(code => location.split('/').some(el => code === el)) // код товара из URL
    const path = window.location.pathname.split('/')
    if (location) locationResolver(location, ...code)
    else if (path[path.length - 1] === 'catalog.html') locationResolver(path[path.length - 1])


    window.addEventListener('hashchange', () => { // роутинг некоторых страниц
        let location = window.location.hash
        let code = Object.keys(products).filter(code => location.split('/').some(el => code === el)) // код товара из URL
        form.clearFields()
        modal.closeAll()

        const path = window.location.pathname.split('/')
        if (location) locationResolver(location, ...code)
        else if (path[path.length - 1] === 'catalog.html' && !location) locationResolver(path[path.length - 1])
    })
}

export default {
    render
}