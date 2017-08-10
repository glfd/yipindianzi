<template>
	<div class="echart">
		<div :id="id">
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	
	export default{
		props:{
			'id':{
				default:'main'
			}
		},
		data: function () {
            return {
            	myChart:""
            }
        },
        methods: { //方法
        	lineclick:function(param){
        		console.log(param);
        	},
        	creat:function(_this,obj){
	        	// 绘制图表
				_this.myChart.setOption({
					title : {
				        text: obj.ordercakeparameter.titletext,
				        x:'right'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: obj.x
				    },
				    series : [
				        {
				            name: obj.ordercakeparameter.yname,
				            type: 'pie',
				            radius : '65%',
				            center: ['50%', '40%'],
				            data:obj.y,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				});
				_this.myChart.on("click", function (param) {
					_this.lineclick(param);
				});
        	},
        	init:function(_this){
        		var main = document.getElementById(_this.id);
        		main.style.width = '100%';
        		main.style.height = '450px';
        		_this.myChart = echarts.init(document.getElementById(_this.id));
        		this.$emit('changeCart',this);
			}
        },
        watch:{
        	
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
        	this.init(this);
        }
	}
</script>

<style lang="less">

</style>