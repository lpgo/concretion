
import Login from 'components/Login'
import Test from 'components/Test'
import Home from 'components/Home'
import Purchase from 'components/Purchase'
import Sale from 'components/Sale'
import SaleSetting from 'components/SaleSetting'
import PurchaseSetting from 'components/PurchaseSetting'
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
        { path: '/saleSetting', component: SaleSetting, name: '销售设置' },
        { path: '/purchaseSetting', component: PurchaseSetting, name: '采购设置' },
      ]
    }
]
