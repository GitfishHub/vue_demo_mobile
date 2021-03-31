<template>
    <div class="code" ref="code">
       <div style="font-size:15px;color:#fff;padding:.5rem">请输入验证码</div>
       <div style="padding: 0 .36rem 0;">
           <!--验证码 Start-->
			<div class="box flex-center-between"  @click="activeCode" >
				<input ref="activeInput" id="val-code-input" type="number" maxlength="4"    
                @keyup="checkForNum($event)" 
                @selectstart="bind" 
                @blur="checkForNum($event)" 
                @input="changeContent" 
                @change="changeContent" 
                v-model="number"  />
				<div ref="single" v-for="(item, index) in 4" name="val-item" :key="index"></div>
			</div>
			<!--验证码End-->
			<div v-if="countDownFlag" class="count-down" >
				<span>（{{remainingTime}}s）</span>
				<span>后可再次获取</span>
			</div>
			<div v-else class="count-down" id="countDown" @click="getCode">
				<span>重新获取验证码</span>
			</div>
       </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      countDownFlag: true,
      valCodeInput: "", //input输入框元素
      valCodeItems: "", //验证码div框
      valCodeLength: null, //input输入框的长度
      number: "",
      screenHeight: $(window).height(), //初始获取整个屏幕的高度
      countDownFlag: true, //倒计时内容切换
      remainingTime: 60
    };
  },
  methods: {
    checkForNum(e) {
      //删除键消除样式,验证非数字字符
      var that = this;
      that.valCodeItems = this.$refs.single;
      that.$refs.activeInput.value = that.$refs.activeInput.value.replace(
        /[\D]/g,
        ""
      );
      if (e.keyCode === 8) {
        //   点击删除键 
        that.valCodeLength = that.$refs.activeInput.value.length;
        $(that.valCodeItems[that.valCodeLength]).removeClass("available");
        $(that.valCodeItems[that.valCodeLength]).text("");
      }
    },
    changeContent() {
      //改变样式
      var that = this;
      that.valCodeInput = that.$refs.activeInput;
      that.valCodeLength = that.valCodeInput.value.length;
      that.valCodeItems = that.$refs.single;
      var regex = /^[\d]+$/;
      if (that.valCodeInput.value && regex.test(that.valCodeInput.value)) {
        $(that.valCodeItems[that.valCodeLength - 1]).addClass("available"); //给输入的item添加激活样式
        $(that.valCodeItems[that.valCodeLength - 1]).text(
          that.valCodeInput.value.substring(
            that.valCodeLength - 1,
            that.valCodeLength
          )
        );
      }
    },
    bind() {
      return false;
    },
    activeCode() {
      $("#val-code-input").focus();
    },
    countDown() {
      //倒计时
      this.setTime = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          this.remainingTime = 60;
          this.countDownFlag = false;
          window.clearInterval(this.setTime);
        }
      }, 1000);
    },
    getCode() {
      //转换获取倒计时
      this.valCodeInput = "";
      window.clearInterval(this.setTime); //先清除上一次的计时器,防止计时器叠加
      this.countDownFlag = true;
      this.countDown();
      this.$toast({
        message: "验证码正在发送中...",
        position: "middle",
        duration: 2000
      });
    }
  },
  created() {
    this.countDown(); //进入页面执行倒计时
  },
  mounted() {
    window.location.href = window.location.href;
    var thisWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    this.$refs.code.style.minWidth = thisWidth + "px";
    this.$refs.code.style.minHeight = this.screenHeight + "px";
  }
};
</script>
<style scoped>
.code {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../../../static/images/BG_@2x.png) no-repeat;
  background-size: 100% 100%;
  z-index: 0;
}
.flex-center-between {
  /*水平垂直居中-两边对齐*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/*验证码*/

.box {
  position: relative;
  height: 0.88rem;
  width: 100%;
  text-align: center;
  margin-bottom: 0.64rem;
  opacity: 1;
}

.box > input {
  position: absolute;
  left: 0;
  top: 100px;
  height: 100%;
  width: 100%;
  opacity: 0;
  z-index: -999;
  outline: none;
  background: none;
  margin-left: -115%;
  text-indent: -999em;
}

.box > div {
  float: left;
  height: 0.88rem;
  width: 0.88rem;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 0.06rem;
  z-index: 5;
  font-size: 0.3rem;
  font-family: arial;
  font-weight: 530;
  text-align: center;
  line-height: 0.7rem;
  cursor: text;
  transition: all 0.5s ease;
}

.box > div:last-child {
  margin-right: 0rem;
}

.box .available {
  border-color: #0081db;
}
/*倒计时*/

.count-down {
  float: right;
  padding: 0.2rem 0 0.2rem 0.2rem;
  width: 50%;
  color: #fff;
  text-align: right;
}

.count-down span {
  font-size: 0.2rem;
}
</style>


