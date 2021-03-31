<template>
	 <div class="main" id="main">
		<!--<transition :name="$store.state.transitionName">-->
			<router-view class="child-view"></router-view>
	  </div>
</template>

<script>
	import Router from 'vue-router'
	export default {
		name: "Main",
		data() {
			return {
				loadingflag: false,
				loadingnum: 0,
				transitionName: 'slide-left'
			}
		},
		beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
     		this.transitionName = 'slide-right'
      } else {
    	 	this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
       next()
    },
	}
</script>

<style scoped>
	.main {
		width: 100%;
		height: 100%;
	}
	.child-view {
		position: absolute;
  	width:100%;
  	height: 100%;
  	z-index: 100;
  	overflow-x: hidden;
    transition: all .4s cubic-bezier(.55,0,.1,1);
	}
  .slide-left-enter{
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active {
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }
  .slide-right-enter {
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }
  .slide-right-leave-active {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
</style>
