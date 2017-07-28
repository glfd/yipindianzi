<!--自定义Table-->
<template>
	<div class="mytableone">
		<div class="mytable-title" v-if="showtitle">
			<div class="title-left">
				<el-button @click="add" type="primary" v-if="addshow" icon="plus">添加</el-button>
				<el-button @click="edit" class="mytable-edit" v-if="editshow && editbut.edit" type="primary" icon="edit">编辑</el-button>
				<el-button @click="remove" class="mytable-edit" v-if="editshow && editbut.remove" type="primary" icon="delete">删除</el-button>
				<el-upload
				  v-if="uploadadd"
				  class="upload-demo"
				  :show-file-list="false"
				  :on-success="uploadsuccess"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :file-list="fileList">
				  <el-button type="primary">批量添加<i class="el-icon-upload el-icon--right"></i></el-button>
				</el-upload>
			</div>
			<div class="title-right">
				<el-input placeholder="请输入内容" v-model="screenvalue">
				    <el-select v-model="select" slot="prepend" placeholder="请选择">
				      <el-option v-for="item in selectdata" :label="item.label" :value="item.value"></el-option>
				    </el-select>
				    <el-button slot="append" icon="search" @click="searchclick"></el-button>
				</el-input>
			</div>
		</div>
		<div class="mytable-content" v-loading="tablelogin" element-loading-text="拼命加载中">
			<el-table ref="singleTable" :data="tabledata" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
			    <el-table-column type="index">
			    </el-table-column>
			    <el-table-column 
			    	v-for="item in tablecolumn"
			    	:property="item.property"
      				:label="item.label">
			    </el-table-column>
		        <slot></slot>
			</el-table>
		</div>
		<div class="mytable-page">
			<el-pagination
				:page-size="pagesize"
				@current-change = "currentchange"
				:current-page="currentpage"
			    layout="prev, pager, next"
			    :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			'tabledataurl':{//获取数据的URL
				default:""
			},
			'tablecolumn':{//表格列的数据
				default:[]
			},
			'selectdata':{//搜索下拉菜单的数据
				default:[]
			},
			'othercolumn':{//是否显示操作列
				default:false
			},
			'editbut':{
				default:{
					'edit':true,
					'remove':true
				}
			},
			'uploadadd':{
				default:false
			},
			'showtitle':{
				default:true
			},
			'addshow':{
				default:true
			}
		},
		data:function(){
			return {
				screenvalue:"",
				select:this.selectdata[0].value,
				tabledataall:[],
				searchtableall:[],
				pagesize:8,
				total:0,
				tablelogin:false,
				tabledata:[],
				selectedval:null,
				currentpage:1,
				fileList:[],
				editshow:false
			}
		},
		methods:{
			uploadsuccess:function(){//上传成功事件
				console.log("uploadsuccess");
			},
			handleCurrentChange:function(val){//列表选中事件
				this.selectedval = val;
				if(this.selectedval != null){
					this.editshow = true; //选中一个列表才显示编辑删除按钮
					this.$emit('selected',val);
		    		console.log(this.selectedval);
				}else{
					this.editshow = false;
				}
			},
			searchclick:function(){//点击搜索按钮事件
				this.searchtableall = this.tabledataall;//保留原数据
				if(this.screenvalue == ""){
					var pattern = "/*";//当搜索内容为空是匹配所有内容
				}else{
					var pattern = "/*"+this.screenvalue+"/*"; //匹配搜索框内的内容
				}
		    	var reg = eval(new RegExp(pattern));//字符串转正则表达式
		    	var tableall = [];//存放筛选后的临时数据
		    	for(var i=0;i<this.searchtableall.length;i++){
		    		var lstablecolumn = this.searchtableall[i];
		    		var result = reg.exec(lstablecolumn[this.select]);
		    		if(result != null){
		    			tableall.push(lstablecolumn);
		    		}
		    	}
		    	this.searchtableall = tableall;//把匹配后的数据放入搜索数据
		    	//重新渲染表格数据
		    	this.total = this.searchtableall.length;
				this.tabledata = this.searchtableall.slice((this.currentpage-1)*this.pagesize,(this.currentpage-1)*this.pagesize+this.pagesize);
			},
			currentchange:function(currentPage){//点击翻页事件
				this.currentpage = currentPage;
				this.tabledata = this.tabledataall.slice((currentPage-1)*this.pagesize,(currentPage-1)*this.pagesize+this.pagesize);
			},
			add:function(){//添加按钮事件，由父组件实现
				this.$emit('add',this);
			},
			edit:function(){//编辑按钮事件，由父组件实现
				if(this.selectedval == null){//先判断是否有选中的数据
		    		this.$message({
			          showClose: true,
			          message: '请选中一项！',
			          type: 'error'
			        });
		    		return;
		    	}
				this.$emit('edit',this);
			},
			remove:function(){//删除按钮事件，由父组件实现
				if(this.selectedval == null){//先判断是否有选中的数据
		    		this.$message({
			          showClose: true,
			          message: '请选中一项！',
			          type: 'error'
			        });
		    		return;
		    	}
				this.$emit('remove',this);
			},
			gettabledata:function(_this){//获取所有数据
	        	_this.tablelogin = true;
	        	this.$http.post(this.tabledataurl,{emulateJSON: true})
		        .then(
		        	function (response){
		        		console.log(response.body);
		        		this.tabledataall = response.body;
		        		_this.tablelogin = false;
		        		
		        		//分页显示
		        		_this.total = _this.tabledataall.length;
						_this.tabledata = _this.tabledataall.slice((_this.currentpage-1)*_this.pagesize,(_this.currentpage-1)*_this.pagesize+_this.pagesize);
		        	},
		        	function (error){
		        		_this.$message({
				          showClose: true,
				          message: '数据请求失败！',
				          type: 'error'
				        });
				        _this.tablelogin = false;
		        	});
		        this.$emit('gettabledata',this) 
			}
		},
		mounted:function(){
			var _this = this;
			//获取整页的高度
			var mytableone = document.getElementsByClassName('mytableone')[0].offsetHeight;
			this.pagesize = parseInt((mytableone-112)/40);//计算出一页可以放的条数
			this.gettabledata(this);
		}
	}
