<template>
    <div>
       <baidu-map class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="true">
           <!-- 点 -->
         <bm-marker 
            :position=" {lng:this.formDetailInfo.driverOriginLongitude, lat: this.formDetailInfo.driverOriginLatitude}" 
            :dragging="true"  animation="BMAP_ANIMATION_BOUNCE">
              <!-- 文字 -->
           <bm-label 
              :content="this.formDetailInfo.driverOriginName" 
              :labelStyle="{padding:'0.15rem',background:'#ccc',border:'0',borderRadius:'0.45rem',color: 'black', fontSize : '0.24rem'}"  
              :offset="{width: -35, height: 30}"/>
         </bm-marker>


         <!-- 线 -->
        <bm-polyline 
           :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="6" :editing="false" @lineupdate="updatePolylinePath"></bm-polyline>
       
          
        <!-- 点 -->
       <bm-marker 
           :position=" {lng:this.formDetailInfos.driverDestinationLongitude, lat:this.formDetailInfos.driverDestinationLatitude}" 
           :dragging="true" animation="BMAP_ANIMATION_BOUNCE"
           :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"
           @click="infoWindowOpen"
           >
            <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" :labelStyle="{color: 'red', fontSize : '24px'}">我爱北京天安门</bm-info-window>
      </bm-marker>


       <!-- 缩放控件 -->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
       <!-- 缩略图 -->
          <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
       <!-- 城市选择 -->
           <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      </baidu-map> 
    </div>
</template>
<script>
export default {
    data(){
        return {
            show:false, 
            formDetailInfo:{ //起点
                driverOriginName:'北京',
                driverOriginLongitude:'121.409834',
                driverOriginLatitude:'31.184815'
            },
            formDetailInfos:{ // 终点
               driverDestinationLongitude:'121.455761',
               driverDestinationLatitude:'31.19064',
               driverDestinationName:'上海'
            },
            styleJson:'styleJson',
            polylinePath: [  // 描点
                   {lng:121.409834, lat: 31.184815},
                  {lng: 121.455761, lat: 31.19064}
           ],
           center: {lng: 121.411526, lat: 31.167772},
           zoom: 13,
           dialogVisible: true,
           deblockingFlag: true,
        }
        },
         methods:{
             updatePolylinePath (e) {
              this.polylinePath = e.target.getPath()
           },
          infoWindowClose () {
            this.show = false
        },
          infoWindowOpen () {
            this.show = true
         }
         }
    }
</script>
<style>
 .map {
    width: 100%;
    height:100vh;
  }
.BMap_Marker >>>.BMapLabel{
  background-color: blue
}
</style>

