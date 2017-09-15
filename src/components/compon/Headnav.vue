<template>
	<div class="header">
		<!--导航-->
		<div class="logo-img">
			<img src="../../../static/images/jltd/LOGO.png" />
		</div>
		<div class="content" v-if='isPc'>
			<div class="logo">
				<div class="logo-name">
					<p class="zh-name">广东宏远青少年训练营</p>
					<p class="en-name">Guangzhou hongyuan youth training camp</p>
				</div>
				<div class="phone">
					<div class="phone-img">
						<img src="../../../static/images/mxxy/phone.png" />
						<div class="phone-qq">
							<p>QQ:&nbsp;3549857036</p>
							<p>电话:&nbsp;13528684149 &nbsp;18122916611 </p>
						</div>
					</div>
				</div>
			</div>
			<nav>
				<div class="navbar">
					<a href="javascript:;" @click="navswitch(0)">首页</a> &#47;
					<a href="javascript:;" @click="navswitch(1)">训练营介绍</a> &#47;
					<a href="javascript:;" @click="navswitch(2)">训练营动态</a> &#47;
					<a href="javascript:;" @click="navswitch(3)">课程服务</a> &#47;
					<a href="javascript:;" @click="navswitch(4)">教练团队</a> &#47;
					<a href="javascript:;" @click="navswitch(5)">明星学员</a> &#47;
					<a href="javascript:;" @click="navswitch(6)">视频图片</a> &#47;
					<a href="javascript:;" @click="gobottom">联系我们</a>
				</div>
			</nav>
		</div>
	</div>
</template>

<script>
	import bus from "../../bus.js"
	export default {
		data() {
			return {
				isPc: true
			}
		},
		methods: {
			navswitch(num) {
				this.$emit("navswitch", num);
				this.remove();
			},
			gobottom(){
				$('html,body').animate({scrollTop:$('.footer').offset().top},800)
			},
			remove(){
//				console.log(JSON.parse(sessionStorage.getItem('result')));
				sessionStorage.removeItem('result');
				this.$emit("tonews", -1);
			}
		},
		mounted: function() {
			
		}
	}
</script>

<style scoped lang="less">
	/**
	 * 头部导航
	 * */
	.header {
		width: 100vw;
	}
	.logo-img {
		width: 20vw;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		img{
			width: 100%;
		}
	}
	.content{
		width: 60vw;
		margin: 0 auto;
	}
	/*logo和导航设置*/
	.logo,
	.phone-img,
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.logo {
		height: 10vh;
	}
	.zh-name,
	.en-name {
		font-family: "楷体";
		font-weight: 600;
	}
	
	.zh-name {
		font-size: 2.2rem;
	}
	
	.en-name {
		font-size: 1.15rem;
	}
	
	.phone-img>img {
		margin-right: 10px;
	}
	
	/*导航文字*/
	nav {
		width: 100%;
		height: 40px;
		font-size: 20px;
	}
	
	.navbar a {
		width: 150px;
		font-size: 1.2rem;
		display: inline-block;
		text-align: center;
		position: relative;
	}
	
	.navbar a:hover {
		color: #E60012;
		text-decoration: none;
	}
	
	.red {
		color: #e60012;
	}
	@media only screen and (min-width: 1200px) and (max-width: 1400px) {
		.navbar a {
			font-size: 1rem;
		}
	}
	@media only screen and (min-width: 1070px) and (max-width: 1200px) {
		.zh-name {
			font-size: 1.8rem;
		}
		.en-name {
			font-size: 0.9rem;
		}
		.navbar a {
			font-size: 0.9rem;
		}
		.phone-img>img {
			margin-right: 10px;
			
		}
		.phone-img p{
			font-size: 0.9rem;
		}
	
	}
	@media only screen and (max-width: 1070px) {
		.navbar a {
			font-size: 0.8rem;
		}
	}
</style>