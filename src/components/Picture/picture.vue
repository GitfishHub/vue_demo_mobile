<template>
  <div>
    <input
      type="file"
      accept=".jpeg, .jpg, .png"
      name="upload_file"
      id="js-title-img-input"
      @change="selectImg($event)"
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      headUrl: "", //图片地址,
      picpath: "", //文件路径
      picname: "", //文件名名称
      base64: ""
    };
  },
  methods: {
    getimgsrc(src) {
      this.userInfo.headUrl = "data:image/jpeg;base64," + src;
      this.$forceUpdate();
    },
    selectImg($event) {
      this.getPic("js-title-img-input", "img", $event.target.value);
    },
    getPic(piElementId, imgElementId, path) {
      this.picpath = path; //文件路径

      var self = this;
      var file = document.getElementById(piElementId).files[0]; //文件
      this.picname = file.name; //文件名

      var reads = new FileReader();
      var img = new Image();
      reads.readAsDataURL(file);
      reads.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
          var res = self.compress(img, 100, 100);
          console.log(document.getElementById(imgElementId));
          //   document.getElementById(imgElementId).src = res;

          self.base64 = res; //base64
          var params = {
            fileOldName: self.picname, //文件名
            filePjectPath: "DAS", //
            filePjectName: "jav",
            base64: self.base64.split(",")[1], //base64数据
            prj: "DM",
            remark: "修改头像"
          };
          alert(JSON.stringify(params));
        };
      };
    },
    compress(img, w, h) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      canvas.height = h;
      canvas.width = w;
      ctx.drawImage(img, 0, 0, w, h);
      return canvas.toDataURL("image/jpeg", 0.92);
    }
  },
  mounted() {
    window.getimgsrc = this.getimgsrc;
  }
};
</script>
<style>
</style>

