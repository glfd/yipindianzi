<!--客户信息录入-->
<template>
	<div class="customer">
		<el-dialog
		  title="编辑"
		  :visible.sync="dialog1"
		  size="tiny">
		  <el-form :inline="true" :model="form2" class="demo-form-inline" :rules="rules" label-width="110px">
		    	<el-form-item label="联系人">
 			    	<el-input v-model="form2.contactperson"></el-input>
 			  	</el-form-item>
		    	<el-form-item label="传真">
 			    	<el-input v-model="form2.fax"></el-input>
 			  	</el-form-item>
 			  	<el-form-item label="电话">
 			    	<el-input v-model="form2.phone"></el-input>
 			  	</el-form-item>
			    <el-form-item label="手机">
				  <el-input v-model="form2.mobilephone"></el-input>
				</el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialog1 = false">取 消</el-button>
		    <el-button type="primary" @click="dialog1con">确 定</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="编辑"
		  :visible.sync="dialog2"
		  size="tiny">
		  <el-form :inline="true" :model="form3" class="demo-form-inline" :rules="rules" label-width="110px">
		    	<el-form-item label="公司名称" >
 			    	<el-input v-model="form3.companyname"></el-input>
 			  	</el-form-item>
		    	<el-form-item label="法人代表">
 			    	<el-input v-model="form3.legalrepresentative"></el-input> 
 			  	</el-form-item>
 			  	<el-form-item label="地址">
 			    	<el-input v-model="form3.address"></el-input>
 			  	</el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialog2 = false">取 消</el-button>
		    <el-button type="primary" @click="dialog2con">确 定</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog title="客户信息" :visible.sync="dialogFormVisible" :show-close="false">
		    <el-form ref="form" :inline="true" :model="form" class="demo-form-inline" :rules="rules" label-width="110px">
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
				  <el-input v-model.number="form.sh_sjhm"></el-input>
				</el-form-item>
				<el-form-item label="收货人电话" prop="sh_gh">
				  <el-input v-model.number="form.sh_gh"></el-input>
				</el-form-item>
				<el-form-item label="收货人传真" prop="sh_cz">
				  <el-input v-model.number="form.sh_cz"></el-input>
				</el-form-item>
				<el-form-item label="对账联系人" prop="dz_lxr">
				  <el-input v-model="form.dz_lxr"></el-input>
				</el-form-item>
				<el-form-item label="对账手机号" prop="dz_sjhm">
				  <el-input v-model.number="form.dz_sjhm"></el-input>
				</el-form-item>
				<el-form-item label="对账人电话" prop="dz_gh">
				  <el-input v-model.number="form.dz_gh"></el-input>
				</el-form-item>
				<el-form-item label="对账人传真" prop="dz_cz">
				  <el-input v-model.number="form.dz_cz"></el-input>
				</el-form-item>
				<el-form-item label="其他联系人" prop="qt_lxr">
				  <el-input v-model="form.qt_lxr"></el-input>
				</el-form-item>
				<el-form-item label="其他手机号码" prop=" qt_sjhm">
				  <el-input v-model.number="form. qt_sjhm"></el-input>
				</el-form-item>
				<el-form-item label="其他电话" prop="qt_gh">
				  <el-input v-model.number="form.qt_gh"></el-input>
				</el-form-item>
				<el-form-item label="其他传真" prop="qt_cz">
				  <el-input v-model.number="form.qt_cz"></el-input>
				</el-form-item>			
			<!--</el-form>
			<el-form ref="form" :model="form" :rules="rules" label-width="90px">-->		
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
			<div class='mytable'>
				<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata" @tablethis='tablethis'
				:editbut="editbut"  :addshow="addshow" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
				<el-table-column 
      				label="密码">
      				<template scope="scope">
      					<div class="mima"@dblclick="editcustomer(scope.row,1,1)">{{ scope.row.password }}</div>
  					</template>
			    </el-table-column>
			    <el-table-column 
      				label="简称">
      				<template scope="scope">
      					<div class="jian" @dblclick="editcustomer(scope.row,1,2)">{{ scope.row.jc }}</div>
  					</template>
			    </el-table-column>
				<el-table-column
			      label="公司名称"
			      width="250"
			      >
			      <template scope="scope">
			        <el-popover trigger="hover" placement="left">
 			          <p>法人代表: {{ scope.row.frdb }}</p>
 			          <p>地址: {{ scope.row.dz }}</p>
 			          <div slot="reference" class="name-wrapper">
 			            <el-tag @dblclick.native="editcustomer(scope.row,3)">{{ scope.row.gsmc }}</el-tag>
 			          </div>
			        </el-popover>
			      </template>
			    </el-table-column>
				<el-table-column
			      label="合同联系人">
			      <template scope="scope">
			        <el-popover trigger="hover" placement="left">
 			          <p>电话: {{ scope.row.ht_gh }}</p>
 			          <p>传真: {{ scope.row.ht_cz }}</p>
			          <p>手机: {{ scope.row.ht_sjhm }}</p>
 			          <div slot="reference" class="name-wrapper">
 			            <el-tag @dblclick.native="editcustomer(scope.row,2,1)">{{ scope.row.ht_lxr }}</el-tag>
 			          </div>
			        </el-popover>
			      </template>
			    </el-table-column>
			 	<el-table-column
			      label="对账联系人">
			      <template scope="scope">
			        <el-popover trigger="hover" placement="left">
 			          <p>电话: {{ scope.row.dz_gh }}</p>
 			          <p>传真: {{ scope.row.dz_cz }}</p>
			          <p>手机: {{ scope.row.dz_sjhm }}</p>
 			          <div slot="reference" class="name-wrapper">
 			            <el-tag @dblclick.native="editcustomer(scope.row,2,2)">{{ scope.row.dz_lxr }}</el-tag>
 			          </div>
			        </el-popover>
			      </template>
			   </el-table-column>
			    <el-table-column
			      label="其他联系人">
			      <template scope="scope">
			        <el-popover trigger="hover" placement="left">
 			          <p>电话: {{ scope.row.qt_gh }}</p>
 			          <p>传真: {{ scope.row.qt_cz }}</p>
			          <p>手机: {{ scope.row.qt_sjhm }}</p>
 			          <div slot="reference" class="name-wrapper">
 			            <el-tag @dblclick.native="editcustomer(scope.row,2,3)">{{ scope.row.qt_lxr }}</el-tag>
 			          </div>
			        </el-popover>
			      </template>
			    </el-table-column>
			    <el-table-column 
      				label="备注">
      				<template scope="scope">
      					<div class="beizhu" @dblclick="editcustomer(scope.row,1,3)">{{ scope.row.bz }}</div>
  					</template>
			    </el-table-column>
			</my-table-one>
			</div>
			
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
		}
	];
	var selectdata = [
    	{
    		"label":"客户编号",
    		"value":"cNub"
    	},
    	{
    		"label":"简称",
    		"value":"jc"
    	}
    ];
    export default{
        data: function () {
        	 var digital = function(rule, value, callback){
		        if (!value) {
		          return;
		        }
		        console.log(value);
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
            	dialog1:false,
            	dialog2:false,
            	form2:{
            		contactperson:'',
            		fax:'',
            		phone:'',
            		mobilephone:''
            	},
            	form3:{
            		companyname:'',
            		legalrepresentative:'',
            		address:''
            	},
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
                    "sh_lxr":"",
                    "sh_sjhm":"",
                    "sh_gh":"",
                    "sh_cz":"",
            		"dz_lxr":"",
            		"dz_sjhm":"",
            		"dz_gh":"",
            		"dz_cz":"",
            		"qt_lxr":"",
            		"qt_sjhm":"",
            		"qt_gh":"",
            		"qt_cz":"",
            	},
            	formnew:{
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
                    "sh_lxr":"",
                    "sh_sjhm":"",
                    "sh_gh":"",
                    "sh_cz":"",
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
            		password:[
            			{ required: true, message: '请输入密码', trigger: 'blur' },
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


            		sh_sjhm:[
            			 { validator: digital, trigger: 'blur' }
            		],
            		sh_gh:[
            			{ validator: digital, trigger: 'blur' }
            		],
            		sh_cz:[
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
            	tablethis1:"",    /*Table组件this*/
            	selectedval:null,
            	cid:"",
            	selectdata:selectdata,
            	action:myurl.customercreatephoto+"?id=",
            	fileList:[],
            	addshow:false,
            	editbut:{'edit':false,'remove':false},
            	imgloadtext:"点击上传",
            	form2val:0
            }
        },
        methods:{ //方法
        	editcustomer:function(data,obj,obj2){
        		console.log(data);
        		var _this = this;        		
        		this.formnew = data;
        		if(obj === 1){
	        		if(obj2 === 1){
	        			this.$prompt('修改密码', '编辑', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          inputValue: data.password
				        }).then(function(value){
				        _this.formnew.password = value;	
	        	    	_this.$http.post(myurl.customerupdate,_this.formnew,{emulateJSON: true})
	        	    	.then(
				        	function (response){
				        		console.log(response);
				        		if(response.body.id == 1){
				        			_this.$message({
							          showClose: true,
							          message: '修改成功！',
							          type: 'success'
							        });
							        _this.tablethis1.gettabledata(_this.tablethis1);
							        
				        		}else{
				        			_this.$message({
							          showClose: true,
							          message: '修改失败！',
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
				        }).catch(function(){
				          _this.$message({
				            type: 'info',
				            message: '取消输入'
				          });       
				        });
        		
	        		}else if(obj2 === 2){
	        			this.$prompt('修改公司简称', '编辑', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          inputValue: data.jc
				        }).then(function(value){
				        _this.formnew.jc = value;	
	        	    	_this.$http.post(myurl.customerupdate,_this.formnew,{emulateJSON: true})
	        	    	.then(
				        	function (response){
				        		console.log(response);
				        		if(response.body.id == 1){
				        			_this.$message({
							          showClose: true,
							          message: '修改成功！',
							          type: 'success'
							        });
							        _this.tablethis1.gettabledata(_this.tablethis1);
							        
				        		}else{
				        			_this.$message({
							          showClose: true,
							          message: '修改失败！',
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
				        }).catch(function(){
				          _this.$message({
				            type: 'info',
				            message: '取消输入'
				          });       
				        });
	        		}
	        		else if(obj2 === 3){
	        			this.$prompt('修改备注', '编辑', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          inputValue: data.bz
				        }).then(function(value){
				        _this.formnew.bz = value;	
	        	    	_this.$http.post(myurl.customerupdate,_this.formnew,{emulateJSON: true})
	        	    	.then(
				        	function (response){
				        		console.log(response);
				        		if(response.body.id == 1){
				        			_this.$message({
							          showClose: true,
							          message: '修改成功！',
							          type: 'success'
							        });
							        _this.tablethis1.gettabledata(_this.tablethis1);
							        
				        		}else{
				        			_this.$message({
							          showClose: true,
							          message: '修改失败！',
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
				        }).catch(function(){
				          _this.$message({
				            type: 'info',
				            message: '取消输入'
				          });       
				        });
	        		
	        		}
        		}
        		else if(obj === 3){
        			this.dialog2 = true;
    				this.form3.companyname = data.gsmc;
    				this.form3.legalrepresentative = data.frdb;
    				this.form3.address = data.dz;
        		}else if(obj === 2){
        			if (obj2 === 1){
        				this.form2val = obj2;
        				this.dialog1 = true;
        				this.form2.contactperson = data.ht_lxr;
        				this.form2.phone = data.ht_gh;
        				this.form2.fax = data.ht_cz;
        				this.form2.mobilephone = data.ht_sjhm;
        			}else if(obj2 === 2){
        				this.form2val = obj2;
        				this.dialog1 = true;
        				this.form2.contactperson = data.dz_lxr;
        				this.form2.phone = data.dz_gh;
        				this.form2.fax = data.dz_cz;
        				this.form2.mobilephone = data.dz_sjhm;      				
        			}else if(obj2 === 3){
        				this.form2val = obj2;
        				this.dialog1 = true;
        				this.form2.contactperson = data.qt_lxr;
        				this.form2.phone = data.qt_gh;
        				this.form2.fax = data.qt_cz;
        				this.form2.mobilephone = data.qt_sjhm;
        			}
        		}
        	},
        	dialog1con:function(){
        		if(this.form2val === 1){
        			this.formnew.ht_lxr = this.form2.contactperson;
        			this.formnew.ht_gh = this.form2.phone;
        			this.formnew.ht_cz = this.form2.fax;
        			this.formnew.ht_sjhm = this.form2.mobilephone;
        		}else if(this.form2val === 2){
        			this.formnew.dz_lxr = this.form2.contactperson;
        			this.formnew.dz_gh = this.form2.phone;
        			this.formnew.dz_cz = this.form2.fax;
        			this.formnew.dz_sjhm = this.form2.mobilephone;
        		}else if(this.form2val === 3){
        			this.formnew.qt_lxr = this.form2.contactperson;
        			this.formnew.qt_gh = this.form2.phone;
        			this.formnew.qt_cz = this.form2.fax;
        			this.formnew.qt_sjhm = this.form2.mobilephone;
        		}
        		var _this = this;
        	    this.$http.post(myurl.customerupdate,this.formnew,{emulateJSON: true})
			        .then(
			        	function (response){
			        		console.log(response);
			        		if(response.body.id == 1){
			        			_this.$message({
						          showClose: true,
						          message: '修改成功！',
						          type: 'success'
						        });
						        _this.dialog1 = false;
						        _this.tablethis1.gettabledata(_this.tablethis1);
						        
			        		}else{
			        			_this.$message({
						          showClose: true,
						          message: '修改失败！',
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
        	dialog2con:function(){
    			this.formnew.gsmc = this.form3.companyname;
    			this.formnew.frdb= this.form3.legalrepresentative;
    			this.formnew.dz = this.form3.address;
        		
        		var _this = this;
        	    this.$http.post(myurl.customerupdate,this.formnew,{emulateJSON: true})
			        .then(
			        	function (response){
			        		console.log(response);
			        		if(response.body.id == 1){
			        			_this.$message({
						          showClose: true,
						          message: '修改成功！',
						          type: 'success'
						        });
						        _this.dialog2 = false;
						        _this.tablethis1.gettabledata(_this.tablethis1);
						        
			        		}else{
			        			_this.$message({
						          showClose: true,
						          message: '修改失败！',
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
        	tablethis:function(tablethis){
        		this.tablethis1 = tablethis;
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

        	selected:function(val){
        		this.action += val.cid;
		    	this.selectedval = val;
		    },
	        add:function(tablethis){
		    	this.dialogFormVisible=true;
		    	this.tablethis1 = tablethis;
		    },
		    edit:function(tablethis){
		    	
		    },
		    remove:function(tablethis){
		    	this.tablethis1 = tablethis;
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
						        _this.tablethis1.gettabledata(_this.tablethis1);
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
		    		console.log(valid)
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
		    	console.log(this.form)
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
				        	_this.tablethis1.gettabledata(_this.tablethis1);
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
            clearl:function(){
                this.form.cNub = "";
                this.form.password = "";
                this.form.jc = "";
                this.form.gsmc = "";
                this.form.frdb = "";
                this.form.dz = "";
                this.form.bz = "";
                this.form.ht_lxr = "";
                this.form.ht_sjhm = "";
                this.form.ht_gh = "";
                this.form.ht_cz="";
                this.form.sh_lxr = "";
                this.form.sh_sjhm = "";
                this.form.sh_gh = "";
                this.form.sh_cz="";
                this.form.dz_lxr = "";
                this.form.dz_sjhm = "";
                this.form.dz_gh = "";
                this.form.dz_cz="";
                this.form.qt_lxr = "";
                this.form.qt_sjhm = "";
                this.form.qt_gh = "";
                this.form.qt_cz="";
                this.dialogFormVisible = false;
                this.$refs['form'].resetFields();
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
		display: flex;
		background-color: #F0F3F7;
		.el-tag{
			min-width:30px;
			width: auto;
		}
		.jian{
			min-width: 80px;
			min-height: 30px;
		}
		.beizhu{
			min-width: 80px;
			min-height: 30px;
		}
		.menu{
			width: 200px;
			height: 100%;
			min-width: 200px;
		}
		.content{
			height: 100%;
			flex-grow: 1;
			position: relative;
			.mytable{
				position: absolute;
				top: 0;
				left: 0px;
				right: 0;
				bottom: 0;
				overflow-x: hidden;
			}
			.el-input__inner {
			    height: 30px;
			    width: 110px;
			}
		
		}
	}
	
</style>