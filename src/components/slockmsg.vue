<!--出入库详细信息-->
<template>
	<div class="slockmsg"  v-loading="tablelogin" element-loading-text="拼命加载中" >
		<div class="slockmsgtitle" >
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">仓管</el-breadcrumb-item>
			  <el-breadcrumb-item>{{ $route.query.id }}详细信息</el-breadcrumb-item>
			</el-breadcrumb>
	</div>
		<el-dialog title="修改信息" :visible.sync="dialogFormVisible" :show-close="false">
			<el-form ref="form" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="数量" prop="number">
					<el-input style="width: 80%;" v-model.number="form.number"></el-input>
				</el-form-item>
			</el-form>
			  	<div slot="footer" class="dialog-footer">
				    <el-button @click="clearl">取 消</el-button>
				    <el-button type="primary" @click="editshow('form')">确 定</el-button>
			  	</div>
		</el-dialog>
		<div class="slockmsgcontent">
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				:addshow="false" :editbut="editbut" :othercolumn="true" @selected="selected" @edit="edit">
			    <el-table-column
			      property="flag"
			      label="标签"
			      width="100">
			      <template scope="scope">
			        <el-tag
			          :type="scope.row.flag == '1' ? 'primary' : 'success'"
			          close-transition>{{flagmethod(scope.row.flag)}}</el-tag>
			      </template>
			    </el-table-column>
			</my-table-one>
		</div>
	</div>
</template>

<script>
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/MyTableOne.vue';
	var tablecolumn = [
		{
			"label":"操作时间",
			"property":"time"
		},
		{
			"label":"数量",
			"property":"number"
		},
		{
			"label":"详情",
			"property":"name"
		}
		
	];
	
	var selectdata = [
    	{
    		"label":"标签",
    		"value":"flag"
    	},
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
				tabledataurl:myurl.warehouseselectbyid+"?id="+this.$route.query.mid,
				tablecolumn:tablecolumn,
				dialogFormVisible:false,
				tablelogin:false,
				form:{
            		"id":"",
            		"time":"",
            		"number":"",
            		"name":"",
            		"user":"",
            		"flag":""/*进出标识*/
            		
            	},
            	rules:{
            		number:[
            			{ validator: digital, trigger: 'blur'}
            		]
            	},
            	tablelogin:false,
            	tablethis:"",    /*Table组件this*/
            	selectedval:null,
            	selectdata:selectdata,
            	selectedOptions:[],
            	editbut:{'edit':true,'remove':false}
			}
			
		},
		methods:{
			clearl:function(){
        		this.form.number = "";
        		this.dialogFormVisible = false;
        		this.$refs['form'].resetFields();	
        	},
			filterTag:function(value, row) {
		        return row.flag == value;
		    },
		    flagmethod:function(flag){
		    	if(flag==1){
		    		return "入库";
		    	}
		    	else if(flag==2){
		    		return "领料";
		    	}
		    	else if(flag==3){
		    		return "退还";
		    	}
		    	else if(flag==4){
		    		return "发货";
		    	}
		    	else if(flag==5){
		    		return "退货";
		    	}
		    	else if(flag==6){
		    		return "借出";
		    	}
		    	else{
		    		return "归还";
		    	}
		    },
		    selected:function(val){
		    	this.selectedval=val;
		    	
		    },
		    edit:function(tablethis){
		    	this.dialogFormVisible=true;
		    	this.tablethis = tablethis;
		    },
		    editshow:function(formName){
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
		        if(this.selectedval.number == this.form.number){
		        	this.$message({
					          showClose: true,
					          message: '数量与之前重复',
					          type: 'error'
					        });
					    return; 
		        }
		    	var _this = this;
	      		this.$http.post(myurl.warehouseupdate,{"mid":this.$route.query.mid,"id":this.selectedval.mdid,"number":this.form.number},{emulateJSON: true},)
	      		
		        .then(
		        	function (response){
		        		console.log(response)
		        		if(response.body.id == 1){
		        			_this.$message({
					          showClose: true,
					          message: '修改成功！',
					          type: 'success'
					        });
					        _this.clearl();//添加成功就清空数据并关闭dialog
				        	_this.tablethis.gettabledata(_this.tablethis);
		        		}else if(response.body.id == 0){
		        			_this.$message({
					          showClose: true,
					          message: '错误',
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
			'my-table-one':MyTableOne
        },
		mounted:function(){
			this.$route.query.id
			this.$route.query.flag
			var _this = this;
        	
		}
	}
</script>

<style lang="less">
	.slockmsg{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #F0F3F7;
		position: relative;
		.slockmsgtitle{
			height: 30px;
			border-bottom: 1px solid red;
			line-height: 30px;
			font-size: 14px;
			font-weight: 600;
			.el-breadcrumb{
				line-height: 30px;
			}
		}
		.slockmsgcontent{
			 position: absolute;
			 top: 30px;
			 left: 0;
			 right: 0;
			 bottom: 0;
		}
	}
</style>