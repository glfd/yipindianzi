<template>
	<div class="mytabs">
		<el-tabs v-model="mytabs" type="card">
		    <el-tab-pane :label="firstlabel" name="first">
		    	<slot name="firstmain"></slot>
		    </el-tab-pane>
		    <el-tab-pane :label="secondlabel" name="second">
		    	<slot name="secondmain"></slot>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default{
		props: ['firstlabel',"secondlabel"],
        data: function () {
        	return{
        		mytabs:"first"
        	}
        },
        methods: { //方法
        	
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
        	
        }
    }
</script>

<style lang="less">
	.mytabs{
		height: 100%;
		width: 100%;
		.el-tabs__header{
			border-bottom: 1px solid red;
		}
		.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
			border: 1px solid red;
			border-bottom-color: #EFF2F7;
		}
	}
</style>