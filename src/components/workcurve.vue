<template>
	<div class="workcurve" v-loading="tablelogin" element-loading-text="拼命加载中" >
		<div class="workcurvetitle">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">产品饼图</el-breadcrumb-item>
			  <el-breadcrumb-item>WorkCurve</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="workhome">
				<el-button @click="click20(2016)">2016</el-button>
				<el-button @click="click20(2017)">2017</el-button>
			<div class="huizhi">
				<my-cake-chart :id="chart" @changeCart="changeCart"></my-cake-chart>
			</div>
		</div>
	</div>
</template>

<script>
	import myurl from '../json/myurl.json';
    import MyTableOne from '../components/MyTableOne.vue';
	import CakeeChart from '../components/cakeechart.vue';
	
	

	export default{
		data:function(){
			
			return {  
				orderall:{},
            	ordercakeXData:[],
            	ordercakeYData:[],
            	ordercakeparameter:{},
            	year:2016,
            	chartthis:null,
            	tablelogin:false,
            	chart:'chart'
			}
		},
		methods:{
			isEmptyObject:function(obj){  
			     for(var key in obj){  
			          return false
			     };  
			     return true
			},
        	click20:function(nub){
				this.ordercakeXData = [];
				this.ordercakeYData = [];
				this.year = nub;
				this.cakedatainit(this);
			},
		    changeCart:function(_this){
				this.chartthis = _this;
			},
			
		    cakedatainit:function(_this){ //饼图数据初始化
				var nowyeardata = _this.orderall[_this.year];//根据年份从总数据中取出对应年份的数据
				for (var i = 0;i<nowyeardata.length;i++) { //遍历取得的数据
					var flag = 0; //是否重复的标识位
					var ydata = {}; //y轴数据临时存放
					ydata.name = nowyeardata[i].materiel;//取得产品name和产品数量
					ydata.value = nowyeardata[i].number;
					for(var a = 0;a<_this.ordercakeYData.length;a++){//遍历y轴数据
						if(_this.ordercakeYData[a].name == nowyeardata[i].materiel){//判断数据是否与y轴已有数据重复
							_this.ordercakeYData[a].value += ydata.value; //如果数据重复就只添加数量
							flag =1;//flag置为1
							break;//退出循环
						}
					}
					if(flag == 0){//如果数据不重复则添加
						_this.ordercakeXData.push(nowyeardata[i].materiel);
						_this.ordercakeYData.push(ydata);
					}
				}
				if(_this.ordercakeYData.length > 10){
					var ydataort = _this.ordercakeYData.sort(function(a,b){
    					return b.value-a.value
					});
					_this.ordercakeYData = ydataort;
					var otherudata = _this.ordercakeYData.slice(10,_this.ordercakeYData.length+1);
					var other = 0;
					console.log(otherudata);
					for (var i=0;i<otherudata.length;i++) {
						other += otherudata[i].value;
					}
					_this.ordercakeXData = _this.ordercakeXData.slice(0,10);
					_this.ordercakeXData.push("其他");
					_this.ordercakeYData = _this.ordercakeYData.slice(0,10);
					_this.ordercakeYData.push({name:"其他",value:other});
				}
				_this.ordercakeparameter.titletext = "";
				_this.ordercakeparameter.yname = "产品名称";
				_this.chartthis.creat(_this.chartthis,{ordercakeparameter:_this.ordercakeparameter,x:_this.ordercakeXData,y:_this.ordercakeYData});
			},
		    init:function(_this){	
				_this.$http.post(myurl.ordergetall,
				{emulateJSON: true})
		        .then(
		        	function (response){
		        		var year = 2016;
		        		var nowyear = new Date().getFullYear();
		        		var orderall = {};
		        		for (var i=0;i<nowyear-year+1;i++) {
		        			year += i;
		        			var orderdata = [];
		        			for (var a=0;a<response.body.length;a++) {
		        				var orderny = {};
		        				if(response.body[a].orderTime.split('-')[0] == year+""){
			        				orderny.orderTime = response.body[a].orderTime;
			        				orderny.number = response.body[a].number;
			        				orderny.materiel = response.body[a].materiel.mName;
			        			} 
			        			if(!_this.isEmptyObject(orderny)){
			        				orderdata.push(orderny);
			        			}
		        			}
		        			orderall[year] = orderdata;
		        		}
		        		_this.year = year;
		        		_this.orderall = orderall;
		        		console.log(_this.orderall);
		        		_this.cakedatainit(_this);
		        	},
		        	function (error){
		        		_this.$message.error('请求失败！');
		        	});
			}
      },
		components:{
			'my-table-one':MyTableOne,
			'my-cake-chart':CakeeChart
		},
		mounted:function(){//DOm加载完成事件
			this.init(this);
			
       } 
	}
</script>


<style lang="less">
	.workcurve{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #F0F3F7;
		position: relative;
		.workcurvetitle{
			height: 30px;
			border-bottom: 1px solid red;
			line-height: 30px;
			font-size: 14px;
			font-weight: 600;
			.el-breadcrumb{
				line-height: 30px;
			}
		}
		.workhome{
			margin-top:20px;
			margin-left:10px ;
			.el-button{
				font-size: 15px;
				padding: 5px;
				margin-left:1px ;
				background: #6a7985;
				color: #fff;
				font-size: 15px;
				
			}
			.el-button{
				border: 0 solid #000;
			}
			.huizhi{
				margin-top:10px ;
			}
		}
		
	}
</style>