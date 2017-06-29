
import Login from 'components/Login'
import Test from 'components/Test'
import Home from 'components/Home'
import Purchase from 'components/Purchase'
import PurchaseSelf from 'components/PurchaseSelf'
import Sale from 'components/Sale'
import OutSale from 'components/OutSale'
import SaleSetting from 'components/SaleSetting'
import PurchaseSetting from 'components/PurchaseSetting'
import Main from 'components/Main'
import Statistics from 'components/Statistics'
import StatisticsCar from 'components/StatisticsCar'
import StatisticsAuto from 'components/StatisticsAuto'
import StatisticsDriver from 'components/StatisticsDriver'
import PurchaseSearch from 'components/PurchaseSearch'
import SaleSearch from 'components/SaleSearch'
import Checkout from 'components/Checkout'
import PurchaseDiary from 'components/PurchaseDiary'
import Customer from 'components/Customer'
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
        { path: '/purchaseSelf', component: PurchaseSelf, name: '手动过磅单' },
        { path: '/saleSetting', component: SaleSetting, name: '销售设置' },
        { path: '/purchaseSetting', component: PurchaseSetting, name: '采购设置' },
        { path: '/statistics', component: Statistics, name: '统计' },
        { path: '/statisticsCar', component: StatisticsCar, name: '运费统计' },
        { path: '/statisticsAuto', component: StatisticsAuto, name: '泵送统计' },
        { path: '/statisticsDriver', component: StatisticsDriver, name: '司机工资统计' },
        { path: '/purchaseSearch', component: PurchaseSearch, name: '采购查询' },
         { path: '/saleSearch', component: SaleSearch, name: '销售查询' },
         { path: '/checkout', component: Checkout, name: '结账' },
         { path: '/purchaseDiary', component: PurchaseDiary, name: '采购流水' },
        { path: '/customer', component: Customer, name: '新客户' },
        { path: '/outSale', component: OutSale, name: '确认出货单' },
      ]
    }
]
