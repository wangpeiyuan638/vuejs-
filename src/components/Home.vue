<template>
	<div class="home">
		
		<headnav @navswitch='navswitch' @tonews="tonews"></headnav>
		<div id="banners">
			<banner></banner>
		</div>
		<div id="content">
			<div class="weizhi auto" v-if="ind>0">
				<img @click="navswitch(0)" src="../../static/images/jltd/sy.png"/>
				<span>&nbsp;您现在的位置: <span style="cursor: pointer;" @click="navswitch(0)">首页</span> &gt;
					<span v-if="ind==1" class="red">训练营介绍</span>
					<span v-if="ind==2" class="red">训练营动态详情</span>
					<span v-if="ind==3" class="red">课程服务</span>
					<span v-if="ind==4" class="red">教练团队</span>
					<span v-if="ind==5" class="red">明星学员</span>
					<span v-if="ind==6" class="red">视频图片</span>
				</span>
			</div>
			<first v-if="ind==0" @navswitch='navswitch' @tonews="tonews" ></first>
			<introdu v-if="ind==1" @navswitch='navswitch'></introdu>
			<dynamic v-if="ind==2" @tonews="tonews" :newsinfo="newsinfo"></dynamic>
			<course v-if="ind==3"></course>
			<coach v-if="ind==4"></coach>
			<student v-if="ind==5"></student>
			<video-img v-if="ind==6"></video-img>
		</div>
		<footinfo @navswitch='navswitch'></footinfo>
		<div class="fixtotop hide">
			<img @click="totop" src="../../static/images/sy/top-tp.png"/>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	
	import Headnav from './compon/Headnav'
	import Footinfo from './compon/Footinfo'
	import Banner from './compon/Banner'
	
	import First from './content/First'
	import Introdu from './content/Introdu'
	import Dynamic from './content/Dynamic'
	import Course from './content/Course'
	import Coach from './content/Coach'
	import Student from './content/Student'
	import VideoImg from './content/VideoImg'
	export default {
		components:{
			Headnav,
			Footinfo,
			Banner,
			First,
			Introdu,
			Dynamic,
			Course,
			Coach,
			Student,
			VideoImg
		},
		data() {
			return {
				ind: 0,
				newsinfo:-1
			}
		},
		methods:{
			navswitch(num){
				this.ind = num;
			},
			//动态详情显示的内容代号
			tonews(val){
				this.newsinfo = val;
			},
			totop(){
				$('html,body').animate({scrollTop:0},500)
			},
			//请求
			ajaxs:function(){
				axios.post(CONFIG.url + "/user/api/hot", $.param({
						page: 0,
						pageSize: 100
					})).then(function(res) {
						console.log(res)
					}, function(err) {
						
					});
			}
		},
		mounted:function(){
			//this.ajaxs();
			window.onscroll = function() {
				var wScrollY = window.scrollY;
				if(wScrollY > 600){
					$(".fixtotop").removeClass("hide");
				}else{
					$(".fixtotop").addClass("hide");
				}
			}
		}
	}
</script>

<style scoped>
	#content{
		width: 100%;
	}
	.weizhi{
		padding: 2.4rem 0;
		font-size: 1.2rem;
		border-bottom: 1px solid #c3c3c3;
	}
	.red{
		color: #e60012;
	}
	.fixtotop{
		position: fixed;
		right: 30px;
		transition: all 0.3s ease 0s; 
		top: calc(50% - 15px);
	}
	.fixtotop:hover{
		cursor: pointer;
		transform: rotateZ(90deg);
	}
	.hide{
		display: none;
	}
</style>