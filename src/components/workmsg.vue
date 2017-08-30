<!--产品信息-->
<template>
	<div class="workmsg">
		<el-dialog title="产品信息" :visible.sync="dialogFormVisible" :show-close="false">
		    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
			  <el-form-item label="产品编号" prop="mnub">
			    <el-input v-model="form.mnub"></el-input>
			  </el-form-item>
			  <el-form-item label="产品名称" prop="mName">
			    <el-input v-model="form.mName"></el-input>
			  </el-form-item>
			  <el-form-item label="型号" prop="version">
			    <el-input v-model="form.version"></el-input>
			  </el-form-item>
			  <el-form-item label="单位" prop="unit">
			    <el-input v-model="form.unit"></el-input>
			  </el-form-item>
			  <el-form-item label="描述" prop="remark">
			    <el-input v-model="form.remark"></el-input>
			  </el-form-item>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clearl">取 消</el-button>
		    <el-button type="primary" @click="addproject('form')">确 定</el-button>
		  </div>
		</el-dialog>
		<my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata" :checkshow="true"
				:editbut="editbut"  :addshow="addshow" :othercolumn="true" @selected="selected" @add="add" @edit="edit" @remove="remove" @check="check">
				<el-button slot="header" @click="chart" type="primary" v-if="chartshow" >
					<i class="fa fa-bar-chart"></i>查看合格率</el-button>
				<el-table-column label="其他">
			    	<template scope="scope">
			    		<el-button
				      		type="text"
				      		@click.native.prevent="seleteother(scope.row)"
				      	    size="small">
				      	 	 查看boom单
				        </el-button>
				        <el-button
				      		type="text"
				      		@click.native.prevent="seleteother1(scope.row)"
				      	    size="small">
				      	 	 查看标准
				        </el-button>
				    </template>
			   </el-table-column>
		</my-table-one>
	</div>
</template>

<script>
	import myurl from '../json/myurl.json';
	import MyTableOne from '../components/MyTableOne.vue';
	import { cookie } from '../other/cookie.js';
	var tablecolumn = [{
			label: "产品编号",
			property: "mnub"
		},
		{
			label: "产品名称",
			property: "mName"
		},
		{
			label: "型号",
			property: "version"
		},
		{
			label: "单位",
			property: "unit"
		}
	];
	var selectdata = [{
			"label": "产品编号",
			"value": "mnub"
		},
		{
			"label": "产品名称",
			"value": "mName"
		},
		{
			"label": "型号",
			"value": "version"
		}
	];

