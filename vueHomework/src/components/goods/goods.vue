<template>
    <div>
    <netheader></netheader>
   <div class="g-doc">
   <div class="m-tab m-tab-fw m-tab-simple f-cb">
        <div class="tab">
            <ul>
                <li class="z-sel" ><a href="/">所有内容</a></li>
                
            </ul>
        </div>
    </div>
    <div class="n-plist">
        <ul class="f-cb" id="goodList">
                    <li v-for="item in goods">
                        <router-link  class="link"  :to="{path : '/settle',query:{id:item.id}}">
                            <div class="img"><img :src="item.pictureUrl" alt="SICPP"></div>
                            <h3>{{item.itemName}}</h3>
                            <div class="price">
                                <span class="v-unit">¥</span>
                                <span class="v-value"> {{item.itemPrice}}</span>
                            </div>
                            <div v-if="item.isBuy==0">
                                <span class="had"><b>已售{{item.itemNum}}</b></span>
                            </div>
                        </router-link>
                        <div v-if="item.isBuy==1">

                            <div v-if="count==1">
                            <span class="u-btn u-btn-normal u-btn-xs del" data-del="175"  :id="item.id" v-on:click="deleteGood($event)">删除</span>
                            </div>
                        </div>

                    </li>
        </ul>
    </div>

    </div>
    </div>

    





</template>


<script>

import netheader from '../header/netheader.vue'
import gloal from '../../const/global.vue'
export default {

    mounted: function(){
         this.$http.post('http://47.92.116.118:8083/api/buyergoods',
            {
            
            },{emulateJSON:true}).then((response) => {
                this.$set(this,'goods',response.data.data.goodList)
            })
    },
    data () {
        var goods=[];
        var user
        return {
            goods:goods,
            goodId:"",
            user:user
        }
    },
    methods:{
          deleteGood : function (event){
            let selecedId=event.currentTarget.id
            console.log("selectedId="+selecedId)
            this.$http.post('http://47.92.116.118:8083/api/delete',
            {
                goodId: selecedId
            },{emulateJSON:true}).then((response) => {
                this.$set(this,'goods',response.data.data.goodList)
                let msg=response.data.msg
            })
        }
    },
   watch: {
    　　'$route': function (to, from) {
            console.log("watch this seller router")
    　　     this.user=-1
        },
        
    

    },
    components:{
        'netheader':netheader
    },
    computed:{
        getFullPath(){
            return this.$route.path
            console.log("computed"+this.$route.path)
        },
        count(){
           // return 1
            console.log("count"+localStorage.userType)
            this.user=localStorage.userType
            return  this.user
            //return window.localStorage.getItem("userType")
        }
    },
    
}

</script>

