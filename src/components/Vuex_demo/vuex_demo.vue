<template>
    <div>
        <button  @click="fn">点我</button>
    </div>
</template>
<script>
export default {
     data() {
         return {
             
         }
     },
     methods:{
         fn(){
            
              this.$store.dispatch("changeActive",3)
             
            console.log(this.$store.state)
            
             
         }
     }
}
</script>
<style>

</style>


