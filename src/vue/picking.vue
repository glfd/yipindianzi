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
			<p>订单编号：xxxxxxxxxxxxx</p>
		</div>
    </div>
</template>
<script type="text/javascript">
	import myurl from '../json/myurl.json';
	
    export default{
        data: function () {
            return {
            	
            }
        },
        methods: { //方法
        	
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
        	
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
		}
	}
</style>