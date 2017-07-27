/**
 * Created by fangzhaomou on 2017/7/12.
 */
import '../other/reset.css'; //初始化样式

import Vue from 'vue'; //引入vue
import VueRouter from 'vue-router'; //引入vue路由
import VueResource from 'vue-resource';//引入vue请求插件
import ElementUI from 'element-ui';//elementui js文件
import 'element-ui/lib/theme-default/index.css';//elementui css文件
import Order from '../vue/order.vue' //index.vue 页面内容
import OrderMsg from '../components/ordermsg.vue';
import Logistics from '../components/logistics.vue';

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [ 
	{
		path:"/",
		component:OrderMsg
	},
	{
		path:"/logistics",
		component:Logistics
	}
]

const router = new VueRouter({
  routes
})

const app = new Vue({
	el:"#order",
	router,
    render: h => h(Order)
})