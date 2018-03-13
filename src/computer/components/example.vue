<!-- 组件 -->
<template>
    <div class="tmpl">
        <!-- <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
        第一个vue
        <p>当前登录信息是:姓名{{userInfo.name}},手机号:{{userInfo.phone}}</p>
        <p>登录状态1: {{isLogin?'是':'否'}}</p>
        <button @click="LOGIN">切换登录状态1</button> -->
        <input type="number" v-model="data1">
        <input type="number" v-model="data2">
        <span  v-if="flag" v-text="data3"></span>
        <input type="number" v-model= "data4" v-else>
        <button @click ="change1">{{sure}}</button>
    </div>
</template>

<!-- 组件导出 -->
<script>
    import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'


    export default{
        data(){
            return {
                data1:null,
                data2:null,
                data3:0,
                data4:0,
                flag : true,
                flag1:false,
                sure:"修改",
            }
        },
        created(){
            // console.log(this.$store.state.userModule.userInfo.name);
            //请求后台的example
            // this.$http.axios({
            //     url:this.$api.orderDetail,
            //     method:'post',
            //     data:{
            //         orderId:102128669879
            //     },
            //     json:true,
            //     load:true,
            // }).then(resolve=>{
            //     console.log(resolve);
            // }).catch(err=>{
            //     console.log("失败了")
            // })

        },
        methods:{
            mod(param1){
                if(this.sure =="修改"){
                    this.data3 = this.data1 * this.data2;
                    this.data4 = this.data3;
                }else{
                    this.data3 = this.data4;
                }
                return this.data3;
            },
            change1(){
                if(this.sure =="修改"){
                    this.sure = "确定";
                }else{
                    this.sure = "修改";
                }
                this.flag =!this.flag;
            },

            ...mapActions('test',[
                'change'
            ]),
        },
        computed:{

            // ...mapState('userModule',[
            //     'userInfo',
            //     'isLogin',
            // ]),
        },
        components:{

        }
    }
</script>

<!-- 本组件样式 -->
<style scoped>

</style>
