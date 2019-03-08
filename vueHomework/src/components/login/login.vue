<template>
        
        <div>
            <netheader></netheader>
        <form id ="form" class="m-form m-form-ht n-login" @submit.prevent="submit">
            <div class="fmitem"> 
                <label class="fmlab">用户名：</label>
                <div class="fmipt">
                    <input class="u-ipt" v-model="username">
                </div>
            </div>
            <div class="fmitem">
                <label class="fmlab">密码：</label>
                <div class="fmipt">
                    <input class="u-ipt" type="password" v-model="password">
                </div>
            </div>
            <div class="fmitem fmitem-nolab fmitem-btn">
                <div class="fmipt">
                    <button type="submit" class="u-btn u-btn-primary u-btn-lg u-btn-block">
                    登录
                    </button>
                </div>
            </div>
            
        </form>
    </div>
</template>

<script>
/* eslint-disable */ 
import netheader from '../header/netheader.vue'
import Store from '../../store/store.js'
import md5 from 'js-md5'
import gloal from '../../const/global.vue'
export default {
    data () {
        return {
            username: '',
            password: ''
            
        }
    },
    methods : {
        submit(){
            //let a=this.$axios.post('/api/userStatus')
            let errCode
            this.$http.post('http://47.92.116.118:8083/api/login',
            {
                
                    username: this.username,
                    password: md5(this.password)
                

            },{emulateJSON:true}).then((response) => {
               console.log(response.data)
               errCode=response.data.code
               console.log("errCode="+errCode)
               let msg=response.data.msg

                console.log('errcode='+errCode)
                if(errCode==gloal.request_success_code){
                        let userType=response.data.data.userType
                        localStorage.userType=userType
                        //0是买家
                        console.log("local"+localStorage.userType)
                        if(localStorage.userType==1){
                            this.$router.push({
                                path: '/goods'
                            })
                        }else{  
                            this.$router.push({
                                path: '/buyergoods'
                            })
                        }
                }else {
                    console.log('alert')
                    alert(msg);
                }
            })
        }
    }
}


</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../static/css/nt.css";
  



</style>
