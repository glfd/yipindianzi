<template>
	<div class="ordermsg" >
	<el-dialog title="订单信息" :visible.sync="dialogFormVisible" :show-close="false">
		    <el-form ref="form" :model="form" :rules="rules" label-width="110px">
			  <el-form-item label="订单号：" prop="ownNub">
			    <el-input v-model="form.ownNub"></el-input>
			  </el-form-item>
			  <el-form-item label="客户订单号：" prop="customerNub">
			    <el-input v-model="form.customerNub"></el-input>
			  </el-form-item>
			  <el-form-item label="选择客户：" prop="cid">
			  	<el-select v-model="form.cid" filterable placeholder="请选择">
				    <el-option
				      v-for="item in customeroptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				      <span style="float: left">{{ item.label }}</span>
  					  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label2 }}</span>
				    </el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="选择产品：" prop="mid">
			  	<el-select v-model="form.mid" filterable placeholder="请选择">
				    <el-option
				      v-for="item in productoptions"
				      :label="item.label"
				      :value="item.value">
				      <span style="float: left">{{ item.label }}</span>
  					  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label2 }}</span>
				    </el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="产品数量：" prop="number">
			    <el-input v-model.number="form.number"></el-input>
			  </el-form-item>
			  <el-form-item label="交货日期：" prop="delivery">
			    <el-date-picker
				    v-model="form.delivery"
				    type="date"
				    placeholder="选择日期">
				</el-date-picker>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clearl">取 消</el-button>
		    <el-button type="primary" @click="addorder('form')">确 定</el-button>
		  </div>
	</el-dialog>
		<div class="ordermsg-content" v-loading="tablelogin" element-loading-text="拼命加载中" >
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata" :checkshow="true"
				:editbut="editbut"  :addshow="addshow" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove" @check="check">
				<el-table-column
				  property="materiel.mName"
			      label="产品名称">
			  	</el-table-column>
			  	<el-table-column
				  property="materiel.mnub"
			      label="产品编号">
			  	</el-table-column>
			  	<el-table-column
				  property="number"
			      label="产品数量"
			      >
			 	</el-table-column>   
			 	<el-table-column
				  property="pro_number"
			      label="未发货数量"
			      >
			 	</el-table-column> 
				<el-table-column label="其他">
			    	<template scope="scope">
				      	<el-button
				      		type="text"
				      		@click.native.prevent="seleteother(scope.row)"
				      	    size="small">
				      	 	 查看
				      	</el-button>				      	
				    </template>
			   </el-table-column>
			</my-table-one>
		</div>
	</div>
</template>

