<!--首页-->
<template>
	<!--首页显示内容-->
	<div class="fir">
		<!--内容区域-->
		<div class="fir-content">
			<!--广东宏远青少年训练营-->
			<div class="fir-info xly auto">
				<div class="info-img bigw">
					<swiper auto loop :aspect-ratio="468/664" dots-position="center">
						<swiper-item v-for="(item,ind) in banner" :key='ind'><img :src="IP+'resources/img/'+item.imgPath" alt="训练营" /></swiper-item>
					</swiper>
				</div>
				<div class="info-text pleft smallw">
					<h2>{{summary.title}}</h2>
					<textarea class="textarea" v-html="summary.content" style="color: #666;width: 487px;height: 200px;"></textarea>
					<div class="allinfos" @click="navswitch(1)">
						<a href="javascript:;"><img src="../../../static/images/sy/xq.png" /></a>
					</div>
				</div>
			</div>
			<!--课程服务，教练团队，明星学员-->
			<div class="searvice">
				<!--<a href="javascript:;" @click="navswitch(3)"><img data-ind='1' src="../../../static/images/sy/kcfw.png" alt="课程服务" /></a>
				<a href="javascript:;" @click="navswitch(4)"><img data-ind='2' src="../../../static/images/sy/jltd.png" alt="教练团队" /></a>
				<a href="javascript:;" @click="navswitch(5)"><img data-ind='3' src="../../../static/images/sy/mxxy.png" alt="明星学员" /></a>-->
				<div class="course common">
					<a href="javascript:;" @click="navswitch(3)">
						<img data-ind='1' :src="courseIntroductionImg" alt="课程服务" />
						<h4>课程服务</h4>
						<p>{{courseIntroduction.content}}</p>
					</a>
				</div>
				<div class="courch common"> 
					<a href="javascript:;" @click="navswitch(4)">
						<img data-ind='1' :src="coachImg" alt="教练团队" />
						<h4>教练团队</h4>
						<p>{{coach.introduction}}</p>
					</a>
				</div>
				<div class="star common">
					<a href="javascript:;" @click="navswitch(5)">
						<img data-ind='1' :src="studentImg" alt="明星学员" />
						<h4>明星学员</h4>
						<p>{{student.introduction}}</p>
					</a>
				</div>
			</div>
		</div>
		<!--篮球俱乐部-->
		<div class="lanqiu">
			<div class="fir-info xly auto">
				<div class="info-text pright smallw">
					<h2>{{club.title}}</h2>
					<textarea  class="textarea" readonly="readonly">{{club.content}}</textarea>
				</div>
				<div class="info-img bigw">
					<img :src="clubimg" alt="俱乐部" />
				</div>
			</div>
		</div>

		<!--视频图片新闻-->
		<div class="video-info">
			<div class="fir-info xly auto">
				<div class="info-img smallw" style="position: relative;">
					<video v-show="isplaying" id="myvideo" autobuffer muted controls :src="video">
						<!--<source :src="video" type="video/mp4"></source>-->
					</video>
					<img class="player" src="../../../static/images/player.png" v-show="flag" @click="startplay"/>
					<img v-show="!isplaying" @click="startplay" :src="videoImg" alt="俱乐部"/>
				</div>
				<div class="info-text pleft bigw">
					<h2>{{trainDynamictitle.title}}</h2>
					<ul class="newslist">
						<li v-for="(val,ind) in trainDynamiclist" @click="gonew(val,ind)">
							<div class="news-title"><i class="fa fa-caret-right" aria-hidden="true"></i>{{val.title}}</div>
							<div class="news-time">{{val.idate.split(' ')[0]}}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import bus from "../../bus.js"
	import { Swiper, SwiperItem } from 'vux'
	export default {
		components: {
			Swiper,
			SwiperItem
		},
		data: function() {
			return {
				isplaying: false,
				summary: {},
				club: {},
				clubimg:'',
				trainDynamictitle:{},
				trainDynamiclist:{},
				imgs: [
					"../../../static/images/sy/banner-xly.png",
					"../../../static/images/sy/banner-jlb.png"
				],
				courseIntroduction: {}, //课程介绍
				courseIntroductionImg: '',
				coach: {},	//教练团队
				coachImg: '',
				student: {},
				studentImg: '',
				banner: [],
				IP:'http://119.23.28.239:8080/',
				firsttrainDynamicList:{},
				videoImg:'',
				video:'',
				URL:'',
				flag:'',
				ilink: ''
			}
		},
		methods: {
			navswitch(num) {
				this.$emit("navswitch", num);
			},
			startplay() {
				if(this.URL){
					this.isplaying = !this.isplaying;
					this.flag = !this.flag;
					$('#myvideo')[0].play();
				}else if(this.ilink){
					window.open.href = this.ilink;
				}
			},
			gonew(val,ind) {
				let vm = this;
				vm.$emit("tonews",ind);
				var id = val.id;
				console.log(id);
				var that = this;
				this.$emit("tonews",ind);
				axios.get(vm.IP+'train/homePage/trainDynamicInfo/'+id)
		        .then(function(res){
		        	console.log(res);
		        	that.firsttrainDynamicList = res.data.data;
		        	console.log(that.firsttrainDynamicList);
		        	var result = JSON.stringify(that.firsttrainDynamicList);
		        	sessionStorage.setItem('result',result);
		        	//还要向训练营动态详情页面展现相应的内容
					setTimeout(function(){
						vm.$emit("navswitch", 2);
					},100)
		        })
		        .catch(function(err){
		        	console.log(err);
		        })
			}
		},
		mounted: function() {
			var that = this;
			//首页轮播
			axios.get(that.IP+'train/homePage/banner?type=下面')
		        .then(function(res){
		        	that.banner = res.data.data;
//		        	console.log(that.banner[0].imgPath);
		        })
		      	.catch(function(err){console.log(err)});
			//训练营介绍
			axios.get(that.IP+'train/homePage/summary?isShow=1')
		        .then(function(res){
//		        	console.log(res);
		        	that.summary = res.data.data;
		        })
		      	.catch(function(err){console.log(err)});
		    //课程介绍
		    axios.get(that.IP+'train/homePage/courseIntroduction?isShow=1')
		        .then(function(res){
//		        	console.log(res);
		        	that.courseIntroduction = res.data.data;
		        	that.courseIntroductionImg = that.IP+"resources/img/"+that.courseIntroduction.imgPath;
//					console.log(res);
//					console.log(that.courseIntroductionImg);
		        })
		      	.catch(function(err){console.log(err)});
		    //教练团队
		    axios.get(that.IP+'train/homePage/coach?isShow=1')
		        .then(function(res){
					that.coach = res.data.data;
		        	that.coachImg = that.IP+"resources/img/"+that.coach.imgPath;
//					console.log(res);
//					console.log(that.coachImg);
		        })
		      	.catch(function(err){console.log(err)});
		     //明星学员
		    axios.get(that.IP+'train/homePage/student?isShow=1')
		        .then(function(res){
					that.student = res.data.data;
		        	that.studentImg = that.IP+"resources/img/"+that.student.imgPath;
//					console.log(res);
//					console.log(that.coachImg);
		        })
		      	.catch(function(err){console.log(err)});
//		     //俱乐部介绍
		     axios.get(that.IP+'train/homePage/club?isShow=1')
		        .then(function(res){
//		        	console.log(res);
		        	that.club = res.data.data;
		        	that.clubimg = that.IP+"resources/img/"+that.club.imgPath;
		        })
		      	.catch(function(err){console.log(err)});
//		      //动态标题
		     axios.get(that.IP+'train/homePage/trainDynamic?isShow=1')
		        .then(function(res){
		        	console.log(res);
		        	that.trainDynamictitle = res.data.data;
		        	that.trainDynamiclist = res.data.list;
		        })
		      	.catch(function(err){console.log(err)});
//		       //视频播放
		     axios.get(that.IP+'train/homePage/video?isShow=1')
		        .then(function(res){
		        	console.log(res);
		        	that.video = that.IP+"resources/img/"+res.data.data.videoPath;
		        	that.URL = res.data.data.videoPath;
		        	that.ilink = res.data.data.ilink;
		        	that.videoImg = that.IP+"resources/img/"+res.data.data.imgPath;
		        	console.log(that.video,that.videoImg);
		        	if(that.URL || that.ilink){
		        		that.flag = true;
		        	}else{
		        		that.flag = false;
		        	}
		        })
		      	.catch(function(err){console.log(err)});
			let vm = this;
			$('#myvideo').on("ended",function() {
				vm.isplaying = false;
			});
//			$(".anima img").mouseenter(function(){
//				var ind = $(this).attr("data-ind");
//				if (ind=='1') {
//					$(this).attr("src","../../../static/images/sy/kcfw2.png");
//				} else if(ind=='2'){
//					$(this).attr("src","../../../static/images/sy/jltd2.png");
//				}else{
//					$(this).attr("src","../../../static/images/sy/mxxy2.png");
//				}
//			});
//			$(".anima img").mouseleave(function(){
//				var ind = $(this).attr("data-ind");
//				if (ind=='1') {
//					$(this).attr("src","../../../static/images/sy/kcfw.png");
//				} else if(ind=='2'){
//					$(this).attr("src","../../../static/images/sy/jltd.png");
//				}else{
//					$(this).attr("src","../../../static/images/sy/mxxy.png");
//				}
//			});
			$(".common").mouseenter(function(){
				$(this).css('background','#fa3e4c');
				$(this).children('a').children('h4').css('color','#fff');
				$(this).children('a').children('p').css('color','#fff');
			});
			$(".common").mouseleave(function(){
				$(this).css('background','#fff');
				$('.common').children('a').children('h4').css('color','#000');
				$('.common').children('a').children('p').css('color','#747474');
			});
		},
		filters: {
			//时间转换格式（过滤器）
			times: function(val) {
				var now = new Date(val);

				var year = now.getYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				var hour = now.getHours();
				var minute = now.getMinutes();
				var second = now.getSeconds();
				//return year +"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;  
				return year + "-" + month + "-" + date
			}
		}
	}
