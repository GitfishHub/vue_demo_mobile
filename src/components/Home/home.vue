<template>
   <div>
       <mt-header title="App Function">
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
         <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      
        <mt-cell  title="轮播图" value="带链接" is-link  to="/swiper" />
        <mt-cell  title="分页导航" value="带链接" is-link  to="/slider_nav" />
        <mt-cell  title="密码输入" value="带链接" is-link  to="/password" />
        <mt-cell  title="左右联动" value="带链接" is-link  to="/left_right" />
        <mt-cell  title="图片上传" value="带链接" is-link  to="/picture" />
        <mt-cell  title="Body左右滑动" value="带链接" is-link  to="/slider_body" />
        <mt-cell  title="Jsonp跨域" value="带链接" is-link  to="/jonsp_swiper" />
        <mt-cell  title="歌手列表" value="带链接" is-link  to="/singer_list" />
        <mt-cell  title="轮播图2" value="带链接" is-link  to="/swiper2" />
        <mt-cell  title="登陆" value="带链接" is-link  to="/login" />
        <mt-cell  title="vuex demo" value="带链接" is-link  to="/vuex_demo" />
        <mt-cell  title="百度地图" value="带链接" is-link  to="/vue_baidu_map" />
         <mt-cell  title="城市选择" value="带链接" is-link  to="/citychoose" />
   </div>
</template>
<script>
    
	export default {
		name: "Home",
		data() {
			return {
				
			}
		},

	}
</script>