</script>

<style lang="less">
	.mytableone{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		.mytable-title{
			width: 100%;
			height: 40px;
			display: flex;
			justify-content:space-between;
			.title-left{
				padding: 6px;
				display:flex;
				/*Elementui样式修改*/
				.el-button{
					padding:6px 20px;
				}
				.mytable-edit{
					animation:mymove .6s;
				}
				@keyframes mymove
				{	
				    from {opacity: 0;}
				    to {opacity: 1;}
				}
				.el-button--primary{
					background-color: #F0F3F7;
					color: #333;
					border-color: #bfcbd9;
				}
				.upload-demo{
					margin-left: 10px;
				}
			}	
			.title-right{
				padding: 5px;
				/*Elementui搜索框样式修改*/
				.el-input__inner{
					height: 30px;
				}
				.el-input-group__prepend{
					background-color:#F0F3F7;
				}
				.el-input-group__append{
					background-color:#F0F3F7;
				}
				.el-select .el-input {
				    width: 100px;
				}
			}
		}
		.mytable-content{
			/*table内容强制不换行*/
			.el-table__row td div{
				white-space:nowrap !important;
			}
			/*扩展按钮样式*/
			.el-tag{
			    background-color: rgba(0,0,0,0);
			    color:#333;
			    border:1px solid #F0F3F7;
			    &:hover{
			    	cursor: pointer;
			    }
			}
		}
		.mytable-page{
			width: 100%;
			height: auto;
			/*分页列表样式*/
			.el-pagination{
				text-align: center;
			}
			.el-pager li.active{
				border-color: red;
			}
		}	
	}
</style>