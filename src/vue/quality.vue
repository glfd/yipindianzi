<template>
	<div class="quality">
		<el-dialog title="新建品质记录" :visible.sync="firstup">
		    <el-form ref="form" :model="form" label-width="80px">
			  <el-form-item label="岗位">
			    <el-input v-model="form.post"></el-input>
			  </el-form-item>
			  <el-form-item label="不良率">
			    <el-input v-model="form.Brate"></el-input>
			  </el-form-item>
			  <el-form-item label="上传文件">
			    <el-upload
				  class="upload-demo"
				  action="https://jsonplaceholder.typicode.com/posts/">
				  <el-button type="primary">点击上传</el-button>
				</el-upload>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="新建退货记录" :visible.sync="secondup">
		    <el-form ref="form" :model="form2" label-width="80px">
			  <el-form-item label="退货原因">
			    <el-input v-model="form2.reason"></el-input>
			  </el-form-item>
			  <el-form-item label="上传文件">
			    <el-upload
				  class="upload-demo"
				  action="https://jsonplaceholder.typicode.com/posts/">
				  <el-button size="small" type="primary">点击上传</el-button>
				</el-upload>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
		<div class="menu">
			<my-menu message="pz"></my-menu>
		</div>
		<div class="content">
			<my-tabs firstlabel="品质记录" secondlabel="退货问题">
				<div slot="firstmain">
					<el-button @click='firstupc'>上传</el-button>
					<el-table
					    :data="firstdata"
					    style="width: 100%"> 
					    <el-table-column
					      prop="post"
					      label="岗位"
					      width="100">
					    </el-table-column>
					    <el-table-column
					      prop="Brate"
					      label="不良率"
					      width="100">
					    </el-table-column>
					    <el-table-column
					      label="名称">
					       <template scope="scope">
					        <el-icon name="document"></el-icon>
					        <span style="margin-left: 10px">{{ scope.row.name }}</span>
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="time"
					      label="上传时间"
					      width="230">
					    </el-table-column>
					</el-table>
					<div class="firstmain-bottom">
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
				<div  slot="secondmain">
					<el-button @click='secondupc'>上传</el-button>
					<el-table
					    :data="firstdata"
					    style="width: 100%">
					    <el-table-column
					      prop="reason"
					      label="退货原因"
					      width="250">
					    </el-table-column>
					    <el-table-column
					      label="名称">
					       <template scope="scope">
					        <el-icon name="document"></el-icon>
					        <span style="margin-left: 10px">{{ scope.row.name }}</span>
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="time"
					      label="上传时间"
					      width="230">
					    </el-table-column>
					</el-table>
					<div class="firstmain-bottom">
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
			</my-tabs>
		</div>
	</div>
</template>

<script>
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	import MyTabs from '../components/mytabs.vue';
	
	export default{
        data: function () {
            return {
            	msg:"quality",
            	mytabs:"first",
            	currentPage3:1,
            	firstdata:[{
            	  reason:'规格不达标',
            	  post:'螺母',
		          time: '2016-05-02',
		          Brate: '5%',
		          name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'
		        }, {
		          reason:'产品次品过多',
		          post:'外壳',
		          time: '2016-05-02',
		          Brate: '2%',
		          name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'
		        }, {
		          reason:'产品次品过多',
		          post:'喷漆',
		          time: '2016-05-02',
		          Brate: '4%',
		          name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'
		        }, {
		          reason:'规格不达标',
		          post:'磨光',
		          time: '2016-05-02',
		          Brate: '6%',
		          name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'
		        }],
		        firstup:false,
		        secondup:false,
		        form:{
		        	"post":'',
		        	"Brate":''	        	
		        },
		        form2:{
		        	"reason":''	        		        	
		        }
            }
        },
        methods: { //方法
        	sizechange:function(){
        		
        	},
        	currentpage:function(){
        		
        	},
        	firstupc:function(){
        		this.firstup = true;
        	},
        	secondupc:function(){
        		this.secondup = true;
        	}
        },
        components: { //组件放这里
        	'my-menu':MyMenu,
        	'my-tabs':MyTabs
        },
        mounted: function () {        	 //DOM加载完成事件
        	
        }
    }
</script>

<style lang="less">
	.quality{
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
			padding: 40px;
			
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
				border-bottom: 0px solid red;
			}
			.el-table--enable-row-hover .el-table__body tr:hover>td{
				background-color: #ccc;
			}
			.el-button{
				background-color: rgba(0,0,0,0);
				border: 1px solid red;
				padding: 3px 15px;
			}
		}
	}
</style>