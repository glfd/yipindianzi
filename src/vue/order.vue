<!--订单录入管理系统-->
<template>
	<div class="order">
		<div class="menu">
			<my-menu message="dd"></my-menu>
		</div>
		<div class="content">
				<router-view class="content"></router-view>
		</div>
	</div>
</template>

<script>
    import MyMenu from '../components/menu.vue';/*菜单组件*/
	import MyTable from '../components/mytable.vue';
	
    export default{
        data: function () {
            return {
            	transitionName:"slide-right"
            }
        },
        methods: { //方法
        	
        },
        components: { //组件放这里
			'my-menu':MyMenu
        },
        mounted: function () {        	 //DOM加载完成事件
        	
        },
        watch: {
			/*'$route' (to, from) {
				console.log(toDepth+"aaaaa"+fromDepth);
			    const toDepth = to.path.split('/').length
			    const fromDepth = from.path.split('/').length
			    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
			}*/
		}
    }
</script>

<style lang="less">
	.order{
		width: 100%;
		height: 100%;
		max-width: 100%;
		display: flex;
		position: relative;
		background-color: #F0F3F7;
		.menu{
			width: 200px;
			height: 100%;
			min-width: 200px;
		}
		.content{
			position: absolute;
			top: 0;
			left: 100px;
			right: 0;
			bottom: 0;
			overflow-x: hidden;
		}
		
	}
	
</style>