</script>

<style lang="less">
	*{
		font-family: "微软雅黑";
	}
	/*内容区域*/
	
	.fir-content {
		width: 100%;
		padding-top: 2.5rem;
		background: url(../../../static/images/sy/syjlb-b.png) no-repeat 0px -800px;
	}
	
	.fir-info {
		padding: 40px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	/*广东宏远青少年训练营*/
	
	.xly .info-img img {
		width: 100%;
	}
	
	.pleft {
		padding-left: 40px;
	}
	
	.bigw {
		width: 55%;
	}
	
	.smallw {
		width: 45%;
	}
	
	.pright {
		padding-right: 40px;
	}
	
	.xly .info-text h2 {
		display: inline-block;
		font-size: 36px;
		font-weight: 100;
		padding-bottom: 10px;
		border-bottom: 1px solid #e60012;
		margin-bottom: 20px;
	}
	
	.xly .info-text p {
		line-height: 24px;
		letter-spacing: 3px;
		color: #666;
	}
	
	.xly .info-text .allinfos {
		margin: 20px;
		text-align: end;
	}
	/*三张并列图片*/
	.searvice{
		width: 1200px;
		margin: 0 auto;
		display: flex;
	}
	.searvice .common{
		border: 1px solid #dedede;
		padding-bottom: 27px;
		width: 360px;
		transition: all 0.6s;
		margin-bottom: 40px;
		text-align: center;
	}
	.searvice .common:hover{
		transform: scale(1.1);
	}
	.common img{
		width: 100%;
		height: 340px;
	}
	.common h4{
		font-weight: normal;
		color: #231815;
		text-align: center;
		height: 56px;
		line-height: 56px;
		font-size: 24px;
	}
	.common p{
		font-weight: normal;
		color: #747474;
		font-size: 16px;
		padding: 0 26px;
		line-height: 22px;
	}
	.courch{
		margin: 0 50px;
	}
	/*篮球俱乐部*/
	
	.lanqiu {
		width: 100%;
		background-color: #f2f2f2;
	}
	.textarea{
		background:transparent;
		border-style:none;
		overflow:hidden; 
		resize:none;
		width: 480px;
		height: 310px;
		outline: none;
		color: #7e7e7e;
	}
	/*消息，图片视频*/
	
	.video-info .info-img {
		position: relative;
	}
	
	.video-info .info-img video {
		width: 100%;
	}
	
	.video-info .info-img img {
		width: 100%;
	}
	.video-info .info-img .player{
		width: 68px;
		height: 68px;
		position: absolute;
		left: 50%;
		margin-left: -34px;
		top: 50%;
		margin-top: -34px;
	}
	.video-info li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 50px;
		border-bottom: 1px solid #C3C3C3;
		color: #666666;
	}
	
	.video-info li:hover {
		cursor: pointer;
		.news-title {
			color: #E60012;
		}
	}
	
	.video-info i {
		margin-right: 10px;
	}
	
	.newslist {
		width: 100;
		height: 306px;
		overflow-x: hidden;
		overflow-y: auto;
		color: #666;
	}
</style>