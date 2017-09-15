<!--训练营介绍-->
<template>
	<div class="xly">
		<div class="kuang bac">
			<!--<div class="auto">
				<img class="widall" src="../../../static/images/xly/2.png"/>
				<p>广东宏远篮球俱乐部成立于1993年。是全国首家民营职业篮球俱乐部。期间，共取得8次CBA总冠军以及2次全运会男篮冠军。培养出了NBA球员易建联，输送了包括易建联、朱芳雨、王仕鹏、陈江华、周鹏、刘晓宇等在内的现役国家队队员。</p>
			</div>-->
			<div v-html="introduce.richText" class="auto"></div>
		</div>
		<div class="kuang  auto" v-if="flag">
			<img :src="URL" alt="联盟成员" />
			<p>{{member.content}}</p>
		</div>
		<div class="auto" v-html="detail.richText" id="richText"></div>
		<div class="auto detail" v-if="detailFlag"><button @click="gonew">了解详情</button></div>
		
		<!--<div class="kuang">
			<div class="auto">
				<img class="widall" src="../../../static/images/xly/3.png"/>
				<p>广东宏远青少年训练营由广东宏远体育发展有限公司创办，面向4-18岁青少年的专业篮球训练营。</p>
				<p>广东宏远青少年训练营与全省重点初高中、大学合作，铺设人才输送通道，拥有篮球名宿、体育高校教授与专家参与编写的教纲教。</p>
				<p>CBA职业俱乐部的教练团队资源，与国际接轨的篮球训练理念，由广东宏远俱乐部顶级球星组成的教练团队，职业球队道路从这里开始。</p>
				<p>我们拥有CBA八冠王的底蕴和实力，以及永不言败的篮球哲学。</p>
			</div>
		</div>
		<div class="kuang bac">
			<div class="auto">
				<img class="widall" src="../../../static/images/xly/1.png"/>
				<p>广东宏远体育发展有限公司正式成立，将着力在体育培训、赛事承办等体育服务领域进行业务突破。在1993年就成立了中国第一家体育俱乐部的广东宏远集团，是中国最早涉足体育产业的民营企业，今天在体育产业踏出新的一步，全面进入体育服务行业。</p>
			</div>
		</div>
		<div class="kuang">
			<div class="auto">
				<img class="widall" src="../../../static/images/xly/4.png"/>
				<p>广东宏远篮球俱乐部成立于1993年。是全国首家民营职业篮球俱乐部。期间，共取得8次CBA总冠军以及2次全运会男篮冠军。培养出了NBA球员易建联，输送了包括易建联、朱芳雨、王仕鹏、陈江华、周鹏、刘晓宇等在内的现役国家队队员。</p>
				<div class="allinfos" @click="navswitch(5)" >
					<a href="javascript:;"><img src="../../../static/images/sy/xq.png"/></a>
				</div>
					
			</div>
		</div>-->
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		components:{
			
		},
		data() {
			return {
				introduce: {},
				member:{},
				detail:{},
				flag:true,
				IP: 'http://119.23.28.239:8080/',
				URL:'',
				detailFlag: true
			}
		},
		methods:{
			navswitch(num){
				this.$emit("navswitch",num);
			},
			gonew(){
				var that = this;
				axios.get(that.IP+'train/homePage/leagueMembersText/1')
		        .then(function(res){
		        	that.detail = res.data.data;
		        	console.log(that.detail);
		        	that.flag = false;
		        	that.detailFlag = false;
		        })
		      	.catch(function(err){console.log(err)});
			}
		},
		mounted(){
			var that = this;
			//训练营介绍
			axios.get(that.IP+'train/homePage/summary?isShow=1')
		        .then(function(res){
		        	
		        	that.introduce = res.data.data;
		        	console.log(that.introduce);
		        })
		      	.catch(function(err){console.log(err)});
		    //联盟成员
			axios.get(that.IP+'train/homePage/leagueMembersImg/1')
		        .then(function(res){
		        	that.member = res.data.data;
		        	that.URL = that.IP+'resources/img/'+that.member.imgPath;
		        	console.log(that.URL);
		        })
		      	.catch(function(err){console.log(err)});
		}
	}
</script>

<style scoped>
	.xly{
		width: 100%;
		margin: 2.5rem 0;
		
	}
	.kuang{
		width: 100%;
		padding: 2.5rem 0;
	}
	.bac{
		background-color: #F2F2F2;
	}
	p{
		letter-spacing: 2px;
		font-size: 1rem;
		line-height: 1.8rem;
		/*margin: 20px 0;*/
		margin-top: 1.5rem;
	}
	.widall{
		width: 100%;
	}
	.allinfos{
		margin: 1.25rem;
		text-align: end;
	}
	.detail{
		text-align: right;
	}
	.detail button{
		width: 120px;
		height: 40px;
		border: 1px solid #ed626d;
		border-radius: 5px;
		background: #fff;
		color: #ed626d;
		font-size: 16px;
	}
	#richText{
		padding-top: 40px;
	}
</style>