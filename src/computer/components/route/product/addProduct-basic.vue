<template>
	<div style="padding-top:10px">
		<div class="item">
			<span class="span-title">产品名称</span>
			<el-input placeholder='请输入产品名称,不得超过20字' style='width:48%' v-model.trim='proName' :maxlength='20'></el-input>
			<span class="span-title right-title">内部编号</span>
			<el-input placeholder='最多10字符,字母或数字' style='width:25%' v-model.trim='proSelfNum' :maxlength='10' v-on:input="checkNumA(proSelfNum)"></el-input>
		</div>
		<div class="item">
			<span class="span-title">产品类型</span>
			<el-select v-model="proType1" placeholder="请选择" style='width:23.5%;margin-right:0.7%'>
				<el-option v-for="item in options1" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
			<el-select v-model="proType2" placeholder="请选择" style='width:23.5%;margin-left:0'>
				<el-option v-for="item in options2" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
			<span class="span-title right-title">主要交通类型</span>
			<el-select v-model="proType3" placeholder="请选择" style='width:25%'>
				<el-option v-for="item in options3" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</div>
		<div class="item">
			<span class="span-title">产品简介</span>
			<el-input type="textarea" style='width:48%,vertical-align:top' v-model='proIntro' placeholder='请输入产品简介,不得超过50字' :maxlength='50'></el-input>
		</div>
		<div class="dot"></div>
		<div class="item">
			<span class="span-title">行程天数</span>
			<div class="inline-block" style="width:90%">
			<el-select v-model='proDays' style="width:18.2%">
				<el-option v-for="num in 31" :key="num" :label="num" :value="num">
				</el-option>
			</el-select>
			</div>

		</div>


		<!-- 目的地 -->
		<div class="item">
			<span class="span-title">目的地</span>
			<div class="inline-block" style="width:90%">
				<el-tag class='line-tag' v-for="tag in proDestinationArr" :key="tag" closable type="info" @close="delproDestination(tag)">
					{{tag}}
				</el-tag>
				<el-input placeholder='请输入目的地' style='width:18.2%' v-model='proDestination'></el-input>
				<el-button type="primary" plain size='small' @click='addproDestination'>添加+</el-button>
			</div>
		</div>
		<!-- 出发城市 -->
		<div class="item">
			<span class="span-title">出发城市</span>
			<div class="inline-block" style="width:90%">
				<city-picker placeholder="选择出发城市" @change='proStartCity=arguments[0]' :inputcity='proStartCity | changeData' :city-list="cityList" style="width:16.9%" ref='cityPicker1'></city-picker>
			</div>
		</div>
		<!-- 客源城市 -->
		<div class="item">
			<span class="span-title">客源城市</span>
			<div class="inline-block" style="width:90%">
				<!-- <el-select v-model="proType22" placeholder="请选择" style="width:17.9%">
						    <el-option
						      v-for="item in options14"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					  	</el-select> -->
				<template v-if='proType22==false'>
					<el-tag class='line-tag' v-for="(tag,index) in customCitys" :key="tag" closable @close="handleClose(index)" type="info" >
						{{tag.split('[')[0]}}
					</el-tag>
					<city-picker field="city" placeholder="选择城市" @change='customCity=arguments[0]' :inputcity='proStartCity | changeData'  :city-list="cityList" ref='cityPicker2' style="width:16.9%;"></city-picker>
					<el-button type="primary" plain size='small' @click='addcustomCity' style=''>添加+</el-button>
				</template>
				<el-checkbox v-model="proType22" style='margin-left:10px;'>不限城市</el-checkbox>
			</div>
		</div>
		<!-- 联运服务 -->
		<div class="item" v-if='customCitys.length>1&&proType22==false'>
			<span class="span-title">联运服务</span>
			<div style="display:inline-block;width:90%">
				<el-select v-model="contactServe" placeholder="请选择" style="width:17.9%">
					<el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<!-- 联运服务数组 -->
				<div style="display:inline-block;vertical-align:top" v-if='contactServe==1'>
					<div class="item-bottom" v-for='(item,index) in contactArr'>
						<city-picker field="city" placeholder="选择城市" @change='item.cityName=arguments[0]' :inputcity='item.cityName | changeData'  :city-list="cityList" style='margin-left:0' ref='cityPicker3'></city-picker>
						<el-input v-model='item.fee' style='width:35%;display:inline-table;' placeholder='请输入联运费用' v-on:input="checkNum3(index)">
							<template slot="append">元/人</template>
						</el-input>
						<el-button type="primary" plain size='small' @click='delContactArr(item)' v-if='index!=0' >删除</el-button>
						<el-button type="primary" plain size='small' @click='addContactArr' v-if='index==0' >添加</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="dot"></div>
		<!-- 价格体系 -->
		<div class="item">
			<span class="span-title">价格体系</span>
			<el-checkbox-group v-model="priceArr" class="item-left">
				<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
			</el-checkbox-group>
			<div style="vertical-align: top;margin-left:70px">
				<div class="price-item" v-if='child'>
					<span class="span-title">儿童标准</span>
					<el-input v-model='childStandard' style='width:41.2%' placeholder='请输入儿童标准'></el-input>
				</div>
				<div class="price-item" v-if='student'>
					<span class="span-title">学生标准</span>
					<el-input v-model='studentStandard' style='width:41.2%' placeholder='请输入学生标准'></el-input>
				</div>
				<div class="price-item" v-if='old'>
					<span class="span-title">老人标准</span>
					<el-input v-model='oldStandard' style='width:41.2%' placeholder='请输入老人标准'></el-input>
				</div>
			</div>
		</div>
		<div class="item">
			<span class="span-title">适用年龄</span>
			<el-select v-model="fitAgeStart " placeholder="请选择起始年龄">
				<el-option v-for="item in age" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
			<span class="span-color">至</span>
			<el-select v-model="fitAgeEnd  " placeholder="请选择结束年龄">
				<el-option v-for="item in age" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</div>
		<div class="dot"></div>
		<!-- 住宿 -->
		<div class="item">
			<span class="span-title">住宿房型</span>
			<el-select v-model="isContainHotel" placeholder="请选择">
				<el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-checkbox-group v-model="proHotelType" v-if='isContainHotel==1'>
				<el-checkbox v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox>
			</el-checkbox-group>
		</div>
		<!-- 单房差 -->
		<div class="item" v-if='isContainHotel==1'>
			<span class="span-title">单房差价</span>
			<el-select v-model="isRoomFree" placeholder="请选择">
				<el-option v-for="item in options8" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<div class="dot"></div>
		<!-- 集合信息 -->
		<!-- 排座位号 -->
		<div class="item" v-if="proType3=='汽车'">
			<span class="span-title">排座位号</span>
			<el-select v-model="proSeat" placeholder="请选择">
				<el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<template v-if='proSeat==1'>
				<span class="span-title right-title">选择第一辆车型</span>
				<el-select v-model="proSeatCarType  " placeholder="请选择" style='width:20%'>
					<el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</template>
			<template v-if='proSeat==1'>
				<span class="span-title right-title">支持客人选座</span>
				<el-select v-model="proSeatOpen" placeholder="请选择" style="width:12%">
					<el-option v-for="item in options15" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</template>
		</div>

		<!-- 审核员工 -->
		<div class="item">
			<span class="span-title">审核员工</span>
			<el-select v-model="proAuditEmployee" filterable placeholder="请选择">
				<el-option v-for="item in options9" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span class="span-title right-title">订单短信提醒</span>
			<el-select v-model="proOrderInfo" filterable placeholder="请选择" style='width:20%'>
				<el-option v-for="item in options10" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>

		<!-- 上线设定 -->
		<div class="item">
			<span class="span-title">上线设置</span>
			<el-select v-model="proStoredSetting " placeholder="请选择">
				<el-option v-for="item in options12" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<template v-if='proStoredSetting==1'>
				<span class="span-title right-title">上线日期</span>
				<el-date-picker v-model="onlineData" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style='width:20%'>
				</el-date-picker>
			</template>
		</div>
		<!-- 支付设定 -->
		<div class="item">
			<span class="span-title">支付设定</span>
			<el-select v-model="payMethod " placeholder="请选择">
				<el-option v-for="item in options11" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<div class="dot"></div>
		<div class="button-area">
			<el-button type="primary" plain size='middle' @click='oneSave' :disabled='save'>保存</el-button>
			<el-button type="primary" plain size='middle' style='margin-left:30px' @click='nextSecond' :disabled='commit'>下一步</el-button>
		</div>
	</div>
	<!-- </div> -->

