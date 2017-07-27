<template>
	<div class="homepagecontent">
		<div class="Worksheetinfo">
			
		</div>
	</div>
</template>

<script>
	
	export default{
		props: ['message'],
        data: function () {
            return {
            	msg:"homepagecontent"
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
	.homepagecontent{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		
	}
</style>