<script>
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	import myurl from '../json/myurl.json';
	import { cookie } from '../other/cookie.js';
	import MyTableOne from '../components/MyTableOne.vue';
	var tablecolumn = [
		{
			property:"ownNub",
    		label:"订单号"
		},
		{
			property:"customerNub",
    		label:"客户订单号"
		},
		{
			property:"deliveryTime",
    		label:"交货日期"
		},
		{
			property:"orderTime",
    		label:"创建日期"
		}
	];
	var selectdata = [
    	{
			"label":"订单号",
			"value":"ownNub"
		},
		{
			"label":"客户订单号",
			"value":"customerNub"
		},
		{
			"label":"交货日期",
			"value":"deliveryTime"
		},
		{
			"label":"创建日期",
			"value":"orderTime"
		}
    ];
    export default{
        data: function () {
        	var select = function(rule, value, callback){
        		if(value == {} || value == ""){
        			callback(new Error("请选择"));
        		}
        	};
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
            	customeroptions:[],
            	productoptions:[],
            	tabledataurl:myurl.ordergetall,
            	tablecolumn:tablecolumn,
            	dialogFormVisible:false,         	
            	form:{
            		"ownNub":"",
            		"customerNub":"",
            		"number":"",
            		"cid":"",
            		"mid":"",
            		"time":"",
            		"delivery":""
            	},
            	rules:{
            		ownNub:[
            			{ required: true, message: '请输入订单号', trigger: 'blur' }
            		],
            		customerNub:[
            			{ required: true, message: '请输入客户订单号', trigger: 'blur' }
            		],
            		
            		cid:[
            			{ validator: select, trigger: 'blur' }
            		],
            		mid:[
            			{ validator: select, trigger: 'blur' }
            		],
            		number:[
            			{ validator: digital, trigger: 'blur'}
            		],
            		delivery:[
            			{ type: 'date',required: true, message: '请选择交货日期', trigger: 'change' }
            		],
            		code:[
            			{ validator: digital, trigger: 'blur'}
            		]
            	},
            	tablelogin:false,
            	tablethis:"",  
            	selectedval:null,
            	selectdata:selectdata,
            	addshow:false,
            	editbut:{'edit':false,'remove':false}
            }
        },
        methods: { //方法
        	seleteother:function(val){
        		console.log(val);
        		var _this = this; 
				this.$router.push({ path: '/logistics',query: { oid:val.oid}})	
        	},
        	clearl:function(){
        		this.form.ownNub = "";
        		this.form.customerNub = "";
        		this.form.number = "";
        		this.form.cid = "";
        		this.form.mid = "";
        		this.form.time = "";
        		this.form.delivery = "";
        		this.form.code="";
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
		    check:function(tablethis){
		    	var _this = this; 
				this.$router.push({ path: '/ordercurve'})	
		    },
		    edit:function(tablethis){
		    	var _this = this;
	      		this.$http.post(myurl.customercreate,this.form,{emulateJSON: true})
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
					          message: '客户编号重复！',
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
		    },
		    remove:function(tablethis){
		    	this.tablethis = tablethis;
		    	var _this = this;
		    	this.$alert('确认删除？', '订单删除', {
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
		          	_this.$http.post(myurl.orderdelete,{"oid":_this.selectedval.oid},{emulateJSON: true})
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
		    updataRow:function(){
		    	
		    },
		    addorder:function(formName){
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
		    	_this.form.time = new Date(_this.form.delivery).getTime().toString();
		    	console.log(_this.form);
	        	_this.$http.post(myurl.ordercreate,_this.form,{emulateJSON: true})
		        .then(
		        	function (response){  
		        		console.log(response);
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
					          message: '订单号已存在！',
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
	        var _this = this;
        	this.$http.post(myurl.customergetall,{emulateJSON: true})
	        .then(
	        	function (response){
	        		_this.customeroptions = [];
	        		for (var i=0;i<response.body.length;i++) {
	        			var linshi = {};
	        			linshi.value = response.body[i].cid;
	        			linshi.label2 = response.body[i].cNub;
	        			linshi.label = response.body[i].cName;
	        			_this.customeroptions.push(linshi);
	        		}
	        	},
	        	function (error){
	        		_this.$message({
			          showClose: true,
			          message: '获取客户信息失败！',
			          type: 'error'
			        });
	        	});
	        this.$http.post(myurl.progetall,{emulateJSON: true})
	        .then(
	        	function (response){
	        		_this.productoptions = [];
	        		for (var i=0;i<response.body.length;i++) {
	        			var linshi = {};
	        			linshi.value = response.body[i].mid;
	        			linshi.label2 = response.body[i].mnub;
	        			linshi.label = response.body[i].mName;
	        			_this.productoptions.push(linshi);
	        		}
	        	},
	        	function (error){
	        		_this.$message({
			          showClose: true,
			          message: '获取产品信息失败！',
			          type: 'error'
			        });
	        	});
	        	
	        	
	        	var user = JSON.parse(unescape(cookie.getcookie('user')));
        		for (var i=0;i<user.roles.length;i++) {
        		if(user.roles[i].rid == "r31"){
        			this.addshow = true;
        		}
        		if(user.roles[i].rid == "r32"){
        			this.editbut.remove = true;
        		}
        	}
        }
    }
</script>

<style lang="less">
       .ordermsg-content{
       	  height: 100%;
       }
</style>