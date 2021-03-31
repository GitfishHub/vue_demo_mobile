<template>
  <div>
    <div v-if="hideShow">
    <header class="header MobileHeight bgcolor">
      <div class="header-left">
        <img class="header-left-icon" src="../../../static/images/back2.png">
      </div>
      <span class="header-title">所在地选择</span>
      <span class="header-right"></span>
    </header>
    <div style="width: 100%;height: 0.88rem"></div>
    <scroll class="listview"
      ref="listview"
      :listen-scroll="true"
      :probe-type="3"
      :data="data"
      @scroll="handleScroll">
      <ul>
        <li class="list-group"
          v-for="(group, index) in data"
          :key="index"
          ref="listGroup">
          <h2 class="list-group-title border-topbottom">{{group.title}}</h2>
          <ul>
            <li class="list-group-item"
              v-for="(item, i) in group.items"
              :key="i" @click="handleProvinceClick(item.regionValue,item.regionCode)">
              <span class="name">{{item.regionValue}}</span>
            </li>
            
          </ul>
        </li>
        <div style="height:1.5rem;"></div>
      </ul>
      <!-- right alphabet -->
      <div class="list-shortcut"
        ref="listShortcut"
        @touchstart="handleShortcutTouchStart"
        @touchmove="handleShortcutTouchMove"
        @touchend="handleShortcutTouchEnd">
        <ul>
          <li class="item"
            v-for="(item, index) in shortcutList"
            :key="index"
            :data-index="index"
            :class="{'current': currentIndex === index}">
            {{item}}
          </li>
            
        </ul>
      </div>

      <div class="list-fixed" ref="fixed" v-show="fixedTitle">
        <p class="fixed-title border-bottom">{{fixedTitle}}</p>
      </div>
    </scroll>
    </div>
    </div>
</template>

<script>
  import Scroll from './scroll.vue'
  const TITLE_HEIGHT = 0.6;
  const ANCHOR_HEIGHT = 18;
export default {
  components: {
    Scroll
   },
  data () {
    return {
      cityData:[],
      hideShow:true,
      cityShow:false,
      data: [],
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this._calcGroupHeight()
      })
    },

    scrollY(newY) {
      const heightList = this.heightList
      // 当滚动到最顶部，newY > 0（对应操作：在最顶部向下拉）
      if (newY > 0) {
        newY = 0
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动，正常情况
      for (let i = 0; i < heightList.length - 1; i++) {
        let heightTop = heightList[i]
        let heightBottom = heightList[i + 1]
        if (-newY >= heightTop && -newY < heightBottom) {
          this.currentIndex = i
          this.diff = heightBottom + newY
          return
        }
      }
      // 当滚动到底部，且-newY 大于最后一个元素的上限
      this.currentIndex = heightList.length - 2
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  },
  computed: {
    shortcutList() {
       return this.data.map(group => {
        return group.title.slice(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  created() {
    this.getProvinceList();
    this.touch = {}
    this.heightList = []
  },
  mounted() {
    this.getProvinceList();
    // this.$nextTick(() => {
    //   // this._calcGroupHeight()
    //   console.log('this._calcGroupHeight()',this._calcGroupHeight())
    // })
  },
  methods: {
    getProvinceList(){
      let params = {}
       var url = 'static/data/citylist.json';
      this.$http.get(url, params).then( ({data}) => {
        if (data.code == 0) {
          this.data = data.data;
          console.log('this.data',this.data);
          }else {
          Toast({
            message: data.msg,
            position: 'middle',
            duration: 5000
          });
        }
      })
    },
   handleShortcutTouchStart(e) {
      const anchorIndex = +e.target.dataset['index'] // 获取到的是字符串
      this.touch.y1 = e.touches[0].pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    handleShortcutTouchMove(e) {
      this.touch.y2 = e.touches[0].pageY
      console.log('this.touch.y2',this.touch.y2)
      let deltaIndex = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT
      deltaIndex = Math.floor(deltaIndex)
      const anchorIndex = this.touch.anchorIndex + deltaIndex
      this._scrollTo(anchorIndex)
    },
    handleShortcutTouchEnd(e) {
       //this.$refs.listShortcut.style.backgroundColor = 'rgba(0, 0, 0, .3)'
    },
    handleScroll(pos) {
      this.scrollY = pos.y
     },
    _calcGroupHeight() {
      this.heightList = []
      const listEl = this.$refs.listGroup
      let height = 0
      this.heightList.push(height)
     for (let i = 0; i < listEl.length; i++) {
        let item = listEl[i]
        height += item.clientHeight
        this.heightList.push(height)
      }
    },
    _scrollTo(index) {
      // 点击上下多余部分
      if (Object.is(index, null) || Object.is(index, NaN)) {
        return
      }
      // 边界情况
      if (index < 0) {
        index = 0
      }
      console.log('this.heightList',this.heightList)
      if (index > this.heightList.length - 2) {
        index = this.heightList.length - 2
      }
      this.scrollY = -this.heightList[index]
      console.log('this.$refs.listGroup[index]',this.$refs.listGroup[index])
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    handleProvinceClick(text,val){
      console.log(text,val)
    }
    
  }
}
</script>

<style scoped>
 .header .header-left {
    width: 1rem;
    height: .88rem;
  }
.header .header-left .header-left-icon{
    width: .16rem;
    height: .3rem;
    position: absolute;
    top:0.3rem;
  }
.listview{
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
   }
.listview .list-group .list-group-title{
      height:30px;
      padding-left: 0.4rem;
      background-color: #eee;
      line-height: 30px;
      font-size: 0.28rem;
      font-family:SourceHanSansCN-Regular,sans-serif;
      font-weight:400;
      color:rgba(164,164,164,1);
    }
.listview .list-group  .list-group-item{
        display: flex;
        align-items: center;
        height: 50px;
        padding-left: 0.4rem;
    }
.listview .list-group  .list-group-item .name{
      width: 100%;
      font-size: 0.28rem;
      font-family:SourceHanSansCN-Regular,sans-serif;
      font-weight:400;
      color:rgba(51,51,51,1);
      height: 1rem;
      line-height: 1rem;
      border-bottom: 0.01rem solid #eee;
    }
.list-shortcut{
      z-index: 1;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 0.4rem;
      padding: 0.4rem 0;
      text-align: center;
 }
.list-shortcut .item{
      padding: 0.06rem;
      line-height: 1;
      color:rgba(79,174,239,1);
      font-size: 0.24rem;
    }
.list-shortcut .current{
      color: #ffcd32
 }

.list-fixed{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
.list-fixed .fixed-title{
    height: 0.6rem;
    line-height: 0.6rem;
    padding-left: 0.4rem;
    font-size: 0.28rem;
    font-family:SourceHanSansCN-Regular,sans-serif;
    font-weight:400;
    background-color: #eee;
}
.city{
   height: 100%;
   background-color: #fff;
 }
 .city .header .header-left {
   width: .16rem;
   height: .3rem;
 }
 .city .main{
   height: 100%;
 }
 .city .main .main-content .letter{
   position: fixed;
   width: 100%;
   padding-left: 0.3rem;
   line-height: 0.6rem;
   font-size:.3rem;
   background-color: #eee;
 }
 .city .main .main-content .letter-province{
   width: 100%;
   padding-left: 0.3rem;
   height: 1rem;
   line-height: 1rem;
   border-bottom: 0.01rem solid #eee;
 }
</style>
