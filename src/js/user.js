/**
 * Created by fangzhaomou on 2017/7/13.
 */
import '../other/reset.css'; //初始化样式
import '../other/custom.less';//自定义样式

import Vue from 'vue'; //引入vue
import VueRouter from 'vue-router'; //引入vue路由
import VueResource from 'vue-resource';//引入vue请求插件
import ElementUI from 'element-ui';//elementui js文件
import 'element-ui/lib/theme-default/index.css';//elementui css文件
import User from '../vue/user.vue';
import AccpintSet from '../components/accountset.vue'; 
import AccpintMan from '../components/accountman.vue' 
import MySet from '../components/myset.vue' 

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [ 
	{
		path:"/",
		component:AccpintSet
	},{
		path:"/myset",
		component:MySet
	},{
		path:"/accpintman",
		component:AccpintMan
	}
]

const router = new VueRouter({
  routes
})

const app = new Vue({
	el:"#user",
	router,
    render: h => h(User)
})