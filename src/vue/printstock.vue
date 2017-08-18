<!--入口页 vue-->
<template>
    <div class="printstock">
    	<div class="printstock-title">
			<img src="../img/545242586273468960.png" alt="壹品电子" width="auto" height="30px"/>
			<div class="title-right">
				<a href="javascript:printme()" target="_self">打印</a>
			</div>
		</div>
		<div class="left-content">
			<el-transfer
			    filterable
			    :filter-method="filterMethod"
			    filter-placeholder="请输入物料名称"
			    v-model="name"
			    @change="transferchange"
			    :data="data2">
			</el-transfer>
		</div>
		<div class="printstock-content" id="divPrint">
			<div class="title">
				<p>打印库存</p>
			</div>
			<div class="table">
				<template>
				    <el-table
				      :data="pickdata"
				      style="width: 600px">
				        <el-table-column type="index">
					    </el-table-column>
					    <el-table-column 
					    	v-for="item in tablecolumn"
					    	:property="item.prop"
		      				:label="item.label">
					    </el-table-column>
				    </el-table>
				</template>
			</div>
		</div>
    </div>
</template>
<script type="text/javascript">
	import myurl from '../json/myurl.json';
	var tablecolumn = [
		{prop:"mnub",label:"编号"},
		{prop:"stock",label:"库存"},
		{prop:"mName",label:"名称"},
	];
    export default{
        data: function () {
            return {
            	pickdata:[],
            	tablecolumn:tablecolumn,
            	name:[],
            	data2: [],
            	allData:[]
            }
        },
        methods: { //方法
        	filterMethod:function(query, item) {
		          return item.pinyin.indexOf(query) > -1;
		    },
		    transferchange:function(value,change,key){
		    	if(change == "right"){
		    		for (var i=0;i<key.length;i++) {
		    			for (var a=0;a<this.allData.length;a++) {
		    				if(key[i] == this.allData[a].mid){
		    					this.pickdata.push({mnub:this.allData[a].mnub,stock:this.allData[a].stock,mName:this.allData[a].mName,mid:this.allData[a].mid});
		    				}
		    			}
		    		}
		    	}
		    	if(change == "left"){
		    		for (var i=0;i<key.length;i++) {
		    			for (var a=0;a<this.pickdata.length;a++) {
		    				if(key[i] == this.pickdata[a].mid){
		    					this.pickdata.splice(a, 1);
		    				}
		    			}
		    		}
		    	}
		    }
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
        	var _this = this;
        	_this.$http.post(myurl.warehousegetall,{emulateJSON: true})
	        .then(
	        	function (response){
	        		console.log(response);
	        		_this.allData = response.body;
	        		_this.data2 = [];
	        		for(var i=0;i<response.body.length;i++){
	        			var dataitem = {};
	        			dataitem.label = response.body[i].mnub+'-'+response.body[i].mName;
	        			dataitem.key = response.body[i].mid;
	        			dataitem.pinyin = response.body[i].mName;
	        			_this.data2.push(dataitem);
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
    }
</script>
<style lang="less">
	.printstock{
		width: 100%;
		min-height: 100%;
		height: auto;
		overflow-x: auto;
		overflow-y: auto;
		background-color: #EFF2F7;
		display: flex;
		flex-direction:column;
		.printstock-title{
			height: 40px;
			background-color: #fff;
			min-height:40px;
			display:flex;
			justify-content:space-between;
			img{
				margin-top: 5px;
				margin-left: 10px;
			}
			
		}
		.el-transfer-panel{
			height: 400px;
		}
		.left-content{
			width: 40%;
			position:relative;
			margin: 45px 0 0 60px;
		}
		.printstock-content{
			width: 50%;
			height: auto;
			flex-grow: 1;
			background-color: #fff;
			position:absolute;
			top: 30px;
			right: 50px;
			padding: 30px;
			margin-top: 50px;
		}
	}
</style>