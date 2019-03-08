<template>
    <div>
    <netheader></netheader>
   <div class="g-doc">
   <div class="m-tab m-tab-fw m-tab-simple f-cb">
        <div class="tab">
            <ul>
                <li :class="{'z-sel' : isActive}" v-on:click="all"><a>所有内容</a></li>
                <li :class="{'z-sel' : !isActive}" v-on:click="unBuy"><a>未购买内容</a></li>
            
            </ul>
        </div>
    </div>
    <div class="n-plist">
        <ul class="f-cb" id="goodList">
                    <li v-for="item in goods">
                        <router-link  class="link"  :to="{path : '/settle',query:{id:item.id}}"> 
                       
                            <div class="img"><img :src="item.pictureUrl" alt="SICPP"></div>
                            <h3>{{item.itemName}}</h3>
                            <div class="price"><span class="v-unit">¥</span><span class="v-value"> {{item.itemPrice}}</span></div>
                            <div v-if="item.isBuy==0">
                            <span class="had"><b>已购买</b></span>
                            </div>
                        </router-link>
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
                console.log(response.data)
                console.log(response.data.data.goodList)
                this.$set(this,'goods1',response.data.data.goodList)
                this.$set(this,'goods',response.data.data.goodList)
                
               
                for(var i=0;i<this.goods1.length;i++){
                    if(this.goods1[i].isBuy==1){        
                        this.goods2.push(this.goods1[i])    
                    }
                }
            })
    },
    data () {
        var goods1 =[];
        var goods2 =[];
        var goods=[];
        return {
            goods:goods1,
            goods1:goods1,
            goods2:goods2,
            isActive: true,
            password: ''
        }
     },
    methods:{
        unBuy: function (event){
            this.goods=this.goods2;
            this.isActive=false;
        },
        all: function (event){
            this.goods=this.goods1;
            this.isActive=true;
        }
    },
    components:{
        'netheader':netheader
    },

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../static/css/nt.css";
  



</style>
