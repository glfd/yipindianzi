<template>
	<div class="ordercurve" v-loading="tablelogin" element-loading-text="拼命加载中" >
		<div class="ordercurvetitle">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">订单曲线</el-breadcrumb-item>
			  <el-breadcrumb-item>OrderCurve</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="curve">
			<div class="tag">
				<el-tag v-for="allyear in year-2015" @click.native="yearclick(2015+allyear)">{{ 2015+allyear }}</el-tag>
			</div>
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
            	year:2016,
            	allData:{}
            	
            
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
		    yearclick:function(year){
		    	console.log(year);
		    	this.printerchart(this,year,this.allData[year]);
		    },
		    printerchart:function(_this,year,data){
		    	console.log(data);
		    	// 绘制图表
				_this.myChart.setOption({
				    title: {
					        left: 'center',
					        text: year+'年订单曲线图',
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
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataZoom : {show: true},
				            dataView : {show: true, readOnly: false},
				            restore : {show: true},
				            saveAsImage : {show: true}
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
			            
				        data: data
				    }]
				});
		    },
		    init:function(_this){
		    	// 基于准备好的dom，初始化echarts实例
				_this.myChart = Echarts.init(document.getElementById('main'));
				_this.$http.post(myurl.getorderschart,{emulateJSON: true})
			        .then(
			        	function (response){
			        		console.log(response);
			        		var y = response.body;
			        		if(y.length % 12 != 0){
			        			_this.$message({
							        showClose: true,
							        message: '数据出错！',
							        type: 'error'
					        	});
					        	return;
			        		}
			        		var	number = y.length/12;
			        		var realnumber={};
			        		var year = 2016;
			        		for(var i=0;i<number;i++){
			        			year += i;
			        			var shortnumber = [];
			        			shortnumber = y.slice(i*12,i*12+12);
			        			realnumber[year] = shortnumber;
			        		}
			        		_this.year = year;
			        		_this.allData = realnumber;
			        		console.log(realnumber);
			        		_this.printerchart(_this,year,realnumber[year]);
			        		
			        	},
			        	function (error){
			        		_this.$message({
					          showClose: true,
					          message: '请求失败！',
					          type: 'error'
					        });
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
			
			.tag{
				margin: 5px 0 0 10px;
				cursor:pointer;
			}
			.el-tag{
				background-color: #6a7985;
				margin-left: 5px;
				font-size: 15px;
			}
		}
		#main{
			width: 90%;
			height: 400px;
			
		}
		
		
	}
</style>