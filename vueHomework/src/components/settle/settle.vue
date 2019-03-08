<template>
    <div>
        <netheader></netheader>    
        <div class="g-doc">
        <div class="n-show f-cb" id="showContent">
            <div class="img"><img :src="imageUrl" alt="" ></div>
            <div class="cnt">
                <h2>{{goodName}}</h2>
                <p class="summary">{{summary}}</p>
                <div class="price">
                    <span class="v-unit">¥</span><span class="v-value">{{goodPrice}}</span>
                </div>
                <div class="num">购买数量：<span id="plusNum" class="lessNum"><a v-on:click="sub">-</a></span><span class="totalNum" id="allNum">{{goodNum}}</span><span id="addNum" class="moreNum"><a v-on:click="goodNum+=1">+</a></span></div>
                <div class="oprt f-cb">
                    <div v-if="userType==1">
                        <router-link  class="link"  :to="{path : '/seller',query:{id:goodId}}">
                        <span class="u-btn u-btn-primary" >编辑</span>
                        </router-link>
                        <span class="buyprice">当前价格：¥{{goodPrice}}</span>
                    </div>
                    <div  v-else-if="isBuy==0">
                           <el-dialog title="确认框" :visible.sync="dialogFormVisible">
                            <div class="m-winwrapper">
                                <div class="winwrapper">
                                    <div class="m-win m-win-simple">
                                        <div class="winhd">
                                            <h2 class="wintt">提示</h2>
                                        </div>
                                        <div class="winbd">确认加入购物车吗？</div>
                                        <div class="winft">
                                            <button class="u-btn u-btn-primary u-btn-fw" @click="addToCart">确定</button>
                                            <button class="u-btn u-btn-primary u-btn-fw" @click="cancle">取消</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-dialog>
                        
                       
                        <span class="u-btn u-btn-primary "  @click="handleCreate">已购买，继续购买</span>
                        <span class="buyprice">当时购买价格：¥{{buyPrice}}</span>
                    </div>
                    <div v-else>

                        <el-dialog title="确认框" :visible.sync="dialogFormVisible">
                            <div class="m-winwrapper">
                                <div class="winwrapper">
                                    <div class="m-win m-win-simple">
                                        <div class="winhd">
                                            <h2 class="wintt">提示</h2>
                                        </div>
                                        <div class="winbd">确认加入购物车吗？</div>
                                        <div class="winft">
                                            <button class="u-btn u-btn-primary u-btn-fw" @click="addToCart">确定</button>
                                            <button class="u-btn u-btn-primary u-btn-fw" @click="cancle">取消</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-dialog>

                        <span class="u-btn u-btn-primary" @click="handleCreate">加入购物车</span>
                        <span class="buyprice">当前价格：¥{{goodPrice}}</span>
                    </div>  

                </div>
            </div>
        </div>
        <div class="m-tab m-tab-fw m-tab-simple f-cb">
            <h2>详细信息</h2>
        </div>
        <div class="n-detail">
            {{detailInfor}}
        </div>
    </div>
</div>

</template>

