<template>
  <div>
    <div id="container" style="width:500px; height:300px"></div>
    <div class ='panel'>
     <input id = 'input' value = '点击地图显示地址/输入地址显示位置' onfocus = 'this.value=""'></input>
     <div id = 'message'></div>
   </div>
  </div>
</template>
<script>
  import AMap from 'AMap'
  var map
  export default {
    mounted: function () {
      this.init()
    },
    methods: {
      init: function () {
        map = new AMap.Map('container', {
          center: [116.397428, 39.90923],
          resizeEnable: true,
          zoom: 10
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        })
        AMap.plugin('AMap.Geocoder',function(){
            var geocoder = new AMap.Geocoder({
                city: "010"//城市，默认：“全国”
            });
            var marker = new AMap.Marker({
                map:map,
                bubble:true
            })
            var input = document.getElementById('input');
            var message = document.getElementById('message');
            map.on('click',function(e){
                marker.setPosition(e.lnglat);
                geocoder.getAddress(e.lnglat,function(status,result){
                  if(status=='complete'){
                     input.value = result.regeocode.formattedAddress
                     message.innerHTML = ''
                  }else{
                     message.innerHTML = '无法获取地址'
                  }
                })
            })
            
            input.onchange = function(e){
                var address = input.value;
                geocoder.getLocation(address,function(status,result){
                  if(status=='complete'&&result.geocodes.length){
                    marker.setPosition(result.geocodes[0].location);
                    map.setCenter(marker.getPosition())
                    message.innerHTML = ''
                  }else{
                    message.innerHTML = '无法获取位置'
                  }
                })
            }
        })
      }
    }
  }
</script>
<style>
</style>