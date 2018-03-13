<template>
	<div>
		<div class="company-show" v-if="editor">
			<table>
				<tr>
					<th colspan='2'>账户信息</th>
				</tr>
				<tr>
					<td>基本信息</td>
					<td>
						<p>
							<span>公司名称</span>
							<i>{{baseInfo.companyName}}</i>
						</p>
						<p>
							<span>品牌名称</span>
							<i>{{baseInfo.brandName}}</i>
						</p>
						<p>
							<span>所在城市</span>
							<i>{{baseInfo.cityName}}</i>
						</p>
						<p>
							<span>办公地址</span>
							<i>{{baseInfo.address}}</i>
						</p>
						<p>
							<span>客服电话</span>
							<i>{{baseInfo.pho | addAreaCode(baseInfo.AreaCode)}}</i>
						</p>
						<p>
							<span>支付验证</span>
							<i v-for='(item,index) in baseInfo.payVerification' style='margin-right:5px;'>{{item}}</i>
						</p>
					</td>
				</tr>
				<tr>
					<td>平台结算账户信息</td>
					<td>
						<p>
							<span>账户户名</span>
							<i>{{accountInfo.name}}</i>
						</p>
						<p>
							<span>银行卡号</span>
							<i>{{accountInfo.cardNum}}</i>
						</p>
						<p>
							<span>开户行</span>
							<i>{{accountInfo.bank}}</i>
						</p>
						<p>
							<span>支付宝手机号</span>
							<i>{{accountInfo.alipayAccount}}</i>
						</p>
						<p>
							<span>实名制验证</span>
							<i>{{accountInfo.alipayName}}</i>
						</p>
					</td>
				</tr>
				<tr>
					<td>公司照片</td>
					<td>
						<div class="flex">
							<h4>公司logo</h4>
							<img :src="img.logo" alt="">
						</div>
						<div class="flex">
							<h4>营业执照</h4>
							<img :src="img.businessLicense" alt="">
						</div>
						<div class="flex">
							<h4>经营许可</h4>
							<img :src="img.BusinessLicense" alt="">
						</div>

					</td>
				</tr>
			</table>
			<el-button type="primary" style='margin:10px auto 10px;display:block;' @click='toEditor'>修改</el-button>
		</div>
		<div class="company-edit" v-else>
			<table>
				<tr>
					<th colspan='2'>账户信息</th>
				</tr>
				<tr>
					<td>基本信息</td>
					<td>
						<p>
							<span>公司名称</span>
							<el-input placeholder="请输入公司名称，须与营业执照一致" v-model="baseInfo.companyName" class="input-big">
							</el-input>
						</p>
						<p>
							<span>品牌名称</span>
							<el-input placeholder="请输入品牌名称" v-model="baseInfo.brandName" class="input-big">
							</el-input>
						</p>
						<p>
							<span>所在城市</span>

							<el-select v-model="prov" placeholder="请选择" class='input-middle'>
								<el-option v-for="(option,index) in arr" :value="option.name" :key='index'>
								</el-option>
							</el-select>

							<el-select v-model="city" placeholder="请选择" class='input-middle'>
								<el-option v-for="(option,index) in cityArr" :value="option.name" :key='index'>
								</el-option>
							</el-select>

							<el-select v-model="district" placeholder="请选择" v-if="district" class='input-middle'>
								<el-option v-for="(option,index) in districtArr" :value="option.name" :key='index'>
								</el-option>
							</el-select>
						</p>
						<p>
							<span>办公地址</span>
							<el-input placeholder="请输入公司具体办公地址" v-model="baseInfo.address" class="input-big">
							</el-input>
						</p>
						<p>
							<span>客服电话</span>
							<el-select v-model="ContactInformation" placeholder="请选择" class="input-middle" @change="clearPro">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-input placeholder="区号" v-model="baseInfo.AreaCode" v-if="ContactInformation === '座机电话'" class='input-small'>
							</el-input>
							<el-input placeholder="电话号码" v-model="baseInfo.pho" style="width:180px;" @blur='verificationPho' :maxlength='11' @keyup.native="baseInfo.pho=baseInfo.pho.replace(/\D/g,'')">
							</el-input>
						</p>
						<p>

							<span>支付验证</span>
							选择支付验证手机号码数量
							<el-select v-model="baseInfo.payVerificationNum" placeholder="" style="width:60px;" @change='baseInfo.payVerification = []'>
								<el-option v-for="item in 3" :key="item.value" :label="item" :value="item">
								</el-option>
							</el-select>
							个
							<div class="payVerificationNum">
								<el-input placeholder="号码" v-for='(item,index) in baseInfo.payVerificationNum' :key='index' v-model="baseInfo.payVerification[index]" @blur="telTest(baseInfo.payVerification[index])" :maxlength='11' @keyup.native="baseInfo.payVerification[index]=baseInfo.payVerification[index].replace(/\D/g,'')">
								</el-input>
							</div>

						</p>
					</td>
				</tr>
				<tr>
					<td>平台结算账户信息</td>
					<td>
						<p>
							<span>账户户名</span>
							<el-input placeholder="请输入结算银行卡账户户名" v-model="accountInfo.name" class="input-big">
							</el-input>
						</p>
						<p>
							<span>银行卡号</span>
							<el-input placeholder="请输入结算银行卡卡号" v-model="accountInfo.cardNum" class="input-big" @blur='bankCode' @keyup.native="accountInfo.cardNum=accountInfo.cardNum.replace(/\D/g,'')" :maxlength='21'>
							</el-input>
						</p>
						<p>
							<span>开户行</span>
							<el-input placeholder="请输入结算银行卡开户行名称" v-model="accountInfo.bank" class="input-big">
							</el-input>
						</p>
						<p>
							<span>支付宝手机号</span>
							<el-input placeholder="请输入支付宝账户" v-model="accountInfo.alipayAccount" :disabled="aliEditor" class="input-big" @blur="telTest(accountInfo.alipayAccount)" :maxlength='11' @keyup.native="accountInfo.alipayAccount=accountInfo.alipayAccount.replace(/\D/g,'')">
							</el-input>
							<span style="color:red;width:110px;margin-left:0px;text-align:left;">*本账户不可修改</span>
						</p>
						<p>
							<span>实名制验证</span>
							<el-input placeholder="请输入支付宝账户的真实名称" v-model="accountInfo.alipayName" class="input-big">
							</el-input>
						</p>
					</td>
				</tr>
				<tr>
					<td>公司照片</td>
					<td class="photo">
						<div class="flex">
							<h4>公司logo</h4>
							<!-- <img :src="img.logo" alt=""> -->
							<el-upload action="https://up.qbox.me/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="remove1" :limit='1' :data='Additional' :on-success='successInfo1' :file-list='imgArr1'>
								<el-button size="small" type="primary" style='opacity:0;height:100%;width:100%' @click="getQiNiuToken"></el-button>
								<i class="el-icon-plus"></i>
							</el-upload>

						</div>
						<div class="flex">
							<h4>营业执照</h4>
							<!-- <img :src="img.businessLicense" alt=""> -->
							<el-upload action="https://up.qbox.me/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="remove2" :limit='1' :data='Additional' :on-success='successInfo2' :file-list='imgArr2'>
								<el-button size="small" type="primary" style='opacity:0;height:100%;width:100%' @click="getQiNiuToken"></el-button>
								<i class="el-icon-plus"></i>
							</el-upload>

						</div>
						<div class="flex">
							<h4>经营许可</h4>
							<!-- <img :src="img.BusinessLicense" alt=""> -->
							<el-upload action="https://up.qbox.me/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="remove3" :limit='1' :data='Additional' :on-success='successInfo3' :file-list='imgArr3'>
								<el-button size="small" type="primary" style='opacity:0;height:100%;width:100%' @click="getQiNiuToken"></el-button>
								<i class="el-icon-plus"></i>
							</el-upload>

						</div>

					</td>
				</tr>
			</table>
			<el-dialog :visible.sync="dialogVisible" size="tiny">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
			<el-button type="primary" style='margin:10px auto 10px;display:block;' @click='toShow'>确定</el-button>
		</div>
	</div>

