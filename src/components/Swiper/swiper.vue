<template>
	<div class="wrapper">
		<swiper :options="swiperOption" ref="mySwiper"  v-if="showSwiper">
			 <swiper-slide v-for="(item, index) in list" :key="item.id">
				<img class="swiper-img" :src="item.imgUrl" />
			</swiper-slide>
			
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>

</template>

<script>
export default {
  name: "swipers",
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        autoplay:2000,
        loop: true
      },
      list: [
        {
          id: "0001",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1801/1a/94428c6dea109402.jpg_640x200_2cf590d8.jpg"
        },
        {
          id: "0002",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1802/42/7c92b9a381e46402.jpg_640x200_1cdce2a4.jpg"
        },
       ]
    };
  },
  
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    showSwiper() {
      return this.list.length;

      
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper >>> .swiper-pagination-bullet-active { /* 三个箭头 >>> 代表样式穿透 */
	background: red;
}

.wrapper >>> .swiper-container {
	width: 100% !important;
	height: 5.34rem;
}

.wrapper >>> .swiper-img {
	height: 4.34rem;
	/* background-size: 100% 100% */
}

.wrapper {
	width: 100%;
	height: 100%;
	padding-bottom: 31.25%;
	overflow: hidden;

	.swiper-img {
		width: 100%;
	}
}
</style>