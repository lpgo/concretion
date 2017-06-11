import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    types:[                   //混凝土类型
    ],   
    salePrices: [                   //混凝土价格
       
    ],
    purchasePrices:[
        
    ],
    comFrequency:[],
    projectFrequency:[],
    driverFrequency:[],
    carFrequency:[],
    carInfos:[],
    user:null,
}

// 定义所需的 mutations
const mutations = {
    addUser(state, user) {
        if(user) {
            state.user = user;
        }
    },
    addType(state,type) {
        if(type) {
            state.types.push(type);
        }
    },
    loadCarInfos(state, infos) {
        if(infos != null && infos.length > 0)
            state.carInfos = infos;
    },
    addCarInfo(state, info) {
        if(info) {
            state.carInfos.push(info);
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
    addAllTypes(state,types) {
        if(types)
            state.types = types;
        else 
            state.types = [];
    },
    addAllSalePrices(state,ss) {
        if(ss)
            state.salePrices = ss;
        else 
            state.salePrices = [];
    },
    addAllPurchasePrices(state,ps) {
        if(ps)
            state.purchasePrices = ps;
        else 
            state.purchasePrices = [];
    },
    addComFrequency(state,cf) {
        if(cf)
            state.comFrequency = cf;
        else 
            state.comFrequency = [];
    },
    addProjectFrequency(state,cf) {
        if(cf)
            state.projectFrequency = cf;
        else 
            state.projectFrequency = [];
    },
    addDriverFrequency(state,cf) {
        if(cf)
            state.driverFrequency = cf;
        else 
            state.driverFrequency = [];
    },
    addCarFrequency(state,cf) {
        if(cf)
            state.carFrequency = cf;
        else 
            state.carFrequency = [];
    },
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})