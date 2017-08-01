<template>
	<div class="homepage">
		<div class="menu">
			<my-menu message="homepage"></my-menu>
		</div>
		<div class="content">
			<h1>公司因你们而精彩！</h1>
			<div class="text">
				<h2>随需而变，铸就精品</h2>
				<p>技术是壹品的核心，因为我们持续不断的投入心血于专业级的研究和发展，才能够提供创新产品。</p>
				<h2>质量至上，永不妥协</h2>
				<p>高质量对于壹品来说是最重要的坚持，在每一个流程中时时检讨质量管理与细节，为了就是要让客户们能享有符合经济效益的高质量解决方案。</p>
				<h2>合作至上，长期经营</h2>
				<p>我们深信合作伙伴在各个阶段都是可以与壹品一起互相成长。和事业伙伴保持良好的关系，是我们能够不断在各方面持续成功最主要的关键。</p>
			</div>
			
		</div>
	</div>
</template>

<script>
	import MyMenu from '../components/menu.vue';/*菜单组件*/
	import MyHomeContent from '../components/homecontent.vue';
	import { cookie } from '../other/cookie.js';
	
	
	export default{
        data: function () {
            return {
               	msg:"homepage"
            }
        },
        methods: { //方法
			
        },
        components: { //组件放这里
			'my-menu':MyMenu,
			'my-homecontent':MyHomeContent
        },
        mounted: function () {     //DOM加载完成事件
        	console.log(cookie.getcookie('userId'));
        	console.log(cookie.getcookie('realName'));
        }
    }
</script>

<style lang="less">
	.homepage{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		background-color: #F0F3F7;
		.menu{
			width: 200px;
			height: 100%;
			min-width: 200px;
		}
		.content{
			flex-grow: 1;
			  h1{
				width: auto;
				height: 50px;
				text-align: center;
				margin-top:20px ;
				color: red;
			}
			
		}
		.text{
				width: 500px;
			 	height: 600px;
			 	margin: 20px auto;
			 h2{
			 	color: black;
			 	margin-bottom:20px ;
			 }
			 p{
			 	font-family: "微软雅黑";
			 	font-size: 14px;
			 	margin-bottom:20px ;
			 }
		}
	}
</style>