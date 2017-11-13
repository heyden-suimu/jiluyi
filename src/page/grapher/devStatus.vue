<template>
   <div class="devStatus">
        <div class="devAbout">
            <h3>设备详情</h3>
            <div class="devInfo info">

                 <el-row>

                  <el-col :span="8"><div class="grid-content bg-purple">
                      <span>设备编号</span><span>{{}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>ICCID：</span><span>{{}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>IMEI：</span><span>{{}}</span>
                  </div></el-col>

                </el-row>
                <el-row>

                  <el-col :span="8"><div class="grid-content bg-purple">
                      <span>车牌号：</span><span>{{}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>硬件版本：</span><span>{{}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>软件版本：</span><span>{{}}</span>
                  </div></el-col>

                </el-row>
                <el-row>

                  <el-col :span="8"><div class="grid-content bg-purple">
                      <span>入库时间：</span><span>{{}}</span>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple-light">
                      <span>最后在线：</span><span>{{}}</span>
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
                      <span>TF卡：</span><span :class='{"red":false}'>{{}}</span>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light">
                      <span>注册日期：</span><span>{{}}</span>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">
                      <span>品牌型号：</span><span>{{}}</span>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light">
                      <span>新车置购价：</span><span>{{}} 元</span>
                  </div></el-col>
                </el-row> 

            </div>
        </div>

        <div>
            <h3>系统状态</h3>
            <div class="info">

                 <el-row>
                  <el-col :span="4"><div class="grid-content bg-purple">
                      <span>车牌号码：</span><span>{{}}</span>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                      <span>注册日期：</span><span>{{}}</span>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                      <span>品牌型号：</span><span>{{}}</span>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                      <span>新车置购价：</span><span>{{}} 元</span>
                  </div></el-col>
                </el-row> 

            </div>
        </div>    
   </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import AMap from 'AMap'
    let map;
    export default {
    	data(){
            return{
                
            }
        },
        created(){
            //获取用户信息

        },
        mounted(){
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

                map = new AMap.Map('map', {
                  center: [116.397428, 39.90923],
                  resizeEnable: true,
                  zoom: 10
                })

                AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                  map.addControl(new AMap.ToolBar())
                  map.addControl(new AMap.Scale())
                })
            }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .devStatus{
        font-size: 14px;
        padding: .1rem 0 0 .1rem;
        .devAbout{
            .devInfo{
                height: 2.3rem;
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
            height:2.3rem;
            padding: .1rem 0 .1rem .3rem;
            #map{
                height: 2.1rem;
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
