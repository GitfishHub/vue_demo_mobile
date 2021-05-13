<template>
  <div class="box">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  // justify-content: space-around;
  align-items: stretch;
  div {
    height: 100px;
  }
  div:nth-child(1) {
    background: red;
    width: 20%;
    flex-grow: 1;
  }
  div:nth-child(2) {
    background: green;
    width: 35%;
  }
  div:nth-child(3) {
    background: pink;
    width: 10%;
  }
}
</style>
