import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        carList: []
    },
    mutations: {
        addCount(state, payload) {
            payload.count++
        },
        addToCart(state, payload) {
            payload.check = true
            state.carList.push(payload)
        }
    },
    actions: {
        addCart(context, payload) {
            console.log(payload);
            let oldProduct = null
            for (let item of context.state.carList) {
                if (item.iid === payload.iid) {
                    oldProduct = item;
                    break;
                }
            }
            if (oldProduct) {
                context.commit('addCount', oldProduct)
            } else {
                payload.count = 1
                context.commit('addToCart', payload)
            }
        }
    },
    getters: {
        cartLength(state) {
            return state.carList.length
        },
        cartList(state) {
            return state.carList
        }
    }
})

export default store