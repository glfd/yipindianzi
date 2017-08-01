<!--Boom单-->
<template>
	<div class="boommsg">
		<div class="boomtitle">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
			  <el-breadcrumb-item>Boom</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-dialog
		  title="添加物料"
		  :visible.sync="addmateriel">
		  <div class="materieldialog">
		  	<el-form ref="form" :model="form"  :rules="rules" label-width="140px">
		  		<el-form-item label="选择物料：" prop="mid">
		  			<el-select v-model="form.mid" filterable placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					      <span style="float: left">{{ item.label }}</span>
      					  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label2 }}</span>
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="输入数量：" prop="nub">
				    <el-input type="text" v-model.number="form.nub"></el-input>
				</el-form-item>
		  	</el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addmateriel = false">取 消</el-button>
		    <el-button type="primary" @click="addmaterielconfirl('form')">确 定</el-button>
		  </span>
		</el-dialog>
		<div class="boomcontent" v-loading="tablelogin" element-loading-text="拼命加载中" >
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				:editbut="{'edit':false,'remove':true}" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
			</my-table-one>			
		</div>
	</div>
</template>

<script>
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/MyTableOne.vue';
	import { cookie } from '../other/cookie.js';
	var tablecolumn = [
		{
			property:"bid",
		    label:"序号"
		},
		{
			property:"materiel.mnub",
			label:"料号"
		},
		{
			property:"materiel.mName",
			label:"名称"
		},
		{
			property:"materiel.version",
			label:"型号"
		},
		{
			property:"materiel.supplier",
			label:"供应商"
		},
		{
			property:"nub",
			label:"数量"
		},
		{
			property:"materiel.remark",
			label:"备注"
		},
		{
			property:"create_time",
			label:"创建时间"
		},
		{
			property:"realName",
			label:"创建人"
		}	
	];
	var selectdata = [
    	{
			"label":"序号",
			"value":"bid"
		},
		{
			"label":"料号",
			"value":"mnub"
		},
		{
			"label":"名称",
			"value":"mName"
		},
		{
			"label":"型号",
			"value":"version"
		},
		{
			"label":"供应商",
			"value":"supplier"
		},
		{
			"label":"数量",
			"value":"nub"
		},
		{
			"label":"备注",
			"value":"remark"
		},
		{
			"label":"创建时间",
			"value":"create_time"
		},
		{
			"label":"创建人",
			"value":"realName"
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
		      var select = function(rule, value, callback){
        		if(value == {} || value == ""){
        			callback(new Error("请选择"));
        		}
        	};
			return {
				tabledataurl:myurl.bomgetall+"?pmid="+this.$route.query.mid,
				tablecolumn:tablecolumn,
				tabledata:[],
				tablelogin:false,
				materiel:[],
				addmateriel:false,
				form:{
					"nub":"",
					"mid":"",
					"pmid":this.$route.query.mid,
					"user":JSON.parse(unescape(cookie.getcookie('user'))).realName
				},
				rules:{
					mid:[
            			{  validator: select, trigger: 'blur' }
            		],
            		nub:[
            		    { validator: digital, trigger: 'blur' }
            		]
				},
				tablelogin:false,
            	tablethis:"",  
            	deliveryTime:"",
            	selectedval:null,
            	selectdata:selectdata,
				options: []
			}
		},
		methods:{
			clearl:function(){
        		this.form.nub = "";
        		this.form.mid = "";
        		this.addmateriel = false;
        	},
			selected:function(val){
		    	this.selectedval = val;
		    },
		    add:function(tablethis){
		    	this.addmateriel=true;
		    	this.tablethis = tablethis;
		    },
		    edit:function(tablethis){
		    	
		    },
		    remove:function(tablethis){
		    	this.tablethis = tablethis;
				var _this = this;
        		this.$alert('确认删除？', 'bom单删除', {
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
		          	console.log({"bid":_this.selected.bid});
		        	_this.$http.post(myurl.bomdelete,{"bid":_this.selectedval.bid},{emulateJSON: true})
		            
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
			addmaterielconfirl:function(formName){
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
	        	this.$http.post(myurl.bomcreate,this.form,{emulateJSON: true})
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
				        	
					       }else if(response.body.id == 0){
		        			_this.$message({
					          showClose: true,
					          message: '物料重复！',
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
			        _this.tablelogin = false;
	        	});
			}
		},
		components:{
			'my-table-one':MyTableOne
		},
		mounted:function(){
			var _this = this;
	        this.$http.post(myurl.progetall,{emulateJSON: true})
	        .then(
	        	function (response){
	        		console.log(response);
	        		/*_this.materiel = response.body;*/
	        		_this.options = [];
	        		for (var i=0;i<response.body.length;i++) {
	        			if(this.$route.query.mid != response.body[i].mid){
	        				var linshi = {};
	        				linshi.value = response.body[i].mid;
	        				linshi.label2 = response.body[i].mnub;
	        				linshi.label = response.body[i].mName;
	        				_this.options.push(linshi);
	        			}
	        		}
	        	},
	        	function (error){
	        		_this.$message({
			          showClose: true,
			          message: '物料获取失败！',
			          type: 'error'
			        });
	        	});
		}
	}
</script>

<style lang="less">
	.boommsg{
		position: relative;
		.boomtitle{
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			font-weight: 600;
			.el-breadcrumb{
				line-height: 30px;
			}
		}
		.boomcontent{
			position: absolute;
			top: 30px;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>