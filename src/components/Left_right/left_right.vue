<template>
     <div>
         <div class="topp"> 左右联动</div>
         <div class="pick-content">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in goods" class="menu-item flex-center" :class="{'current':currentIndex == index}" @click="selectMenu(index,$event)">
						<span class="text" style="line-height: 1.5rem;font-size:17px">
							{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<!--左边列表End-->

			<!--右边列表Start-->
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul>
					<li v-for="item in goods" class="food-list food-list-hook">
						<h1 class="title" v-show="item.dealerList.length>0">{{item.name}}</h1>
						<ul>
							<li v-for="food in item.dealerList" class="food-item border-bottom">
								<div class="content" @click="changePage(food)">
									<h2 class="name" style="font-size:14px">{{food.name}}</h2>
                	<p class="desc"  style="font-size:14px">地址:{{food.address}}</p>
								</div>
								<!-- <img src="../../../static/images/PickUpCar/nire@2x.png" @click="$router.push({path:'/storedetails',query:{no:food.no}})" alt="" /> -->
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<!--右边列表End-->
     </div>
     </div>
</template>
<script>
import BScroll from 'better-scroll'
	export default {
		name: 'PickUpCarShop',
		data() {
		return {
				goods: [], //模拟数据
				listHeight: [], //每个模块区间的高度
				scrollY: 0,  //右侧列表的纵轴y值,跟踪y值的变化利用better-scroll一个接口prototype
			}
		},
		methods: {
			_initScroll () {  //初始化better-scroll
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				})  //第一个参数是dom对象,第二个是options(json对象)
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					click: true,
                    probeType: 3   //监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发,probeType也相当于于一个探针,返回我们实时滚动的位置
				})
			   this.foodsScroll.on('scroll', (pos) => {  //监听scroll,拿到返回的位置
                    this.scrollY = Math.abs(Math.round(pos.y));  //滚动位置四舍五入取绝对值
					//next: scrollY和左边的列表索引做映射->计算属性
               });
			},
			 _calculateHeight() {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');//计算每一个模块的高度
                let height = 0;
                this.listHeight.push(height);
              for (let i = 0; i < foodList.length; i++) { //获取每个模块li的高度，放入数组中
                height += foodList[i].clientHeight;
                this.listHeight.push(height);
				}
		},
      //左右连动映射
      selectMenu(index, event) {
		$('.menu-item').eq(index).addClass('current').siblings().removeClass('current')
        //自己开发的event._constructed是为true,pc浏览器没有此事件
        // if (!event._constructed) {
        //   return;
        // }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
			let el = foodList[index];
		   console.log(el)
           this.foodsScroll.scrollToElement(el,300);
        },
	   handleAreaCode () {
			    var data=[
					{name:'徐汇区',dealerList:[{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"}]},
					{name:'闵行区',dealerList:[{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"}]},
					{name:'虹口区',dealerList:[{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"}]},
					{name:'浦东区',dealerList:[{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"}]},
					{name:'徐汇区',dealerList:[{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},{no: "TSL012018102403454427902", name: "大冇汽车经销商", address: "田林路200号"},]},
					]
	   		 this.goods = data 
				  this.$nextTick(() => {
                  this._initScroll(); //初始化better-scroll
	              this._calculateHeight(); //拿出右侧列表每个模块的高度
	          });
	   	}
		},
		computed: {
			currentIndex() { //计算当前scrollY位置所在的区间,
	
        for (let i = 0; i < this.listHeight.length; i++) {
		  let height1 = this.listHeight[i];  //当前索引值高度
          let height2 = this.listHeight[i + 1];//listHeight[length]返回undefined,所以可以用!height2做判断不是最后一个
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {//如果是最后一个模块或者当前这个模块
			return i
          }
        }
        return 0; //listHeight没有的话,直接返回0
      }
		},
		mounted () {			
			this.handleAreaCode() 
		}
	}
</script>
<style scoped>
.topp{
    position: fixed;
    top:0;
    left:0;
    height:50px;
    width:100%;
	font-size: 14px;
    line-height: 50px;
    text-align: center;
    background-color: pink;
}
html, body {
		height: 100%;
}
	/*搜索输入模块*/
.searchdiv {
  position: fixed;
  width: 100%;
  padding: 0.2rem 0;
  justify-content: center;
  background: #fff;
  z-index: 100;
}
.searchdiv>div {
	width: 92%;
    height: 0.66rem;
	border-radius: 0.4rem;
	background-color: #f1f1f1;
}
.searchdiv span {
  color: #4a4a4a;
  font-size: 0.28rem;
}
#searchinput {
   outline: none;
   border: none;
   border-radius: 0.4rem;
   height: 0.66rem;
   background-color: #f1f1f1;
}

.searchicon {
    width: 0.28rem;
    height: 0.28rem;
    margin-left: 25%;
}
.pickup-carshop {
	height: 100%;
}
.pick-content {
	display: flex;
	position: absolute;
    top: 1.5rem;
    bottom: 4rem;
    width: 100%;
    height: 86vh;
    overflow: hidden
}
/*左边列表*/
.menu-wrapper {
	flex: 0 0 2rem;
	width: 2rem;
	/*height: 100%;*/
	background: #F7F7F7;
}
.menu-item {
   height: 1.5rem;
   color: #333333;
   text-align: center;
}
/*右边列表*/
.foods-wrapper {
 	flex: 1;
/*height: 100%;*/
	background: #FFFFFF;
}
.title {
	height: .6rem;
	line-height: .6rem;
	text-align: left;
	font-size: .24rem;
	color: #464646;
	background: #F7F7F7;
	text-indent: .16rem;
}
.food-item {
    display: flex;
    align-items: center;
    height: 1.42rem;
	margin:0 .12rem
}
.food-item>img {
    width: 1.16rem;
    height: 1.08rem;
}
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 75%;
    height: 100%;
    line-height: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
 }
 .content > p {
     width: 100%;
     text-overflow: ellipsis;
     white-space: nowrap;
    
 }
 .name {
     color: #2196F3;
 }
 .desc {
     font-size: .24rem;
     color: #9A9A9A;
 }
 .current {
     background: pink;
     color: #333333;
 }
</style>



