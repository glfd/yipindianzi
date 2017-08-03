<template>
	<div class="management" >
		<div class="menu">
			<my-menu message="gl"></my-menu>
		</div>
		<div class="management-content">
			<el-row :gutter="20">
			  <el-col  v-for="item in data" :span="6"><my-upload :url="item.url" :action="item.uploadurl" :data="item.flag"></my-upload></el-col>
			</el-row>
		</div>
	</div>
	
</template>

<script>
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	import MyUpload from '../components/upload.vue';
 	import myurl from '../json/myurl.json';
 	
	export default{
		data:function(){
			return {
				action:"",
				data:[]
				
			}
		},
		methods:{
			init:function(_this){
				_this.$http.post(myurl.sopgetall,{emulateJSON: true})
		        .then(
		        	function (response){
		        		console.log(response);
		        		_this.data = response.body;
		        		for (var i=0;i<_this.data.length;i++) {
		        			_this.data[i].uploadurl = myurl.createPhoto+"?flag="+_this.data[i].flag;
		        		}
	        		},
		        	function (error){
		        		_this.$message({
				          showClose: true,
				          message: '请求失败！',
				          type: 'error'
				        });
		        	});
			}
		},
		components: { //组件放这里
			'my-menu':MyMenu,
			'my-upload':MyUpload
        },
        mounted: function () {        	 //DOM加载完成事件
        	this.init(this);
        }
	}
</script>

<style lang="less">
	.management{
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
		.management-content{
			flex-grow:1;
			overflow-x: hidden;
			overflow-y: auto;
		}
		
	}
</style>