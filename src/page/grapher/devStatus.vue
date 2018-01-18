<template>
   <div class="devStatus">
        <div class="devAbout">
            <h3>设备详情</h3>
            <div class="devInfo info">

                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple">
                      <span>设备编号：</span><span>{{device.deviceId||'--'}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>ICCID：</span><span>{{device.iccid||'--'}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>电话号：</span><span>{{device.phoneNumber||'--'}}</span>
                  </div></el-col>
                </el-row>

                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>IMEI：</span><span>{{device.imei||'--'}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple">
                      <span>车牌号：</span><span>{{device.plateNumber||'--'}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>硬件版本：</span><span>{{device.romVersion||'--'}}</span>
                  </div></el-col>
                </el-row>

                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>软件版本：</span><span>{{device.appVersion||'--'}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple">
                      <span>入库时间：</span><span>{{device.createdTime||'--'}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>最后在线：</span><span>{{device.updatedTime||'--'}}</span>
                  </div></el-col>
                </el-row>

                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>备注：</span><span>{{device.remarks||'--'}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple">
                      <span>MAC地址：</span><span>{{device.macAddress||'--'}}</span>
                  </div></el-col>
                </el-row>      

            </div>
           <div class="wrap-map">
               <div id="map"></div>
           </div>
        </div>

        <div>
            <h3>软件状态</h3>
            <div class="info">

                 <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple">
                      <span>TF卡：</span><span :class='{"red":device.sdcardStatus!="正常"}'>{{device.sdcardStatus||'--'}}</span>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light">
                      <span>行车记录仪：</span><span :class="{'red':device.frontRecordingStatus=='停止工作'}">{{device.frontRecordingStatus}}</span><br/>
                      <!-- <span style="padding-top:2px;display:inline-block">视屏丢失率：</span>
                      <span>{{device.frontFailureRate | percentEg}}</span> -->
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">
                      <span>车内监控：</span><span :class="{'red': device.innerRecordingStatus=='停止工作'}">{{device.innerRecordingStatus}}</span><br/>
                      <!-- <span style="padding-top:2px;display:inline-block">视屏丢失率：</span>
                      <span>{{device.insideFailureRate | percentEg}}</span> -->
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light">
                      <span style="float:left">GPS：</span><span style="text-align:right;display:inline-block">{{device.gps[0].toFixed(6)}},<br/>{{device.gps[1].toFixed(6)}} </span>
                  </div></el-col>
                </el-row> 

            </div>
        </div>

        <div>
            <h3>系统状态</h3>
            <div class="info">

                 <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple">
                      <span>TF存储：</span><span>{{device.outerSdcardPercentage}}%</span>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light">
                      <span>内置存储：</span><span>{{device.innerSdcardPercentage}}%</span>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">
                      <span>车速：</span><span>{{device.speed||0}}km/h</span>
                  </div></el-col>
                </el-row> 

            </div>
        </div>

         <div>
            <h3>联系人</h3>
            <div class="info">

                 <el-row>
                  <el-col :span="12"><div class="grid-content bg-purple">
                      <span>第一联系人：</span><span>{{device.firstContact}} {{device.firstContactPhoneNumber||'--'}}</span>
                  </div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-light">
                      <span>第二联系人：</span><span>{{device.secondContact}} {{device.secondContactPhoneNumber||'--'}}</span>
                  </div></el-col>
                </el-row> 

            </div>
        </div>    
   </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {layer, DateFormat, exit, checkPro} from '../../components/common/common'
    import AMap from 'AMap'
    export default {
    	data(){
            return{
                
            }
        },
        created(){
            //获取用户信息
            this.device = JSON.parse(this.$route.query.device)
            // debugger
        },
        mounted(){
            exit(this)
            checkPro('deviceInfo', this)
            this.init()
        },
       
        methods: {
            exit(){
                this.$router.push("/login")
            },
            init(){
                this.initMap()
            },
            initMap(){
               var map = new AMap.Map("map", {
                    zoom: 17,
                    center:this.device.gps
                });
               var marker = new AMap.Marker({
                    map:map,
                    position:this.device.gps,
                })
                marker.setLabel({
                    offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                    // content: "点击Marker打开高德地图"
                });
                // map.plugin(["AMap.ToolBar"], function() {
                //     map.addControl(new AMap.ToolBar());
                // });

            },
            exit(){
                if(!sessionStorage.login){
                    layer(this,'请先登录')
                    this.$router.push("/login")
                }
            }
        },

        filters:{
          percentEg(val){
            if (!val && val != 0) {
              return '--'
            } else {
              return val.toFixed(2)+'%'
            }
          }
        }

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .devStatus{
        font-size: 14px;
        padding: .1rem .08rem 0 .1rem;
        .devAbout{
            .devInfo{
                height: 2.6rem;
                width: 66%;
                padding:.3rem 0;
                padding-left: .2rem;
                float: left;
            }
            overflow: hidden;
            box-sizing:border-box;
        }
        .wrap-map{
            width: 34%;
            float: right;
            height:2.6rem;
            padding: .04rem 0 .1rem .3rem;
            #map{
                height: 2.54rem;
            }
        }
        #map{
            // width: 
        }
        h3{
            border-bottom: 1px solid #B8BABB;
            background: #F9F9F9;
            padding: .06rem 0;
            padding-left: .1rem;
        }
        .info{
            background: white;
            border-bottom: 1px solid #B8BABB;
            padding-left: .2rem;
            padding-top: .3rem;
            .el-row{
                margin-bottom: .35rem;
            }
        }
        .red{
            color:#E21E00
        }
    }
</style>
