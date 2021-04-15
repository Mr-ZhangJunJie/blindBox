import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import store from './store'
import {tryGetZepeto} from '@/utils/common'
import userApi from "@/api/user"


Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [
        {path: '/404', component: () => import('@/views/404')},
        {
            path: '/',
            name: 'home',
            meta:{title: '盲盒抽奖'},
            component: Home
        },
        {path: '*', redirect: '/404',meta:{title: '页面不存在'},}
    ]
})

router.beforeEach(async(to,from,next)=>{
    let result = await tryGetZepeto();
    if(result){
        // 站内
        if(!store.getters.token){
            let token = await userApi.postUsrInfo(store.getters.myApp);
            store.commit('setToken',token.result)
        }
        next();
    }else{
        // 站外
        alert('加载中')
        next()
    }

})

router.afterEach((to,from) => {
    const title = to.meta.title
    store.commit('RESET_TITLE',title);
    // 跳转页面的操作

    // 如果from.name存在，不存在默认值[{name: 'home'}]
    const routes = store.getters.prevRoutes
    const lastRoute = routes[routes.length-1]
    if (from.name) {
        // 如果
        if (from.name === 'home') {
          console.log('!!!1');
            store.commit('SET_PREV_ROUTE',[from])
        // 如要去页面跟上一次存储的prevRoutes是一个， home-other1-home 置空
        }else if(to.name === lastRoute.name) {
          console.log('!!!2', store.getters.prevRoutes);
            routes.pop();
            store.commit('SET_PREV_ROUTE',routes)
        // 如果既不是从home来的，也不是返回home，home-other1-other2 ?
        } else {
            console.log('!!!3',from);
            routes.push(from)
            store.commit('SET_PREV_ROUTE',routes)
        }
    }
    console.log('store.getters.prevRoutes', store.getters.prevRoutes, from);
})

export default router
