/**
 * Created by fangzhaomou on 2017/7/12.
 */
import '../other/reset.css'; //初始化样式

import Vue from 'vue'; //引入vue
import VueRouter from 'vue-router'; //引入vue路由
import VueResource from 'vue-resource';//引入vue请求插件
import ElementUI from 'element-ui';//elementui js文件
import 'element-ui/lib/theme-default/index.css';//elementui css文件
import Management from '../vue/management.vue' //index.vue 页面内容

Vue.use(ElementUI);
Vue.use(VueResource);

const app = new Vue({
	el:"#management",
    render: h => h(Management)
})