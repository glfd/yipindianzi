/**
 * Created by fangzhaomou on 2017/7/12.
 */
import '../other/reset.css'; //初始化样式

import Vue from 'vue'; //引入vue
import VueRouter from 'vue-router'; //引入vue路由
import VueResource from 'vue-resource';//引入vue请求插件
import ElementUI from 'element-ui';//elementui js文件
import 'element-ui/lib/theme-default/index.css';//elementui css文件
import Work from '../vue/work.vue'; //index.vue 页面内容
import WorkMsg from '../components/workmsg.vue';
import BoomMsg from '../components/boommsg.vue';
import WorkCurve from '../components/workcurve.vue';
import PassRate from '../components/passrate.vue';
import StandardMsg from '../components/standardmsg.vue';

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [ 
	{
		path:"/",
		component:WorkMsg
	},{
		path:"/boom",
		component:BoomMsg
	},
	{
		path:"/workcurve",
		component:WorkCurve
	},{
		path:"/passrate",
		component:PassRate
	},{
		path:"/standardmsg",
		component:StandardMsg
	},
	
]

const router = new VueRouter({
  routes
})

const app = new Vue({
	el:"#work",
	router,
    render: h => h(Work)
})