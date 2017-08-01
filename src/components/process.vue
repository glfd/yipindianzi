<template>
	<div class="process">
		<div class="processtitle">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
			  <el-breadcrumb-item>Process</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="gx">		
			<el-tag v-for='item in gx' @click.native="bq(item)">{{item.name}}</el-tag>	
			<!--<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加工序</el-button>-->
		</div>
		<div class="msg">
			<el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column 
		        prop="id"
		        label="id">
		      </el-table-column>
		      <el-table-column 
		        prop="msg"
		        label="问题">
		      </el-table-column>
		      <el-table-column 
		        prop="editor"
		        label="编辑人">
		      </el-table-column>
	    </el-table>
		</div>
	</div>
</template>

<script>
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/MyTableOne.vue';
	var gx=[
		{
			name:"工序一",
		    problam:[
			    {
			    	id:"1",
			    	msg:"sjahdsah",
			    	editor:"小茅"
			    },
			    {
			    	id:"2",
			    	msg:"sjahdsah",
			    	editor:"小房"
			    	
			    },
			    {
			    	id:"3",
			    	msg:"sjahdsah",
			    	editor:"小郭"
			    }
			    
		    ]
		},
		{
			name:"工序二",
		    problam:[
			    {
			    	id:"1",
			    	msg:"sfffs分公司ah",
			    	editor:"小郭"
			    },
			    {
			    	id:"2",
			    	msg:"sja防守打法sah",
			    	editor:"小胡"
			    },
			    {
			    	id:"3",
			    	msg:"sjahdsah",
			    	editor:"小代"
			    }
			    
		    ]
		},
		{
			name:"工序三",
		    problam:[
			    {
			    	id:"1",
			    	msg:"sja的说法sah",
			    	editor:"小胡"
			    },
			    {
			    	id:"2",
			    	msg:"sjahdsah",
			    	editor:"小胡"
			    },
			    {
			    	id:"3",
			    	msg:"sjahdsah",
			    	editor:"小胡"
			    }
			    
		    ]
		}
	];
	import { classedit } from "../other/classedit.js";
	
	export default{
		data:function(){
			return {
				gx:gx,
				tableData:[]
			}
		},
		methods:{
			bq:function(bq){
				this.tableData=bq.problam;
				console.log(document.getElementsByClassName('el-tag'));
				var eltag = document.getElementsByClassName('el-tag');
				for (var i = 0;i<eltag.length;i++) {
					if(bq.name == eltag[i].innerText){
						classedit.addClass(eltag[i],'active');
					}else{
						classedit.removeClass(eltag[i],'active');
					}
				}
			}
		},
		components:{
			'my-table-one':MyTableOne
		},
		mounted:function(){
			this.tableData = this.gx[0].problam;
			var eltag = document.getElementsByClassName('el-tag');
			classedit.addClass(eltag[0],'active');
		}
	}
</script>

<style lang="less">
	.active{
		background-color: red;
	}
	.processtitle{
		height: 40px;
		min-height:40px;
		display:flex;
		justify-content:space-between;
		.el-breadcrumb{
			margin-top: 10px;
			font-size: 18px;
		}
	}
	.gx{
		margin-top: 10px;
		margin-left: 20px;
	}
    .el-tag{
			margin-right:10px;			 
			&:hover{
				cursor: pointer;
				font-size:14px;
			}
	    }
	.msg{
		margin-top: 20px;
	}
	
</style>