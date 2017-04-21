import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    types:[                   //混凝土类型
        {id:'1',name:"c20"},
        {id:'2',name:"c30"},
        {id:'3',name:"c40"},
    ],   
    salePrices: [                   //混凝土价格
        {id:'1',com:"中铁一局",c20:100,c30:200,c40:300},
    ],
    purchasePrices:[
        {id:"121",com:"水泥厂",prices:[{name:"水泥",price:100}]},
    ],
}

// 定义所需的 mutations
const mutations = {
    addType(state,type) {
        if(type) {
            state.types.push({id:"1",name:type});
        }
    },
    removeType(state, index) {
        state.types.splice(index,1);
    },
    addSalePrice(state, p) {
        state.salePrices.push(p);
    },
    removeSalePrice(state, index) {
        state.salePrices.splice(index,1);
    },
    addPurchasePrice(state, p) {
        state.purchasePrices.push(p);
    },
    removePurchasePrice(state, index) {
        state.purchasePrices.splice(index,1);
    },
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})