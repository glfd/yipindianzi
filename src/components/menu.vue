<template>
	<div class="menu">
		<!--菜单头部-->
		<div class="title">
			<i class="fa fa-user-circle-o"></i>
			<a href="./user.html">个性化服务</a>
		</div>
		<!--LOGO区域-->
		<div class="logo">
			<img src="../img/logo.png" alt="壹品电子" width="50px" height="100px"/>
		</div>
		<!--搜索框-->
		<div class="search">
			<el-input
			  placeholder=""
			  icon="search"
			  v-model="search"
			  :on-icon-click="searchclick">
			</el-input>
		</div>
		<!--菜单列表-->
		<div class="list">
			<div v-for="item in menulist" v-show="item.roles" class="list-item">
				<a :id="item.id" :href="item.url">{{ item.text }}</a>
			</div>
		</div>
	</div>
</template>

<script>
	import menulist from '../json/menulist.json';
	import { classedit } from '../other/classedit.js';
	import { cookie } from '../other/cookie.js';
	
	export default{
		props: ['message'],
        data: function () {
            return {
               	msg:"homepage",
               	search:"",
               	menulist:menulist
            }
        },
        methods: { //方法
			searchclick:function(){
				console.log("点击了搜索按钮");
			}
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
    		classedit.addClass(document.getElementById(this.message),"active");
    		var user = JSON.parse(unescape(cookie.getcookie('user')));
        	for (var i=0;i<user.roles.length;i++) {
        		if(user.roles[i].rid == "r1"){
        			this.menulist[1].roles = true;
        		}
        		if(user.roles[i].rid == "r2"){
        			this.menulist[2].roles = true;
        		}
        		if(user.roles[i].rid == "r3"){
        			this.menulist[3].roles = true;
        		}
        		if(user.roles[i].rid == "r4"){
        			this.menulist[4].roles = true;
        		}
        		if(user.roles[i].rid == "r5"){
        			this.menulist[5].roles = true;
        		}
        		if(user.roles[i].rid == "r6"){
        			this.menulist[6].roles = true;
        		}
        		if(user.roles[i].rid == "r7"){
        			this.menulist[7].roles = true;
        		}
        		if(user.roles[i].rid == "r8"){
        			this.menulist[8].roles = true;
        		}
        		if(user.roles[i].rid == "r9"){
        			this.menulist[9].roles = true;
        		}
        	}
        }
    }
</script>

<style lang="less">
	.active{
		background-color: red !important;
		color: #fff !important;
	}
	.menu{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		border-right: 1px solid red;
		display: flex;
		z-index: 99;
		flex-direction:column;
		.title{
			display: flex;
			justify-content:center;
			height: 60px;
			border-bottom: 1px solid red;
			line-height: 60px;
			i{
				font-size: 35px;
				color: red;
				line-height: 60px;
			}
			a{
				line-height: 40px;
				margin-left: 10px;
				margin-top: 15px;
				font-size: 18px;
				&:hover{
					cursor: pointer;
				}
			}
		}
		.logo{
			height: 120px;
			width: 100%;
			text-align: center;
			img{
				margin-top: 10px;
			}			
		}
		.search{
			height: 30px;
			width: 90%;
			margin-left: 5%;
			.el-input{
				height: 30px;
				line-height: 30px;
				.el-input__icon{
					border-left: 1px solid red;
					color: red;
				}
				.el-input__inner{
					height: 30px;
					border:1px solid red;
					border-radius: 0px;
				}
			}
		}
		.list{
			margin-top: 20px;
			flex-grow: 1;
			overflow-x: hidden;
			overflow-y: auto;
			.list-item{
				height: 35px;
				width: 100%;
				a{
					display: inline-block;
					width: 100%;
					height: 100%;
					line-height: 35px;
					text-align: left;
					padding-left: 30px;
					color: #000;
					&:hover{
						cursor: pointer;
					}
				}
			}
		}
	}
</style>