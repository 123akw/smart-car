import {createRouter, createWebHashHistory} from 'vue-router'

import payment from '@/components/payment.vue'
import Parking from '@/components/Parking.vue'
import News from '@/components/News.vue'
import Service from '@/components/Service.vue'
import Login from '@/components/LoginModal.vue'
import SmartCar from '@/components/Smart-car.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            name:'自助缴费',
            path:'/payment',
            component:payment
        },
        {
            name:'泊车点查询',
            path:'/parking',
            component:Parking,
           
        },
        {
            name:'新闻资讯',
            path:'/news',
            component:News
        },
        {
            name:'客服反馈',
            path:'/service',
            component:Service
        },
        {
            name:'登录界面',
            path:'/login',
            component:Login
        },
        {
            name:'首页',
            path:'/',
            component:SmartCar
        },
    ]
})
export default router