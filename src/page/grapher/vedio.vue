<template>
   <div class="device">
        <div class="search">
            <el-row>
              <el-col :span="6">

                <div class="grid-content bg-purple">
                    <span>在线状态：</span>
                  <el-select v-model="search.status" placeholder="请选择">
                    <el-option
                      v-for="item in options_status"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>

              </el-col>

              <el-col :span="8">

                <div class="grid-content bg-purple-light">
                    <span>时间段：</span>
                     <el-date-picker
                      v-model="value6"
                      type="daterange"
                      placeholder="选择日期范围">
                    </el-date-picker>
                </div>

              </el-col>

              <el-col :span="10">

                <div class="grid-content bg-purple-light">
                    <span>关键字：</span>
                    <el-input v-model = 'search.keys' class="keys" placeholder="设备号、车牌号"></el-input>
                </div>

              </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="6">

                    <div class="grid-content bg-purple">
                        <span>状态：</span>
                      <el-select v-model="search.status" placeholder="请选择">
                        <el-option
                          v-for="item in options_status"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>

                  </el-col>

                  <el-col :span="8">

                    <div class="grid-content bg-purple-light">
                        <span>地址：</span>
                         <el-input v-model = 'search.adress' class="keys" placeholder="请输入地址"></el-input>
                    </div>

                  </el-col>
              </el-row>
        </div>

        <div class="Device_body">
            <el-table
                :data="tableData3"
                height="250"
                border
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="date"
                  label="省略图"
                  width="">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="name"
                  label="文件名"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="address"
                  label="设备号">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="address"
                  label="IMEI">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="address"
                  label="车牌号">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="address"
                  label="监控类型">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="address"
                  label="地址信息">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="address"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  align="center"
                  label="文件大小">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="address"
                  label="状态">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="address"
                  label="操作">

                   <template scope="scope">
                    <el-button @click="readDev(scope.row,scope.$index)" type="text" size="small">下载</el-button>
                    <el-button @click="readVedio(scope.row,scope.$index)" type="text" size="small">播放</el-button>
                    <el-button @click="readVedio(scope.row,scope.$index)" type="text" size="small">删除</el-button>
                    <el-button @click="readDev(scope.row,scope.$index)" type="text" size="small" v-if='false'>上传</el-button><br/>
                   <span v-if='false'>-</span>
                  </template>

                </el-table-column>

              </el-table>
              
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
               </el-pagination>

               <el-dialog title="监控视频" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
                  <video src="http://pic.ibaotu.com/00/34/21/317888piC5Mn.mp4"  poster="" autoplay="autoplay" preload="none" width="100%" controls></video>
               </el-dialog>
        </div>
   </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import { Button, Select } from 'element-ui'
    import {req} from '../../service/data'
    export default {
        data(){
            return{
                options_status:[
                    {name:'全部',value:0},{name:'在线',value:1},{name:'不在线',value:2}
                ],
                search:{
                    status:0,
                    keys:''
                },
                tableData3:[{date:123,name:123,address:123}],
                dialogTableVisible:false
            }
        },
        created(){
            //获取用户信息

        },
        mounted(){
            console.log(res)
        },
       
        methods: {
            exit(){
                this.$router.push("/login")
            },
            readVedio(){
                this.dialogTableVisible = true;
            }
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
            .el-col{
                .grid-content{
                    >span{
                        width: .75rem;
                        display: inline-block;
                    }
                }
            }
            .el-col:nth-child(1){
                .grid-content{
                    >span{
                        width: .9rem;
                        display: inline-block;
                    }
                }
            }
            .el-select{
                width:35%;
            }
            .el-input{
                width: 45%;
            }
            .el-date-editor{
                width: 60%;
            }
            .el-row:nth-child(2){
                margin-top: .12rem;
            }
        }
        .Device_body{
            padding-top: .3rem;
            .el-pagination{
                margin-top: .2rem;
                text-align: center;
            }
        }
    }
</style>
