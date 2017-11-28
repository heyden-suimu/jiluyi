<template>
    <div class="Container login">
        <div class="login">
            <div class="sitename">智能后视镜管理</div>
            <form class="loginForm" >
                <div class="item line"><span class="user"></span><input autocomplete="on"  id="UserName" maxlength="20" name="UserName" placeholder="登录名" type="text" v-model="userAccount"></div>
                <div class="item line">
                    <span class="pwd"></span></span><input class="txtbox" id="Password" maxlength="20" name="Password" placeholder="密码" type="password" v-model="passWord" @keyup.enter="mobileLogin"></div>
                <el-button class="login_container" @click="mobileLogin" style="cursor:pointer">登录</el-button>
            </form>
            <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        </div> 
    </div>
</template>

<script>
    import alertTip from '../../components/common/alertTip'
    import {mapState, mapMutations} from 'vuex' 

    export default {
        data(){
            return {
                userAccount: null, //用户名
                passWord: null, //密码
                user_name:"admin", //正确用户
                password:"admin",//正确密码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        created(){
            
        },
        components: {
            alertTip,
        },
        computed: {
            
        },
        methods: {
            //发送登陆信息
            async mobileLogin(){
                if (!this.userAccount) {
                    this.layer("请输入用户名")              
                    return
                }
                if(!this.passWord){
                    this.layer("密码不能为空")              
                    return
                }
                if(this.userAccount==this.user_name&&this.passWord==this.password){
                    sessionStorage.setItem('login',true)
                    this.$router.push("/home")
                }else{
                    this.layer("账号或密码不存在")
                }
            },
            closeTip(){
                this.showAlert = false;
            },
            layer(text){
                this.showAlert = true;
                this.alertText = text;
                setTimeout(() =>{
                    this.showAlert = false;           
                },800) 
            }
        }
    }

</script>

<style lang="scss" scoped  rel="stylesheet/scss" type="text/css">
    @import '../../style/mixin';
    .Container{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        background: #282b30;
        .login{
            width: 5.8rem;
            height: 350px;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform:translate(-50%,-50%);
            -moz-transform:translate(-50%,-50%);
            -ms-transform:translate(-50%,-50%);
            -o-transform:translate(-50%,-50%);
            // border:1px solid white;
            // border-radius: 5px;
            // background: white;
            .sitename{
                font-size: 28px;
                text-align: center;
                padding-top: 50px;
                color:white;
            }
            .loginForm{
                width: 60%;       
                margin: 0 auto;
                text-align: left;
                padding-top: 10px;
                .item{
                    width: 100%;
                    overflow: hidden;
                    padding-bottom: 2px;
                    height: 70px;
                    border-bottom: solid 2px #e8ecf1; 
                    position: relative; 
                    span{
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 28px;
                        height: 30px;
                        background: url("../../images/user.png") no-repeat center center white;
                    }
                    input{
                        height: 30px;
                        padding-left: .1rem;
                        position: absolute;
                        width: 100%;
                        bottom: 0;
                        left: 27px;
                    }
                    input:-webkit-autofill {
                        background-color: none!important;
                        background-image: none;
                        color: #000;
                    }
                    span.pwd{
                        background: url("../../images/password.png") no-repeat center center white;
                    }
                }
                .login_container{
                    width: 1.2rem;
                    display: block;
                    margin: 0 auto;
                    font-size: 16px;
                    background-color: #3c8dbc;
                    color: white;
                    // border: solid 1px #f76e42;
                    border-radius: 5px;
                    text-align: center;
                    color: white;
                    padding:10px 0;
                    margin-top: 34px;
                }              
            }
        }
    }

    .login{
         overflow: hidden;
    }
    
</style>
