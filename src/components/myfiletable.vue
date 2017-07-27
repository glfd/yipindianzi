<template>
	<div class="myfiletable">
		<el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      prop="date"
		      label="日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="地址">
		    </el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default{
		props: [],
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
	
</style>