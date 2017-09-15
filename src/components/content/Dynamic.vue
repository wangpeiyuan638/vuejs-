<!--训练营动态详情-->
<template>
	<div class="xly">
		<div class="content">
			<div class="newslist auto" v-if="newsinfo < 0">
				<ul>
					<li v-for="(val,ind) in trainDynamicList" @click="gonews(val,ind)" class="auto">
						<div class="news-title"><i class="fa fa-caret-right" aria-hidden="true"></i>{{val.title}}</div>
						<div class="news-time">{{val.idate.split(' ')[0]}}</div>
					</li>
				</ul>
			</div>
			<div class="kuang" v-if="newsinfo>=0">
				<div class="auto" v-html="trainDynamicInfo.content">
					<!--{{trainDynamicInfo.content}}-->
					<!--<img src="../../../static/images/dtxq/xqtp.png"/>
					<p>广东宏远青少年训练营由广东宏远体育发展有限公司创办，面向4-18岁青少年的专业篮球训练营。</p>
					<p>广东宏远青少年训练营与全省重点初高中、大学合作，铺设人才输送通道，拥有篮球名宿、体育高校教授与专家参与编写的教纲教。</p>
					<p>CBA职业俱乐部的教练团队资源，与国际接轨的篮球训练理念，由广东宏远俱乐部顶级球星组成的教练团队，职业球队道路从这里开始。</p>
					<p>我们拥有CBA八冠王的底蕴和实力，以及永不言败的篮球哲学。</p>-->
				</div>
			</div>
		</div>
		<div class="pages-icon" v-if="pagesize>0">
			<button class="prenext" @click="teachpage(-1)">上一页</button>
			<button class="pagenum" v-for="ind in pagesize" @click="teachpage(ind)" :key="ind">{{ind}}</button>
			<button class="prenext" @click="teachpage(-2)">下一页</button>
		</div>	
	</div>
</template>

<script>
	import axios from 'axios'
	import bus from "../../bus.js"
	export default {
		components:{
			
		},
		props:['news','newsinfo'],
		data() {
			return {
				trainDynamic: {},
				trainDynamicList: [],
				trainDynamicInfo: {},
				pagesize: 0,
				nowpage: 1,
				IP: 'http://119.23.28.239:8080/'
			}
		},
		watch: {
			nowpage: function(newpage, oldpage) {
				this.ajaxs(newpage);
			}
		},
		methods:{
			teachpage(num){
				console.log(num);
				if(num == -1) {
					//上一页
					if(this.nowpage <= 1) {
						return;
					} else {
						this.nowpage--;
					}
				} else if(num == -2) {
					//下一页
					if(this.nowpage >= this.pagesize) {
						return;
					} else {
						this.nowpage++;
					}
				} else {
					this.nowpage = num;
				}
				console.log(this.nowpage);
				$(".pagenum").removeClass("sel").eq(this.nowpage-1).addClass('sel');
			},
			ajaxs(page) {
				//训练营动态列表
				var that = this;
				axios.get(that.IP+'train/homePage/trainDynamicList?limit=10&page='+page)
		        .then(function(res){
		        	console.log(res);
		        	that.trainDynamic = res.data.page;
		        	that.trainDynamicList = res.data.page.list;
		        	that.pagesize = res.data.page.totalPage;
	//	        	console.log(that.trainDynamicList);
		        })
		        .catch(function(err){
		        	console.log(err);
		        })
			},			
			gonews(val,ind){
				this.pagesize = 0;
				var id = val.id;
				console.log(id);
				var that = this;
				this.$emit("tonews",ind);
				axios.get(that.IP+'train/homePage/trainDynamicInfo/'+id)
		        .then(function(res){
//		        	console.log(res);
		        	that.trainDynamicInfo = res.data.data;
//		        	console.log(that.trainDynamicInfo);
		        })
		        .catch(function(err){
		        	console.log(err);
		        })
			}
		},
		mounted(){
			var that = this;
			this.trainDynamicInfo = JSON.parse(sessionStorage.getItem('result'));
			var that = this;
				axios.get(that.IP+'train/homePage/trainDynamicList?limit=10&page=1')
		        .then(function(res){
		        	console.log(res);
		        	that.trainDynamic = res.data.page;
		        	that.trainDynamicList = res.data.page.list;
		        	if(that.trainDynamicInfo){
		        		that.pagesize = 0;
		        	}else{
		        		that.pagesize = res.data.page.totalPage;
		        	}
		        	
	//	        	console.log(that.trainDynamicList);
		        })
		        .catch(function(err){
		        	console.log(err);
		        })
			setTimeout(function(){
				$(".pagenum").eq(0).addClass('sel');
			},300)
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

<style scoped lang="less">

	/*新闻具体*/
	.xly{
		width: 100%;
		/*margin: 40px 0;*/
		margin-bottom: 2.5rem;
	}
	/*新闻列表*/
	.newslist {
		width: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.newslist li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 50px;
		border-bottom: 1px solid #C3C3C3;
		color: #666666;
	}
	
	.newslist li:hover {
		cursor: pointer;
		.news-title {
			color: #E60012;
		}
	}
	
	.newslist i {
		margin-right: 10px;
	}
	/*详情*/
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
	img{
		width: 100%;
	}
	.allinfos{
		margin: 1.25rem;
		text-align: end;
	}
	/*页码显示*/
	.pages-icon{
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		text-align: end;
		margin-top: 30px;
		padding-right: 340px;
	}
	button{
		border: none;
		background-color: #F2F2F2;
		height: 3rem;
		border-radius: 5px;
		margin: 0 3px;
	}
	button:active{
		background-color: #e3e3e3;
	}
	.prenext{
		width: 6rem;
	}
	.pagenum{
		width: 3rem;
	}
	.sel{
		background-color: #E60012;
		color: #FCFCFC;
	}
</style>