<template>
	<div class="matter">
		<el-dialog title="添加问题" :visible.sync="dialogFormVisible" :show-close="false">
		    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
			  <el-form-item label="问题内容" prop="msg">
			    <el-input v-model="form.msg"></el-input>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clearl">取 消</el-button>
		    <el-button type="primary" @click="addmatter('form')">确 定</el-button>
		  </div>
		</el-dialog>
		
		<div class="menu">
			<my-menu message="wt"></my-menu>
		</div>
		<div class="mattercontent" v-loading="tablelogin" element-loading-text="拼命加载中" >
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				:editbut="{'edit':false,'remove':true}" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
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
			property:"msg",
		    label:"问题内容"
		}
	];
	var selectdata = [
    	{
			"label":"问题内容",
			"value":"msg"
		}
    ];
	export default{
		data:function(){
			return {
				tabledataurl:myurl.mattergetall,
				tablecolumn:tablecolumn,
				tabledata:[],
				tablelogin:false,
				dialogFormVisible:false,  
				form:{
					"id":"",
					"msg":""
				},
				rules:{
					msg:[
            			{ required: true, message: '请输入问题内容', trigger: 'blur' }
            		],
				},
            	selectedval:null,
            	selectdata:selectdata
			}
		},
		methods:{
			clearl:function(){
        		this.form.msg = "";
        		this.dialogFormVisible = false;
        		this.$refs['form'].resetFields();
        	},
			selected:function(val){
		    	this.selectedval = val;
		    },
		    add:function(tablethis){
		    	this.addmateriel=true;
		    	this.tablethis = tablethis;
		    	this.dialogFormVisible=true;
		    },
		    edit:function(tablethis){
		    	
		    },
		    remove:function(tablethis){
		    	this.tablethis = tablethis;
				var _this = this;
        		this.$alert('确认删除？', '问题删除', {
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
		          	console.log({"id":_this.selected.id});
		        	_this.$http.post(myurl.matterdelete,{"id":_this.selectedval.id},{emulateJSON: true})
		            
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
			addmatter:function(formName){
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
	        	this.$http.post(myurl.mattercreate,this.form,{emulateJSON: true})
		        .then(
		        	function (response){
		        		console.log(response.body.id);
		        		_this.tablelogin = false;
		        		if(response.body.id == 1){
		        			_this.$message({
					          showClose: true,
					          message: '添加成功！',
					          type: 'success'
					        });
					        _this.clearl();
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
			        _this.tablelogin = false;
	        	});
			}
		},
		components:{
			'my-menu':MyMenu,
			'my-table-one':MyTableOne
		},
		mounted:function () {
			
		}
	}
</script>

<style lang="less">
	.matter{
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
		.mattercontent{
			flex-grow: 1;
			
		}
	}
</style>