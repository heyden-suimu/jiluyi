<template>
  	<div class="instore">
        <div class="single">
            <h3>单台入库</h3>

            <el-row>

                <el-col :span="24">
                    <div class="grid-content bg-purple-light">
                        <span>IMEI*：</span>
                         <el-input v-model = 'submit.imei' class="keys" placeholder="请输入IMEI" ></el-input>
                    </div>
                </el-col>

            </el-row>
            <el-row>

                <el-col :span="24">
                    <div class="grid-content bg-purple-light">
                        <span>车牌号：</span>
                         <el-input v-model = 'submit.plateNumber' class="keys" placeholder="请输入车牌号" ></el-input>
                    </div>
                </el-col>

            </el-row>
            <el-row>

                <el-col :span="24">
                    <div class="grid-content bg-purple-light">
                        <span>ICCID：</span>
                         <el-input v-model = 'submit.iccid' class="keys" placeholder="请输入ICCID" ></el-input>
                    </div>
                 </el-col>
            </el-row>
            <el-row>

                <el-col :span="24">
                    <div class="grid-content bg-purple-light">
                        <span>手机号：</span>
                         <el-input v-model = 'submit.phoneNumber' class="keys" placeholder="请输入手机号" @keyup.native='Search'></el-input>
                    </div>
                 </el-col>
            </el-row>
            <el-row>

                <el-col :span="24">
                    <div class="grid-content bg-purple-light">
                        <span>型号：</span>
                         <el-input v-model = 'submit.mode' class="keys" placeholder="请输入型号" @keyup.native='Search'></el-input>
                    </div>
                </el-col>

            </el-row>
            <el-row>

                <el-col :span="24">
                    <div class="grid-content bg-purple-light">
                        <span>第一联系人：</span>
                         <el-input v-model = 'submit.firstContact' class="keys" placeholder="请输入第一联系人姓名" @keyup.native='Search' style="margin-bottom:.08rem;"></el-input>
                         <el-input v-model = 'submit.firstContactPhoneNumber' class="keys right" placeholder="请输入第一联系人手机号" @keyup.native='Search' ></el-input>

                    </div>
                </el-col>

            </el-row>
            <el-row>

                <el-col :span="24">
                    <div class="grid-content bg-purple-light">
                        <span>第二联系人：</span>
                         <el-input v-model = 'submit.secondContact' class="keys" placeholder="请输入第二联系人姓名" @keyup.native='Search' style="margin-bottom:.08rem;"></el-input>
                         <el-input v-model = 'submit.secondContactPhoneNumber' class="keys right" placeholder="请输入第二联系人手机号" @keyup.native='Search' ></el-input>

                    </div>
                </el-col>

            </el-row>
            <el-row>

                <el-col :span="24">
                    <div class="grid-content bg-purple-light">
                        <span style="vertical-align: top">备注：</span>
                        <el-input type="textarea" v-model="submit.remarks" :rows="3" placeholder="请输入内容"></el-input>
                    </div>
                 </el-col>

            </el-row>
            <el-row>

                <el-col :span="24">
                    <div class="grid-content bg-purple-light add">
                        <el-button @click="addDevice">新增</el-button>
                    </div>
                </el-col>

            </el-row>
        </div>

        <div class="some">
            <h3>批量入库</h3>
            <div style="border:1px solid #ccc" class="abc">
                <div class="tips">
                     <img src="../../images/excel.png" alt="">
                     <div><a href="http://ozgbkg49n.bkt.clouddn.com/%E6%A8%A1%E6%9D%BF.csv" download="1">模板下载</a></div>
                </div>
               <p>请下载模板，并按照指定格式填写内容。然后上传文件并导入</p>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="http://api.chetuyou.com:8082/api/v1/vw/cardvr/device/upload"
                  :file-list="fileList"
                  :on-error='handlError'
                  accept="png"
                  :on-success='handlSuc'
                  name='device'
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 20px;width:1.2rem;"  size="small" type="success" @click="submitUpload">导入</el-button>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script>
    import {layer, exit, checkPro} from '../../components/common/common'
    import {addDevice} from '../../service/getData'

export default {
    data(){
        return{
            submit:{
                plateNumber:'',
                iccid:'',
                imei:'',
                mode:'',
                remarks:'',
                secondContactPhoneNumber:'',
                firstContactPhoneNumber:'',
                firstContact:'',
                secondContact:'',
                phoneNumber:''
            },
            fileList:[]
        }
    },
    created(){
        exit(this)
        checkPro('deviceStorage', this)
    },
	mounted(){
                
    },

    components:{
        
    },

    computed:{
        
    },

    methods:{

        async addDevice(){

            if(!this.submit.imei){
                layer(this, '请输入IMEI')
                return
            }
            for(var key in this.submit){
                if(!this.submit[key]){
                    delete this.submit[key]
                }
            }
            let data = await addDevice('post', this.submit)
            if(data.code == 0){
                layer(this,'入库成功', 'success')
                // this.initVedio(this.start,this.count,this.page)
            }else{
                layer(this,data.ch||data.message||data.msg[0].message)
            }

        },

        submitUpload() {
            this.$refs.upload.submit();
        },

        handlError(err){
            layer(this,err.message)
        },
        exit(){
            if(!sessionStorage.login){
                layer(this,'请先登录')
                this.$router.push("/login")
            }
        },
        handlSuc(res,file,list){
            if(res.code == 0){
                layer(this,'入库成功', 'success')
            }else{
                layer(this,data.ch||data.message||data.msg[0].message)
            }
            this.fileList = [];
        }
    },
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    
    .instore{
        font-size: 14px;
        h3{
            padding: .1rem 0;
            // border-bottom: 1px solid #B8BABB;
            margin-bottom: .2rem;
        }
        .single{
            width: 50%;
            float: left;
            // border-bottom: 1px solid #B8BABB;
            padding-bottom: .16rem;
            .el-row{
                margin-top: -.2rem;
                .grid-content{
                    text-align: right;
                    padding: .06rem 0;
                    padding-right: 33%;
                    span{
                        margin-right: 4%;
                    }
                    .el-input{
                        width: 68%;
                    }
                    .el-textarea{
                        width: 68%;
                    }
                }
            }
            .el-row:nth-child(4){
                position: relative;
                .grid-content{
                    // position: relative;
                    span{
                        display: inline-block;
                    }
                }
            }
        }
        .some{
            width: 50%;
            float: left;
            .el-upload{
                .el-button{
                    margin-right: .2rem;
                    width: 1.2rem;
                }
            }
            .el-upload__tip{
                padding-top: .2rem;
                font-size: 14px;
                line-height: 24px;
            }

            p{
                color: #B8BABB;
                font-size: 12px;
                margin-top: .5rem;
                padding-left: 13%;
            }
        }

        .add{
            float: right;
            width: 68%;
            text-align: left;
            .el-button{
                // float: left;
                // position: absolute;
                // right:16.5%;
                // bottom: 0;
                width: 1.2rem;
                background: #20a0ff;
                color:white;  
            }
            
        }
        .tips{
            width: 60%;
            margin-left: 20%;
            margin-top: .7rem;
            height: 1.3rem;
            line-height: 1.3rem;
            img{
                width: 1.2rem;
                height: 1.3rem;
                float: left;
            }
            >div{
                display: inline-block;
                float: left;
                margin-left:.8rem;
                a{
                    width: 1.2rem;
                    padding: .08rem .2rem;
                    border-radius:4px;
                    background: #20a0ff;
                    color:white; 
                }
            }

        }

        .abc{
            width: 80%;
            margin-top: .3rem;
            padding-bottom: .3rem;
        }
    }

</style>
