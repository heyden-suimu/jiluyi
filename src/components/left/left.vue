<template>
    <section id='left'>
        <el-menu :default-active="leftIndex" class="el-menu-vertical-demo" theme="dark">

            <el-menu-item index="/home/device" @click="gorouter('device')"><i class="el-icon-menu"></i>设备查询 </el-menu-item>
            <el-menu-item index="/home/vedio" @click="gorouter('vedio')"><i class="el-icon-upload" ></i>监控查看</el-menu-item>
            <el-menu-item index="/home/inStore" @click="gorouter('inStore')"><i class="el-icon-edit" ></i>设备入库</el-menu-item>

        </el-menu>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{
                leftIndex:''
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
