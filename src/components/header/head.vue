<template>
    <header id='head_top'>
      <div class="tip">行程记录仪</div> 
      <ul>
          
      </ul>
      <div class="user">
            <el-checkbox v-model="refresh">自动刷新</el-checkbox>
            <el-dropdown trigger="click" @command="exit">
              <span class="el-dropdown-link">
                admin <img src="../../images/user.png" alt="">
              </span>
              <el-dropdown-menu slot="dropdown" class="exit">
                <el-dropdown-item command="a">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
      </div>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import { Button, Select } from 'element-ui'
    export default {
    	data(){
            return{
              refresh:false, 
            }
        },
        created(){
            //获取用户信息

        },
        mounted(){
            
        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
            exit(){
                this.$router.push("/login")
            },
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #head_top{
        height: 70px;
        font-size: 16px;
        background: #444967;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        right: 0;
        color: #B6B4C7;
        .tip{
            color: #B6B4C7;
            font-size: 18px;
            background: #232639;
            width: 15.6%;
            text-align:center;
            height: 70px;
            line-height: 70px;
            float: left;
            min-width: 100px;    
        }
        >ul{
            max-width:70%;
            overflow: scroll;
            height: 70px;
            li{
                float: left;
                height: 70px;
                line-height: 70px;
                box-sizing:border-box; 
                -moz-box-sizing:border-box;
                -webkit-box-sizing:border-box;
                padding: 0 .5rem;
                color: #B6B4C7;
            }
            li:hover{
                border-bottom: 1px solid #FC6C26;
                color:#FC6C26;
            } 
        }
        .user{
            position: absolute;
            width: 18%;
            min-width: 200px;
            right: 0;
            height: 70px;
            line-height: 70px;
            top: 0;
            text-align: right;
            span{
                margin-right: 1rem;
                font-size: 15px;
                text-decoration: underline;
            }
            .el-checkbox{
                color: #B6B4C7;
                margin-right: .6rem;
                position: absolute;
                right: 2rem;
            }
            .el-dropdown{
                position: absolute;
                right: .7rem;
                color: white;
                height: .6rem;
                img{
                    margin-left: .06rem;
                }
            }
        }
    }
    .head_goback{
        left: 0.4rem;
        @include wh(0.6rem, 0.8rem);
        line-height: 2.2rem;
        margin-left: .4rem;
    }
    .head_login{
        right: 0.55rem;
        @include sc(0.65rem, #fff);
        @include ct;
        .login_span{
            color: #fff;
        }
        .user_avatar{
            fill: #fff;
            @include wh(.8rem, .8rem);
        }
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            font-weight: bold;
        }
    }
</style>
