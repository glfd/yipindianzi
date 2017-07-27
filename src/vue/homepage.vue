<template>
	<div class="homepage">
		<div class="menu">
			<my-menu message="homepage"></my-menu>
		</div>
		<div class="content">
			<my-homecontent></my-homecontent>
		</div>
	</div>
</template>

<script>
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	import MyHomeContent from '../components/homecontent.vue';
	import { cookie } from '../other/cookie.js';
	
	
	export default{
        data: function () {
            return {
               	msg:"homepage"
            }
        },
        methods: { //方法
			
        },
        components: { //组件放这里
			'my-menu':MyMenu,
			'my-homecontent':MyHomeContent
        },
        mounted: function () {     //DOM加载完成事件
        	console.log(cookie.getcookie('userId'));
        	console.log(cookie.getcookie('realName'));
        }
    }
</script>

<style lang="less">
	.homepage{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		background-color: #F0F3F7;
		.menu{
			width: 200px;
			height: 100%;
			min-width: 200px;
		}
		.content{
			flex-grow: 1;
		}
	}
</style>