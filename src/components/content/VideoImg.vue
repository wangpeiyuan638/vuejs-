<!--视频图片-->
<template>
	<div class="coach auto">
		<div class="students-list">
			<div  v-for="(item,index) in videoList" style="position: relative;">
				<img class="player" src="../../../static/images/player.png" v-if="item.videoPath || item.ilink" @click="playerWin(IP+'resources/img/'+item.videoPath, item.ilink,index)"/>
				<img :src="IP+'resources/img/'+item.imgPath"  @click="playerWin(IP+'resources/img/'+item.videoPath, item.ilink,index,item.videoPath)" />
				<p>{{item.title}}</p>
			</div>
			<!--<div class="info-img smallw">
				<video v-show="isplaying" id="myvideo" autobuffer muted controls :src="video">
					<source :src="video" type="video/mp4"></source>
				</video>
				<img v-show="!isplaying" @click="startplay" :src="videoImg" alt="俱乐部" />
			</div>-->
		</div>
		<div class="pages-icon" v-if="pagesize > 1">
			<button class="prenext" @click="teachpage(-1)">上一页</button>
			<button class="pagenum" v-for="ind in pagesize" @click="teachpage(ind)" :key="ind">{{ind}}</button>
			<button class="prenext" @click="teachpage(-2)">下一页</button>
		</div>
		<div class="coverWin" v-show="showPlayer" @click="playerWin()">
			<div class="mask">
				<!--<video autobuffer muted controls :src="IP+'resources/img/'+item.videoPath"></video>-->
				<video id="playing" autobuffer autoplay="autoplay" muted controls :src="playerSrc" width="600"></video>
			</div>
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
				videoList: [],
				IP: 'http://119.23.28.239:8080/',
				showPlayer: false,
				playerSrc: '',
				playerbtn:''
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
				axios.get(that.IP+'train/homePage/videoList?isShow=0&limit=12&page='+page)
		        .then(function(res){
		        	console.log(res);
		        	that.videoList = res.data.page.list;
	        		that.pagesize = res.data.page.totalPage;
	        		console.log(that.pagesize);
		        })
		        .catch(function(err){
		        	console.log(err);
		        })
			},
			playerWin (src, linkTo,index,hasmovie) {
				this.showPlayer = !this.showPlayer;
				var playertarget = document.getElementById("playing");
				playertarget.pause();
				if (linkTo){
					window.open(linkTo);
					this.showPlayer = false;
				}else if((hasmovie+'').length == 0){
					this.showPlayer = false;
					console.log(src.split('img/')[1]);
				}else{
					this.playerSrc = src;
				}
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

<style scoped>
	.coach{
		margin-bottom: 2.5rem;
		position: relative;
	}
	.students-list{
		width: 100%;
		padding-top: 2.5rem;
		overflow: hidden;
	}
	.students-list div{
		width: 360px;
		padding-bottom: 25px;
		margin-bottom: 40px;
		float: left;
		border: 1px solid #ccc;
		text-align: center;
	}
	.students-list div:nth-child(3n+2){
		margin: 0 3.4rem;
	}
	.students-list div p{
		/*display: flex;*/
		/*justify-content: center;*/
		line-height: 23px;
		color: #666666;
		width: 310px;
		text-align: center;
		padding-left: 25px;
		box-sizing: border-box;
		height: 46px;
		overflow: hidden;
	}
	.students-list img{
		width: 360px;
		height: 340px;
		margin-bottom: 20px;
	}
	.mask{
		width: 600px;
		height: 400px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-400px,-200px);
		z-index: 999;
	}
	.students-list .player{
		position: absolute;
		width: 40px;
		height: 40px;
		z-index: 10;
		left: 160px;
		top: 150px;
	}
	/*.mask video{
		width: 600px;
		height: 100%;
	}*/
	.coverWin{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0,0,0,0.516);
		z-index: 998;
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