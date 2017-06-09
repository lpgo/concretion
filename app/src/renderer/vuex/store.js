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
        {id:'1',com:"中铁一局",prices:[{name:"c20",price:100}]},
    ],
    purchasePrices:[
        {id:"121",com:"水泥厂",prices:[{name:"水泥",price:100}]},
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
    getCarInfo(state, car) {
        state.carInfos.forEach(i => {
            if(i.car === car) {
                return i;
            }
        });
        return null;
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
        state.types = types;
    },
    addAllSalePrices(state,ss) {
        state.salePrices = ss;
    },
    addAllPurchasePrices(state,ps) {
        state.purchasePrices = ps;
    },
    addComFrequency(state,cf) {
        state.comFrequency = cf
    },
    addProjectFrequency(state,cf) {
        state.projectFrequency = cf
    },
    addDriverFrequency(state,cf) {
        state.driverFrequency = cf
    },
    addCarFrequency(state,cf) {
        state.carFrequency = cf
    },
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})