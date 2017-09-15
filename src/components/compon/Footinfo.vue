<template>
	<div class="div">
		<div class="footinfo">
			<div class="footer auto">
				<div class="one">
					<h2>关于我们</h2>
					<a href="javascript:;" @click="navswitch(1)" class="texts">训练营</a>
					<a href="javascript:;" @click="navswitch(3)" class="texts">课程服务</a>
					<a href="javascript:;" @click="navswitch(4)" class="texts">教练团队</a>
					<a href="javascript:;" @click="navswitch(5)" class="texts">明星学员</a>
					<a href="javascript:;" @click="navswitch(6)" class="texts">视频图片</a>
				</div>
				<div class="one">
					<h2>培训机制</h2>
					<a href="javascript:;" @click="navswitch(3)" class="textsp">课程服务</a>
					<a href="javascript:;" @click="navswitch(4)" class="textsp">教练团队</a>
					<a href="javascript:;" @click="navswitch(5)" class="textsp">明星学员</a>
				</div>
				<div class="one addressinfo">
					<h2>联系我们</h2>
					<p class="texts"><img src="../../../static/images/sy/qq.png" /><span class="address">{{contactUs.qqOne}} &nbsp; {{contactUs.qqTwo}}</span></p>
					<p class="texts"><img src="../../../static/images/sy/phone2.png" /><span class="address">{{contactUs.phoneOne}} &nbsp;{{contactUs.phoneTwo}}</span></p>
					<p class="dizhi"><img src="../../../static/images/sy/position.png" /><span class="address"><span>{{contactUs.address}}</span></span></p>
				</div>
				<div class="one codes">
					<div class="code">
						<img :src="'http://119.23.28.239:8080/resources/img/'+contactUs.qrPathOne" style="width: 134px;height: 134px;"/>
						<p class="wxwb"><img src="../../../static/images/sy/wb.png"/>&nbsp;{{contactUs.qrTitleOne}}</p>
					</div>
					<div class="code">
						<img :src="'http://119.23.28.239:8080/resources/img/'+contactUs.qrPathTwo" style="width: 134px;height: 134px;"/>
						<p class="wxwb"><img src="../../../static/images/sy/wx.png"/>&nbsp;{{contactUs.qrTitleTwo}}</p>
					</div>
				</div>
					
			</div>
			<div class="compinfo">
				Copyright &copy; 2011-2015 广州市宏远青少年训练营官方网站 备案号: 粤ICP备17089214号
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				contactUs: {}
			}
		},
		methods: {
			navswitch(num) {
				this.$emit("navswitch",num);
			}
		},
		mounted(){
			var that = this;
			axios.get('http://119.23.28.239:8080/train/homePage/contactUs')
		        .then(function(res){
		        	console.log(res);
		        	that.contactUs = res.data.data;
		        	console.log(that.contactUs);
		        })
		}
	}
</script>

<style scoped>
	.div{
		width: 100%;
		margin-top: 60px;
		background: url(../../../static/images/sy/footer-b.png) no-repeat;
	}
	.footinfo {
		text-align: center;
	}
	
	.footer {
		display: flex;
		justify-content: space-between;
		margin-bottom: 60px;
	}
	.one h2{
		width: 80px;
		padding: 10px 0;
		border-bottom: 1px solid #e60012;
		font-size: 20px;
		font-weight: 100;
		margin: 20px auto;
	}
	.texts{
		color: #666666;
		text-align: start;
		line-height: 28px;
		font-size: 14px;
		text-indent: 1em;
	}
	.textsp{
		color: #666666;
		line-height: 28px;
		font-size: 14px;
	}
	.one a {
		display: block;
		
	}
	.addressinfo{
		width: 250px;
	}
	.addressinfo .texts{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address{
		display: inline-block;
		width: 230px;
		white-space: wrap;
	}
	.dizhi{
		color: #666666;
		line-height: 30px;
		font-size: 14px;
		text-align: start;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.dizhi .address{
		line-height: 20px;
		padding-left: 16px;
	}
	.codes{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.code{
		margin: 0 20px;
	}
	
	.compinfo{
		padding: 20px 0 30px;
		border-top: 1px solid #c3c3c3;
	}
	.wxwb img{
		vertical-align: middle;
	}
</style>