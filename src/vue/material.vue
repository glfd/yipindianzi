<!--物料管理系统-->
<template>
	<div class="material">
		<el-dialog title="添加物料" :visible.sync="dialogFormVisible">
		    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
			  <el-form-item label="料号" prop="mnub">
			    <el-input v-model="form.mnub"></el-input>
			  </el-form-item>
			  <el-form-item label="物连名称" prop="mName">
			    <el-input v-model="form.mName"></el-input>
			  </el-form-item>
			  <el-form-item label="型号" prop="version">
			    <el-input v-model="form.version"></el-input>
			  </el-form-item>
			  <el-form-item label="供应商" prop="supplier">
			    <el-input v-model="form.supplier"></el-input>
			  </el-form-item>
			  <el-form-item label="单位" prop="unit">
			    <el-input v-model="form.unit"></el-input>
			  </el-form-item>
			  <el-form-item label="备注">
			    <el-input v-model="form.remark"></el-input>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clearl">取 消</el-button>
		    <el-button type="primary" @click="addmateriel('form')">确 定</el-button>
		  </div>
		</el-dialog>
		
		<div class="menu">
			<my-menu message="wl"></my-menu>
		</div>
		<div class="content" v-loading="tablelogin" element-loading-text="拼命加载中" >
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				:editbut="{'edit':false,'remove':true}" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
				<el-table-column 
			    	property="unit"
      				label="单位">
			    </el-table-column>
			    <el-table-column 
			    	property="remark"
      				label="备注">
			    </el-table-column>
			</my-table-one>
		</div>
	</div>
</template>

<script>
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/MyTableOne.vue';
	
    var tablecolumn = [
    	{
    		property:"mnub",
    		label:"料号"
    	},
    	{
    		property:"mName",
    		label:"物料名称"
    	},
    	{
    		property:"version",
    		label:"型号"
    	},
    	{
    		property:"supplier",
    		label:"供应商"
    	}/*,
    	{
    		property:"remark",
    		label:"备注"
    	}*/
    ];
    var selectdata = [
    	{
    		"label":"料号",
    		"value":"mnub"
    	},
    	{
    		"label":"物料名称",
    		"value":"mName"
    	},
    	{
    		"label":"型号",
    		"value":"version"
    	},
    	{
    		"label":"供应商",
    		"value":"supplier"
    	}
    ];
    export default{
        data: function () {
            return {
            	tabledataurl:myurl.materielgetall,
            	tablecolumn:tablecolumn,
            	dialogFormVisible:false,         	
            	form:{
            		"mnub":"",
            		"mName":"",
            		"version":"",
            		"supplier":"",
            		"unit":"",
            		"remark":"",
            		"type":"1"
            	},
            	rules:{
            		mnub:[
            			{ required: true, message: '请输入料号', trigger: 'blur' }
            		],
            		mName:[
            			{ required: true, message: '请输入物料名称', trigger: 'blur' }
            		],
            		version:[
            			{required: true, message: '请输入型号', trigger: 'blur'}
            		],
            		supplier:[
            			{required: true, message: '请输入供应商', trigger: 'blur'}
            		],
            		unit:[
            			{required: true, message: '请输入单位', trigger: 'blur'}
            		],
            		
            	},
            	tablelogin:false,
            	tablethis:"",    /*Table组件this*/
            	selectedval:null,
            	selectdata:selectdata
            }
        },
        methods:{ //方法
        	seleteother:function(val){
        		console.log(val);
        	},
        	clearl:function(){
        		this.form.mnub = "";
        		this.form.mName = "";
        		this.form.version = "";
        		this.form.supplier = "";
        		this.form.unit = "";
        		this.form.remark = "";
        		this.dialogFormVisible = false;
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
		    	this.tablethis = tablethis;
		    	var _this = this;
		    	this.$alert('确认删除？', '物料删除', {
		          confirmButtonText: '确定',
		          callback: function(action){
		          	console.log(action);
		          	if(action == 'cancel'){
		          		_this.$message({
				          showClose: true,
				          message: '取消删除！',
				          type: 'success'
				        });
				        return;
		          	}
		             console.log()
		          	_this.$http.post(myurl.materieldelete,{"mid":_this.selectedval.mid},{emulateJSON: true})
			        .then(
			        	function (response){
			        		console.log(response);
			        		if(response.body.id == 1){
			        			_this.$message({
						          showClose: true,
						          message: '删除成功！',
						          type: 'success'
						        });
						        _this.tablethis.gettabledata(_this.tablethis);
			        		}else{
			        			_this.$message({
						          showClose: true,
						          message: '删除失败！',
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
		        });
		    },
		    addmateriel:function(formName){
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
	      		this.$http.post(myurl.materielcreate,this.form,{emulateJSON: true})
		        .then(
		        	function (response){
		        		if(response.body.id == 1){
		        			_this.$message({
					          showClose: true,
					          message: '添加成功！',
					          type: 'success'
					        });
					        _this.clearl();//添加成功就清空数据并关闭dialog
				        	_this.tablethis.gettabledata(_this.tablethis);
		        		}else if(response.body.id == 0){
		        			_this.$message({
					          showClose: true,
					          message: '料号重复！',
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
        	
        }
    }
</script>

<style lang="less">
	.material{
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
			.mytable{
				width: 90%;
				margin-left: 5%;
			}
		}
	}
	
</style>