<template>
	<div class="icons">
		<swiper :options="swiperOption" style="margin-top:2rem">
			<swiper-slide v-for="(icon, index) in pages" :key="index">
				<div class="icon" v-for="item in icon" :key="item.id">
					<div class="icon-img">
						<img @click="toMap(item.id)" class='icon-img-content' :src="item.imgUrl" alt="" />
					</div>
					<p class="icon-desc">{{item.desc}}</p>
				</div>
			</swiper-slide>
		</swiper>

	</div>
</template>

<script>
export default {
  name: "icons",
  data() {
    return {
      swiperOption: {
        autoplay: false
      },
      list: [
        {
          id: "0001",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
          desc: "密码框"
        },
        {
          id: "0004",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/35/2640cab202c41b02.png",
          desc: "左右联动"
        },

        {
          id: "0008",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/7f/b1ea3c8c7fb6db02.png",
          desc: "图片上传"
        },

        {
          id: "00010",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/a9/ffc620dbda9b9c02.png",
          desc: "MySlider"
        },

        {
          id: "00018",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/7f/b1ea3c8c7fb6db02.png",
          desc: "kim6(滑动导航)"
        },
        {
          id: "00019",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/d0/e09575e66f4aa402.png",
          desc: "singer"
        },
        {
          id: "00020",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
          desc: "Register"
        },
        {
          id: "00021",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
          desc: "touchslider"
        },
        {
          id: "00022",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
          desc: "侧边滑动"
        },
        {
          id: "00023",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
          desc: "vue-awesome-swiper"
        },
         {
          id: "00066",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
          desc: "betterscroll"
        }
      ]
    };
  },

  computed: {
    pages() {
      const pages = [];
      this.list.forEach((item, index) => {
        //把一位数组拆解为二维数组
        const page = Math.floor(index / 8); //页码,如index为2 2/8向下取整为0,0是第一个页面
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>


.icons >>> .swiper-container {
  height: 0;
  padding-bottom: 50%;
}

.icons {
  margin-top: 0.1rem;

  .icon {
    position: relative;
    overflow: hidden;
    float: left;
    width: 25%;
    height: 0;
    padding-bottom: 25%;

    .icon-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0.44rem;
      box-sizing: border-box;
      padding: 0.1rem;

      .icon-img-content {
        display: block;
        margin: 0 auto;
        height: 100%;
      }
    }

    .icon-desc {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      font-size: 14px;
      height: 0.44rem;
      line-height: 0.44rem;
      color:#ccc;
      text-align: center;
      
    }
  }
}
</style>