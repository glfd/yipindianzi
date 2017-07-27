import '../other/reset.css'; //初始化样式

import Vue from 'vue'; //引入vue
import VueRouter from 'vue-router'; //引入vue路由
import VueResource from 'vue-resource';//引入vue请求插件
import ElementUI from 'element-ui';//elementui js文件
import 'element-ui/lib/theme-default/index.css';//elementui css文件
import Warehouse from '../vue/warehouse.vue'; 
import WarehouseMsg from '../components/warehousemsg.vue';
import SlockMsg from '../components/slockmsg.vue';

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [ 
	{
		path:"/",
		component:WarehouseMsg
	},{
		path:"/msg",
		component:SlockMsg
	}
]

const router = new VueRouter({
  routes
})

const app = new Vue({
	el:"#warehouse",
	router,
    render: h => h(Warehouse)
})