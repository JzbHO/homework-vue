<template>
    <div>
    <netheader></netheader>
    

    <div class="g-doc" id="settleAccount">
    <div class="m-tab m-tab-fw m-tab-simple f-cb" >
        <h2>已添加到购物车的内容</h2>
    </div>
 	<table id="newTable" class="m-table m-table-row n-table g-b3">
         <tbody>
                <tr>
                    <th>
                        <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;">内容名称</font>
                        </font>
                    </th>
                    <th>
                        <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;">数量</font>
                        </font>
                    </th>
                    <th>
                        <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;">价格</font>
                        </font>
                    </th>
                </tr>

               <tr v-for="item in goods">
                   <td>
                       <font style="vertical-align: inherit;">
                           <font style="vertical-align: inherit;">{{item.itemName}}</font>
                       </font>
                   </td>
                    <td>
                       <font style="vertical-align: inherit;">
                           <font style="vertical-align: inherit;">{{item.itemNum}}</font>
                       </font>
                   </td>
                    <td>
                       <font style="vertical-align: inherit;">
                           <font style="vertical-align: inherit;">{{item.itemPrice}}</font>
                       </font>
                   </td>
               </tr>



         </tbody>


 	</table>
 	<div id="act-btn"><button class="u-btn u-btn-primary" id="back"  @click="exit">退出</button>
 	<button class="u-btn u-btn-primary" id="Account" @click="closeCart">购买</button></div>
    </div>

    </div>

    





</template>


<script>

import netheader from '../header/netheader.vue'
export default {
     mounted: function(){
        this.$http.post('http://47.92.116.118:8083/api/cart',
            {
            },{emulateJSON:true}).then((response) => {
                console.log(response.data)
                console.log("cart+"+response.data.data.goodList)
                this.$set(this,'goods',response.data.data.goodList)

            });
    },
    data() {
        var goodsId=[];
        var goods=[];
        var idList=""
        return {
            goods:goods,
            goodsId:goodsId,
            idList:idList
        }
    },
    methods : {
        closeCart: function (event){
            for(var i=0;i<this.goods.length;i++){
                this.idList+=this.goods[i].id+","
                
                console.log("length="+this.idList)

            }
            this.$http.post('http://47.92.116.118:8083/api/closeCart',
            {
                idList: this.idList
            },{emulateJSON:true}).then((response) => {
                this.$set(this,'goods',"")
              
            })
        },
        exit : function(event){
             this.$router.push({path: '/buyergoods'})
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
