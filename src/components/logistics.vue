<template>
	<div class="logistics" v-loading="tablelogin" element-loading-text="拼命加载中" >
		<div class="logisticstitle">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
			  <el-breadcrumb-item>Logistics</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<el-dialog title="物流信息" :visible.sync="dialogFormVisible" :show-close="false">
		    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
			  <el-form-item label="物流公司" prop="logistics">
			    <el-input v-model="form.logistics"></el-input>
			  </el-form-item>
			  <el-form-item label="物流单号" prop="logisticsNub">
			    <el-input v-model="form.logisticsNub"></el-input>
			  </el-form-item>
			  <el-form-item label="发货数量" prop="number">
			    <el-input v-model.number="form.number"></el-input>
			  </el-form-item>
			  
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clearl">取 消</el-button>
		    <el-button type="primary" @click="addlogistics('form')">确 定</el-button>
		  </div>
		</el-dialog>
		<div class="logisticscontent" v-loading="tablelogin" element-loading-text="拼命加载中" >
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				:editbut="{'edit':false,'remove':false}" :othercolumn="true" @selected="selected" @add="add" @edit="edit" >
			</my-table-one>			
		</div>
		</div>
</template>

<script>
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/MyTableOne.vue';
	var tablecolumn = [
		{
			label:"物流公司",
			property:"logistics"
		},
		{
			label:"物流单号",
			property:"logisticsNub"
		},
		{
			label:"发货数量",
			property:"number"
		},
		{
			label:"发货时间",
			property:"time"
		}
	];
	var selectdata = [
    	{
			"label":"物流公司",
			"value":"logistics"
		},
		{
			"label":"物流单号",
			"value":"logisticsNub"
		},
		{
			"label":"发货数量",
			"value":"number"
		},
		{
			"label":"发货时间",
			"value":"time"
		}
    ];
	
	export default{
		data:function(){
			var digital = function(rule, value, callback){
		        if (!value) {
		          return callback(new Error('不能为空'));
		        }
		        setTimeout(function(){
		        	console.log(Number.isInteger(value));
		          if (!Number.isInteger(value)) {
		            callback(new Error('请输入数字值'));
		          }else{
		          	callback();
		          }
		        }, 1000);
		      };
			return {
				
				tabledataurl:myurl.logisticsgetall+"?oid="+this.$route.query.oid,
				tablecolumn:tablecolumn,
				dialogFormVisible:false,   
				form:{
            		"logistics":"",
            		"logisticsNub":"",
            		"number":"",
            		"time":"",
            		"oid":this.$route.query.oid
            	},
            	rules:{
            		logistics:[
            			{ required: true, message: '请输入订单号', trigger: 'blur' }
            		],
            		logisticsNub:[
            			{ required: true, message: '请输入订单号', trigger: 'blur' }
            		],
            		number:[
            			{ validator: digital, trigger: 'blur'}
            		]
            	},
            		
            	tablelogin:false,
            	tablethis:"", 
            	selectedval:null,
            	selectdata:selectdata
			}
		},
		methods:{
			clearl:function(){
        		this.form.logistics = "";
        		this.form.logisticsNub = "";
        		this.form.number = "";
        		this.form.time = "";
        		this.dialogFormVisible = false;
        		this.$refs['form'].resetFields();
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
		    
		    updataRow:function(){
		    	
		    },
		    addlogistics:function(formName){
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
	        	_this.tablelogin = true;
	        	this.$http.post(myurl.logisticscreate,this.form,{emulateJSON: true})
		        .then(
		        	function (response){
		        		if(response.body.id == 1){
		        			_this.$message({
					        showClose: true,
					          message: '添加成功！',
					          type: 'success'
					        });
			        		_this.clearl();
			        		 _this.tablethis.gettabledata(_this.tablethis);//重新刷新数据表
			        		setTimeout(function(){
			        			_this.tablelogin = false;
			        			_this.dialogFormVisible=false;			        			
					        	_this.tablelogin = true;
					        	_this.$http.post(_this.tabledataurl,{emulateJSON: true})
						        .then(
						        	function (response){
						        		_this.tabledata = response.body;
						        		_this.tablelogin = false;	
						        	});
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
				        _this.tablelogin = false;
		        	});
		    }
        },
		components:{
			'my-table-one':MyTableOne
		},
		mounted:function(){

        }
    }
</script>

<style lang="less">
	.logistics{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #F0F3F7;
		position: relative;
		.logisticstitle{
			height: 30px;
			border-bottom: 1px solid red;
			line-height: 30px;
			font-size: 14px;
			font-weight: 600;
			.el-breadcrumb{
				line-height: 30px;
			}
		}
		.logisticscontent{
			 position: absolute;
			 top: 30px;
			 left: 0;
			 right: 0;
			 bottom: 0;
		}
	}
</style>