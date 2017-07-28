<!--物料管理系统-->
<template>
	<div class="user">
		<div class="user-title">
			<img src="../img/545242586273468960.png" alt="壹品电子" width="auto" height="40px"/>
			<div class="title-right">
				<div class="title-name">
					<p>{{ name }}</p>
				</div>
				<div class="title-back">
					<a href="./homepage.html">返回首页</a>
					<a href="./index.html">退出登录</a>
				</div>
			</div>
		</div>
		<div class="user-content">
			<div class="user-left">
				<img :src="photosrc" alt="头像" width="150px" height="160px"/>
				<p class="username">{{ name }}</p>
				<div class="usermenu">
					<div class="menu-item" v-for="item in menuitem" v-show="item.roles">
						<router-link :to="item.url" class="one-menu-cli">
							<p>{{ item.label }}</p>
						</router-link>
					</div>
				</div>
			</div>
			<div class="user-right">
				<router-view class="content"></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import { classedit } from '../other/classedit.js';
	import { cookie } from '../other/cookie.js';
	import myurl from '../json/myurl.json';
	
	var menuitem = [
		{
			"label":"帐号设置",
			"url":"/",
			"roles":true
		},
		{
			"label":"个人设置",
			"url":"/myset",
			"roles":true
		},
		{
			"label":"帐号管理",
			"url":"/accpintman",
			"roles":false
		}
	];
	
    export default{
        data: function () {
            return {
            	name:"管理员",
            	menuitem:menuitem,
            	photosrc:myurl.photo+JSON.parse(unescape(cookie.getcookie('user'))).photo
            }
        },
        methods: { //方法
        	
        },
        components: { //组件放这里
			
        },
        mounted: function () {        	 //DOM加载完成事件
        	var menua = document.getElementsByClassName('one-menu-cli');
        	var href = window.location.href.split('#/');
        	if(href[1] == ""){
        		classedit.addClass(menua[0].getElementsByTagName('p')[0],'useractive');
        	}else if(href[1] == "myset"){
        		classedit.addClass(menua[1].getElementsByTagName('p')[0],'useractive');
        	}else if(href[1] == "accpintman"){
        		classedit.addClass(menua[2].getElementsByTagName('p')[0],'useractive');
        	}
        	for (var i=0;i<menua.length;i++) {
        		menua[i].addEventListener('click',function(){
        			for (var a=0;a<menua.length;a++) {
        				classedit.removeClass(menua[a].getElementsByTagName('p')[0],'useractive');
        			}
        			classedit.addClass(this.getElementsByTagName('p')[0],'useractive');
        		});
        	}
        	
        	var user = JSON.parse(unescape(cookie.getcookie('user')));
        	this.name = user.realName;
        	for (var i=0;i<user.roles.length;i++) {
        		if(user.roles[i].rid == "r100"){
        			this.menuitem[2].roles = true;
        		}
        	}
        }
    }
</script>

<style lang="less">
	.useractive{
		background-color: red;
		color: #fff;
	}
	.user{
		width: 100%;
		height: 100%;
		background-color: #EFF2F7;
		display: flex;
		flex-direction:column;	
		.user-title{
			height: 50px;
			width: 100%;
			min-height: 50px;
			background-color: #fff;
			box-shadow: 5px 5px 5px #ddd;
			display: flex;
			flex-direction:row;
			justify-content:space-between;
			img{
				margin: 5px 20px;
			}
			.title-right{
				display: flex;
				.title-back,.title-name{
					font-size: 18px;
					width: auto;
					line-height: 40px;
					padding: 0 30px;
					height: 40px;
				}
				.title-back{
					margin-right: 40px;
					display: flex;
					a{
						display: inline-block;
						width: 100%;
						height: 100%;
						margin-left: 20px;
						border-bottom: 2px solid red;
					}
				}
			}
		}
		.user-content{
			flex-grow: 1;
			overflow-x: hidden;
			overflow-y: auto;
			display: flex;
			.user-left{
				width: 200px;
				height: auto;
				min-width: 200px;
				display:flex;
				align-items:center;
				flex-direction:column;
				img{
					margin: 40px 25px;
				}
				.username{
					margin-top: -30px;
					font-size: 16px;
					font-weight: 600;
				}
				.usermenu{
					margin-top: 20px;
					width: 100%;
					height: auto;
					.menu-item{
						width: 100%;
						height: 50px;
						font-size: 14px;
						font-weight: 600;
						line-height: 50px;
						text-align: center;
					}
				}
			}
			.user-right{
				flex-grow: 1;
				height: auto;
				.content{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>