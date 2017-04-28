
import Login from 'components/Login'
import Test from 'components/Test'
import Home from 'components/Home'
import Purchase from 'components/Purchase'
import Sale from 'components/Sale'
import SaleSetting from 'components/SaleSetting'
import PurchaseSetting from 'components/PurchaseSetting'
import Main from 'components/Main'
import Statistics from 'components/Statistics'
import PurchaseSearch from 'components/PurchaseSearch'
export default [
	{
      path: '/login',
      name: '登录',
      component: Login,
      alias:"/"
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: '/main', component: Main, name: '首页' },
      	{ path: '/test', component: Test, name: '测试' },
        { path: '/sale', component: Sale, name: '销售' },
        { path: '/purchase', component: Purchase, name: '过磅单' },
        { path: '/saleSetting', component: SaleSetting, name: '销售设置' },
        { path: '/purchaseSetting', component: PurchaseSetting, name: '采购设置' },
        { path: '/statistics', component: Statistics, name: '统计' },
        { path: '/purchaseSearch', component: PurchaseSearch, name: '采购查询' },
      ]
    }
]
