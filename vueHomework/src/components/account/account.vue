<template>
    <div>
    <netheader></netheader>
    <div class="g-doc">
    <div class="m-tab m-tab-fw m-tab-simple f-cb">
        <h2>已购买的内容</h2>
    </div>
    <table class="m-table m-table-row n-table g-b3">
        <colgroup><col class="img"/><col/><col class="time"/><col/><col class="num"/><col/><col class="price"/><col/></colgroup>
        <thead>
            <tr>
                <th>&nbsp;内容图片&nbsp;</th>
                <th>内容名称</th>
                <th>购买时间</th>
                <th>购买数量</th>
                <th>购买价格</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in goods">
                    <td><a href="/show?id=1"><img :src="item.pictureUrl" alt=""></a></td>
                    <td><h4><a href="/show?id=1">{{item.itemName}}</a></h4></td>
                    <td><span class="v-time">{{item.buyTime}}</span></td>
                    <td><span class="v-num">{{item.itemNum}}</span></td>
                    <td><span class="v-unit">¥</span><span class="value">{{item.itemPrice}}</span></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4"><div class="total">总计：</div></td>
                <td><span class="v-unit">¥</span><span class="value">{{goodPrice}}</span></td>
            </tr>
        </tfoot>
        </table>



    </div>
    </div>
    





</template>


<script>

import netheader from '../header/netheader.vue'
export default {

    mounted: function(){
        this.$http.post('http://47.92.116.118:8083/api/account',
            {
            },{emulateJSON:true}).then((response) => {
               console.log(response.data.data)
               let map =new Map()
               map=response.data.data
               console.log("this map"+map.price)
               this.$set(this,'goodPrice',map.price)
               this.$set(this,'goods',response.data.data.goodList)
               console.log("this price"+this.goodPrice)
               console.log("this good"+this.goods[0].itemNum)

            });
    },
    data () {
        var goodPrice="";
        var goods=[];
        return {
                goods:goods,
                // goods: [
                // {goodId:"0",imageUrl:"/static/img/P1.png",goodName:"imgCDG",goodPrice:"1500",goodNum:"10",time:"2019-2-22"},
                // {goodId:"0",imageUrl:"/static/img/P1.png",goodName:"imgCDG",goodPrice:"1500",goodNum:"10",time:"2019-2-22"}
                //],
                goodPrice:goodPrice  
            }
        }
    ,
    components:{
        'netheader':netheader
    },

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../static/css/nt.css";
  



</style>