</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import cityData from '../login/cityData';
import {
	verificationPhone,
	verificationLandline,
	verification400,
	CheckBankNo
} from '../../../common/utils/verificationUtils';
export default {
	data() {
		return {
			editor: true,
			baseInfo: {
				// 公司名称
				companyName: '',
				// 品牌名称
				brandName: '',
				// 所在城市
				cityName: '',
				// 办公地址
				address: '',
				// 区号
				AreaCode: '',
				// 电话
				pho: '',
				// 验证号码数量
				payVerificationNum: '',
				// 支付验证号码
				payVerification: []
			},
			accountInfo: {
				// 账户名称
				name: '',
				// 银行卡
				cardNum: '',
				// 开户银行
				bank: '',
				// 支付宝账户
				alipayAccount: '',
				// 支付宝实名制名称
				alipayName: ''
			},
			// 展示页面显示的图片数据
			img: {
				// 公司logo
				logo: '',
				// 营业执照
				businessLicense: '',
				// 经营许可
				BusinessLicense: ''
			},
			// 城市选择器相关内容开始
			arr: cityData,
			prov: '',
			city: '',
			district: '',
			cityArr: [],
			districtArr: [],
			// 城市选择器相关内容结束
			options: [
				{
					value: '手机电话',
					label: '手机电话'
				},
				{
					value: '座机电话',
					label: '座机电话'
				},
				{
					value: '400电话',
					label: '400电话'
				}
			],
			// 客服电话种类
			ContactInformation: '',
			dialogImageUrl: '',
			dialogVisible: false,
			// 向七牛云上传附带的参数
			Additional: {
				token: ''
			},
			pass: true,
			// 编辑页面显示的图片数据
			imgArr1: [
				{
					url: ''
				}
			],
			imgArr2: [
				{
					url: ''
				}
			],
			imgArr3: [
				{
					url: ''
				}
			],
			aliEditor: true
		};
	},
	created() {
		// 初始化关闭父组件的common
		this.$parent.commenShow = false;
		this.$http
			.axios({
				url: this.$api.showInfo,
				method: 'get'
			})
			.then(res => {
				console.log(res);
				// 判断是否个人分销商;
				if (res.roleId === '02020000')
					return this.$router.push({ path: '/index/accountPerson' });

				let data = res.infoCompannyEntity;
				this.baseInfo.address = data.address;
				this.accountInfo.alipayAccount = data.alipayAccount;
				this.accountInfo.alipayName = data.alipayTrueName;
				this.accountInfo.name = data.bankAccount;
				this.accountInfo.bank = data.bankCardName;
				this.accountInfo.cardNum = data.bankCardNum;
				this.baseInfo.brandName = data.brand;
				this.img.BusinessLicense = data.businessLicense;
				this.prov = data.province;
				this.city = data.city;
				this.district = data.nationwide;
				this.baseInfo.companyName = data.compannyName;
				this.img.businessLicense = data.companyLicense;
				this.img.logo = data.companyLogo;
				this.baseInfo.payVerification = data.payPhoneNum.split(',');
				this.baseInfo.payVerificationNum = data.payValidateNum;
				this.baseInfo.pho = data.servicePhone;
				this.ContactInformation = data.serviceType;
				this.baseInfo.cityName = `${data.province}-${data.city}-${
					data.nationwide
				}`;
				this.prov = data.province;
				this.city = data.city;
				this.district = data.nationwide;
				if (data.companyLicense.length === 0) {
					this.imgArr2 = [];
				} else {
					this.imgArr2[0].url = data.companyLicense;
				}

				if (data.companyLogo.length === 0) {
					this.imgArr1 = [];
				} else {
					this.imgArr1[0].url = data.companyLogo;
				}

				if (data.businessLicense.length === 0) {
					this.imgArr3 = [];
				} else {
					this.imgArr3[0].url = data.businessLicense;
				}

				if (data.alipayAccount.length === 0) {
					this.aliEditor = false;
					this.editor = false;
				}

				if (data.payValidateNum.length === 0) {
					this.baseInfo.payVerificationNum = 1;
				}
			})
			.catch(err => {
				console.error('123123123123123123123');
				console.log(err);
			});
	},
	methods: {
		...mapMutations('userModule', ['saveBaseInfo']),
		getQiNiuToken() {
			// 获取token值
			this.$syspub.getQiNiuToken().then(res => {
				this.Additional.token = res;
			});
		},
		remove1(file, fileList) {
			this.imgArr1 = fileList;
		},
		remove2(file, fileList) {
			this.imgArr2 = fileList;
		},
		remove3(file, fileList) {
			this.imgArr3 = fileList;
		},
		// 选择客服电话种类之后，清除原先的电话数据
		clearPro() {
			this.baseInfo.AreaCode = '';
			this.baseInfo.pho = '';
		},
		// 去编辑页面
		toEditor() {
			this.editor = false;
		},
		// 去信息展示页面
		toShow() {
			this.StitchingCity();
			let info1 =
				this.baseInfo.companyName.length !== 0 &&
				this.baseInfo.brandName.length !== 0 &&
				this.baseInfo.cityName.length !== 0 &&
				this.baseInfo.address.length !== 0 &&
				this.baseInfo.pho.length !== 0 &&
				this.baseInfo.payVerificationNum.length !== 0 &&
				this.baseInfo.payVerification.length ===
					parseInt(this.baseInfo.payVerificationNum) &&
				this.baseInfo.payVerification.every(item => item.length !== 0)
					? true
					: false;

			let info2 =
				this.accountInfo.name.length !== 0 &&
				this.accountInfo.cardNum.length !== 0 &&
				this.accountInfo.bank.length !== 0 &&
				this.accountInfo.alipayAccount.length !== 0 &&
				this.accountInfo.alipayName.length !== 0
					? true
					: false;

			let info3 =
				this.img.logo.length !== 0 &&
				this.img.businessLicense.length !== 0 &&
				this.img.BusinessLicense.length !== 0
					? true
					: false;

			if (!info1) {
				this.$message.error('请完善基本信息');
			}
			if (!info2) {
				this.$message.error('请完善平台结算账户信息');
			}
			if (!info3) {
				this.$message.error('请完善公司照片');
			}

			if (this.baseInfo.payVerification.length > 1) {
				for (let i = 0; i < this.baseInfo.payVerification.length; i++) {
					if (
						this.baseInfo.payVerification[i] ===
						this.baseInfo.payVerification[i + 1]
					)
						return this.$message.error('验证手机号不能一样');
				}
			}

			if (info1 && info2 && info3 && this.pass) {
				console.log(this.baseInfo.payVerification.join(','));
				console.log(this.baseInfo.payVerification);
				let addAreaCode = null;
				if (this.baseInfo.AreaCode.length !== 0) {
					addAreaCode = `${this.baseInfo.AreaCode}-${this.baseInfo.pho}`;
				} else {
					addAreaCode = this.baseInfo.pho;
				}
				// 所有验证通过
				this.$http
					.axios({
						url: this.$api.refreshInfo,
						method: 'post',
						json: true,
						data: {
							// 品牌
							brand: this.baseInfo.brandName,
							// 办公地址
							address: this.baseInfo.address,
							// 支付宝手机号
							alipayAccount: this.accountInfo.alipayAccount,
							// 支付宝实名认证
							alipayTrueName: this.accountInfo.alipayName,
							// 银行账户
							bankAccount: this.accountInfo.name,
							// 开卡银行
							bankCardName: this.accountInfo.bank,
							// 银行卡号
							bankCardNum: this.accountInfo.cardNum,
							compannyName: this.baseInfo.companyName,
							// 营业执照
							companyLicense: this.imgArr2[0].url,
							// companyLicense:
							// 	'http://pics.ctripfair.com/FuePZKI4_nAEZoiLxo3ivguE93Kp?imageslim',
							// 经营许可
							businessLicense: this.imgArr3[0].url,
							// businessLicense:
							// 	'http://pics.ctripfair.com/FuePZKI4_nAEZoiLxo3ivguE93Kp?imageslim',
							// 公司logo
							companyLogo: this.imgArr1[0].url,
							// companyLogo:
							// 	'http://pics.ctripfair.com/FuePZKI4_nAEZoiLxo3ivguE93Kp?imageslim',
							// 客服电话
							servicePhone: addAreaCode,
							// 客服电话种类
							serviceType: this.ContactInformation,
							// 支付验证手机号
							payPhoneNum: this.baseInfo.payVerification.join(','),
							// 支付验证手机号数量
							payValidateNum: this.baseInfo.payVerificationNum,
							// 省
							province: this.prov,
							// 市
							city: this.city,
							// 区
							nationwide: this.district
						}
					})
					.then(res => {
						this.$message.success('信息修改成功');
						if ((res.status = 'success')) {
							this.editor = true;
							this.$http
								.axios({
									url: 'employee/getUserInfo',
									method: 'get'
								})
								.then(res => {
									this.saveBaseInfo(res);
								})
								.catch(err => {
									console.error(err);
								});
						}
					})
					.catch(err => {
						console.log(err);
					});
				// this.editor = true;
			}
		},
		// 城市选择器用的方法
		updateCity: function() {
			for (var i in this.arr) {
				var obj = this.arr[i];
				if (obj.name == this.prov) {
					this.cityArr = obj.sub;
					break;
				}
			}
			if (this.cityArr[1]) {
				this.city = this.cityArr[1].name;
			}
		},
		// 城市选择器用的方法
		updateDistrict: function() {
			for (var i in this.cityArr) {
				var obj = this.cityArr[i];
				if (obj.name == this.city) {
					this.districtArr = obj.sub;
					break;
				}
			}
			if (
				this.districtArr &&
				this.districtArr.length > 0 &&
				this.districtArr[1].name
			) {
				this.district = this.districtArr[1].name;
			} else {
				this.district = '';
			}
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		// 图片上传错误信息提示
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		// 图片成功上传之后返回的数据
		successInfo1(response, file, fileList) {
			this.addPhoto('logo', response.key);
			this.successInfo(response.key, this.imgArr1);
		},
		successInfo2(response, file, fileList) {
			this.addPhoto('businessLicense', response.key);
			this.successInfo(response.key, this.imgArr2);
		},
		successInfo3(response, file, fileList) {
			this.addPhoto('BusinessLicense', response.key);
			this.successInfo(response.key, this.imgArr3);
		},
		addPhoto(key, val) {
			let newVal = `http://pics.ctripfair.com/${val}?imageslim`;
			this.img[key] = newVal;
		},
		// 验证电话号码
		verificationPho() {
			let result = null;
			switch (this.ContactInformation) {
				case '手机电话':
					result = verificationPhone(this.baseInfo.pho);
					break;
				case '座机电话':
					result = verificationLandline(this.baseInfo.pho);
					break;
				case '400电话':
					result = verification400(this.baseInfo.pho);
					break;
			}
			if (result === '0') {
				this.$message.error('你输入的电话有误！');
				this.pass = false;
				return;
			}
			this.pass = true;
		},
		// 验证银行卡号
		bankCode() {
			let result = CheckBankNo(this.accountInfo.cardNum);
			if (this.accountInfo.cardNum.length === 0) return;
			if (result === false) {
				this.$message.error('您输入的银行卡有误');
				this.pass = false;
				return;
			}
			this.pass = true;
		},
		// 拼接城市
		StitchingCity() {
			this.baseInfo.cityName = `${this.prov}-${this.city}-${this.district}`;
		},
		telTest(str) {
			let result = verificationPhone(str);
			if (str.length === 0) return;
			if (result === '0') {
				this.$message.error('您输入的手机号有误');
				this.pass = false;
				return;
			}
			this.pass = true;
		},
		successInfo(name, picStore) {
			let obj = {};
			obj.url = this.$syspub.getQiNiuPic(name); //获取图片链接
			// console.log(obj);
			// console.log(this.picStore)
			picStore.push(obj); // 封面图
		}
	},
	beforeMount: function() {
		this.updateCity();
		this.updateDistrict();
	},
	mounted() {
		this.StitchingCity();
	},
	watch: {
		prov: function() {
			this.updateCity();
			this.updateDistrict();
		},
		city: function() {
			this.updateDistrict();
		}
	},
	filters: {
		addAreaCode: function(pho, code) {
			if (code.length !== 0) {
				return `${code}-${pho}`;
			} else {
				return `${pho}`;
			}
		}
	}
};
</script>
<style lang='scss' scoped>
.company-show,
.company-edit {
	width: 100%;
	table {
		background: #fff;
		width: 92%;
		margin: 20px auto 0;
		border: 1px solid RGBA(223, 223, 223, 1);
		tr,
		td,
		th {
			border: 1px solid RGBA(223, 223, 223, 1);
		}
		th {
			line-height: 50px;
			width: 100%;
		}
		tr {
			p {
				margin-bottom: 20px;
				&:nth-child(1) {
					margin-top: 20px;
				}
				span {
					margin-left: 30px;
					margin-right: 15px;
					text-align: right;
					width: 86px;
					display: inline-block;
				}
			}
			div {
				margin-bottom: 10px;
				&:nth-child(1) {
					margin-top: 20px;
				}
				&.flex {
					display: flex;
					h4 {
						width: 80px;
						margin-left: 30px;
						font-weight: normal;
						margin-bottom: 5px;
						text-align: right;
						margin-right: 15px;
					}
					img {
						width: 308px;
						height: 164px;
					}
				}
			}

			img {
				// display: block;
				// margin:0 auto;
			}
		}
		td {
			&:nth-child(1) {
				width: 25%;
				text-align: center;
			}
		}
	}
}
.company-edit {
	table {
		tr {
			div {
				margin-bottom: 0px;
				&:nth-child(1) {
					margin-top: 0px;
				}
				&.payVerificationNum {
					& > div {
						margin-right: 10px;
						width: 145px;
						&:nth-child(1) {
							margin-left: 130px;
						}
					}
				}
				&.flex {
					display: flex;
					h4 {
						width: 80px;
						margin-left: 30px;
						font-weight: normal;
						margin-bottom: 5px;
						text-align: right;
						margin-right: 15px;
					}
					img {
						width: 308px;
						height: 164px;
					}
				}
			}

			img {
				// display: block;
				// margin:0 auto;
			}
			td {
				&.photo {
					div {
						margin-bottom: 10px;
						&:nth-child(1) {
							margin-top: 20px;
						}
					}
				}
			}
		}
	}
}
i {
	font-style: normal;
}

.input-big {
	width: 400px;
}
.input-middle {
	width: 130px;
}
.input-small {
	width: 80px;
}
</style>
