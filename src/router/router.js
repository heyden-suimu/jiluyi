import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const device = r => require.ensure([], () => r(require('../page/grapher/device')), 'device')
const vedio = r => require.ensure([], () => r(require('../page/grapher/vedio')), 'vedio')
const devStatus = r => require.ensure([], () => r(require('../page/grapher/devStatus')), 'devStatus')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/login'
        },
        {
            path: '/home',
            component: home,
            children:[
                {path: '',redirect: '/home/device'},
                {path: '/home/device',component: device},
                {path: '/home/vedio',component: vedio},
                {path: '/home/devStatus',component: devStatus},
            ]
        },
        //登陆注册页
        {
            path: '/login',
            component: login
        },
    ]
}]
