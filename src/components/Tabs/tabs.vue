<template>
  <div>
    <div class="title">
      <div
        :class="currentIndex === index ? 'current' : ''"
        v-for="(item, index) in titleList"
        @click="handleClickTitle(index)"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="line"></div>
    <div class="wrapper">
      <swiper
        class="mysrapper"
        :options="swiperOption"
        ref="mySwiper"
        v-if="showSwiper"
      >
        <swiper-slide v-for="item in list" :key="item.id">
          <img class="swiper-img" :src="item.imgUrl" />
        </swiper-slide>

        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
    </div>
  </div>
</template>

<script>
const c_swiper = document.getElementsByClassName('mysrapper')
export default {
  name: 'swipers',
  data() {
    return {
      currentIndex: 0,
      swiperOption: {
        // pagination: {
        //   el: '.swiper-pagination',
        // },
        // autoplay: {
        //   delay: 3000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false,
        // },
        on: {
          slideChange: () => {
            this.currentIndex = c_swiper[0].swiper.activeIndex
          },
        },
        // loop: true,
      },
      titleList: [
        {
          name: '龙庆峡',
        },
        {
          name: '春庆会',
        },
      ],
      list: [
        {
          id: '0001',
          imgUrl:
            'http://img1.qunarzz.com/piao/fusion/1801/1a/94428c6dea109402.jpg_640x200_2cf590d8.jpg',
        },
        {
          id: '0002',
          imgUrl:
            'http://img1.qunarzz.com/piao/fusion/1802/42/7c92b9a381e46402.jpg_640x200_1cdce2a4.jpg',
        },
      ],
    }
  },
  methods: {
    handleClickTitle(index) {
      this.currentIndex = index
      this.$refs.mySwiper.swiper.slideTo(index)
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    showSwiper() {
      return this.list.length
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper >>> .swiper-pagination-bullet-active {
  /* 三个箭头 >>> 代表样式穿透 */
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
  margin-top: 0.4rem;
  .swiper-img {
    width: 100%;
  }
}
.title {
  display: flex;
  div {
    flex-grow: 1;
    text-align: center;
    padding: 0.1rem 0;
  }
  .current {
    border-bottom: 10px solid #082;
  }
}
.line {
  width: 50%;
  height: 10px;
  background: red;
  position: relative;
  animation: example 1s linear 1s infinite alternate;
}
@keyframes example {
  0% {
    left: 0px;
  }
  // 25% {
  //   left: 200px;
  //   top: 0px;
  // }
  // 50% {
  //   left: 200px;
  //   top: 200px;
  // }
  // 75% {
  //   left: 0px;
  //   top: 200px;
  // }
  100% {
    left: 50%;
  }
}
</style>
