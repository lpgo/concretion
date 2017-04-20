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
    price: [                   //混凝土价格
        {id:'1',com:"中铁一局",c20:100,c30:200,c40:300},
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
    addPrice(state, p) {
        state.price.push(p);
    },
    removePrice(state, index) {
        state.price.splice(index,1);
    },
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})