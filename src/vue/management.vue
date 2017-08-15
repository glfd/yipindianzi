<template>
	<div class="management">
		<el-dialog title="添加账号" :visible.sync="dialogFormVisible" :show-close="false">
		    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
			    <el-form-item label="用户名"  prop="name">
				  <el-input v-model="form.name"></el-input>
				</el-form-item>
			  <el-form-item label="密码"  prop="password" >
			    <el-input type="password" v-model="form.password"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名" prop="realName">
			    <el-input v-model="form.realName"></el-input>
			  </el-form-item>
			</el-form>
			
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clearl">取 消</el-button>
		    <el-button type="primary" @click="addupload('form')">确 定</el-button>
		  </div>
		</el-dialog>
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
		<div class="menu">
			<my-menu message="gl"></my-menu>
		</div>
		<div class="managementcontent" >
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				@tablethis="mytablethis" :editbut="{'edit':false,'remove':false}" :addshow="addshow" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
				<el-table-column 
			    	property="name"
      				label="用户名" width="200">
      				<template scope="scope">
				      	<div>{{scope.row.name}}</div>	      	
				    </template>
			    </el-table-column>
				<el-table-column 
			    	property="docName"
      				label="文件名">
      				<template scope="scope">
				      	<div>{{scope.row.docName}}</div>	      	
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
						  :action="action" >
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
 	import { cookie } from '../other/cookie.js';
 	var tablecolumn = [
	
	];
	var selectdata = [
    	{
    		"label":"用户名",
    		"value":"name"
    	}
    	
    ];
	export default{
		data:function(){
			return {
				
 				msg:"customer",
            	tabledata:[],
            	tabledataurl:myurl.sopgetall,
            	tablecolumn:tablecolumn,
            	dialogFormVisible:false, 
            	dialogVisible:false,
            	form:{
            		"name":"",
            		"password":"",
            		"realName":""
            		
            	},
            	rules:{
            		name:[
            			{ required: true, message: '请输入用户名', trigger: 'blur' },
            		],
            		password:[
            			{ required: true, message: '请输入密码', trigger: 'blur' },
            		],
            		realName:[
            			{ required: true, message: '请输入姓名', trigger: 'blur' }
            		]
            	},
            	fileList: [],
            	tablelogin:false,
            	tablethis:"",    /*Table组件this*/
            	selectedval:null,      	
            	selectdata:selectdata,
            	fileList:[],
            	action:"",
            	picture:"",
            	uploadstate:"开始上传",
            	percentage:0,
            	addshow:false
            	
			}
		},
		methods:{
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
	        	this.form.realName = "";
        		this.form.password= "";
        		this.form.name = "";
        		this.dialogFormVisible=false;
        		this.percentage=false;
        		this.$refs['form'].resetFields();
        	},
        	selected:function(val){
        		console.log(val)
        		this.action = myurl.createPhoto+"?id="+val.id;
        		this.picture = myurl.photo+val.url;
        		console.log(this.action);
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
		    mytablethis:function(tablethis){
		    	this.tablethis = tablethis;
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
	      		this.$http.post(myurl.sopcreate,this.form,{emulateJSON: true})
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
		        		}else if(response.body.id == 0){
		        			_this.$message({
					          showClose: true,
					          message: '用户名重复！',
					          type: 'error'
					        });
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
        	var user = JSON.parse(unescape(cookie.getcookie('user')));
	        		for (var i=0;i<user.roles.length;i++) {
	        		if(user.roles[i].rid == "r91"){
	        			this.addshow = true;
	        		}
	        	}
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
		.managementcontent{
			flex-grow: 1;
			.mytable{
				width: 90%;
				margin-left: 5%;
			}
			
		}
		.managementcontent img{
				width: 22px;
				
		}
		
	}
</style>