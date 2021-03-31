<template>
     <div class="my-recommend" ref="recommendRef">
    <!-- better-scroll 滚动组件，当请求到 lists 时才渲染 -->
  
      <div class="recommend-content">
        <!-- 轮播图，当请求到 recommends 时才渲染 -->
        <div v-if="recommends.length" class="slide-wrapper">
          <slider>
            <div v-for="recommend in recommends">
              <a :href="recommend.linkUrl">
                <img  :src="recommend.picUrl" class="needsclick">
              </a>
            </div>
          </slider>
        </div>
    </div>

     
</div>
</template>
<script >
import { getRecommend } from "./recommend.js";
import Slider from "./MySlider.vue";

export default {
  components: {
    Slider
  },
  data() {
    return {
      recommends: []
    };
  },
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === 0) {
          console.log(res);
          this.recommends = res.data.slider;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.my-recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slide-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: .3rem;
        color:red;
      }

      .item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: .4rem;

          .name {
            margin-bottom: 10px;
            color: red;
          }

          .desc {
            color:red;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