<script>
import netheader from '../header/netheader.vue'
import Vue from 'vue'
import gloal from '../../const/global.vue'
export default {
    data () {
        return {
            goodId:"",
            goodName: '',
            imageUrl: '',
            goodPrice:'',
            buyPrice:'',
            detailInfor:'',
            summary:"",
            goodNum:1,
            isBuy:"",
            userType:"",
            isShow:false,
            dialogFormVisible:false
        }
    },
    mounted: function(){
        this.userType=localStorage.userType
        let id=this.$route.query.id
        this.goodId=id;
        console.log("re request id===="+this.goodId)
        this.$http.post('http://47.92.116.118:8083/api/showGood',
        {
            goodId:this.goodId
        },{emulateJSON:true}).then((response) => {
            
            this.goodName=response.data.data.good.itemName
            this.summary=response.data.data.good.summary
            this.detailInfor=response.data.data.good.detail
            this.goodPrice=response.data.data.good.itemPrice
            console.log("price test"+response.data.data.good.buyPrice)
            this.buyPrice=response.data.data.good.buyPrice
            this.isBuy=response.data.data.good.isBuy
            this.imageUrl=response.data.data.good.pictureUrl
            
            
        }
        )
    },
    methods : {
        cancle(){
            this.dialogFormVisible=false;
        },
        handleCreate(){
            this.dialogFormVisible=true;
        },
        sub(){
            console.log("sum ing")
            if(this.goodNum>1){
                this.goodNum-=1
            }
        },
        addToCart(){
             this.dialogFormVisible=false;
            this.$http.post('http://47.92.116.118:8083/api/addToCart',
            {   
                goodId:this.goodId,
                goodPrice:this.goodPrice,
                goodNum:this.goodNum
            },{emulateJSON:true}).then((response) => {
                console.log("addToCart show good"+response.data.data)
            })
        },
        eject(){
               console.log("弹出层 ing ....")
            this.isShow = !this.isShow;
               
        }
    },
    components:{
        'netheader':netheader
    }
    // created(){
    //     let id=this.$route.query.id
    //     this.goodId=id;
    //     console.log("created request====")
    //     this.$http.post('http://127.0.0.1:8081/api/showGood',
    //     {
    //         goodId:this.goodId
    //     },{emulateJSON:true}).then((response) => {
    //         console.log("crated picture url===="+response.data.data.good.pictureUrl)
    //         this.goodName=response.data.data.good.itemName
    //         this.summary=response.data.data.good.summary
    //         this.detailInfor=response.data.data.good.detail
    //         this.goodPrice=response.data.data.good.itemPrice
    //         this.buyPrice=response.data.data.good.buyPrice
    //         this.isBuy=response.data.data.good.isBuy
    //         this.imageUrl=response.data.data.good.pictureUrl
    //         console.log("crated url===="+this.imageUrl)
            
    //     })
    // }
}

// Vue.directive('popup',{
//     inserted : function(el,binding){
//         var o=el;
//         var myDiv=document.createElement('div')
//         myDiv.setAttribute("class", "m-win m-win-simple")
      
//         var button1=document.createElement('div')
//         button1.setAttribute("class", "winhd")
//         var button1Child=document.createElement('h2')
//         button1Child.innerHTML="提示:确定加入购物车？"
//         button1Child.setAttribute("class", "wintt")
        
//         button1Child.setAttribute("v-on:click", "sub")
        
//         button1.appendChild(button1Child)

//         myDiv.appendChild(button1)

//         var button2=document.createElement('div')
//         myDiv.appendChild(button2)

//         var button3=document.createElement('div')
//         button3.setAttribute("class", "winft")
//         var button3Child1=document.createElement('input')
//         button3Child1.setAttribute("class", "u-btn u-btn-primary u-btn-fw")
//         button3Child1.value="确认"
//         var button3Child2=document.createElement('input')
//         button3Child2.setAttribute("class", "u-btn u-btn-primary u-btn-fw")
//         button3Child2.value="取消"
//         button3.appendChild(button3Child1)
//         button3.appendChild(button3Child2)

//         myDiv.appendChild(button3)
//         myDiv.style.display = 'none';

  

//           myDiv.style.position = 'fixed';
//           myDiv.style.top = '50%';
//           myDiv.style.left = '50%';
//          myDiv.style.transform = 'translate(-50%, -100%)';


//         document.body.appendChild(myDiv)
//           o.onclick = function (event) {
            
//             myDiv.style.display = 'block'
//           }
//           button3Child1.onclick = function (event) {
         
//             myDiv.style.display = 'none'
//           }
//           button3Child2.onclick = function (event) {
//             myDiv.style.display = 'none'
//           }
        


//     }
// })








</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../static/css/nt.css";
  



</style>
