<!--入口页 vue-->
<template>
    <div class="devicestate">
    	<div class="menu">
			<my-menu message="sb"></my-menu>
		</div>
		<div class="content">
			<el-table
			    ref="singleTable"
			    :data="tableData"
			    highlight-current-row
			    style="width: 100%">
			    <el-table-column
			      type="index"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      property="name"
			      label="工位名"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      label="当前状态">
			      <template scope="scope">
			      	<i class="fa fa-circle" :class="scope.row.state==0 ? 'statered' : 'stateblue'"></i>
			        <span style="margin-left: 10px">{{ scope.row.state==0 ? '关闭' : '开启' }}</span>
			    </template>
			    </el-table-column>
			    <el-table-column
			      property="time"
			      label="状态改变时间">
			    </el-table-column>
			    <el-table-column
			      property="str"
			      label="持续时间">
			    </el-table-column>
			</el-table>
		</div>
    </div>
</template>
<script>
	import myurl from '../json/myurl.json';
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	
    export default{
        data: function () {
            return {
               	tableData: []
            }
        },
        methods: { //方法
        	init:function(_this){
        		_this.$http.post(myurl.getall,
			    {emulateJSON: true})
			    .then(function(response){
			    	_this.tableData = response.body;
			    },function(error){
			    	console.log(error)
			    })
        	}
        },
        components: { //组件放这里
			'my-menu':MyMenu
        },
        mounted: function () {        	 //DOM加载完成事件
        	this.init(this)
        }
    }
</script>
<style lang="less">
	.statered{
		color: red;
	}
	.stateblue{
		color: green;
	}
	.devicestate{
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
			  h1{
				width: auto;
				height: 50px;
				text-align: center;
				margin-top:20px ;
				color: red;
			}
		}
	}
</style>