export default {
	data: function() {
		return {
			tabledataurl: myurl.productgetall,
			tabledata: [],
			tablecolumn: tablecolumn,
			dialogFormVisible: false,
			form: {
				"mnub": "",
				"mName": "",
				"version": "",
				"remark": "",
				"unit": "",
				"type": "2"
			},
			rules: {
				mnub: [{
					required: true,
					message: '请输入产品编号',
					trigger: 'blur'
				}],
				mName: [{
					required: true,
					message: '请输入产品名称',
					trigger: 'blur'
				}],
				version: [{
					required: true,
					message: '请输入型号',
					trigger: 'blur'
				}],
				remark: [{
					required: true,
					message: '请输入备注',
					trigger: 'blur'
				}],
				unit: [{
					required: true,
					message: '请输入单位',
					trigger: 'blur'
				}]
			},
			tablelogin: false,
			tablethis: "",
			deliveryTime: "",
			selectedval: null,
			chartshow: false,
			selectdata: selectdata,
			addshow:false,
            editbut:{'edit':false,'remove':false}
		}
	},
	methods: {
		seleteother: function(val) {
			console.log(val);
			var _this = this;
			this.$router.push({
				path: '/boom',
				query: {
					mid: val.mid,
					mName: val.mName
				}
			})
		},
		seleteother1: function(val) {
			console.log(val);
			var _this = this;
			this.$router.push({
				path: '/standardmsg',
				query: {
					mid: val.mid,
					mName: val.mName
				}
			})
		},
		clearl: function() {
			this.form.mnub = "";
			this.form.mName = "";
			this.form.version = "";
			this.form.remark = "";
			this.form.unit = "";
			this.dialogFormVisible = false;
			this.$refs['form'].resetFields();
		},
		selected: function(val) {
			this.selectedval = val;
			if(val != null) {
				this.chartshow = true;
			} else {
				this.chartshow = false;
			}

		},
		add: function(tablethis) {
			this.dialogFormVisible = true;
			this.tablethis = tablethis;
		},
		check: function(tablethis) {
			var _this = this;
			this.$router.push({
				path: '/workcurve'
			})
		},
		chart: function(tablethis) {
			var _this = this;
			console.log(this.selectedval);
			this.$router.push({
				path: '/passrate',
				query: {
					mid: this.selectedval.mid,
					name: this.selectedval.mName
				}
			})
		},
		edit: function(tablethis) {

		},
		remove: function(tablethis) {
			this.tablethis = tablethis;
			var _this = this;
			this.$alert('确认删除？', '产品删除', {
				confirmButtonText: '确定',
				callback: function(action) {
					console.log(action);
					if(action == 'cancel') {
						_this.$message({
							showClose: true,
							message: '取消删除！',
							type: 'success'
						});
						return;
					}
					_this.$http.post(myurl.productdelete, {
							"mid": _this.selectedval.mid
						}, {
							emulateJSON: true
						})
						.then(
							function(response) {
								console.log(response);
								if(response.body.id == 1) {
									_this.$message({
										showClose: true,
										message: '删除成功！',
										type: 'success'
									});
									_this.tablethis.gettabledata(_this.tablethis);
								} else {
									_this.$message({
										showClose: true,
										message: '删除失败！',
										type: 'error'
									});
								}
							},
							function(error) {
								_this.$message({
									showClose: true,
									message: '请求失败！',
									type: 'error'
								});
							});
				}
			});
		},
		updataRow: function() {

		},
		addproject: function(formName) {
			var formv = true;
			this.$refs[formName].validate(function(valid) {
				if(valid) {
					formv = true;
				} else {
					formv = false;
					return false;
				}
			});
			if(!formv) {
				return;
			}
			var _this = this;
			_this.tablelogin = true;
			this.$http.post(myurl.productcreate, this.form, {
					emulateJSON: true
				})
				.then(
					function(response) {
						if(response.body.id == 1) {
							_this.$message({
								showClose: true,
								message: '添加成功！',
								type: 'success'
							});
							_this.clearl();
							_this.tablethis.gettabledata(_this.tablethis); //重新刷新数据表
							setTimeout(function() {
								_this.tablelogin = false;
								_this.dialogFormVisible = false;
								_this.tablelogin = true;
								_this.$http.post(myurl.productgetall, {
										emulateJSON: true
									})
									.then(
										function(response) {
											_this.tabledata = response.body;
											_this.tablelogin = false;
										});
							});
						} else if(response.body.id == 0) {
							_this.$message({
								showClose: true,
								message: '产品编号重复！',
								type: 'error'
							});
						} else {
							_this.$message({
								showClose: true,
								message: '添加失败！',
								type: 'error'
							});
						}
					},
					function(error) {
						_this.$message({
							showClose: true,
							message: '请求失败！',
							type: 'error'
						});
						_this.tablelogin = false;
					});
		}
	},
	components: {
		'my-table-one': MyTableOne
	},
	mounted: function() {
		var user = JSON.parse(unescape(cookie.getcookie('user')));
        		for (var i=0;i<user.roles.length;i++) {
        		if(user.roles[i].rid == "r41"){
        			this.addshow = true;
        		}
        		if(user.roles[i].rid == "r42"){
        			this.editbut.remove = false;
        		}
        	}
	}
}</script>

<style lang="less">
	.dialog-footer{
		float:none;
		margin-bottom:30px !important;
		margin-top:0 !important;
		margin-right:0 !important;
	}
</style>