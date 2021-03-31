<template>
     <div class="ret" ref="box">
         <h4 style="color:#fff;padding:.5rem;font-size:.5rem">欢迎登陆</h4>
         <div style="border-bottom:2px solid #fff;">
            <input  @focus.native.capture="changeFocus" v-model="telNumber" type="tel" maxlength="13" style="background:none;margin-left:.5rem;color:#fff;font-size:.6rem" placeholder="请输入手机号">
         </div>
        
       <div style="padding:.5rem">
           <button @click="fn()" :class="{active: flag}" class="verificationCode" style="font-size:.5rem">获取验证码</button>
       </div>
        <div class="bottom-img">
     
    </div>
        </div>
</template>
<script>
export default {
  data() {
    return {
      screenHeight: $(window).height(), //初始获取整个屏幕的高度
      telNumber: "",
      flag:false
    };
  },
  mounted() {
    //解决input框输入时，背景图变形的问题
    var thisWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    this.$refs.box.style.minWidth = thisWidth + "px";
    this.$refs.box.style.minHeight = this.screenHeight + "px";
  },
  methods:{
     fn() {
       this.$router.push('/getnumber')
     }
  },
  watch: {
    telNumber(newValue, oldValue) {
      if (newValue > oldValue) {
        console.log(newValue, newValue);
        if (newValue.length === 3 || newValue.length === 8) {
          this.telNumber += " ";
           this.flag=false
        } else if (newValue.length === 13) {
          //当输入的数据超过手机号长度的时候,消失自定义键盘
          document.activeElement.blur();
          this.flag=true
        } else {
          this.telNumber = newValue;
        }
      } else {
        if (newValue.length === 3 || newValue.length === 8) {
          this.telNumber = this.telNumber.trim();
        } else if (newValue.length === 0) {
          //当删除到空的时候,软键盘消失
          document.activeElement.blur();
        } else {
          this.telNumber = newValue;
        }
      }
    }
  },
  changeFocus (e) { //处理ios机型fixed布局失效
     var doc = document.documentElement || document.body
      var e = e || window.event
       if (isMobile.iOS()) {
        var docheight = $(window).height() - 1; //ios使用resize监听屏幕高度与安卓不一样,把软键盘高度依然算在了屏幕内,手动减值,触发判断		
        if (docheight < this.screenHeight) {
          doc.style.overflow = 'hidden';
          e.preventDefault();
        } else {
          $('.bottom-img').css('position', 'absolute')
          console.log('nice')
        }
      } else {
        var docheight = $(window).height();
        if (docheight < this.screenHeight) {
          $('.bottom-img').css({
            'position': 'relative'
          })
        } else {
          $('.bottom-img').css({
            'position': 'absolute'
          })
        }
      }
    }
};
</script>
<style scoped>
.ret {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../../../static/images/BG_@2x.png) no-repeat;
  background-size: 100% 100%;
  z-index: 0;
}
.ipt {
  position: fixed;
  left: 0;
  top: 0;
}
.verificationCode {
  width: 100%;
  height: 0.96rem;
  line-height: 0.96rem;
  padding: 0 0.3rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #fff;
  background: #2ca1cf;
  opacity: 0.3;
  border-radius: 0.48rem;
  outline: none;
  border: none;
  transition: all 0.5s linear;
}
.active {
  font-family: "PingFang-SC-Bold", sans-serif;
  font-weight: bold;
  opacity: 1;
}
/*底部图片*/

.bottom-img {
  display: flex;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bottom-img > img {
  width: 1.2rem;
  height: 1.2rem;
  margin-bottom: 0.13rem;
  border-radius: 50%;
}
.bottom-img > p {
  color: #fff;
  font-size: 0.24rem;
}
</style>