</template>
<style scoped>
@import '../../../../assets/pcCss/addProduct.css';
</style>
<script>
import cityPicker from '../../public/cityPicker.vue';
import cityList from 'china-city-data';
import Validate from '@/common/validate/validate.js';
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			cityList,
			fileList: [],
			proDays: '',
			proName: '', //产品名称
			proSelfNum: '', //内部编号
			proIntro: '', //产品简介
			proType1: '', //产品类型1
			proType2: '', //产品类型2
			proType3: '', //主要交通形式
			proDestination: '', //目的的input
			proDestinationArr: [], //目的的数组
			proType22: false, //是否不限城市
			customCity: '', //客源城市
			customCitys: [], //客源城市数组
			proStartCity: '',
			contactServe: '0', //是否联运服务
			priceArr: [], //价格数组
			childStandard: '',
			studentStandard: '',
			oldStandard: '',
			fitAgeStart: '不限年龄',
			fitAgeEnd: '不限年龄',
			proSeat: '0', //是否排座位
			proSeatCarType: '', //车型
			proSeatOpen:'0',//是否支持选作
			isContainHotel: '0', //是否包含住宿
			proHotelType: [], //住宿房型
			isRoomFree: '0', //是否单房差
			proAuditEmployee: '0', //审核员工
			proOrderInfo: '0', //短信提醒员工
			onlineData: '', //上线日期
			onlineTime: '', //上线时间
			proStoredSetting: '0', //0立即1预约上线
			payMethod: '0', //0余味支付1审核后支付
			isExport: '', //是否导入集合信息
			child: false,
			student: false,
			old: false,
			save:false,
			commit:false,
			contactArr: [{ cityName: '', fee: '' }],
			gather: [
				{
					proGatherTime: '',
					proGatherPlace: '',
					checked: '',
					proPickUpFee: ''
				}
			],
			cities: ['成人价格', '儿童价格', '学生价格', '老人价格'],
			cities1: ['大床房', '双人标间', '三人标间', '三人家庭房', '四人间', '多人间', '露营'],
			options1: ['出境游', '国内游', '周边游'],
			options2: [
				'跟团游',
				'自由行',
				'邮轮',
				'自驾游',
				'亲子游',
				'户外旅行',
				'交通+酒店',
				'交通+门票',
				'酒店+门票'
			],
			options3: ['汽车', '飞机', '其他交通形式'],
			options4: [
				{ value: '0', label: '不提供联运服务' },
				{ value: '1', label: '提供联运服务' }
			],
			options5: [{ value: '0', label: '不含住宿' }, { value: '1', label: '包含住宿' }],
			options6: [{ value: '0', label: '不需要' }, { value: '1', label: '需要' }],
			options7: [
				{ value: '33+1+1', label: '33+1+1' },
				{ value: '35+1+1', label: '35+1+1' },
				{ value: '37+1+1', label: '37+1+1' },
				{ value: '45+1+1', label: '45+1+1' },
				{ value: '47+1+1', label: '47+1+1' },
				{ value: '49+1+1', label: '49+1+1' },
				{ value: '53+1+1', label: '53+1+1' },
				{ value: '55+1+1', label: '55+1+1' },
				{ value: '57+1+1', label: '57+1+1' },
				{ value: '59+1+1', label: '59+1+1' }
			],
			options8: [{ value: '0', label: '无差价' }, { value: '1', label: '有差价' }],
			options9: [{ value: '0', label: '不限员工' }],
			options10: [{ value: '0', label: '不设提醒' }],
			options11: [
				{ value: '0', label: '有余位即可支付' },
				{ value: '1', label: '需要审核通过后支付' }
			],
			options12: [
				{ value: '0', label: '审核通过立即上线' },
				{ value: '1', label: '预约时间上线' }
			],
			options13: [{ value: '0', label: '手动输入' }, { value: '1', label: '导入模板' }],
			options14: [{ value: '0', label: '不限城市' }, { value: '1', label: '选择城市' }],
			options15: [{ value: '0', label: '不支持' }, { value: '1', label: '支持' }]
		};
	},
	computed: {
		...mapState('addPro', ['proNum', 'basic']),
		age() {
			var ageArr = ['不限年龄'];
			for (let i = 1; i <= 100; i++) {
				ageArr.push(i);
			}
			return ageArr;
		}
	},
	created() {

	},
	mounted(){
		// 审核员工
		this.$http.axios({
					url: this.$api.getEmployeeListByCurrentUser+'?statu=1',
					method: 'get',
					// data: obj,
					json: true
				})
				.then(res => {
					for (let i = 0; i < res.length; i++) {
						this.options9.push({
							label:res[i].jobNumber+' '+res[i].name,
							value: res[i].userId
						});
						this.options10.push({
							label:res[i].jobNumber+' '+res[i].name,
							value: res[i].userId
						})
												
					}
				}).catch(err=>{
						// this.save=false;
				});
	},
	filters: {
		changeData(oldVal) {
			return oldVal;
		}
	},
	watch: {
		onlineData: {
			handler() {
				if (this.onlineData) {
					if (new Date(this.onlineData).getTime() < new Date().getTime()) {
						this.onlineData = '';
						this.$message.error('请选择大于今天的时间');
					}
				}
			}
		},
		priceArr: {
			handler() {
				this.child = false;
				this.student = false;
				this.old = false;
				if (this.priceArr.includes('学生价格')) {
					this.student = true;
				}
				if (this.priceArr.includes('儿童价格')) {
					this.child = true;
				}
				if (this.priceArr.includes('老人价格')) {
					this.old = true;
				}
			},
			deep: true
		},
		basic: {
			handler() {
				this.promiseSyn().then(()=>{
				if (this.basic.routeProEntity) {
					let obj = this.basic.routeProEntity;
					this.proName = obj.proName;
					this.proSelfNum = obj.proSelfNum;
					this.proIntro = obj.proIntro;
					this.proDays = obj.proDays;
					if (obj.proType) {
						this.proType1 = obj.proType.split(',')[0];
						this.proType2 = obj.proType.split(',')[1];
					}
					this.proType3 = obj.mainTraffic; //主要交通形式
					if (obj.proDestination) {
						this.proDestinationArr = obj.proDestination.split(','); //目的的
						this.proDestination='';
					}
					if(obj.proStartCity){
						this.proStartCity=obj.proStartCity.split('[')[1].slice(0,6);
					}
					if (obj.passengerCity == '不限') {
						//客源城市
						// this.proType22='0';
						this.proType22 = true;
					} else {
						// this.proType22='1';
						this.proType22 = false;
						if (obj.passengerCity) {
							this.customCitys = obj.passengerCity.split(',');
						}
					}
					if (this.customCitys.length > 1) {
						//联运服务
						this.contactServe = obj.isTransport; //是否联运
						let routeUnion = this.basic.routeUnionTransportEntityList;
						if (obj.isTransport == 1 && routeUnion.length > 0) {
							let contactArr = [];
							routeUnion.forEach(function(item2, index2) {
								let obj2 = {};
								if(item2.cityName){
									obj2.cityName = item2.cityName.split('[')[1].slice(0,6);
								}else{
									obj2.cityName='';
								}
								// console.log(cityName)
								obj2.fee = item2.fee;
								contactArr.push(obj2);
							});
							this.contactArr = contactArr;
						}
					}
					this.priceArr=[];
					if(obj.priceStructure){
						this.priceArr = obj.priceStructure.split(',');
					}
					if (this.priceArr.includes('儿童价格')) {
						this.child = true;
						this.childStandard = obj.childStandard;
					}
					if (this.priceArr.includes('学生价格')) {
						this.student = true;
						this.studentStandard = obj.studentStandard;
					}
					if (this.priceArr.includes('老人价格')) {
						this.old = true;
						this.oldStandard = obj.oldStandard;
					}
					if (this.proType3 == '汽车') {
						this.proSeat = obj.proSeat; //是否排座位
						if (obj.proSeat == 1) {
							this.proSeatCarType = obj.proSeatCarType; //车型
							this.proSeatOpen = obj.proSeatOpen; //车型
						}
					}
					this.isContainHotel = obj.isContainHotel; //是否包含住宿
					if (obj.isContainHotel == 1) {
						this.proHotelType = obj.proHotelType.split(','); //住宿房型
						this.isRoomFree = obj.isRoomFree ? obj.isRoomFree : '0'; //是否单房差
					}
					this.proAuditEmployee = obj.proAuditEmployee; //审核员工
					this.proOrderInfo = obj.proOrderInfo; //短信提醒员工
					this.proStoredSetting = obj.proStoredSetting; //0立即1预约上线
					if (obj.proStoredSetting == 1 && obj.proStoredTime) {
						// this.onlineTime=obj.proStoredTime.split(',')[1];
						this.onlineData = obj.proStoredTime;
					}
					this.payMethod = obj.payMethod; //0余味支付1审核后支付
					this.fitAgeStart = obj.fitAgeStart == 0 ? '不限年龄' : obj.fitAgeStart;
					this.fitAgeEnd = obj.fitAgeEnd == 0 ? '不限年龄' : obj.fitAgeEnd;
				}
				}).then(()=>{
					let vm=this;
					this.$refs.cityPicker1.assignGather();
                    if(this.$refs.cityPicker2){
                        this.$refs.cityPicker2.nowCity='';
                    }
					if(this.proType22==false&&this.customCitys.length>1){
							if (this.contactServe == 1 && this.contactArr.length > 0) {
								this.contactArr.forEach(function(item2, index2) {
									console.log(vm.$refs.cityPicker3)
									vm.$refs.cityPicker3[index2].assignGather();
								})
						}
					}

				})
			},
			deep: true
		}
	},
	methods: {
		promiseSyn(){
                return new Promise((resolve,reject)=>{
                    resolve()
                })
        },
		checkNumA(obj) {
			//校验内部编号10位字母数字
			if (this.proSelfNum) {
				this.$nextTick(() => {
					this.proSelfNum = Validate.checkNum1(this.proSelfNum).slice(0, 10);
				});
			}
		},
		checkNum3(index) {
			//校验联运费为5数字
			let obj = this.contactArr[index].fee;
			if (obj) {
				this.$nextTick(() => {
					obj = Validate.checkNum(obj).slice(0, 5);
					this.contactArr[index].fee = obj;
				});
			}
		},
		change(e) {
			var formData = new FormData();
			formData.append('file', e.target.files[0]); //加入文件对象
			this.$http
				.updaloadExcel({
					url: this.$api.uploadExcel,
					method: 'post',
					data: formData
				})
				.then(res => {
					let arr = res.data;
					arr.forEach(function(item, index) {
						if (item.proPickUpFee) {
							item.checked = true;
						} else {
							item.checked = false;
						}
					});
					this.gather = arr;
				})
				.catch(err => {
					this.$message.error(err);
				});
		},
		addproDestination() {
			//添加目的地
			if (this.proDestination) {
				this.proDestinationArr.push(this.proDestination);
				this.proDestination = '';
			} else {
				this.$message.warning('请填写有效的目的地');
			}
		},
		delproDestination(tag) {
			//删除目的
			// if(this.proDestinationArr.length>1){
			let index = this.proDestinationArr.indexOf(tag);
			this.proDestinationArr.splice(index, 1);
			// }else{
			// 	this.$message.warning('至少保留一个目的地');
			// }
		},
		addcustomCity(value) {
			//客源城市添加
			if (this.customCity) {
				this.customCitys.push(this.customCity);
				this.customCity = '';
				this.$refs.cityPicker2.nowCity = '';
			} else {
				this.$message.warning('请选择城市');
			}
		},
		handleClose(index) {
			//删除客源城市标签
			// if(this.customCitys.length>1){
			// let index = this.customCitys.indexOf(tag);
			this.customCitys.splice(index, 1);
			// }else{
			// 	this.$message.warning('至少保留一个客源城市');
			// }
		},
		addContactArr() {
			//添加联云服务数组
			this.contactArr.push({ cityName: '', fee: '' });
		},
		delContactArr(item) {
			//删除联运服务数组
			// if(this.contactArr.length>1){
			let index = this.contactArr.indexOf(item);
			this.contactArr.splice(index, 1);
			// }else{
			// 	this.$message.warning('至少保留一条');
			// }
		},
		download() {
			//下载模板
			this.$http.axios({
				url: this.$api.downloadPro,
				method: 'get'
			});
		},
		oneSave() {
			//暂存
			let obj = this.pickData(obj);
			if (obj.routeProEntity.proType == ',') {
				//产品类型
				obj.routeProEntity.proType = '';
			}
			this.save=true;
			console.log(obj);
			this.$http
				.axios({
					url: this.$api.appProBasic,
					method: 'post',
					data: obj,
					json: true
				})
				.then(res => {
					this.$message.success('基本信息保存成功');
						this.save=false;
						this.proDestination='';
				}).catch(err=>{
						this.save=false;
				});
		},
		nextSecond() {
			//下一步
			let obj = this.pickData(obj);
			if (this.flagData() == true) {
				this.commit=true;
				this.$http
					.axios({
						url: this.$api.appProBasic,
						method: 'post',
						data: obj,
						json: true
					})
					.then(res => {
						this.commit=false;
						this.oneCommit(obj);
						if (res) {
							this.twoCommit(res);
						}
						this.changeTab('second');
					}).catch(err=>{
						this.commit=false;
					});
			} //校验数据
		},
		pickData() {
			let obj1 = {};
			let obj = {};
			(obj1.routeProEntity = obj), (obj.proDays = this.proDays);
			obj.proNum = this.proNum;
			obj.proName = this.proName;
			obj.proSelfNum = this.proSelfNum;
			obj.proIntro = this.proIntro;
			obj.proType = this.proType1 + ',' + this.proType2;
			obj.mainTraffic = this.proType3; //主要交通形式
			if(this.proDestination){
				this.proDestinationArr.push(this.proDestination)
			}
			obj.proDestination = this.proDestinationArr.join(','); //目的的
			obj.proStartCity = this.proStartCity=="[]"?'':this.proStartCity;
			if (this.proType22 == true) {
				obj.passengerCity = '不限';
			} else {
				obj.passengerCity = this.customCitys.join(','); //客源城市
			}
			obj.isTransport =0;
			if (this.proType22 == false&&this.customCitys.length > 1) {
				obj.isTransport = this.contactServe; //是否联运
				//联运服务
				if (obj.isTransport == 1) {
					this.contactArr.forEach(function(item,index){
						if(item.cityName=="[]"){
							item.cityName='';
						}
					})
					obj1.routeUnionTransportEntityList = this.contactArr;
				}
			}
			obj.priceStructure = this.priceArr.join(',');
			if (this.child) {
				obj.childStandard = this.childStandard;
			}
			if (this.student) {
				obj.studentStandard = this.studentStandard;
			}
			if (this.old) {
				obj.oldStandard = this.oldStandard;
			}
			if (this.proType3 == '汽车') {
				obj.proSeat = this.proSeat; //是否排座位
				if (obj.proSeat == 1) {
					obj.proSeatCarType = this.proSeatCarType; //车型
					obj.proSeatOpen=this.proSeatOpen;//客人座位
				}
			}
			obj.isContainHotel = this.isContainHotel; //是否包含住宿
			if (obj.isContainHotel == 1) {
				obj.proHotelType = this.proHotelType.join(','); //住宿房型
				obj.isRoomFree = this.isRoomFree; //是否单房差
			}
			obj.proAuditEmployee = this.proAuditEmployee; //审核员工
			obj.proOrderInfo = this.proOrderInfo; //短信提醒员工
			obj.proStoredSetting = this.proStoredSetting; //0立即1预约上线
			if (obj.proStoredSetting == 1) {
				obj.proStoredTime = this.onlineData;
				// obj.proStoredTime =this.hangdDate(this.onlineData)+','+this.onlineTime;
			}
			obj.payMethod = this.payMethod; //0余味支付1审核后支付
			obj.fitAgeStart = this.fitAgeStart;
			if (obj.fitAgeStart == '不限年龄') {
				obj.fitAgeStart = 0;
			}
			obj.fitAgeEnd = this.fitAgeEnd;
			if (obj.fitAgeEnd == '不限年龄') {
				obj.fitAgeEnd = 0;
			}
			console.log(obj1);
			return obj1;
			// 集合信息
		},
		flagData() {
				console.log(this.proStartCity);
			if (!this.proName) {
				return this.$message.error('产品名称未填写');
			}
			if (!this.proSelfNum.trim()) {
				return this.$message.error('内部编号未填写');
			}
			if (!this.proIntro) {
				return this.$message.error('产品简介未填写');
			}
			if (!this.proType1 || !this.proType2) {
				return this.$message.error('产品类型未填写');
			}
			if (!this.proType3) {
				return this.$message.error('主要交通形式未填写');
			}
			if (!this.proDays) {
				return this.$message.error('行程天数未选择');
			}
			if (!this.proStartCity||this.proStartCity=="[]") {
				console.log(this.proStartCity);
				return this.$message.error('出发城市未填写');
			}
			if (this.proType22 == false && !this.customCitys.length) {
				return this.$message.error('客源城市未填写');
			}
			if (!this.proDestinationArr.length&&!this.proDestination) {
				return this.$message.error('目的地未填写');
			}
			if (this.customCitys.length > 1) {
				//联运服务
				if (!this.contactServe) {
					return this.$message.error('联运服务未选择');
				}
				if(this.contactServe==1){
					for(let i=0;i<this.contactArr.length;i++){
						let item=this.contactArr[i]
						if(!item.cityName||item.cityName=="[]"){
							return this.$message.error('联运城市未选择')
						}
						if(!item.fee){
							return this.$message.error('未填写联运费用')
						}
					}
				}
			}
			if (!this.priceArr.length) {
					return this.$message.error('价格体系未选择');
			}
			if (this.child) {
				if (!this.childStandard) {
					return this.$message.error('儿童标准未填写');
				}
			}
			if (this.student) {
				if (!this.studentStandard) {
					return this.$message.error('学生标准未填写');
				}
			}
			if (this.old) {
				if (!this.oldStandard) {
					return this.$message.error('老人标准未填写');
				}
			}
			if (!this.fitAgeStart) {
				return this.$message.error('适用起始年龄未选择');
			}
			if (!this.fitAgeEnd) {
				return this.$message.error('适用结束年龄未选择');
			}
			if (this.proType3 == '汽车') {
				if (this.proSeat == 1) {
					//是否排座位
					if (!this.proSeatCarType) {
						//车型
						return this.$message.error('车型未选择');
					}
					if (!this.proSeatOpen) {
						//车型
						return this.$message.error('客人是否支持选座未选择');
					}
				}
			}
			if (this.isContainHotel == 1) {
				//是否包含住宿
				if (!this.proHotelType.length) {
					return this.$message.error('住宿房型未选择');
				}
				if (!this.isRoomFree) {
					return this.$message.error('单房差未选择');
				}
			}
			if (!this.proAuditEmployee) {
				return this.$message.error('订单审核员工未选择');
			}
			if (!this.proOrderInfo) {
				return this.$message.error('短信提醒员工未选择');
			}
			if (!this.payMethod) {
				return this.$message.error('支付设定未选择');
			}
			if (!this.proStoredSetting) {
				return this.$message.error('上线设置未选择');
			}
			if (this.proStoredSetting == 1) {
				// if(!this.onlineTime){
				// 	return this.$message.error('上线时间未选择')
				// }
				if (!this.onlineData) {
					return this.$message.error('上线日期时间未选择');
				}
				// obj.proStoredTime =this.hangdDate(this.onlineData)+','+this.onlineTime;
			}
			return true;
		},
		warningTip(text) {
			return this.$message.warning(text);
		},
		hangdDate(val) {
			//处理单个日期转换
			let y = val.getFullYear();
			let m = val.getMonth() + 1;
			m = m < 10 ? '0' + m : m;
			let d = val.getDate();
			d = d < 10 ? '0' + d : d;
			return y + '-' + m + '-' + d;
		},
		...mapActions('addPro', ['oneCommit', 'changeTab', 'twoCommit'])
	},
	components: {
		cityPicker
	}
};
</script>
