/**
 * Created by fangzhaomou on 2017/7/12.
 */
import '../other/reset.css'; //初始化样式

import Vue from 'vue'; //引入vue
import VueRouter from 'vue-router'; //引入vue路由
import VueResource from 'vue-resource';//引入vue请求插件
import ElementUI from 'element-ui';//elementui js文件
import 'element-ui/lib/theme-default/index.css';//elementui css文件
import WorkOrder from '../vue/workorder.vue' //index.vue 页面内容
import WorkOrderMsg from '../components/workordermsg.vue'
import WorkOrderDection from '../components/workorderdection.vue'
import WorkOrderAll from '../components/workorderall.vue'
import WorkQuality from '../components/workquality.vue'

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
    {
        path:"/",
        component:WorkOrderMsg
    },{
        path:"/workorderdection",
        component:WorkOrderDection
    },{
        path:"/workorderall",
        component:WorkOrderAll
    },{
        path:"/workquality",
        component:WorkQuality
    }
]

const router = new VueRouter({
    routes
})


const app = new Vue({
	el:"#workorder",
    router,
    render: h => h(WorkOrder)
})