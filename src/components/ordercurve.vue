<template>
	<div class="ordercurve" v-loading="tablelogin" element-loading-text="拼命加载中" >
		<div class="ordercurvetitle">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">订单曲线</el-breadcrumb-item>
			  <el-breadcrumb-item>OrderCurve</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="curve">
			<div id="main"></div>
		</div>
	</div>
</template>

<script>
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/MyTableOne.vue';
	import Echarts from 'echarts';
	

	export default{
		data:function(){
			
			return {  
				form:{
            		
            	},
            	rules:{
            		
            	},
            		
            	tablelogin:false,
            	tablethis:"", 
            	selectedval:null,
            	myChart:null
            	
            
			}
		},
		methods:{
			clearl:function(){
        		
        	},
        	selected:function(val){
		    	this.selectedval = val;
		    },
		    add:function(tablethis){
		    	this.dialogFormVisible=true;
		    	this.tablethis = tablethis;
		    },
		    edit:function(tablethis){
		    	
		    },
		    
		    
		    
		    init:function(_this){
		    	// 基于准备好的dom，初始化echarts实例
				_this.myChart = Echarts.init(document.getElementById('main'));
				// 绘制图表
				_this.myChart.setOption({
				    title: {
					        left: 'center',
					        text: '2017年订单曲线图',
					},
				     tooltip : {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
				    },
				    xAxis: {
				    	name:'月份',
				        data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
			            
				    },
				     yAxis : [
				        {
				            name : '订单数量',
				            type : 'value'
				           
				        }
				        
				    ],
				    series: [{
				        name: '订单数量',
				        type: 'line',
				        label: {
			                normal: {
			                    show: true,
			                    position: 'top',
			                    textStyle:{
			                    	color: '#000'
			                    }
			                    
			                }
			            },
			            
				        data: [5, 20, 36, 10, 10, 20,40,25,8,9,24,67]
				    }]
				});
		    }
        },
		components:{
			'my-table-one':MyTableOne
		},
		mounted:function(){//DOm加载完成事件
			this.init(this)
        }
    }
</script>

<style lang="less">
	.ordercurve{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #F0F3F7;
		position: relative;
		.ordercurvetitle{
			height: 30px;
			border-bottom: 1px solid red;
			line-height: 30px;
			font-size: 14px;
			font-weight: 600;
			.el-breadcrumb{
				line-height: 30px;
			}
		}
		.curve{
			margin-top:20px;
		}
		#main{
			width: 90%;
			height: 400px;
			
		}
		
		
	}
</style>