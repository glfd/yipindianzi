<template>
	<div class="warehousecurve" v-loading="tablelogin" element-loading-text="拼命加载中" >
		<div class="warehousecurvetitle">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">仓管曲线</el-breadcrumb-item>
			  <el-breadcrumb-item>WareHouseCurve</el-breadcrumb-item>
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
            	myChart:null,
            	name:this.$route.query.name
            
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
					        text: _this.name+'的出入库数量'
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
				    legend: {
				    	top:'8%',
       					data:[_this.name+'出库数量',_this.name+'入库数量']
    				},
				     grid: {
				        left: '3%',
				        right: '4%',
				        top: '18%',
				        containLabel: true
				    },
				   
				    xAxis: {
				    	name:'月份',
				        data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
			            
				    },
				     yAxis : [
				        {
				            name : _this.name+'出入库数量',
				            type : 'value'
				           
				        }
				        
				    ],
				    series: [
				    {
				        name: _this.name+'入库数量',
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
			            
				        data: [50, 20, 35, 10, 10, 20,40,25,20,44,24,67]
				    },
				    {
				        name: _this.name+'出库数量',
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
			            
				        data: [25, 10, 40, 5, 15, 10,30,20,18,40,20,50]
				    }
				    ]
				});
		    }
        },
		components:{
			'my-table-one':MyTableOne
		},
		mounted:function(){//DOm加载完成事件
			console.log(this.$route.query.name);
			this.init(this)
        }
    }
</script>

<style lang="less">
	.warehousecurve{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #F0F3F7;
		position: relative;
		.warehousecurvetitle{
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