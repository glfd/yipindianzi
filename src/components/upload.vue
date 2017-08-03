<template>
	<div class="upload">
		<div class="kuang">
			<div class="chakan">
				<a v-show="url != '' || url != null" :href="filedata" target="_blank">点击查看 </a>
			</div>
			<el-upload
				  class="upload-demo"
				  drag
				  :action="action"
				  multiple>
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  <div class="text1" >{{ data }}</div>
			</el-upload>
		</div>
	</div>
</template>

<script>
	import myurl from '../json/myurl.json';
	
	export default{
		props:{
			'action':{//获取数据的URL
				default:""
			},
			'data':{
				default:""
			},
			'url':{
				default:""
			}
		},
		data:function(){
			return {
				filedata:myurl.photo+this.url
			}
		},
		methods:{
		},
		mounted:function(){
		}
	}
</script>

<style lang="less">
	.upload{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction:column;
		.kuang{
			border: 1px red dashed;
			margin: 20px 0 0 30px;
			
		}
		.upload-demo{
			margin: 20px 10px 20px 10px;
			.el-icon-upload{
				width: 50px;
				height: 50px;
			}
		}
		
		.el-upload-dragger{
			height: auto;
			width: auto;
			padding:20px 10px 10px 10px;
		}
		.chakan{
			margin-top: 15px;
			font-size:18px;
			text-align: center;
		}
		
		.chakan a:hover{
			color:red;
		}
		.text1{
			margin-top: 10px;
		}
		
	}
		
	
	
</style>