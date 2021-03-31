<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import ListView from "./listview.vue";
import { getSingerList } from "./singer.js";


const HOT_SINGER_LEN = 5;
const HOT_NAME = "热门";

export default {
  components: {
    ListView
  },
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
     selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (3 > 1) {
          this.singers = this._normalizeSinger(res.data.list);
          console.log(this.singers);

          //  数据格式
          //  [
          //    {
          //      item:[
          //         {id:'1',name:'kim'},
          //         {id:'2',name:'kim'}
          //      ],
          //      title:'A'
          //    },
          //    {
          //      item:[
          //         {id:'5',name:'kim'},
          //         {id:'4',name:'kim'}
          //      ],
          //      title:'B'
          //    }

          //  ]
        }
      });
    },
    //处理数据
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
            avatar:
              "http://img1.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png"
          });
        }

        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }

        map[key].items.push({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
          avatar:
            "http://img1.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png"
        });
      });

      // 为了得到有序列表，我们需要处理 map
      let ret = [];
      let hot = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    }
   
  },
  
};
</script>

<style scoped >
.singer {
  position: fixed;
  top: 0px;
  bottom: 0;
  width: 100%;
}
</style>
