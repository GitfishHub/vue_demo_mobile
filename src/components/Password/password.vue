<template>
  <div>
    <!-- 使用字体图标 -->
    <div>
      <i class="iconfont icon-check-circle"></i>
    </div>
    <button @click="btn" class="bottom-btn">密码框</button>
    <!-- 密码框开始 -->
    <mt-popup v-model="popupVisible" position="middle">
      <div class="con">
        <div class="del">
          <img @click="cancel" src="../../../static/images/delete@3x.png" alt="" style="width:.28rem">
          <div style="font-size:.36rem;color:#222">请输入PIN码</div>
          <span></span>
        </div>
       <div class="pin-code flex maincenter cocenter">
          <div id="pinCon">
            <input @click="onTypewriting" v-model="pinNumber" class="pin-input" maxlength="6" type="text" readonly/>
          </div>
        </div>
      </div>
    </mt-popup>
    <div class="typer" v-if="IsShow">
      <ul class="flex yy">
        <li class="typer-num" v-for="(item,index) in keyNums" :key="index" :class="{'is-A': item=='A','is-OK':item=='OK','is-Del':item=='Del'}" @click="input(item)">{{item}}</li>
      </ul>
    </div>
    <!-- 密码框结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: true,
      pinNumber: "",
      IsShow: false,
      keyNums: []
    };
  },
  methods: {
    onTypewriting() {
      this.IsShow = true;
      this.produceArray();
    },
    //关闭PIN码弹框
    cancel() {
      // this.IsShow = false;
      // this.popupVisible = false;
    },
    produceArray() {
      var that = this;
      var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var arr2 = [];
      for (var i = 0; i < 12; i++) {
        var randomnumber = that.randomnum(0, arr.length);
        if (i == 9) {
          arr2.push("关闭");
        } else if (i == 11) {
          arr2.push("Del");
        } else {
          arr2.push(arr[randomnumber]);
          arr.splice(randomnumber, 1);
        }
      }
      that.keyNums = arr2;
    },
    //随机数
    randomnum(min, max) {
      var num = Math.floor(Math.random() * (max - min) + min);
      return num;
    },
    //输入框事件
    input(item) {
      if (item == "关闭") {
        this.IsShow = false;
        return;
      }
      if (item == "Del") {
        this.pinNumber = this.pinNumber.slice(0, -1);
        return;
      }
      if (this.pinNumber.length < 6) {
        this.pinNumber = this.pinNumber + item;
      } else {
      }
    },
    btn() {
      this.popupVisible = !this.popupVisible;
    }
  },
  //检测输入框
  watch: {
    pinNumber(newVal, oldVal) {
      if (this.pinNumber.length == 6) {
        var PIN = this.pinNumber;
        this.popupVisible = !this.popupVisible;
        (this.IsShow = false), (this.pinNumber = "");
      }
    }
  }
};
</script>

<style scoped>
/* 密码框样式开始 */
.con {
  width: 6rem;
  height: 3rem;
  padding: 0.2rem 0.4rem;
}
.del {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  height: 0.88rem;
}
.pin-code {
  height: 2rem;
  width: 100%;
}
.pin-code > div > input {
  display: block;
  width: 5.6rem;
  font-size: .3rem;
  height: 0.94rem;
  text-indent: 0.4rem;
  letter-spacing: 0.77rem;
  border: none;
  outline: none;
  background: url(../../../static/images/border@2x.png) no-repeat center;
  background-size: 100%;
}
.typer {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 4.5rem;
  width: 100%;
  padding-top: 0.1rem;
  z-index: 9999;
}
.typer li {
  float: left;
  height: 0.7rem;
  margin: 0.1rem 0.05rem 0;
  color: #333;
  text-align: center;
  font-size: 0.32rem;
  line-height: 0.7rem;
  background-color: #ccc;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  border-radius: 0.1rem;
}
.typer li.typer-num {
  width: 31%;
  background-image: -webkit-linear-gradient(
    125deg,
    #147b96,
    #e6d205 25%,
    #147b96 50%,
    #e6d205 75%,
    #147b96
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s infinite linear;
}
.typer li.typer-num.is-A {
  margin-left: 0.31rem;
}
.typer li.typer-num.is-OK {
  width: 0.8rem;
  margin-left: 0.1rem;
}
@-webkit-keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
.yy {
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
}
/* 密码框样式结束 */
</style>
