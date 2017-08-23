<!--客户信息录入-->
<template>
	<div class="customer">
		<el-dialog title="客户信息" :visible.sync="dialogFormVisible" :show-close="false">
		    <el-form :inline="true" :model="form" class="demo-form-inline" :rules="rules" label-width="110px">
		    	<el-form-item label="简称"  prop="jc">
 			    	<el-input v-model="form.jc"></el-input>
 			  	</el-form-item>
 			  	<el-form-item label="法人代表"  prop="frdb">
 			    	<el-input v-model="form.frdb"></el-input>
 			  	</el-form-item>
			    <el-form-item label="客户编号"  prop="cNub">
				  <el-input v-model="form.cNub"></el-input>
				</el-form-item>
				<el-form-item label="密码"  prop="password">
			    	<el-input v-model="form.password"></el-input>
			  </el-form-item>
			  	<el-form-item label="合同联系人" prop="ht_lxr">
			    	<el-input v-model="form.ht_lxr"></el-input>
			  	</el-form-item>
			  	<el-form-item label="合同手机号码" prop="ht_sjhm">
			    	<el-input v-model.number="form.ht_sjhm"></el-input>
			  	</el-form-item>
			  	<el-form-item label="合同联系电话" prop="ht_gh">
			    	<el-input v-model.number="form.ht_gh"></el-input>
			  	</el-form-item>
				<el-form-item label="合同传真" prop="ht_cz">
				  <el-input v-model.number="form.ht_cz"></el-input>
				</el-form-item>
				<el-form-item label="收货联系人" prop="sh_lxr">
				  <el-input v-model="form.sh_lxr"></el-input>
				</el-form-item>
				<el-form-item label="收货人手机" prop="sh_sjhm">
				  <el-input v-model="form.sh_sjhm"></el-input>
				</el-form-item>
				<el-form-item label="收货人电话" prop="sh_gh">
				  <el-input v-model="form.sh_gh"></el-input>
				</el-form-item>
				<el-form-item label="收货人传真" prop="sh_cz">
				  <el-input v-model="form.sh_cz"></el-input>
				</el-form-item>
				<el-form-item label="对账联系人" prop="dz_lxr">
				  <el-input v-model="form.dz_lxr"></el-input>
				</el-form-item>
				<el-form-item label="对账手机号" prop="dz_sjhm">
				  <el-input v-model="form.dz_sjhm"></el-input>
				</el-form-item>
				<el-form-item label="对账人电话" prop="dz_gh">
				  <el-input v-model="form.dz_gh"></el-input>
				</el-form-item>
				<el-form-item label="对账人传真" prop="dz_cz">
				  <el-input v-model="form.dz_cz"></el-input>
				</el-form-item>
				<el-form-item label="其他联系人" prop="qt_lxr">
				  <el-input v-model="form.qt_lxr"></el-input>
				</el-form-item>
				<el-form-item label="其他手机号码" prop=" qt_sjhm">
				  <el-input v-model="form. qt_sjhm"></el-input>
				</el-form-item>
				<el-form-item label="其他电话" prop="ship_addr">
				  <el-input v-model="form.ship_addr"></el-input>
				</el-form-item>
				<el-form-item label="其他传真" prop="qt_gh">
				  <el-input v-model="form.qt_gh"></el-input>
				</el-form-item>			
			</el-form>
			<el-form ref="form" :model="form" :rules="rules" label-width="90px">		
			  	<el-form-item label="公司名称"  prop="gsmc">
 			    	<el-input v-model="form.gsmc"></el-input>
 			  </el-form-item>
 			  	<el-form-item label="地址" prop="dz">
 			    	<el-input v-model="form.dz"></el-input>
 			  	</el-form-item>
 			  	<el-form-item label="备注" prop="bz">
				  <el-input v-model="form.bz"></el-input>
				</el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clearl">取 消</el-button>
		    <el-button type="primary" @click="addcustomer('form')">确 定</el-button>
		  </div>
		</el-dialog>
		
		<div class="menu">
			<my-menu message="kh"></my-menu>
		</div>
		<div class="content" v-loading="tablelogin"  element-loading-text="拼命加载中">
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				:editbut="editbut"  :addshow="addshow" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
				<el-table-column
			      label="公司名称"
			      width="100">
			      <template scope="scope">
			        <el-popover trigger="hover" placement="left">
 			          <p>法人代表: {{ scope.row.frdb }}</p>
 			          <p>地址: {{ scope.row.dz }}</p>
 			          <div slot="reference" class="name-wrapper">
 			            <el-tag>{{ scope.row.gsmc }}</el-tag>
 			          </div>
			        </el-popover>
			      </template>
			    </el-table-column>
				<el-table-column
			      label="合同联系人"
			      >
			      <template scope="scope">
			        <el-popover trigger="hover" placement="left">
 			          <p>电话: {{ scope.row.ht_gh }}</p>
 			          <p>传真: {{ scope.row.ht_cz }}</p>
			          <p>手机: {{ scope.row.ht_sjhm }}</p>
 			          <div slot="reference" class="name-wrapper">
 			            <el-tag>{{ scope.row.ht_lxr }}</el-tag>
 			          </div>
			        </el-popover>
			      </template>
			    </el-table-column>
			 	<el-table-column
			      label="对账联系人"
			      >
			      <template scope="scope">
			        <el-popover trigger="hover" placement="left">
 			          <p>电话: {{ scope.row.dz_gh }}</p>
 			          <p>传真: {{ scope.row.dz_cz }}</p>
			          <p>手机: {{ scope.row.dz_sjhm }}</p>
 			          <div slot="reference" class="name-wrapper">
 			            <el-tag>{{ scope.row.dz_lxr }}</el-tag>
 			          </div>
			        </el-popover>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="其他联系人"
			      >
			      <template scope="scope">
			        <el-popover trigger="hover" placement="left">
 			          <p>电话: {{ scope.row.qt_gh }}</p>
 			          <p>传真: {{ scope.row.qt_cz }}</p>
			          <p>手机: {{ scope.row.qt_sjhm }}</p>
 			          <div slot="reference" class="name-wrapper">
 			            <el-tag>{{ scope.row.qt_lxr }}</el-tag>
 			          </div>
			        </el-popover>
			      </template>
			    </el-table-column>
			    <el-table-column 
			    	property="bz"
      				label="备注">
			    </el-table-column>
			</my-table-one>
		</div>
	</div>
