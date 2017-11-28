<template>
   <div class="device">
        <div class="search">
            <el-row>
              <el-col :span="8">

                <div class="grid-content bg-purple">
                    <span>在线状态：</span>
                  <el-select v-model="search.deviceStatus" placeholder="请选择" @change='filterSearch'>
                    <el-option
                      v-for="item in options_status"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>

              </el-col>

              <el-col :span="10">

                <div class="grid-content bg-purple-light">
                    <span>关键字：</span>
                    <el-input v-model = 'search.search' class="keys" placeholder="车牌号、IMEI" @keyup.native='Search'></el-input>
                </div>

              </el-col>
            </el-row>

            <div class="Device_body">
                <el-table
                    :data="devList"
                    border
                    style="width: 100%">
                    <!-- <el-table-column
                      label="No"
                      align='center'
                      width="80">

                      <template scope="scope">
                        {{scope.$index+1}}
                      </template>

                    </el-table-column> -->
                    <!-- <el-table-column
                      prop="deviceId"
                      align='center'
                      label="设备编号"
                      show-overflow-tooltip
                    > -->
                    </el-table-column>
                    <el-table-column
                      prop="plateNumber"
                      align='center'
                      width="110"
                      label="车牌">
                    </el-table-column>
                    <el-table-column
                      prop="imei"
                      width="160"
                      align='center'
                      show-overflow-tooltip
                      label="IMEI">
                    </el-table-column>
                    <!-- <el-table-column
                      prop="iccid"
                      align='center'
                      show-overflow-tooltip
                      label="ICCID">
                    </el-table-column> -->
                    <el-table-column
                      prop="deviceStatus"
                      align='center'
                      width="80"
                      label="状态">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      align='center'
                      show-overflow-tooltip
                      label="当前位置">
                    </el-table-column>
                    <!-- <el-table-column
                      prop="remarks"
                      align='center'
                      show-overflow-tooltip
                      label="备注"> -->
                    </el-table-column>
                    <el-table-column
                      prop="updatedTime"
                      align='center'
                      show-overflow-tooltip
                      sortable
                      width="200"
                      label="更新时间">

                      <!-- <template scope="scope">
                        {{scope.row}}
                      </template> -->

                    </el-table-column>
                    <el-table-column
                      align='center'
                      width='160'
                      label="操作">

                      <template scope="scope">
                        <el-button @click="readDev(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                        <el-button @click="readVedio(scope.row,scope.$index)" type="text" size="small">监控查看</el-button>
                      </template>

                    </el-table-column>

                  </el-table>
                  
                  <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[10, 20, 50, 100]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total">
                  </el-pagination>

            </div>
        </div>
   </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex' 
    import {deviceApi, deviceCount} from '../../service/getData'
    import {layer, DateFormat} from '../../components/common/common'
    import _ from 'lodash'
    export default {
    	data(){
            return{
                options_status:[
                    {name:'全部',value:0},{name:'在线',value:1},{name:'不在线',value:2}
                ],
                search:{
                    deviceStatus:'全部',
                    search:'',
                    imei:'all',
                },
                devList:[],
                pageSize:10,
                currentPage:1,
                total:0,
            }
        },
        beforeCreate(){
            // this.exit()
            if(!sessionStorage.login){
                    layer(this,'请先登录')
                    this.$router.push("/login")
                }
        },
        created(){
            // 获取用户信息
            // this.exit()
        },
        mounted(){
            this.initDev();
        },
       
        methods: {

            async initDev(start = 0, count = 10, page = 1, ) {

                let obj = {
                    start : start,
                    size : count,
                };

                for(let key in this.search){
                    
                    if(this.search[key]){
                        obj[key] = this.search[key] 
                    }

                }
                let dataCount = await deviceCount('get', obj)
                if(dataCount.code == 0){
                    this.total = dataCount.res; 
                }
                
                let data = await deviceApi('get', obj);
                if(data.code == 0){
                    this.devList = data.res;
                    this.start = start;
                    this.count = count;
                    this.page = page;
                    document.body.scrollTop = 0;
                }else{
                    layer(this,data.ch)
                }
            },

            exit(){
                if(!sessionStorage.login){
                    layer(this,'请先登录')
                    this.$router.push("/login")
                }
            },
            readDev(row, index){
                this.$router.push({path:'devStatus', query:{device:JSON.stringify(row)}})
            },
            readVedio(row,idnex){
                this.$router.push({path:'vedio', query:{device:row.imei}})
            },
            handleSizeChange(size){
                this.pageSize = size;
                this.count = size;
                this.initDev((this.page-1)*size, size, this.page)
            },
            handleCurrentChange(currentPage){
                this.currentPage = currentPage;
                this.page = currentPage;
                this.initDev((parseInt(currentPage)-1)*this.count, this.count, currentPage)
            },
            filterSearch(){
                this.currentPage = 1
                this.initDev(0, this.count, 1)
            },
            Search: _.debounce(function(){
                    this.filterSearch()
                }, 400)
            ,
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .device{
        font-size: 14px;
        .search{
            padding-top: .1rem;
            padding-left: .1rem;
            .el-select{
                width:30%;
            }
            .el-input{
                width: 45%;
            }
        }
        .Device_body{
            padding-top: .3rem;
            .el-pagination{
                margin-top: .16rem;
                text-align: center;
                margin-bottom: .16rem;
            }
        }
    }
</style>
