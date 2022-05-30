import Vue from 'vue'
import 'swiper/swiper-bundle.css'
if (process.browser) {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
    Vue.use(VueAwesomeSwiper)
}