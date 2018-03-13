<template>
	<div class="item">
		<div class="item-bottom">
                <span class="span-title">发团日期</span>
                <calander-seat  :obj='dataArr' @getdata='dateClick'  :index-num='1' :canClick='true' :showPrice='true' ref='calendarSeat'></calander-seat>
                <!-- <calander-pro  :obj='item.dataArr' @getdata='dateClick' :index-num='index'  ref='calendar'></calander-pro> -->
                 <!-- <el-tag v-for='ceshi in item.dataArr' :key='ceshi.day'>{{ceshi.day}}</el-tag> -->
            <div class="dot" style="margin-left:10px"></div>
        </div>
        <div class="item-bottom">
                    <span class="span-title">余位设定</span>
                    <el-select v-model="restType" placeholder="请选择" style='width:20.3%'>
                        <el-option v-for="sell in options3" :key="sell.value" :label="sell.label" :value="sell.value">
                        </el-option>
                    </el-select>
                    <el-input placeholder='余位数量' v-if='restType==1' v-model.trim='rest1' v-on:input="checkNum2()" style='margin-left:0'>
                    </el-input>
                    <div class="dot" style='margin-left:10px'></div> 
        </div>
        <div class="button-area">
                    <el-button type="primary" plain size='middle'  @click='nextThree'  :disabled='twocom'>提交</el-button>
        </div>
	</div>
</template>
<script>
import calanderSeat from '../../public/calander_seat.vue'
import Validate from '@/common/validate/validate.js'
import {mapState,mapActions} from 'vuex'

	export default{
		data(){
			return{
				dataArr:[],
				proLeaveTime:[],
				restType:'0',
				rest1:'',
				twocom:false,
				options3: [{ value: '0', label: '不限余位' }, { value: '1', label: '设定余位' }]

			}
		},
		computed:{
                ...mapState('editRoutePro',['SproNum','rest']),
		},
		watch:{
			rest:{
				handler(){
					this.promiseSyn().then(()=>{
					this.dataArr=this.rest;
				}).then(()=>{
					this.$refs.calendarSeat.initData(null)
				})
				}
			}
		},
		methods:{
			promiseSyn(){
                return new Promise((resolve,reject)=>{
                    resolve()
                })
            },
			dateClick(data){
				this.proLeaveTime=data;
			},
			nextThree(){//提交
				if(!this.proLeaveTime.length) return this.$message.warning('未选择团期');
				if(!this.restType) return this.$message.warning('未选择余位设置');
				if(this.restType==1&&!this.rest1) return this.$message.warning('未填写余位数量');
				let obj={};
				obj.proNum=this.SproNum;
				obj.proLeaveTime=this.proLeaveTime.join(',');
				if(this.restType==1){
					obj.proRest=this.rest1;
				}
				this.twocom=true;
				this.$http.axios({
					url:this.$api.modifyProRest,
					method:'post',
					data:obj
				}).then(res=>{
					this.twocom=false;
					if(res==1){
						this.$message.success('修改成功')
					}
				}).catch(()=>{
					this.twocom=false;
				})
			},
			checkNum2(){
				//校验余位为5数字
                if(this.rest1){
                    this.$nextTick(()=>{
                        this.rest1=Validate.checkNum(this.rest1).slice(0,5);
                    })
                }
			}
		},
		components:{
			calanderSeat
		}
	}
</script>
<style scoped>
	@import '../../../../assets/pcCss/addProduct.css'
</style>