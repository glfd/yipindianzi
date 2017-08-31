<!--仓管-->
<template>
	<div class="workorder">
		<div class="menu">
			<my-menu message="gd"></my-menu>
		</div>

		<div class="content">
			<router-view>
			</router-view>
		</div>
	</div>
</template>

<script>
    import MyMenu from '../components/menu.vue';/*菜单组件*/

    export default{
        data: function () {
            return {

            }
        },
        methods: { //方法

        },
        components: { //组件放这里
            'my-menu':MyMenu
        },
        mounted: function () {        	 //DOM加载完成事件

        }
    }
</script>

<style lang="less">
	.workorder{
		width: 100%;
		height: 100%;
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
			left: 200px;
			right: 0;
			bottom: 0;
			overflow-x: hidden;
		}
	}
</style>