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
							<span>真实姓名</span>
							<i>{{baseInfo.trueName}}</i>
						</p>
						<p>
							<span>身份证号</span>
							<i>{{baseInfo.IDcard}}</i>
						</p>
						<p>
							<span>所在城市</span>
							<i>{{baseInfo.cityName}}</i>
						</p>
						<p>
							<span>销售体系</span>
							<i>{{baseInfo.sellType}}</i>
						</p>
						<p>
							<span>联系电话</span>
							<i>{{baseInfo.tel}}</i>
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
					<td>个人头像</td>
					<td>
						<div class="flex">
							<h4>个人头像</h4>
							<img :src="img.avator" alt="">
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
							<span>真实姓名</span>
							<el-input placeholder="请输入真是姓名" v-model="baseInfo.trueName" class="input-big">
							</el-input>
						</p>
						<p>
							<span>身份证号</span>
							<el-input placeholder="请输入身份证号码" v-model="baseInfo.IDcard" class="input-big" @blur='verificationID' :maxlength='18' @keyup.native="baseInfo.IDcard=baseInfo.IDcard.replace(/\D/g,'')">
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
							<span>销售体系</span>
							<!-- <el-input placeholder="请输入公司具体办公地址" v-model="baseInfo.address" class="input-big">
                            </el-input> -->
							<el-radio v-model="baseInfo.sellType" label="团队销售">团队销售</el-radio>
							<el-radio v-model="baseInfo.sellType" label="个人销售">个人销售</el-radio>

						</p>
						<p>
							<span>联系电话</span>

							<el-input placeholder="联系电话" v-model="baseInfo.tel" style="width:180px;" @blur='verificationPho' :maxlength='11' @keyup.native="baseInfo.tel=baseInfo.tel.replace(/\D/g,'')">
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
					<td>个人头像</td>
					<td class="photo">
						<div class="flex">
							<h4>个人头像</h4>
							<!-- <img :src="img.logo" alt=""> -->
							<el-upload action="https://up.qbox.me/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="remove1" :limit='1' :data='Additional' :on-success='successInfo1' :file-list='imgArr1'>
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
import cityData from '../login/cityData';
import {
	verificationPhone,
	verificationLandline,
	verification400,
	CheckBankNo,
	verificationID
} from '../../../common/utils/verificationUtils';
export default {
	data() {
		return {
			editor: true,
			baseInfo: {
				// 真实姓名
				trueName: '',
				// 身份证号
				IDcard: '',
				// 所在城市
				cityName: '',
				// 销售体系
				sellType: '',
				// 电话
				tel: '',
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
				// 个人头像
				avator: ''
			},
			// 城市选择器相关内容开始
			arr: cityData,
			prov: '',
			city: '',
			district: '',
			cityArr: [],
			districtArr: [],
			// 城市选择器相关内容结束
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
				let data = res.infoPersonEntity;
				this.accountInfo.alipayAccount = data.alipayAccount;
				this.accountInfo.alipayName = data.alipayTrueName;
				this.accountInfo.bank = data.bankCardName;
				this.accountInfo.cardNum = data.bankCardNum;
				this.accountInfo.name = data.bankAccount;

				this.baseInfo.IDcard = data.idCard;
				this.baseInfo.tel = data.linkPhone;
				this.baseInfo.payVerification = data.payPhoneNum.split(',');
				this.baseInfo.payVerificationNum = data.payValidateNum;

				this.baseInfo.sellType = data.saleType;
				this.baseInfo.trueName = data.trueName;
				if (data.saleType === 0) {
					this.baseInfo.sellType = '个人销售';
				} else {
					this.baseInfo.sellType = '团队销售';
				}

				if (data.personPic.length === 0) {
					this.imgArr1 = [];
					this.img.avator = '';
				} else {
					this.imgArr1[0].url = data.personPic;
					this.img.avator = data.personPic;
				}

				if (data.province.length === 0) {
					this.baseInfo.cityName = '';
				} else {
					this.baseInfo.cityName = `${data.province}-${data.city}-${data.nationwide}`;
					this.prov = data.province;
					this.city = data.city;
					this.district = data.nationwide;
				}

				if (data.alipayAccount.length === 0) {
					this.aliEditor = false;
					this.editor = false;
				}

				if (data.payValidateNum.length === 0) {
					this.baseInfo.payVerificationNum = 1;
				}

				console.log(data);
			})
			.catch(err => {
				console.error('123123123123123123123');
				console.log(err);
			});
	},
	methods: {
		getQiNiuToken() {
			// 获取token值
			this.$syspub.getQiNiuToken().then(res => {
				this.Additional.token = res;
			});
		},
		verificationID() {
			let result = verificationID(this.baseInfo.IDcard);
			if (result === '0') {
				this.$message.error('您输入的身份号有误');
				this.pass = false;
				return;
			}
			this.pass = true;
		},
		remove1(file, fileList) {
			this.imgArr1 = fileList;
		},

		// 选择客服电话种类之后，清除原先的电话数据
		clearPro() {
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
				this.baseInfo.trueName.length !== 0 &&
				this.baseInfo.IDcard.length !== 0 &&
				this.baseInfo.cityName.length !== 0 &&
				this.baseInfo.sellType.length !== 0 &&
				this.baseInfo.tel.length !== 0 &&
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

			let info3 = this.imgArr1.length !== 0 ? true : false;

			if (!info1) {
				this.$message.error('请完善基本信息');
			}
			if (!info2) {
				this.$message.error('请完善平台结算账户信息');
			}
			if (!info3) {
				this.$message.error('请完善个人头像');
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
				let sellType = null;
				if (this.baseInfo.sellType === '个人销售') {
					sellType = '0';
				} else {
					sellType = '1';
				}

				// 所有验证通过
				this.$http
					.axios({
						url: this.$api.refreshInfo,
						method: 'post',
						json: true,
						data: {
							// 联系电话
							linkPhone: this.baseInfo.tel,
							// 身份证号
							idCard: this.baseInfo.IDcard,
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
							saleType: sellType,
							trueName: this.baseInfo.trueName,
							// 支付验证手机号
							payPhoneNum: this.baseInfo.payVerification.join(','),
							// 支付验证手机号数量
							payValidateNum: this.baseInfo.payVerificationNum,
							// 个人头像
							// personPic:
							// 	'http://pics.ctripfair.com/FuePZKI4_nAEZoiLxo3ivguE93Kp?imageslim',
							personPic: this.imgArr1[0].url,
							// 省
							province: this.prov,
							// 市
							city: this.city,
							// 区
							nationwide: this.district
						}
					})
					.then(res => {
						console.log(res);
						this.$message.success('信息修改成功');
						if ((res.status = 'success')) {
							this.editor = true;
						}
					})
					.catch(err => {
						console.log(err);
					});
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
			this.city = this.cityArr[1].name;
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
		addPhoto(key, val) {
			let newVal = `http://pics.ctripfair.com/${val}?imageslim`;
			this.img[key] = newVal;
		},
		// 验证电话号码
		verificationPho() {
			let result = verificationPhone(this.baseInfo.tel);
			if (this.baseInfo.tel.length === 0) return;
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
