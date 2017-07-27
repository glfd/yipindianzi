<template>
	<div class="materialcontent">
		<div class="materialcontent-main">
			<div class="material-title">
				<button @click="addmaterial" class="addmaterial">添加物料</button>
			</div>
			<div class="material-table">
				<el-table :data="material" style="width: 100%" >
				    <el-table-column type="expand">
				      <template scope="props">
				        <el-form label-position="left" inline class="demo-table-expand">
				        	<el-row :gutter="20">
							  <el-col :span="8">
							  	<el-form-item label="料号">
						            <span>{{ props.row.id }}</span>
						        </el-form-item>
							  </el-col>
							  <el-col :span="8">
							  	  <el-form-item label="名称">
						            <span>{{ props.row.name }}</span>
						          </el-form-item>
							  </el-col>
							  <el-col :span="8">
							  	  <el-form-item label="备注">
						            <span>{{ props.row.remarks }}</span>
						          </el-form-item>
							  </el-col>
							  <el-col :span="8">
							  	  <el-form-item label="产品名称">
						            <span>{{ props.row.cpname }}</span>
						          </el-form-item>
							  </el-col>
							  <el-col :span="8">
							  	  <el-form-item label="规格型号">
						            <span>{{ props.row.model }}</span>
						          </el-form-item>
							  </el-col>
							  <el-col :span="8">
							  	  <el-form-item label="供应商">
						            <span>{{ props.row.supplier }}</span>
						          </el-form-item>
							  </el-col>
							</el-row>
				        </el-form>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="商品 ID"
				      prop="id">
				    </el-table-column>
				    <el-table-column
				      label="商品名称"
				      prop="name">
				    </el-table-column>
				    <el-table-column
				      label="描述"
				      prop="remarks">
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      width="120">
				      <template scope="scope">
				        <el-button
				          @click.native.prevent="deleteRow(scope.$index, material)"
				          size="small">
				         	 移除
				        </el-button>
				      </template>
				    </el-table-column>
				</el-table>
			</div>
			<div class="material-bottom">
				<el-pagination
			      @size-change="sizechange"
			      @current-change="currentpage"
			      :current-page.sync="currentPage3"
			      :page-size="100"
			      layout="prev, pager, next, jumper"
			      :total="1000">
			    </el-pagination>
			</div>
		</div>
		
	</div>
</template>

<script>
	var material = [
		{
			"id":"00001",
			"name":"00001",
			"remarks":"00001",
			"cpname":"55sd4asd",
			"model":"sdasdasd",
			"supplier":"sdasdasd"
		},
		{
			"id":"00001",
			"name":"00001",
			"remarks":"00001",
			"cpname":"55sd4asd",
			"model":"sdasdasd",
			"supplier":"sdasdasd"
		},
		{
			"id":"00001",
			"name":"00001",
			"remarks":"00001",
			"cpname":"55sd4asd",
			"model":"sdasdasd",
			"supplier":"sdasdasd"
		}
	];
	export default{
		props: ['message'],
        data: function () {
            return {
            	material:material,
            	currentPage3: 5
            }
        },
        methods: { //方法
        	deleteRow:function(index, rows){
        		rows.splice(index, 1);
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
			width: 80%;
			margin-left: 10%;
			height: auto;
			margin-top:10px;
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