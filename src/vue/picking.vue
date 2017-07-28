<!--入口页 vue-->
<template>
    <div class="picking">
    	<div class="picking-title">
			<img src="../img/545242586273468960.png" alt="壹品电子" width="auto" height="30px"/>
			<div class="title-right">
				<a href="javascript:printme()" target="_self">打印</a>
			</div>
		</div>
		<div class="picking-content" id="divPrint">
			<div class="title">
				<p>领料单</p>
			</div>
			<div class="nub">
				<p>
					订单编号：{{ pickdata.ownNub }}&nbsp;&nbsp;&nbsp;&nbsp;
					客户编号：{{ pickdata.cNub }} &nbsp;&nbsp;&nbsp;&nbsp;
					产品名称：{{ pickdata.mname }}&nbsp;&nbsp;&nbsp;&nbsp;
					产品编号：{{ pickdata.mnub }}
				</p>
			</div>
			<div class="txm">
				<p>条形码：{{ pickdata.sbarcode + "-" + pickdata.ebarcode }}</p>
			</div>
			<div class="table">
				<template>
				    <el-table
				      :data="pickdata.BOM"
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
		{prop:"mnub",label:"料号"},
		{prop:"MName",label:"料名"},
		{prop:"version",label:"规格"},
		{prop:"mumber",label:"数量"},
		{prop:"unit",label:"单位"}
	];
    export default{
        data: function () {
            return {
            	pickdata:{},
            	tablecolumn:tablecolumn
            }
        },
        methods: { //方法
        	
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
        	var _this = this;
        	var url = location.search;
			var strs = url.split("?");
        	var wid = strs[1].split("=");
        	_this.$http.post(myurl.workgetbywid,{"wid":wid[1]},{emulateJSON: true})
	        .then(
	        	function (response){
	        		console.log(response);
	        		_this.pickdata = response.body[0];
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
	.picking{
		width: 100%;
		min-height: 100%;
		height: auto;
		overflow-x: auto;
		overflow-y: auto;
		background-color: #EFF2F7;
		display: flex;
		flex-direction:column;
		.picking-title{
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
		.picking-content{
			width: 80%;
			flex-grow: 1;
			background-color: #fff;
			margin-left: 10%;
			padding: 30px;
		}
	}
</style>