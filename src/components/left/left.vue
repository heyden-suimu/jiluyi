<template>
    <section id='left'>
        <el-menu :default-active="leftIndex" class="el-menu-vertical-demo" theme="dark">

            <el-menu-item v-for='(item, index) in nav' :index="`/home/${item.route}`" @click="gorouter(item.route)" v-if="getPrority(item.pname)"><i :class="item.icon" ></i>{{item.text}} </el-menu-item>

        </el-menu>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{
                leftIndex:'',
                nav:[
                    {route:'device',icon:'el-icon-menu', text:'设备查询', pname:'deviceInfo'},
                    {route:'vedio',icon:'el-icon-upload', text:'监控查看', pname:'monitorView'},
                    {route:'setPram',icon:'el-icon-setting', text:'参数配置', pname:'shockParameter'},
                    {route:'inStore',icon:'el-icon-edit', text:'设备入库', pname:'deviceStorage'},
                    {route:'report',icon:'el-icon-heyden-tongjibaobiao', text:'统计报表', pname:'statisticalReport'},
                    {route:'userMag',icon:'el-icon-heyden-account-16', text:'账号管理', pname:'admin'},
                ]
            }
        },
        created(){
            this.leftIndex = this.$route.path
            if(this.$route.path == '/home/devStatus'){
                this.leftIndex = '/home/device'
            }
        },
        mounted(){
            
        },
        computed: {
            
        },
        methods: {
            // 二级路由跳转
            gorouter(path){
                // debugger
                if(this.$route.path == '/home/devStatus'){
                    this.leftIndex = '/home/device'
                }
                this.$router.push(path);                
            },

            getPrority(name){

                let info = JSON.parse(sessionStorage.login)
                if(name === 'admin' && info.level >= 2){
                    return true
                } else if (name ==='admin' && info.level < 2){
                    return false
                } else {
                    return info[name]
                }
                
            }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #left{
        background-color: #3F4066;
        font-size: 16px;
        width: 15.6%;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 70px;
        bottom: 0;
        min-width: 100px;       
    }
    
   
</style>
