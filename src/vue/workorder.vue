<!--工单-->
<template>
	<div class="work" v-loading="tablelogin" element-loading-text="拼命加载中">
		<el-dialog title="工单信息" :visible.sync="dialogFormVisible">
		    <el-form ref="form" :model="form" label-width="100px">
			  <el-form-item label="工单编号">
			    <el-input v-model="form.wNub"></el-input>
			  </el-form-item>
			  <el-form-item label="数量">
			    <el-input v-model="form.number"></el-input>
			  </el-form-item>
			  <el-form-item label="订单编号">
			  	<el-select v-model="form.oid" filterable placeholder="请选择">
				    <el-option
				      v-for="item in orderoptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="createworkordercon">确 定</el-button>
		  </div>
		</el-dialog>
		<div class="menu">
			<my-menu message="gd"></my-menu>
		</div>
		<div class="content" v-loading="tablelogin" element-loading-text="拼命加载中" >
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				:editbut="{'edit':false,'remove':false}" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove">
				<el-table-column 
			    	property="order.materiel.mName"
      				label="产品名称">
			    </el-table-column>
				<el-table-column label="其他">
			    	<template scope="scope">
				      	<a :href="lingliaodan" target="_blank">生成领料单</a>
				    </template>
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
    		property:"wNub",
    		label:"工单编号"
    	},
    	{
    		property:"time",
    		label:"创建时间"
    	},
    	{
    		property:"number",
    		label:"数量"
    	},
    	{
    		property:"order.ownNub",
    		label:"订单编号"
    	}
    	/*,
    	{
    		property:"remark",
    		label:"备注"
    	}*/
    ];
    var selectdata = [
    	{
    		"label":"工单编号",
    		"value":"wNub"
    	},
    	{
    		"label":"订单编号",
    		"value":"oid"
    	}
    	
    ];
	
    export default{
        data: function () {
            return {
            	tabledataurl:myurl.workgetall,
            	tablecolumn:tablecolumn,
            	tabledata:[],
            	dialogFormVisible:false,         	
            	form:{
            		"wNub":"",
            		"number":"",
            		"oid":""
            	},
            	tablelogin:false,
            	tablethis:"",    /*Table组件this*/
            	selectedval:null,
            	selectdata:selectdata,
            	orderoptions:[],
            	lingliaodan:"./picking.html?wid="
            }
        },
        methods: { //方法
        	seleteother:function(val){
        		console.log(val);
        	},
        	clearl:function(){
        		this.form.wNub = "";
        		this.form.number = "";
        		this.form.oid = "";
        		this.dialogFormVisible = false;
        	},
        	selected:function(val){
        		this.lingliaodan += val.wid;
		    	this.selectedval = val;
		    	console.log(this.selectedval);
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
		    	this.$alert('确认删除？', '工单删除', {
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
		          	_this.$http.post(myurl.workdelete,{"wid":_this.selectedval.wid},{emulateJSON: true})
			        .then(
			        	function (response){
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
		    createworkordercon:function(){
		    	var _this = this;
	      		this.$http.post(myurl.workcreate,this.form,{emulateJSON: true})
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
					          message: '工单编号重复！',
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
        mounted: function () {       //DOM加载完成事件
        	var _this = this;
        	_this.tablelogin = true;
	        	this.$http.post(myurl.ordergetall,{emulateJSON: true})
		        .then(
		        	function (response){  
		        		console.log(response);
		        		_this.orderoptions = [];
		        		for (var i=0;i<response.body.length;i++) {
	        				var linshi = {};
		        			linshi.value = response.body[i].oid;
		        			linshi.label = response.body[i].ownNub;
		        			_this.orderoptions.push(linshi);
		        		}
		        		_this.tablelogin = false;
		        	},
		        	function (error){
		        		_this.$message({
				          showClose: true,
				          message: '请求失败！',
				          type: 'error'
				        });
				        _this.tablelogin = false;
		        	});
		    },
        	
        
    }
</script>

<style lang="less">
	.work{
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