</template>

<script>
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	import { cookie } from '../other/cookie.js';
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/MyTableOne.vue';

	var tablecolumn = [
		{
			"label":"客户编号",
			"property":"cNub"
		},
		{
			"label":"密码",
			"property":"password"
		},
        {
            "label": "简称",
            "property": "jc"
        }
	];
	var selectdata = [
    	{
    		"label":"客户编号",
    		"value":"cNub"
    	},
        {
            "label": "简称",
            "value": "jc"
        }
    ];
    export default{
        data: function () {
        	 var digital = function(rule, value, callback){
		        if (!value) {
		          return;
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
 				msg:"customer",
            	tabledata:[],
            	tabledataurl:myurl.customergetall,
            	tablecolumn:tablecolumn,
            	dialogFormVisible:false,         	
            	form:{
            		"jc":"",
            		"gsmc":"",
            		"frdb":"",
            		"dz":"",
            		"bz":"",
            		"password":"",
            		"cNub":"",
            		"ht_lxr":"",
            		"ht_sjhm":"",
            		"ht_gh":"",
            		"ht_cz":"",
            		"dz_lxr":"",
            		"dz_sjhm":"",
            		"dz_gh":"",
            		"dz_cz":"",
            		"qt_lxr":"",
            		"qt_sjhm":"",
            		"qt_gh":"",
            		"qt_cz":"",
            	},
            	rules:{
            		cNub:[
            			{ required: true, message: '请输入客户编号', trigger: 'blur' },
            		],
            		jc:[
            			{ required: true, message: '请输入公司简称', trigger: 'blur' },
            		],
            		password:[
           				{ required: true, message: '请输入客户密码', trigger: 'blur' },
            		],

            		gsmc:[
            			{ required: true, message: '请输入公司名称', trigger: 'blur' }
            		],
            		dz:[
            			{ required: true, message: '请输入地址', trigger: 'blur' }
            		],
            		ht_sjhm:[
            			 { validator: digital, trigger: 'blur' }
            		],
            		ht_gh:[
            			{ validator: digital, trigger: 'blur' }
            		],
            		ht_cz:[
            			{ validator: digital, trigger: 'blur' }
            		],
            		dz_sjhm:[
            			 { validator: digital, trigger: 'blur' }
            		],
            		dz_gh:[
            			{ validator: digital, trigger: 'blur' }
            		],
            		dz_cz:[
            			{ validator: digital, trigger: 'blur' }
            		],
            		qt_sjhm:[
            			 { validator: digital, trigger: 'blur' }
            		],
            		qt_gh:[
            			{ validator: digital, trigger: 'blur' }
            		],
            		qt_cz:[
            			{ validator: digital, trigger: 'blur' }
            		]
            	},
            	fileList: [],
            	tablelogin:false,
            	tablethis:"",    /*Table组件this*/
            	selectedval:null,
            	cid:"",
            	selectdata:selectdata,
            	action:myurl.customercreatephoto+"?id=",
            	fileList:[],
            	addshow:false,
            	editbut:{'edit':false,'remove':false},
            	imgloadtext:"点击上传"
            }
        },
        methods:{ //方法
        	uploadsuccess:function(response,file,fileList){
        		console.log(response);
    		   this.$message({
		          message: '上传成功',
		          type: 'success'
		        });
        	},
        	uploaderror:function(response,file,fileList){
        		this.$message({
		          message: '上传失败',
		          type: 'error'
		        });
        	},
        	change:function(msg) {
		        this.dialogFormVisible=true;
		    },
        	seleteother:function(val){
        		console.log(val);
        	},
		    handleRemove:function(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview:function(file) {
		        console.log(file);
		    },
	        clearl:function(){
	        	this.form.cNub = "";
        		this.form.jc = "";
        		this.form.gsmc = "";
        		this.form.frdb = "";
        		this.form.dz = "";
        		this.form.bz = "";
        		this.form.password = "";
        		this.form.ht_lxr = "";
        		this.form.ht_sjhm = "";
        		this.form.ht_gh = "";
        		this.form.ht_cz="";
        		this.form.sh_lxr = "";
        		this.form.sh_sjhm = "";
        		this.form.sh_gh = "";
        		this.form.sh_cz="";
        		this.form.qt_lxr = "";
        		this.form.qt_sjhm = "";
        		this.form.qt_gh = "";
        		this.form.qt_cz="";
        		this.dialogFormVisible = false;
        		this.$refs['form'].resetFields();
        	},
        	selected:function(val){
        		this.action += val.cid;
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
		    	this.$alert('确认删除？', '客户信息删除', {
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
		          	_this.$http.post(myurl.customerdelete,{"cid":_this.selectedval.cid},{emulateJSON: true})
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
		    addcustomer:function(formName){
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
		    }
        },
        components: { //组件放这里
			'my-menu':MyMenu,
			'my-table-one':MyTableOne
        },
        mounted: function () {        	 //DOM加载完成事件
        	var user = JSON.parse(unescape(cookie.getcookie('user')));
        	for (var i=0;i<user.roles.length;i++) {
        		if(user.roles[i].rid == "r21"){
        			this.addshow = true;
        		}
        		if(user.roles[i].rid == "r22"){
        			this.editbut.remove = true;
        		}
        	} 	
        }
    }
</script>

<style lang="less">
	.customer{
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
			.el-input__inner {
			    height: 30px;
			    width: 110px;
			}
		
		}
	}
	
</style>