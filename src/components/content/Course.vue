<!--课程服务-->
<template>
	<div class="xly">
		<div class="auto">
			<div class="kuang" v-for="item in courseService">
				<h2>{{item.title}}</h2>
				<div v-html="item.content"></div>
			</div>
			<!--<div class="kuang">
				<h2>课程介绍</h2>
				<p>由篮球名宿、体育高校教授与专家参与编写的教纲教材，CBA职业俱乐部的教练团队资源，与国际接轨的篮球训练理念，由宏远俱乐部顶级球星组成的教练团队。</p>
				<img src="../../../static/images/kcfw/kcjs.png"/>
			</div>
			<div class="kuang">
				<h2>课程报名</h2>
				<p>
					1.周末班<br />
					2.寒暑假训练营<br />
					3.短期特训营<br />
					U7幼儿班（5到7岁儿童）<br />
					U10基础班、U10提高班（8到10岁儿童）<br />
					U13基础班、U13提高班（11到13岁儿童）<br />
					U15提高班、U15精英班（14到15岁儿童）<br />
					U17提高班、U17精英班
				</p>
				<img src="../../../static/images/kcfw/kcbm.png"/>
			</div>
			<div class="kuang">
				<h2>晋升渠道</h2>
				<p>让普通学生通过篮球达到健身和成长的教学目的，优秀苗子打通篮球的升学通道，出类拔萃的学员走上职业道路的机会。</p>
				<img src="../../../static/images/kcfw/jsqd.png"/>
			</div>
			<div class="kuang">
				<h2>赛事活动</h2>
				<p>参与训练营的学员由内部比赛，不同校区的学员可进行联赛。承办并策划社区、企业、学校之间的篮球赛，在场馆、裁判、宣传等方面提供帮助。</p>
				<img src="../../../static/images/kcfw/sshd.png"/>
			</div>-->
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		components:{
			
		},
		data() {
			return {
				courseService: {},
				IP: 'http://119.23.28.239:8080/'
			}
		},
		methods:{
			navswitch(num){
				this.$emit("navswitch",num);
			}
		},
		mounted(){
			var that = this;
			axios.get(that.IP+'train/homePage/courseService?isShow=1')
		        .then(function(res){
		        	console.log(res);
		        	that.courseService = res.data.data;
		        	console.log(that.courseService);
		        })
		}
	}
</script>

<style scoped>
	.xly{
		width: 100%;
	}
	
	.kuang{
		width: 100%;
		padding-top: 2.5rem;
	}
	h2{
		font-size: 2.25rem;
		line-height: 2.5rem;
		font-weight: 200;
		margin-bottom: 42px;
	}
	h2:before{
		content: url(../../../static/images/kcfw/title.png);
		vertical-align: middle;
		margin-right: 1rem;
	}
	p{
		letter-spacing: 2px;
		font-size: 1rem;
		line-height: 2rem;
		margin: 1.25rem 0;
	}
	img{
		width: 100%;
	}
	.allinfos{
		margin: 1.25rem;
		text-align: end;
	}
</style>