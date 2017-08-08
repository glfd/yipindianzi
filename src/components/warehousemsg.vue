<!--物料库存-->
<template>
	<div class="warehousemsg" v-loading="tablelogin" element-loading-text="拼命加载中" >
		<el-dialog
		  title="新建出入库信息"
		  :visible.sync="addstock">
		  <div class="addstockcontent">
		  	<el-form ref="form" :model="form" :rules="rules" label-width="100px">
			  	<el-form-item label="物料编号" prop="id">
				    <el-select v-model="form.id" filterable placeholder="请选择">
					    <el-option
					      v-for="item in select"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					      <span style="float: left">{{ item.label }}</span>
					      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.number }}</span>
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="数量" prop="number">
				    <el-input style="width: 80%;" v-model.number="form.number"></el-input>
				    <p style="display: inline;">{{ number }}</p>
				</el-form-item>
				
				<el-form-item label="操作人" prop="name">
				    <el-input style="width: 80%;" v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="出入库">
					<el-radio class="radio" v-model="form.flag" label="1">入库</el-radio>
	  				<el-radio class="radio" v-model="form.flag" label="2">出库</el-radio>
				</el-form-item>
				<el-form-item v-if="form.flag == '1'" label="订单绑定">
					<el-checkbox v-model="checked">{{ checked ? '否' : '是' }}</el-checkbox>
					<el-select v-if="checked" v-model="value8" filterable placeholder="请选择">
					    <el-option
					      v-for="item in please"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
			</el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addstock = false">取 消</el-button>
		    <el-button type="primary" @click="addstockcon">确 定</el-button>
		  </span>
		</el-dialog>
		
		<div class="content">
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata" :checkshow="checkshow"
				:editbut="{'edit':false,'remove':false}" :othercolumn="true" @selected="selected" @add="add" @edit="edit"  @check="check">
			    <el-table-column 
				    property="unit"
	      			label="单位">
				</el-table-column>
				<el-table-column label="其他">
			    	<template scope="scope">
				      	<el-button
				      		type="text"
				      		@click.native.prevent="seleteother(scope.row)"
				      	    size="small">
				      	 	 查看详细信息
				      	</el-button>
				      	
				    </template>
			    </el-table-column>
			</my-table-one>
				
		</div>
	</div>
</template>

<script>
	import myurl from '../json/myurl.json';
	import { cookie } from '../other/cookie.js';
	import MyTableOne from '../components/MyTableOne.vue';
	
	var tablecolumn = [
		{
			"label":"编号",
			"property":"mnub"
		},
		{
			"label":"名称",
			"property":"mName"
		},
		{
			"label":"型号",
			"property":"version"
		},
		{
			"label":"库存",
			"property":"stock"
		}
	];
	
	var selectdata = [
    	{
    		"label":"编号",
    		"value":"mnub"
    		
    	},
    	{
    		"label":"名称",
    		"value":"mName"
    	}
    	
    ];
	export default{
		data:function(){
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
				tabledataurl:myurl.warehousegetall,
            	tablecolumn:tablecolumn,
            	dialogFormVisible:false,
				checkshow:false,
            	tablelogin:false,
            	options:[],
            	addstock:false,
            	form:{
            		"id":"",
            		"number":"",
            		"name":"",
            		"supplier":"",
            		"unit":"",
            		"flag":"1",/*进出标识*/
            		"tag":"",
            		"oid":"0"
            	},
            	rules:{
            		id:[
            			{ validator: select, trigger: 'blur' }
            		],
            		name:[
            			{ required: true, message: '请输入操作人', trigger: 'blur' }
            		],
            		number:[
            			{ validator: digital, trigger: 'blur'}
            		]
            	},
            	select:[],
            	please:[],
            	number:"",
            	tablelogin:false,
            	tablethis:"",    /*Table组件this*/
            	selectedval:null,
            	selectdata:selectdata,
            	selectedOptions:[],
            	checked:false,
            	value6:"",
            	value8:""
			}
		},
		methods: { //方法
		    seleteother:function(val){
        		console.log(val);
        		var _this = this;
        		this.$router.push({ path: '/msg',query: { mid:val.mid}})	
        	},
        	clearl:function(){
        		this.form.id = "";
        		this.form.number = "";
        		this.form.name = "";
        		this.form.supplier = "";
        		this.form.unit = "";
        		this.form.tag = "";
        		this.dialogFormVisible = false;
        		this.addstock = false;
        	},
		    selected:function(val){
		    	this.selectedval = val;
		    	if(val !=null){
		    		this.checkshow = true;
		    	}else{
		    		this.checkshow = false;
		    	}
		    	
		    },
		    
		    add:function(tablethis){
		    	this.addstock=true;
		    	this.tablethis = tablethis;
		    },
		    check:function(tablethis){
		    	var _this = this; 
		    	console.log(this.selectedval);
				this.$router.push({ path: '/warehousecurve',query: { mid:this.selectedval.mid,name:this.selectedval.mName}})	
		    },
		    edit:function(tablethis){
		    	
		    },
	      
		    addstockcon:function(){
		    	var _this = this;
		    	console.log(this.form)
		    	if(this.checked){
		    		this.form.oid = this.value8;
		    	}else{
		    		this.form.oid = "0";
		    	}
	      		this.$http.post(myurl.warehousecreate,this.form,{emulateJSON: true})
	      		
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
					          message: '库存不足！',
					          type: 'error'
					        });
		        		}else{
		        			_this.$message({
					          showClose: true,
					          message: '操作失败！',
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
			'my-table-one':MyTableOne
        },
		mounted: function() {       //DOM加载完成事件
        	var _this = this;
        
	        	this.$http.post(myurl.warehousegetall,{emulateJSON: true})
		        .then(
		        	function (response){  
		        		
		        		_this.select = [];
		        		for (var i=0;i<response.body.length;i++) {
	        				var linshi = {};
		        			linshi.value = response.body[i].mid;
		        			linshi.label = response.body[i].mName;
		        			linshi.number = response.body[i].mnub;
		        			_this.select.push(linshi);
		        			
		        		}
		        	},
		        	function (error){
		        		_this.$message({
				          showClose: true,
				          message: '请求失败！',
				          type: 'error'
				        });
				       
		        	});
		        	
		        this.$http.post(myurl.ordergetall,{emulateJSON: true})
		        .then(
		        	function (response){  
		        		console.log(response)
		        		_this.please = [];
		        		for (var i=0;i<response.body.length;i++) {
	        				var linshi = {};
		        			linshi.value = response.body[i].oid;
		        			linshi.label = response.body[i].ownNub;
		        			
		        			_this.please.push(linshi);
		        			
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
       
	}
</script>

<style lang="less">
	.warehousemsg{
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