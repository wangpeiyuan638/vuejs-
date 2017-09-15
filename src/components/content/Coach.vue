<!--教练团队-->
<template>
	<div class="coach auto">
		<div class="teachs">
			<div class="director">
				<div class="director-img">
					<img :src="IP+'resources/img/'+coach.imgPath" alt="请设置总教练"/>
				</div>
				<div class="director-introduce">
					<h3>{{coach.iname}}（教学总监）</h3>
					<textarea class="textarea" style="width: 100%;">{{coach.introduction}}</textarea>
				</div>
			</div>
			<div class="others clear">
				<div class="people" v-for="item in coachList">
					<div class="people-img">
						<img :src="IP+'resources/img/'+item.imgPath" style=""/>
					</div>
					<div class="people-introduce">
						<h3>{{item.iname}}（教练员）</h3>
						<textarea class="textarea" readonly="readonly" contenteditable="true">{{item.introduction}}</textarea>
					</div>
				</div>
			</div>
		</div>
		<div class="pages-icon" v-if="pagesize>1">
			<button class="prenext" @click="teachpage(-1)">上一页</button>
			<button class="pagenum" v-for="ind in pagesize" @click="teachpage(ind)" :key="ind">{{ind}}</button>
			<button class="prenext" @click="teachpage(-2)">下一页</button>
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
				pagesize: 0,
				nowpage: 1,
				coachList:[],
				coachImg: '',
				coach: {},
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
				var that = this;
				axios.get(that.IP+'train/homePage/coachList?isShow=0&sort=0&limit=10&page='+page)
		        .then(function(res){
		        	console.log(res);
		        	that.coachList = res.data.page.list;
		        	that.pagesize = res.data.page.totalPage;
		        })
		        .catch(function(err){
		        	console.log(err);
		        })
			},
			setcoach(){
				var that = this;
				axios.get(that.IP+'train/homePage/queryHeadCoach')
		        .then(function(res){
		        	console.log(res);
		        	that.coach = res.data.data;
//		        	console.log(that.coach);
		        })
		        .catch(function(err){
		        	console.log(err);
		        })
			}
		},
		mounted:function(){
			this.ajaxs(1);
			this.setcoach();
			setTimeout(function(){
				$(".pagenum").eq(0).addClass('sel');
			},300)
			
		}
	}
</script>

<style scoped>
	.teachs{
		/*overflow: hidden;*/
	}
	.others{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
	.director,.people{
		margin: 2.5rem 0;
		display: flex;
		align-items: center;
	}
	.people:nth-child(2n){
		padding-left: 40px;
		box-sizing: border-box;
	}
	.director-img,.people-img{
		width: 252px;
		height: 365px;
		margin-right: 40px;
	}
	img{
		width: 253px;
		height: 253px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.director-introduce{
		width: 75%;
	}
	.people-introduce,.people{
		width: 600px;
	}
	h3{
		font-size: 24px;
		color: #E60012;
		font-weight: 200;
		margin-bottom: 1.25rem;
	}
	p{
		line-height: 1.5rem;
		font-size: 1rem;
	}
	.textarea{
		background:transparent;
		border-style:none;
		/*overflow:scroll;*/ 
		resize:none;
		width: 350px;
/*		height: 320px;*/
		outline: none;
		font-size: 16px;
		font-family: "微软雅黑";
		/*overflow-y: visible;*/
		line-height: 26px;
	}
	
	/*页码显示*/
	.pages-icon{
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		text-align: end;
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