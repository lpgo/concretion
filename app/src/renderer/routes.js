
import Login from 'components/Login'
import Test from 'components/Test'
import Home from 'components/Home'
import Purchase from 'components/Purchase'
import Sale from 'components/Sale'
import Setting from 'components/Setting'

export default [
	{
      path: '/login',
      name: '登录',
      component: Login,
      alias: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
      	{ path: '/test', component: Test, name: '测试' },
        { path: '/sale', component: Sale, name: '销售' },
        { path: '/purchase', component: Purchase, name: '过磅单' },
        { path: '/setting', component: Setting, name: '设置' },
      ]
    }
]
