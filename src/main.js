import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import '@/resource/css/reset.css'
import 'swiper/swiper-bundle.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
import '@/icons'
import '@/utils/_html'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */);
Vue.use(IScrollView, IScroll);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

// if (process.env.NODE_ENV !== 'production') {
//     showDebugger();
// }
//
// function showDebugger() {
//     const VConsole = require('vconsole')
//     new VConsole()
//
//     const button = document.createElement('button')
//     // button.onclick = () => {
//     //   window.location.reload()
//     // }
//     button.classList.add('reloadBtn');
//     button.innerText = 'v2.1';
//     // button.addEventListener('click', function (e) {
//     //     window.location.href = window.location.origin
//     //     e.preventDefault();
//     //     const moveEndX = e.changedTouches[0].pageX;
//     //     const moveEndY = e.changedTouches[0].pageY;
//     //
//     //     const $this = e.target
//     //     const xMM = moveEndX - $this.clientWidth / 2;
//     //     const yMM = moveEndY - $this.clientHeight / 2;
//     //     if (xMM < document.documentElement.clientWidth - $this.clientWidth && xMM > 0) {
//     //         $this.style.left = xMM + 'px'
//     //     }
//     //
//     //     if (yMM < document.documentElement.clientHeight - $this.clientHeight && yMM > 0) {
//     //         $this.style.top = yMM + 'px'
//     //     }
//     //
//     // })
//     document.body.appendChild(button)
// }
