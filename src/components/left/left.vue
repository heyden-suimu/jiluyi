<template>
    <section id='left'>
        <el-menu default-active="2" class="el-menu-vertical-demo" theme="dark">
          <el-menu-item index="1" @click="gorouter('device')">
            <i class="el-icon-menu"></i>设备查询
            </el-menu-item>
             <el-menu-item index="2" @click="gorouter('vedio')"><i class="el-icon-upload" ></i>云端储存</el-menu-item>
        </el-menu>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{
                List:[
                    {name:"版本管理 ",seclist:false,isactive:false,Sec_list:[
                        {name:"版本列表"},{name:"新增apk"},{name:"新增rom"},{name:"新增patch"},{name:"新增app"}     
                    ]},
               ] 
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        computed: {
            
        },
        methods: {
            // 二级路由跳转，并且设置监听（版本列表）
            gorouter(path){
                this.$router.push(path);
                if(path!="verlist"){
                    this.$parent.$emit("addVer");
                }                  
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
