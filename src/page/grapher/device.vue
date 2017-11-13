<template>
   <div class="device">
        <div class="search">
            <el-row>
              <el-col :span="8">

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

              <el-col :span="10">

                <div class="grid-content bg-purple-light">
                    <span>关键字：</span>
                    <el-input v-model = 'search.keys' class="keys" placeholder="设备号、车牌号"></el-input>
                </div>

              </el-col>
            </el-row>

            <div class="Device_body">
                <el-table
                    :data="tableData3"
                    height="250"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="date"
                      label="序列号"
                      width="80px">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="设备编号"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="车牌">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="IMEI">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="KCID">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="在线状态">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="当前位置">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="备注">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="更新时间">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="操作">

                      <template scope="scope">
                        <el-button @click="readDev(scope.row,scope.$index)" type="text" size="small">详情</el-button><br/>
                        <el-button @click="readVedio(scope.row,scope.$index)" type="text" size="small">监控查看</el-button>
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
            </div>
        </div>
   </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import { Button, Select } from 'element-ui'
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

            }
        },
        created(){
            //获取用户信息

        },
        mounted(){
            
        },
       
        methods: {
            exit(){
                this.$router.push("/login")
            },
            readDev(){
                this.$router.push({path:'devStatus'})
            },
            readVedio(){
                this.dis
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
                margin-top: .2rem;
                text-align: center;
            }
        }
    }
</style>
