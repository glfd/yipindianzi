<!--出入库详细信息-->
<template>
	<div class="slockmsg"  v-loading="tablelogin" element-loading-text="拼命加载中" >
		<div class="slockmsgtitle" >
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">仓管</el-breadcrumb-item>
			  <el-breadcrumb-item>{{ $route.query.id }}详细信息</el-breadcrumb-item>
			</el-breadcrumb>
	</div>
		<div class="slockmsgcontent">
			<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
				:addshow="false" :editbut="editbut" :othercolumn="true" @selected="selected" @edit="edit">
			    <el-table-column
			      property="flag"
			      label="标签"
			      width="100"
			      :filters="[{ text: '入库', value: '1' }, { text: '领料', value: '2' },{ text: '退还', value: '3' },
			      { text: '发货', value: '4' },{ text: '退货', value: '5' },{ text: '借出', value: '6' },{ text: '归还', value: '7' }, ]"
			      :filter-method="filterTag"
			      filter-placement="bottom-end">
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
    		"label":"详情",
    		"value":"name"
    	}
    
    	
    ];
	export default{
		data:function(){
			return {
				tabledataurl:myurl.warehouseselectbyid+"?id="+this.$route.query.mid,
				tablecolumn:tablecolumn,
				dialogFormVisible:false,
				tablelogin:false,
				form:{
            		"id":"",
            		"time":"",
            		"name":"",
            		"user":"",
            		"flag":""/*进出标识*/
            		
            	},
            	tablelogin:false,
            	tablethis:"",    /*Table组件this*/
            	selectedval:null,
            	selectdata:selectdata,
            	selectedOptions:[],
            	editbut:{'edit':false,'remove':false}
			}
		},
		methods:{
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
		    	
		    },
		    edit:function(tablethis){
		    	
		    },
		    
			
		},
		clearl:function(){
        		this.form.id = "";
        		this.form.time = "";
        		this.form.number = "";
        		this.form.name = "";
        		this.form.user = "";
        		this.form.flag = "";
        		this.dialogFormVisible = false;
        		
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