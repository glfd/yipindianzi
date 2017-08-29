<template>
	<div class="standardmsg">
		<div class="standardmsgtitle">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
			  <el-breadcrumb-item>Standard</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="standardmsgcontent">	
			<el-form ref="form" :model="form" label-width="300px">
				<div class="resistance">
					<h2>电阻测试</h2>
					<el-form-item label="U V线电阻(mΩ)">
				        <el-input v-model="form.uvdz"></el-input>
					</el-form-item>
					<el-form-item label="V W线电阻(mΩ)">
					    <el-input v-model="form.vwdz"></el-input>
					</el-form-item>
					<el-form-item label="W U线电阻(mΩ)">
					    <el-input v-model="form.wudz"></el-input>
					</el-form-item>
				</div>
				<div class="inductance">
					<h2>电感测试</h2>
					<el-form-item label="U V线电感(mH)">
				        <el-input v-model="form.uvdg"></el-input>
					</el-form-item>
					<el-form-item label="V W线电感(mH)">
					    <el-input v-model="form.vwdg"></el-input>
					</el-form-item>
					<el-form-item label="W U线电感(mH)">
					    <el-input v-model="form.wudg"></el-input>
					</el-form-item>
				</div>
				<div class="pressure">
					<h2>绝缘耐压</h2>
					<el-form-item label="电机对机壳耐电压(V)">
				        <el-input v-model="form.djdyv"></el-input>
					</el-form-item>
					<el-form-item label="泄漏电流">
				        <el-input v-model="form.djdyvs"></el-input>
					</el-form-item>
					<el-form-item label="电机对机壳耐电压(U)">
					    <el-input v-model="form.djdyu"></el-input>
					</el-form-item>
					<el-form-item label="泄漏电流">
					    <el-input v-model="form.djdyus"></el-input>
					</el-form-item>
					<el-form-item label="电机对机壳耐电压(W)">
					    <el-input v-model="form.djdyw"></el-input>
					</el-form-item>
					<el-form-item label="泄漏电流">
					    <el-input v-model="form.djdyws"></el-input>
					</el-form-item>
					<el-form-item label="定子对机壳绝缘电阻(MΩ)">
				        <el-input v-model="form.dzdz"></el-input>
					</el-form-item>
					<el-form-item label="定子对温度传感器绝缘电阻(MΩ)(U)">
					    <el-input v-model="form.dzwd"></el-input>
					</el-form-item>
					<el-form-item label="闸间冲击试验">
					    <el-input v-model="form.zwcj"></el-input>
					</el-form-item>
					<el-form-item label="波形不重合度">
					    <el-input v-model="form.bxbchd"></el-input>
					</el-form-item>
				</div>
				<div class="size">
					<h2>端部整体尺寸</h2>
					<el-form-item label="引出线长(mm)">
				        <el-input v-model="form.yc"></el-input>
					</el-form-item>
					<el-form-item label="引出线线包外径(mm)">
					    <el-input v-model="form.ycwj"></el-input>
					</el-form-item>
					<el-form-item label="引出线线包内径(mm)">
					    <el-input v-model="form.ycnj"></el-input>
					</el-form-item>
					<el-form-item label="引出线线包高度(mm)">
				        <el-input v-model="form.ycgd"></el-input>
					</el-form-item>
					<el-form-item label="非引出线线包外径(mm)">
					    <el-input v-model="form.fycwj"></el-input>
					</el-form-item>
					<el-form-item label="非引出线线包内径(mm)">
					    <el-input v-model="form.fycnj"></el-input>
					</el-form-item>
					<el-form-item label="非引出线线包高度(mm)">
				        <el-input v-model="form.fycgd"></el-input>
					</el-form-item>
				</div>
				<div class="balance">
					<h2>动平衡测试</h2>
					<el-form-item label="左(g)">
				        <el-input v-model="form.left"></el-input>
					</el-form-item>
					<el-form-item label="右(g)">
					    <el-input v-model="form.right"></el-input>
					</el-form-item>
				</div>  
            </el-form>
            <span slot="footer" class="dialog-footer">
		    	<el-button type="primary" @click="addstandardmsg('form')">确 定</el-button>
		    </span>
		</div>
	</div>
</template>

<script>
	import myurl from '../json/myurl.json';
	export default{
		data:function(){
			return {
			    form: {
			      "uvdz": '',
			      "vwdz": '',
			      "wudz": '',
			      "uvdg": '',
			      "vwdg": '',
			      "wudg": '',
			      "djdyv": '',
			      "djdyvs": '',
			      "djdyu": '',
			      "djdyus": '',
			      "djdyw": '',
			      "djdyws": '',
			      "dzdz": '',
			      "dzwd": '',
			      "zwcj": '',
			      "bxbchd": '',
			      "yc": '',
			      "ycwj": '',
			      "ycnj": '',
			      "ycgd": '',
			      "fycwj": '',
			      "fycnj": '',
			      "fycgd": '',
			      "left": '',
			      "right": ''
			    },
			   
		    }
		},
		components:{
		
		},
		methods:{
			addstandardmsg:function(formName){
				var _this = this;
	        	var value ='';
	        	for (var i in this.form) {
	        		value +=this.form[i]+','
	        	}
	        	this.$http.post(myurl.standardcreate,{value:value,mid:this.$route.query.mid},{emulateJSON: true})
		        .then(
		        	function (response){
		        		console.log(response.body);
		        		if(response.body.id == 1){
		        			_this.$message({
					          showClose: true,
					          message: '添加成功！',
					          type: 'success'
					        });				        	
					       }else{
		        			_this.$message({
					          showClose: true,
					          message: '添加失败！',
					          type: 'error'
					        });
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
		},
		mounted: function () {        	 //DOM加载完成事件
        	this.$http.post(myurl.standardgetall,{mid:this.$route.query.mid},{emulateJSON: true})
		        .then(
		        	function (response){
		        		console.log(response.body);	
		        		var i = 0;
		        		for (var item in this.form) {
		        			this.form[item] = response.body[i].testValue
		        			i++
		        		}
		        		console.log(this.form);	
		        	},
		        	function (error){
		        		this.$message({
				          showClose: true,
				          message: '数据请求失败！',
				          type: 'error'
				        });
		        	});
        }
	}
</script>

<style lang="less">
	.standardmsg{
		position: relative;
		.standardmsgtitle{
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			font-weight: 600;
			.el-breadcrumb{
				line-height: 30px;
			}
		}
		}
	.standardmsgcontent{
		width: 600px;
		height: auto;
		margin: 50px auto;
	}
	.dialog-footer{
		float: right;
		margin-top:50px ;
		margin-right:50px ;
		margin-bottom: 100px;
	}
</style>