<template>
        
        <div>
            <netheader></netheader>
     <div class="g-doc">
    <div class="m-tab m-tab-fw m-tab-simple f-cb">
        <h2>内容发布</h2>
    </div>

    <div class="n-public">
        <form class="m-form m-form-ht" id="form">
            <div class="fmitem">
                <label class="fmlab">标题：</label>
                <div class="fmipt">
                    <input class="u-ipt ipt" type="text" v-model="form.imageName"  placeholder="2-80字符" oninput="if(value.length>80)value=value.slice(0,80)"/>
                
                </div>
            </div>
            <div class="fmitem">
                <label class="fmlab">摘要：</label>
                <div class="fmipt">
                    <input class="u-ipt ipt" type="input" v-model="form.summary" placeholder="2-140字符" oninput="if(value.length>5)value=value.slice(0,140)"/> 
                </div>

            </div>
            <div class="fmitem">
            <label class="fmlab">图片：</label>
            	<div class="fmipt" id="uploadType">
	                <input name="pic" id="pic111" ref="ppp" v-model="form.url" type="radio"  v-on:click="urlUpload" checked="checked"> 图片地址
					<input name="pic" type="radio" value="file"  v-on:click="localUpload"/> 本地上传
                    
                </div>	
                
            </div>

            <div class="fmitem">
                <label class="fmlab"> </label>
                <div class=fmipt id="urlUpload"   v-bind:style="{ display: urlisDisplay }"> 
                    <input class="u-ipt ipt"  name="image" v-model="form.imageUrl" placeholder="图片地址"/> 
                </div>
                <div class=fmipt id="fileUpload"  v-bind:style="{ display: localDisplay }">
                    <input type="file" id="fileUp" @change="onFileSelected">
                    <!-- @change="onFileSelected"  class="u-ipt ipt" name="file" -->
                    <!-- class="u-btn " -->
                    <button   class="u-btn " v-on:click="onUpload">上传</button>
                </div>
            
            </div>
            
        
            
            <div class="fmitem">
                <label class="fmlab">正文：</label>
                <div class="fmipt">
                    <textarea class="u-ipt" v-model="form.detail" rows="10" placeholder="2-1000个字符" oninput="if(value.length>5)value=value.slice(0,1000)"></textarea> 
                </div>
            </div>
            <div class="fmitem">
                <label class="fmlab">价格：</label>
                <div class="fmipt">
                    <input class="u-ipt price" v-model="form.goodPrice"/>元
                </div>
            </div>
            <div class="fmitem fmitem-nolab fmitem-btn">
                <div class="fmipt">
                    <button  class="u-btn u-btn-primary u-btn-lg"  v-on:click="submit">发 布</button>
                </div>
            </div>
        </form>
        <div id="urlUpload"   v-bind:style="{ display: urlisDisplay }"> 
            <span class="imgpre"><img :src="form.imageUrl" alt="" id="imgpre"></span>
        </div>
        <div id="localUpload"   v-bind:style="{ display: localDisplay }">
            <span class="imgpre"><img :src="URL" alt="" id="imgpre"></span>
        </div>
        
    </div>
</div>

    </div>
</template>

<script>
/* eslint-disable */ 
import netheader from '../header/netheader.vue'
import Store from '../../store/store.js'
import { loadavg } from 'os';

export default { 
     data () {
       
        return {
            urlisDisplay:"block",
            localDisplay:"none",
            form :{
                goodId:"",
                summary:"",
                imageUrl:"",
                goodPrice:'',
                detail:'',
                imageName:"",
                isLocal:"0"
            },
            selectedFile:null,
            isActive: true,
            goodId:"",
            isCheck:true,
            URL:""
        }
    },
    mounted: function(){
        //展示修改的图片
        let a=document.getElementById("pic111").checked=true

        let id=this.$route.query.id
        console.log("seller === id"+id)
        this.goodId=id;
        this.form.goodId=id;
        console.log("seller good id"+this.goodId)
        this.$http.post('http://47.92.116.118:8083/api/showGood',
        {
            goodId:this.goodId
        },{emulateJSON:true}).then((response) => {
            console.log("show good good"+response.data.data.good)
            
            if(typeof(id)!="undefined"){
                this.form.imageName=response.data.data.good.itemName
                this.form.summary=response.data.data.good.summary
                this.form.detail=response.data.data.good.detail
                this.form.goodPrice=response.data.data.good.itemPrice
                this.form.imageUrl=response.data.data.good.pictureUrl
                this.URL=response.data.data.good.pictureUrl
            }
        }
        )
    },
  
    methods : {
        onFileSelected (event){
             console.log(event)
             this.selectedFile=event.target.files[0]
           
        },
        onUpload (event){
            
            // this.selectedFile=event.target.files[0]
          //  console.log(event)
            let imgFile=this.selectedFile
            const isLt2M = imgFile.size / 1024 /1024
            console.log("imgFile"+this.selectedFile.name)
            if(isLt2M>1){
                alert("上传图片不得大于1Mb")
            }else{
                const fileName=this.selectedFile.name
                    if(fileName.split('.')[1] === 'jpg'||fileName.split('.')[1] === 'png'){
                            
                    
                            
                            let formData=new FormData();
                            formData.append('file',imgFile)
                            formData.append('form', new Blob([JSON.stringify(this.form)], {
                            type: "application/json"
                            }));
                            this.$http.post('http://47.92.116.118:8083/api/saveImg',formData,{
                                method: 'post',
                                headers: {'Content-Type': 'multipart/form-data'}
                            }).then((response) => {
                                this.URL="http://47.92.116.118:8083/icon/"+fileName
                            })
                        
                    }else{    
                        alert("上传图片格式仅限jpg和png") 
                    }
                
                }
          

        },
        localUpload : function(event){
            this.urlisDisplay="none",
            this.localDisplay="block",
            this.form.isLocal="1"
        },
        urlUpload: function(event){
            this.urlisDisplay="block",
            this.localDisplay="none",
            this.form.isLocal="0"
       },
        submit(){
            let formData=new FormData();
            
            if(this.form.imageName.length<2){
                alert("商品名称长度过短")
                return
            }
            if(this.form.summary.length<2){
                alert("商品摘要长度过短")
                return
            }
            if(this.form.detail<2){
                alert("商品详情长度过短")
                return
            }


            formData.append('form', new Blob([JSON.stringify(this.form)], {
             type: "application/json"
            }));
            if(typeof this.form.imageName == "undefined" || this.form.imageName == null || this.form.imageName == ""){
                alert("商品名不可为空")
                return
            }
            var re =  /^\d+(\.\d+)?$/;

            if(!re.test(this.form.goodPrice)){
                alert("请输入非负数字")
                return 
            }
            
            this.$http.post('http://47.92.116.118:8083/api/uploadGood',formData,{
                method: 'post',
                headers: {'Content-Type': 'multipart/form-data'}
            })
            
            this.$router.push({path: '/settle?id='+this.goodId})
         
        }
    },
  components:{
    'netheader':netheader
  },
  watch: {
    　　'$route': function (to, from) {
            console.log("seller router")
    　　      this.form.imageName=""
                this.form.summary=""
                this.form.detail=""
                this.form.goodPrice=""
                this.form.imageUrl=""
        },
        
    

    }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../static/css/nt.css";
  



</style>
