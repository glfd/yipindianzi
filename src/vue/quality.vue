<template>
	<div class="quality">
		<el-dialog
			title="进度"
			:visible.sync="dialogVisible"
			:before-close="handleClose"
			>
	    	<el-progress :percentage="percentage"></el-progress>
	    	<span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
	   </el-dialog>		
		<div class="menu">
			<my-menu message="pz"></my-menu>
		</div>
		<div class="qualitycontent" >
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata" :addshow="false"
				:editbut="{'edit':false,'remove':false}" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
				<el-table-column 
			    	property="bid"
      				label="条形码" width="100">
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
			    	property="url"
      				label="文档" width="200">
      				<template scope="scope">
				      	<div>{{scope.row.url}}</div>	      	
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
				      	<a v-if="scope.row.url != null && scope.row.url != ''" :href="picture" target="_blank">查看</a>				      	
				    </template>
			   </el-table-column>
			</my-table-one>
		</div>
	</div>
</template>

<script>
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	import MyTableOne from '../components/MyTableOne.vue';
 	import myurl from '../json/myurl.json';
 	var tablecolumn = [
	
	];
	var selectdata = [
    	{
    		"label":"条形码",
    		"value":"bid"
    	},
    	{
    		"label":"物料名称",
    		"value":"mName"
    	},
    	{
    		"label":"检查人",
    		"value":"realName"
    	},
    	{
    		"label":"时间",
    		"value":"time"
    	},
    	{
    		"label":"错误信息",
    		"value":"msg"
    	},
    	{
    		"label":"文档",
    		"value":"url"
    	},
    	
    	
    ];
 	
	export default{
		data:function(){
			
			return {
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
            	uploadstate:"开始上传",
            	percentage:0
            	
			}
		},
		methods:{
			
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
	        clearl:function(_this){
        		_this.dialogFormVisible=false;
        		_this.percentage=false;
        		
        	},
        	selected:function(val){
		    	this.selectedval = val;
		    },
	        add:function(tablethis){
		    	this.dialogFormVisible=true;
		    	this.tablethis = tablethis;
		    },
		    edit:function(tablethis){
		    	
		    },
		    remove:function(tablethis){
		    },		    
		    addupload:function(formName){
		    	var formv = true;
		    	this.$refs[formName].validate(function(valid) {
		          if (valid) {
		          	formv = true;
		          } else {
		            formv = false;
		            return false;
		          }
		        });
		        if(!formv){
		        	return;
		        }
		    	var _this = this;
	      		this.$http.post(myurl.qualitygetall,this.form,{emulateJSON: true})
		        .then(
		        	function (response){
		        		console.log(response)
		        		if(response.body.id == 1){
		        			_this.$message({
					          showClose: true,
					          message: '添加成功！',
					          type: 'success'
					        });
					        _this.clearl(_this);//添加成功就清空数据并关闭dialog
				        	_this.tablethis.gettabledata(_this.tablethis);
		        		}else{
		        			_this.$message({
					          showClose: true,
					          message: '添加失败！',
					          type: 'error'
					        });
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
			'my-table-one':MyTableOne
        },
        mounted: function () {        	 //DOM加载完成事件
        
        }
	}
</script>

<style lang="less">
	.quality{
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
		.qualitycontent{
			flex-grow: 1;
			.mytable{
				width: 90%;
				margin-left: 5%;
			}	
		}	
	}
</style>