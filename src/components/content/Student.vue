<!--明星学员-->
<template>
	<div class="coach auto">
		<div class="students-list">
			<div class="students-per" v-for="item in studentList">
				<img :src="IP+'resources/img/'+item.imgPath"/>
				<p>{{item.introduction}}</p>
				<!--<span class="ellip">...</span>-->
				<!--<p>{{item.iname}}</p>-->
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
		data() {
			return {
				pagesize: 0,
				nowpage: 1,
				studentList: [],
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
				axios.get(that.IP+'train/homePage/studentList?isShow=0&order="desc"&limit=12&page='+page)
		        .then(function(res){
		        	console.log(res);
		        	that.studentList = res.data.page.list;
	        		that.pagesize = res.data.page.totalPage;
	        		console.log(that.studentList);
		        })
		        .catch(function(err){
		        	console.log(err);
		        })
			}
		},
		mounted:function(){
			this.ajaxs(1);
			setTimeout(function(){
				$(".pagenum").eq(0).addClass('sel');
			},300)
		}
	}
</script>

<style scoped lang="less">
	.coach{
		margin-bottom: 2.5rem;
	}
	.students-list{
		width: 100%;
		padding-top: 2.5rem;
		overflow: hidden;
		.students-per{
			position: relative;
		}
		p{
			width: 100%;
			height: 46px;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.ellip{
			position: absolute;
			right: 25px;
			bottom: 25px;
		}
	}
	.students-list div{
		width: 360px;
		padding-bottom: 20px;
		margin-bottom: 40px;
		float: left;
		border: 1px solid #ccc;
		text-align: center;
	}
	.students-list div:nth-child(3n+2){
		margin: 0 3.4rem;
	}
	.students-list div p{
		/*display: flex;
		justify-content: center;*/
		line-height: 23px;
		color: #666666;
		width: 310px;
		text-align: center;
		padding-left: 25px;
		box-sizing: border-box;
	}
	.students-list img{
		width: 360px;
		height: 340px;
		margin-bottom: 20px;
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
	/*.pagenum:nth-child(0){
		background-color: #E60012;
		color: #FCFCFC;
	}*/
	.sel{
		background-color: #E60012;
		color: #FCFCFC;
	}
</style>