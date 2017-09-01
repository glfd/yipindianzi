<template>
	<div class="swap">
		<div class="menu">
			<my-menu message="pz"></my-menu>
		</div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="品质管理" name="first">
		    	<div class="quality">
					<el-dialog
						title="进度"
						:visible.sync="dialogVisible"
						:before-close="handleClose"
						>
				    	<el-progress :percentage="percentage"></el-progress>
				    	<span slot="footer" class="dialog-footer">
						    <el-button type="primary" @click="closedialogvisible">确 定</el-button>
						</span>
				   </el-dialog>		
					
					<div class="qualitycontent" >
						<div class="table">
							<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata" :addshow="false"
							@tablethis="mytablethis" :editbut="{'edit':false,'remove':false}" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
								<el-table-column 
							    	property="bid"
				      				label="条形码" width="200">
				      				<template scope="scope">
								      	<div>{{scope.row.barcode.bid}}</div>	      	
								    </template>
							    </el-table-column>
								<el-table-column 
							    	property="mName"
				      				label="物料名称" >
				      				<template scope="scope">
								      	<div>{{scope.row.barcode.materiel.mName}}</div>	      	
								    </template>
							    </el-table-column>
							    <el-table-column 
							    	property="realName"
				      				label="检查人" >
				      				<template scope="scope">
								      	<div>{{scope.row.sop.realName}}</div>	      	
								    </template>
							    </el-table-column>
								<el-table-column 
							    	property="time"
				      				label="时间" >
				      				<template scope="scope">
								      	<div>{{scope.row.time}}</div>	      	
								    </template>
							    </el-table-column>
							     <el-table-column 
							    	property="msg"
				      				label="错误信息" width="200">
				      				<template scope="scope">
								      	<div>{{scope.row.msg}}</div>	      	
								    </template>
							    </el-table-column>
								
								<el-table-column 
							    	property="upload"
				      				label="上传" width="100">
				      				
				      				<template scope="scope">
								      	<el-upload
										  class="upload-demo"
										  :show-file-list="false"
										  :on-success="onsuccess"
										  :before-upload="beforeupload"
										  :on-progress="onprogress"
										  :on-error="onerror"
										  :action="action">
										 <i class="el-icon-upload2"></i>
										</el-upload>					
								    </template>				    
							    </el-table-column>
							    <el-table-column label="其他" width="100">
							    	<template scope="scope">
								      	<a v-if="scope.row.url != null && scope.row.url != ''" :href="picture" target="_blank">下载</a>				      	
								    </template>
							   </el-table-column>
							</my-table-one>
						</div>
						
					</div>
				</div>
		    </el-tab-pane>
		    <el-tab-pane label="问题列表" name="second">
		    	<matter></matter>
		    </el-tab-pane>	   
		</el-tabs>
	</div>
	
	
</template>

<script>
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	import MyTableOne from '../components/MyTableOne.vue';
	import Matter from './matter.vue';
 	import myurl from '../json/myurl.json';
 	var tablecolumn = [
		{
			property:"msg",
		    label:"问题内容"
		}
	];
	var selectdata = [
    	{
    		"label":"条形码",
    		"value":"barcode.bid"
    	},
    	{
    		"label":"物料名称",
    		"value":"barcode.materiel.mName"
    	},
    	{
    		"label":"检查人",
    		"value":"sop.realName"
    	},
    	{
    		"label":"时间",
    		"value":"time"
    	},
    	{
    		"label":"错误信息",
    		"value":"msg"
    	}	
    ];
	export default{
		data:function(){
			
			return {
				activeName: 'first',
            	tabledata:[],
            	tabledataurl:myurl.qualitygetall,
            	tablecolumn:tablecolumn,
            	dialogFormVisible:false, 
            	dialogVisible:false,
            	form:{
            		"bid":"",
            		"mName":"",
            		"realName":"",
            		"time":"",
            		"msg":"",
            		"url":""
            		
            	},
            	fileList: [],
            	tablelogin:false,
            	tablethis:"",    /*Table组件this*/
            	selectedval:null,      	
            	selectdata:selectdata,
            	action:"",
            	picture:"",
            	uploadstate:"开始上传",
            	percentage:0
            	
			}
		},
		methods:{
			handleClick:function(tab, event) {
		        console.log(tab, event);
		    },
			closedialogvisible:function(){
				this.dialogVisible=false;
				this.tablethis.gettabledata(this.tablethis);
			},
			onsuccess:function(response, file, fileList){
				this.percentage = 100;
			},
			beforeupload:function(file){
				this.dialogVisible=true;
			},
			onerror:function(err, file, fileList){
				
			},	
			onprogress:function(event, file, fileList){
				this.percentage = Math.floor(event.percent);
			},
			handleClose:function(){
				
			},
			change:function(msg) {
		        this.dialogFormVisible=true; 
		    },
		    seleteother:function(val){
		    	
        	},
		    handleRemove:function(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview:function(file) {
		        console.log(file);
		    },
	        clearl:function(){
        		this.dialogFormVisible=false;
        		this.percentage=false;
        		
        	},
        	selected:function(val){
		    	this.selectedval = val;
		    	console.log(val);
		    	this.action = myurl.qualitycreate+"?pid="+val.pid;
        		this.picture = myurl.photo+val.url;
		    },
	        add:function(tablethis){
		    	this.dialogFormVisible=true;
		    	this.tablethis = tablethis;
		    },
		    edit:function(tablethis){
		    	
		    },
		    mytablethis:function(tablethis){
		    	this.tablethis = tablethis;
		    },
		    remove:function(tablethis){
		    },		    
		 
        
		},
		components: { //组件放这里
			'my-menu':MyMenu,
			'my-table-one':MyTableOne,
			'matter':Matter
			
        },
        mounted: function () {        	 //DOM加载完成事件
        
        }
	}
</script>

<style lang="less">
	.swap{
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
    .el-tabs{
    	width: 100%;
    	position: relative;
    }
    .el-tabs__content{
    	position: absolute;
    	top: 42px;
    	bottom: 0;
    	left: 0;
    	right: 0;
    }
    .el-tab-pane{
    	height: 100%;
    }
	.quality{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		background-color: #F0F3F7;	
		.qualitycontent{
			flex-grow: 1;
			position: relative;
			.table{
				position: absolute;
				top: 0;
				left: 0px;
				right: 0;
				bottom: 0;
				overflow-x: hidden;
			}
			.mytable{
				width: 90%;
				margin-left: 5%;
			}	
		}	
	}
	
	}
</style>