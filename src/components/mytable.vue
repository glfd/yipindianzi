<template>
	<div class="materialcontent">
		<div class="materialcontent-main">
			<div class="material-title" v-if="mytitlebut">
				<slot name="tabletitle">
					<button @click="addmaterial" class="addmaterial" >{{ mytableadd }}</button>
				</slot>
			</div>
			<div class="material-table">
				<el-table :data="data" style="width: 100%"  >
				    <el-table-column type="expand">
				      <template scope="props">
				      	<slot :text="props.row"></slot>
				      </template>
				    </el-table-column>
				    <el-table-column v-for="item in tablecolumn"
				      :label="item.label"
				      :prop="item.prop">
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      :width="butwidth">
				      <template scope="scope" class="mytablebut">
				      	<el-button v-if="otherbut"
				      	  @click.native.prevent="otherRow(scope.$index, data)"
				      	  size="small">
				      	 	 {{ otherbuttext }}
				      	</el-button>
				      	<el-button v-if="myupdata"
				      	  @click.native.prevent="updataRow(scope.$index, data)"
				      	  size="small">
				      	 	 编辑
				      	</el-button>
				        <el-button v-if="mydelete"
				          @click.native.prevent="deleteRow(scope.$index, data)"
				          size="small">
				         	 删除
				        </el-button>
				      </template>
				    </el-table-column>
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
	</div>
</template>

<script>
	export default{
		props:{
			'data':{
				default:[]
			},
			'tablecolumn':{
				default:[]
			},
			'mytableadd':{
				default:''
			},
			'mytitlebut':{
				default:true
			},
			'mydelete':{
				default:true
			},
			'myupdata':{
				default:true
			},
			'otherbut':{
				default:false
			},
			'otherbuttext':{
				default:''
			},
			'butwidth':{
				default:"180"
			}
		},
        data: function () {
            return {
            	currentPage3: 1,
            }
        },
        methods: { //方法
        	deleteRow:function(index, rows){
        		this.$emit('deleteRow',index);
        	},
        	updataRow:function(index, rows){
        		this.$emit('updataRow',index);
        	},
        	otherRow:function(index,rows){
        		this.$emit('otherRow',index);
        	},
        	sizechange:function(val){
        		
        	},
        	currentpage:function(val){
        		
        	},
        	addmaterial:function(){
        		/*console.log("添加物料");*/
        		this.$emit('upup','hehe');
        	}
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
        	/*if(this.otherbut){
        		console.log(this.butwidth);
        		this.butwidth = "220";
        		console.log(this.butwidth);
        	}*/
        }
    }
</script>

<style lang="less">
	.materialcontent{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		display: flex;
		/*align-items:center;*/
		.materialcontent-main{
			width: 100%;
			height: auto;
			margin-top:10px;
			.mytablebut{
				display: flex;
			}
			
			.el-table{
				border: 0px;
				background-color: rgba(0,0,0,0);
			}
			.el-table__expanded-cell{
				box-shadow: 5px 5px 5px #ddd;
			}
			.el-table::after, .el-table::before{
			    background-color: rgba(0,0,0,0);
				z-index: 1;
			}
			.el-pager li.active{
				border: 0px;
			}
			.el-pager li,.btn-prev,.btn-next,.el-pagination__editor{
				background-color: rgba(0,0,0,0);
			}
			.el-table tr{
				background-color: rgba(0,0,0,0);
			}
			.el-table--fit{
				border-radius: 6px;
			}
			.el-pagination{
				text-align: center;
			}
			.el-table td, .el-table th.is-leaf{
				border-bottom: 1px solid red;
			}
			.el-button--small{
				padding: 3px 9px;
			}
			.el-button{
				background-color: rgba(0,0,0,0);
				border: 1px solid red;
			}
			.material-title{
				height: 50px;
				width: auto;
				.addmaterial{
					height: 24px;
					width: 100px;
					background-color: #F0F3F7;
					border-radius: 6px;
					border: 1px solid red;
					&:hover{
						cursor: pointer;
					}
				}
			}
			.material-bottom{
				margin-top: 10px;
			}
		}
	}
</style>