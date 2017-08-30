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
			flex-grow: 1;
			position: relative;
			.warehouseview{
				position: absolute;
				top: 40px;
				left: 0;
				right: 0;
				bottom: 0;
			}
			.el-menu{
				border-bottom: 1px solid red;
			}
			.el-menu--horizontal .el-menu-item{
				height:40px;
				line-height: 40px;
			}
			.el-menu-item.is-active{
				color: red;
			}
			.el-menu--horizontal>.el-menu-item:hover{
				border-bottom: 5px solid red;
			}
		}
	}
</style>