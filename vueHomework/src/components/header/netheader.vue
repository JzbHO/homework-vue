<template>

<div class="n-head">
    <div class="g-doc f-cb">
        <div class="user">
                    <div v-if="count==-1">
                    <!-- 请<a href="/login">[登录]</a> -->
                    请<router-link to="/login">[登录]</router-link>
                    </div>
                    <div v-else-if="count==0">买家你好，{{userName}} <a v-on:click="exit">[退出]</a></div>
                    <div v-else>
                    卖家你好，{{userName}} <a v-on:click="exit">[退出]</a>
                    </div>

        </div>

        <div v-if="count==1">
            <ul class="nav">
            <li><a href="/">首页</a></li>
            <li><router-link to="/seller">发布</router-link></li>
            </ul>
        </div>
        <div v-else-if="count==0">
        <ul class="nav">
            <li><router-link to="/buyergoods">首页</router-link></li>
            <li>
                <router-link to="/account">账务</router-link>
            </li>
            <li><router-link to="/cart">购物车</router-link></li>
        </ul>
        </div>
        <div v-else>     
            <ul class="nav">
                <li><a href="/">首页</a></li>
            </ul>
        </div>
        
    </div>
</div>
  
    
</template>

<script>
import sstore from '../../store/store.js'
import gloal from '../../const/global.vue'
export default {
    mounted: function(){
               if(localStorage.userType==0){
                   this.userName="buyer"
               }
               if(localStorage.userType==1){
                   this.userName="seller"
               }
    },
    computed: {
        count(){
           // return 1
            console.log("count"+localStorage.userType)
            this.user=localStorage.userType
            return  this.user
            //return window.localStorage.getItem("userType")
        }
    },
    data() {
        return {
            user:"",
            isLogin:"",
            userName:""
        }
    },
    methods:{
        exit: function (event){
            this.user="0"
            localStorage.userType=-1
            console.log(localStorage.userType)
            this.$router.push({path: '/goods?exit=0'})
        }
    }
  
  
}



   
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../static/css/nt.css";
  



</style>
