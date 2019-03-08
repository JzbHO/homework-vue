import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count:0  //0是未登陆，1是已登录
    },
    mutations: {
        updateCount(state,num){
           
            window.localStorage.setItem("userType",num)
            state.count=num
        }
    },
    save(num){
        console.log("mutataions before"+num)
        window.localStorage.setItem("userType",num)
    },
    fetch(){
        
        console.log("mutataions after"+window.localStorage.getItem("userType"))
        return window.localStorage.getItem("userType")
    }

})

export default store