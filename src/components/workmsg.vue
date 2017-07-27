<!--产品信息-->
<template>
	<div class="workmsg" v-loading="tablelogin" element-loading-text="拼命加载中" >
		<el-dialog title="产品信息" :visible.sync="dialogFormVisible">
		    <el-form ref="form" :model="form" label-width="100px">
			  <el-form-item label="产品编号">
			    <el-input v-model="form.mnub"></el-input>
			  </el-form-item>
			  <el-form-item label="产品名称">
			    <el-input v-model="form.mName"></el-input>
			  </el-form-item>
			  <el-form-item label="型号">
			    <el-input v-model="form.version"></el-input>
			  </el-form-item>
			  <el-form-item label="单位">
			    <el-input v-model="form.unit"></el-input>
			  </el-form-item>
			  <el-form-item label="描述">
			    <el-input v-model="form.remark"></el-input>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clearl">取 消</el-button>
		    <el-button type="primary" @click="addproject">确 定</el-button>
		  </div>
		</el-dialog>
		<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				:editbut="{'edit':false,'remove':true}" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
				<el-table-column
			      label="产品名称"
			      width="100">
			      <template scope="scope">
			        <el-popover trigger="hover" placement="left">
			          <p>产品编号: {{ scope.row.mnub }}</p>
			          <p>产品名称: {{ scope.row.mName }}</p>
			          <div slot="reference" class="name-wrapper">
			            <el-tag>{{ scope.row.mName }}</el-tag>
			          </div>
			        </el-popover>
			      </template>
			   </el-table-column>
				<el-table-column label="其他">
			    	<template scope="scope">
			    		<el-button
				      		type="text"
				      		@click.native.prevent="seleteother(scope.row)"
				      	    size="small">				     
				      	 	 查看boom单
				     </el-button>				     				      	
				    </template>
			   </el-table-column>
		</my-table-one>
	</div>
</template>

<script>
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/MyTableOne.vue';
	var tablecolumn = [
		{
			label:"产品编号",
			property:"mnub"
		},
		{
			label:"产品名称",
			property:"mName"
		},
		{
			label:"型号",
			property:"version"
		},
		{
			label:"单位",
			property:"unit"
		}
	];
	var selectdata = [
    	{
			"label":"产品编号",
			"value":"mnub"
		},
		{
			"label":"产品名称",
			"value":"mName"
		},
		{
			"label":"型号",
			"value":"version"
		}
    ];
	
	export default{
		data:function(){
			return {
				tabledataurl:myurl.productgetall,
				tabledata:[],
				tablecolumn:tablecolumn,
				dialogFormVisible:false,   
				form:{
            		"mnub":"",
            		"mName":"",
            		"version":"",
            		"remark":"",
            		"unit":"",
            		"type":"2"
            	},
            	tablelogin:false,
            	tablethis:"",  
            	deliveryTime:"",
            	selectedval:null,
            	selectdata:selectdata
			}
		},
		methods:{
			seleteother:function(val){
        		console.log(val);
        		var _this = this; 
				this.$router.push({ path: '/boom',query: { mid:val.mid,mName:val.mName }})		
        	},
			clearl:function(){
        		this.form.mnub = "";
        		this.form.mName = "";
        		this.form.version = "";
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
		    	this.$alert('确认删除？', '产品删除', {
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
		          	_this.$http.post(myurl.productdelete,{"mid":_this.selectedval.mid},{emulateJSON: true})
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
		    addproject:function(){
				var _this = this;
	        	_this.tablelogin = true;
	        	this.$http.post(myurl.productcreate,this.form,{emulateJSON: true})
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
					        	_this.$http.post(myurl.productgetall,{emulateJSON: true})
						        .then(
						        	function (response){
						        		_this.tabledata = response.body;
						        		_this.tablelogin = false;	
						        	});
						        });
		        		}else if(response.body.id == 0){
		        			_this.$message({
					          showClose: true,
					          message: '产品编号重复！',
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

        }
    }
</script>

<style lang="less">
	
</style>