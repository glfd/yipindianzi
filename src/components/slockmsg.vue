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
				:editbut="{'edit':false,'remove':false}" :othercolumn="true" @selected="selected"  >
			    <el-table-column
			      prop="flag"
			      label="标签"
			      width="100"
			      :filters="[{ text: '入库', value: '1' }, { text: '出库', value: '1' }]"
			      :filter-method="filterTag"
			      filter-placement="bottom-end">
			      <template scope="scope">
			        <el-tag
			          :type="scope.row.flag === '1' ? 'primary' : 'success'"
			          close-transition>{{scope.row.flag=='1' ? '入库':'出库'}}</el-tag>
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
			"label":"操作人",
			"property":"name"
		},
		
	];
	
	var selectdata = [
    	{
    		"label":"操作人",
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
            		"number":"",
            		"user":"",
            		"flag":""/*进出标识*/
            		
            	},
            	tablelogin:false,
            	tablethis:"",    /*Table组件this*/
            	selectedval:null,
            	selectdata:selectdata,
            	selectedOptions:[],
			
			}
		},
		methods:{
			filterTag:function(value, row) {
		        return row.tag === value;
		    },
		    selected:function(val){
		    	
		    }
		    
			
		},
		clearl:function(){
        		this.form.id = "";
        		this.form.time = "";
        		this.form.number = "";
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
			height: 25px;
			width: 100%;
			min-height: 25px;
			margin-top:5px;
			
			.el-breadcrumb {
				margin-top: 2px;
			    font-size: 18px;
			    line-height: 1;
			   	margin-left: 5px;
}
		}	
		.slockmsgcontent{
			 position: absolute;
			 top: 25px;
			 left: 0;
			 right: 0;
			 bottom: 0;
		}
	}
</style>