<template>
	<div class="gong">
		<div class="page1" v-if="pageInfo">
			<el-steps :active="stepNum" align-center>
				<el-step title="1.填写基本资料">
					<i slot="icon" class="icon1"></i>
				</el-step>
				<el-step title="2.申请成为分销商">
					<i slot="icon" class="icon2"></i>
				</el-step>
				<el-step title="3.完善分销商信息">
					<i slot="icon" class="icon3"></i>
				</el-step>
				<el-step title="4.成功入驻">
					<i slot="icon" class="icon4"></i>
				</el-step>
			</el-steps>
			<div class="table">
				<table>
					<tr>
						<td>账户信息</td>
						<td>
							<p>
								<span>用户名</span>
								<el-input placeholder="由6-20位字母+数字组成" v-model.trim="account.user" @blur='confirmUser' @focus="account.userMsg=false" :maxlength='20'>
								</el-input>
								<el-alert :title="account.userMsgInfo" type="error" class='msgTip' v-if="account.userMsg" :closable='false'>
								</el-alert>

							</p>
							<p>
								<span>邮箱账号</span>
								<el-input placeholder="输入正确的邮箱账号" v-model.trim="account.mail" @blur='confirmMail' @focus="account.mailMsg=false">
								</el-input>
								<el-alert :title="account.mailMsgInfo" type="error" class='msgTip' v-if="account.mailMsg" :closable='false'>
								</el-alert>

							</p>
							<p>
								<span>创建密码</span>
								<el-input placeholder="格式为6-16位数字+字母" v-model.trim="account.password" @blur='confirmPassword' :type="pwdType" @focus="account.pwdMsg=false" :maxlength='16'>
									<i slot="suffix" class="el-input__icon el-icon-date" :class='{eye:eye,eyeClose:eyeClose}' @click="changeEye"></i>
								</el-input>

								<el-alert title="密码格式不正确" type="error" class='msgTip' v-if="account.pwdMsg" :closable='false'>
								</el-alert>
							</p>
							<p>
								<span>绑定手机</span>
								<!-- <el-input placeholder="此手机号一经绑定，不得更改" v-model.trim="account.pho" @blur='confirmPhone' @focus="account.phoMsg=false" :maxlength='11' @keyup.native="account.pho=account.pho.replace(/\D/g,'')"> -->
								<el-input placeholder="此手机号一经绑定，不得更改" v-model.trim="account.pho" @blur='confirmPhone("blur")' @focus="account.phoMsg=false" :maxlength='11' @keyup.native="confirmPhone">
								</el-input>
								<span style="color:red;width:196px;text-align:left;">*{{account.phoMsgInfo}}</span>
								<!-- <el-alert :title="account.phoMsgInfo" type="error" class='msgTip' v-if="account.phoMsg" :closable='false'> -->
								</el-alert>
							</p>

							<p>
								<span>手机验证</span>
								<el-input placeholder="输入验证码" v-model.trim="account.code" style='width:130px;' :disabled='editorCode' :maxlength='6' @keyup.native="account.code=account.code.replace(/\D/g,'')">
								</el-input>

								<el-button class="sendMessage" @click="sendMsg" :disabled='buttonState.show' type="text" plain>{{buttonState.info}}</el-button>

							</p>
							<p>
								<span style="margin-right:10px;">分销商类型</span>
								<el-select v-model.trim="distributorType.select" placeholder="请选择" class="companyType">
									<el-option v-for="(item,index) in distributorType.data" :value="item.num" :label="item.label" :key='index'>
									</el-option>
								</el-select>

							</p>

						</td>
					</tr>
					<tr v-if="showCompany">
						<td>公司信息</td>
						<td>
							<p>
								<span>公司名称</span>
								<el-input placeholder="需和营业执照名称一致" v-model.trim="account.companyName">
								</el-input>

							</p>
							<p>
								<span style="margin-right:10px;">所在城市</span>
								<el-select v-model.trim="prov" placeholder="请选择">
									<el-option v-for="(option,index) in arr" :value="option.name" :key='index'>
									</el-option>
								</el-select>

								<el-select v-model.trim="city" placeholder="请选择">
									<el-option v-for="(option,index) in cityArr" :value="option.name" :key='index'>
									</el-option>
								</el-select>

								<el-select v-model.trim="district" placeholder="请选择" v-if="district">
									<el-option v-for="(option,index) in districtArr" :value="option.name" :key='index'>
									</el-option>
								</el-select>

							</p>
							<p>
								<span>公司地址</span>
								<el-input placeholder="请填写办公地址" v-model.trim="account.address">
								</el-input>

							</p>
							<!-- <p>
								<span style="margin-right:10px;">公司类型</span>
								<el-select v-model.trim="companyType.select" placeholder="请选择" class="companyType">
									<el-option v-for="(item,index) in companyType.data" :value="item.num" :label="item.label" :key='index'>
									</el-option>
								</el-select>

							</p> -->
						</td>
					</tr>
					<!-- <tr>
						<td>联系信息</td>
						<td>
							<p>
								<span>联系人</span>
								<el-input placeholder="输入联系人姓名" v-model.trim="account.contactName">
								</el-input>

							</p>
							<p>
								<span>联系电话</span>
								<el-input placeholder="填写联系人手机号码" v-model.trim="account.contactPho" :maxlength='11'>
								</el-input>

							</p>
						</td>
					</tr> -->
				</table>
				<el-button type="primary" @click='submitInfo' style="margin:20px auto;display:block;background:RGBA(69, 200, 220, 1.00);border:none;">提交基本资料</el-button>

			</div>
		</div>
		<div class="page2" v-else>
			<h1>供应商用户：</h1>
			<p>您的资料已经成功提交，我们的工作人员会在2个工作日之内与您联系，请保持电话畅通，谢谢合作！</p>
			<el-button type="primary" class="backToHome" @click="backToHome">返回首页</el-button>
		</div>

	</div>
</template>
<script>
import cityData from './cityData';
import {
	verificationUser,
	verificationMail,
	verificationPhone
} from '../../../common/utils/verificationUtils';

export default {
	name: 'component_name',
	data() {
		return {
			// 控制显示页面的状态
			pageInfo: true,
			// 所在第几个步骤
			stepNum: 0,
			// 城市选择器相关内容开始
			arr: cityData,
			// 省
			prov: '',
			// 市
			city: '',
			// 区
			district: '',
			// 城市集合
			cityArr: [],
			districtArr: [],
			// 城市选择器相关内容结束
			distributorType: {
				data: [
					{
						label: '个人分销商',
						num: '02020000'
					},
					{
						label: '企业分销商',
						num: '02010000'
					}
				],
				select: ''
			},
			account: {
				// 用户名
				user: '',
				// 用户名报错信息
				userMsg: false,
				// 用户名报错信息内容
				userMsgInfo: '',
				password: '',
				pwdMsg: false,
				mail: '',
				mailMsg: false,
				mailMsgInfo: '',
				pho: '',
				phoMsg: false,
				phoMsgInfo: '此手机号一经绑定，不得更改',
				companyName: '',
				code: '',
				address: ''
			},
			// 手机验证码按钮的相关状态
			buttonState: {
				show: false,
				info: '发送验证码'
			},
			// 点击提交做的相关判断依据
			submitAccord: {
				user: false,
				mail: false,
				password: false,
				tel: false
				// code: false
			},
			eye: false,
			eyeClose: true,
			pwdType: 'password',
			showCompany: false
		};
	},
	created() {},
	methods: {
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
		// 确认用户名正确与否
		confirmUser() {
			if (this.account.user.length !== 0) {
				let result = verificationUser(6, 20, this.account.user);

				if (result === '0') {
					console.warn('用户名格式验证错误');
					this.account.userMsg = true;
					this.account.userMsgInfo = '您输入的用户名有误！';
					this.submitAccord.user = false;
				} else {
					this.account.userMsg = false;

					this.$http
						.axios({
							url: this.$api.VerifyUserName,
							params: {
								str: this.account.user
							},
							method: 'GET'
						})
						.then(res => {
							if (res === 1) {
								this.account.userMsgInfo = '该用户名已注册';
								this.account.userMsg = true;
								this.submitAccord.user = false;
							} else {
								this.submitAccord.user = true;
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
			}
		},
		// 确认邮箱正确与否
		confirmMail() {
			if (this.account.mail.length !== 0) {
				let result = verificationMail(this.account.mail);
				if (result === '0') {
					this.account.mailMsg = true;
					this.submitAccord.mail = false;
					this.account.mailMsgInfo = '您输入的邮箱有误';
				} else {
					this.account.mailMsg = false;

					this.$http
						.axios({
							url: this.$api.VerifyUserName,
							params: {
								str: this.account.mail
							},
							method: 'GET'
						})
						.then(res => {
							if (res === 1) {
								this.account.mailMsgInfo = '该邮箱已注册';
								this.account.mailMsg = true;
								this.submitAccord.mail = false;
							} else {
								this.submitAccord.mail = true;
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
			}
		},
		// 确认手机号正确与否
		confirmPhone(type) {
			let result = null;
			this.account.pho = this.account.pho.replace(/\D/g, '');

			// 失去焦点验证
			if (type === 'blur') {
				if (this.account.pho.length !== 0) {
					result = verificationPhone(this.account.pho);
					if (result === '0') {
						this.account.phoMsg = true;
						this.submitAccord.tel = false;
						this.account.phoMsgInfo = '您输入的手机号有误';
					} else {
						this.account.phoMsg = false;
					}
				} else {
					this.account.phoMsgInfo = '此手机号一经绑定，不得更改';
				}
				return;
			}
			if (this.account.pho.length === 11) {
				result = verificationPhone(this.account.pho);
				if (result === '0') {
					this.account.phoMsg = true;
					this.submitAccord.tel = false;
					this.account.phoMsgInfo = '您输入的手机号有误';
				} else {
					this.account.phoMsg = false;
					this.$http
						.axios({
							url: this.$api.VerifyUserName,
							params: {
								str: this.account.pho
							},
							method: 'GET'
						})
						.then(res => {
							if (res === 1) {
								this.account.phoMsgInfo = '该手机号已绑定';
								this.account.phoMsg = true;
								this.submitAccord.tel = false;
							} else {
								this.account.phoMsgInfo = '此手机号一经绑定，不得更改';
								console.log('手机号格式正确');
								this.submitAccord.tel = true;
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
			}
		},
		// 发送手机验证码
		sendMsg() {
			if (this.submitAccord.tel === true) {
				this.$http
					.axios({
						url: `${this.$api.getCode}/reg/${this.account.pho}`,
						method: 'GET'
						
					})
					.then(res => {
						console.log(res);
						this.buttonState.show = true;
						let num = 60;
						let timer = setInterval(() => {
							num--;
							this.buttonState.info = `重新发送(${num})`;
							if (num === 0) {
								this.buttonState.info = `发送验证码`;
								this.buttonState.show = false;
								clearInterval(timer);
							}
						}, 1000);
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		// 确认密码正确与否
		confirmPassword() {
			if (this.account.password.length !== 0) {
				let result = verificationUser(6, 16, this.account.password);
				console.log(result);
				if (result === '0') {
					this.account.pwdMsg = true;
					this.submitAccord.password = false;
				} else {
					console.log(this.$md5.md5(this.account.password));
					this.account.pwdMsg = false;
					this.submitAccord.password = true;
				}
			}
		},
		// 确认验证码正确
		confirmTelCode() {
			if (this.account.code.length === 6) {
				this.$http
					.axios({
						url: this.$api.confirmTelCode,
						method: 'GET',
						params: {
							userphone: this.account.pho,
							infoValidate: this.account.code
						}
					})
					.then(res => {
						console.log(res);
						if (res === 1) {
							this.submitAccord.code = true;
						}
					})
					.catch(err => {
						console.error(err);
					});
			}
		},
		// 提交填写好的表单资料
		submitInfo() {
			if (this.showCompany) {
				if (this.prov.length === 0) {
					this.$message.error('请选择所在城市');
					return;
				}
				if (this.account.companyName.length === 0) {
					this.$message.error('请填写公司名称');
					return;
				}
				if (this.account.address.length === 0) {
					this.$message.error('请填写公司地址');
					return;
				}
			}

			if (this.distributorType.select.length === 0) {
				return this.$message.error('请填写分销商类型');
			}
			if (
				this.submitAccord.user &&
				this.submitAccord.mail &&
				this.submitAccord.password &&
				this.submitAccord.tel
			) {
				// 密码进行加密
				let pwd = this.$md5.md5(this.account.password);
				this.$http
					.axios({
						url: this.$api.register,
						method: 'POST',
						data: {
							name: this.account.user,
							phone: this.account.pho,
							password: pwd,
							infoValidate: this.account.code,
							email: this.account.mail,
							compannyName: this.account.companyName,
							province: this.prov,
							city: this.city,
							nationwide: this.district,
							address: this.account.address,
							contactName: this.account.contactName,
							contactPhone: this.account.pro,
							userRole: this.distributorType.select
						}
					})
					.then(res => {
						if (res === 1) {
							this.pageInfo = false;
						}
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				try {
					if (this.submitAccord.user === false) throw '用户名未填写';
					if (this.submitAccord.mail === false) throw '邮箱未填写';
					if (this.submitAccord.password === false) throw '密码未填写';
					if (this.submitAccord.tel === false) throw '电话未填写';
				} catch (error) {
					console.error(error);
				}
				this.$message.error('请完善账户信息！');
			}
		},
		// 返回首页
		backToHome() {
			this.$parent._data.pageNum = 1;
		},
		changeEye() {
			this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
			this.eyeClose = !this.eyeClose;
			this.eye = !this.eye;
		}
	},
	beforeMount: function() {
		this.updateCity();
		this.updateDistrict();
	},
	computed: {
		editorCode() {
			if (this.submitAccord.tel) {
				return false;
			}
			return true;
		}
	},
	watch: {
		prov: function() {
			this.updateCity();
			this.updateDistrict();
		},
		city: function() {
			this.updateDistrict();
		},
		'distributorType.select': function(newVal) {
			if (newVal === '02010000') return (this.showCompany = true);
			this.showCompany = false;
		}
	}
};
</script>
<style lang='scss' scoped>
.gong {
	.page1 {
		margin-top: 80px;
	}
	.page2 {
		padding-left: 83px;
		margin: 66px auto 0;
		width: 92%;
		h1 {
			font-size: 20px;
			color: #333333;
			margin-bottom: 12px;
		}
		p {
			font-size: 16px;
		}
		.backToHome {
			display: block;
			border: none;
			margin: 124px auto 0;
			background: RGBA(69, 200, 220, 1);
		}
	}
}
.icon1 {
	display: inline-block;
	background: url('/static/img/ico1_sel copy.png') no-repeat center;
	background-size: contain;
	width: 80px;
	height: 80px;
}
.icon2 {
	display: inline-block;
	background: url('/static/img/ico2_sel copy.png') no-repeat center;
	background-size: contain;
	width: 80px;
	height: 80px;
}
.icon3 {
	display: inline-block;
	background: url('/static/img/ico3.png') no-repeat center;
	background-size: contain;
	width: 80px;
	height: 80px;
}
.icon4 {
	display: inline-block;
	background: url('/static/img/ico4.png') no-repeat center;
	background-size: contain;
	width: 80px;
	height: 80px;
}
.is-process,
.is-finish {
	.icon1 {
		display: inline-block;
		background: url('/static/img/ico1_sel.png') no-repeat center;
		background-size: contain;
		width: 80px;
		height: 80px;
	}
	.icon2 {
		display: inline-block;
		background: url('/static/img/ico2_sel.png') no-repeat center;
		background-size: contain;
		width: 80px;
		height: 80px;
	}
	.icon3 {
		display: inline-block;
		background: url('/static/img/ico3_sel.png') no-repeat center;
		background-size: contain;
		width: 80px;
		height: 80px;
	}
	.icon4 {
		display: inline-block;
		background: url('/static/img/ico4 _sel.png') no-repeat center;
		background-size: contain;
		width: 80px;
		height: 80px;
	}
}
.el-steps {
	width: 620px;
	margin: 0 auto;
}
.table {
	width: 800px;
	margin: 0 auto;
	table {
		width: 100%;
		border: 1px solid RGBA(223, 223, 223, 1);
		font-size: 14px;
		color: #666666;
		tr {
			width: 100%;
			td {
				border: 1px solid RGBA(223, 223, 223, 1);
				&:nth-child(1) {
					width: 160px;
					text-align: center;
				}
				&:nth-child(2) {
					padding-top: 20px;
					padding-left: 50px;
					padding-bottom: 20px;
					p {
						margin-bottom: 10px;
					}
					span {
						display: inline-block;
						width: 70px;
						text-align: right;
					}
					.el-input {
						width: 300px;
						margin-left: 10px;
					}
					select {
						border: 1px solid RGBA(223, 223, 223, 1);
					}
				}
			}
		}
	}
}
.el-select {
	width: 97px;
}
.companyType {
	width: 180px;
}
.sendMessage {
	border: none;
	color: #45c8dc;
	padding-left: 15px;
}
.sendMessage:hover,
.sendMessage:blur {
	border: none;
	color: #45c8dc;
}
.el-button--primary.is-plain:focus,
.el-button--primary.is-plain:hover .msgTip {
	border: none;
	color: #45c8dc;
}

.eye {
	background: url('/static/img/eye1.png') no-repeat center;
	background-size: contain;
}
.eyeClose {
	background: url('/static/img/eye2.png') no-repeat center;
	background-size: contain;
}
.el-icon-date::before {
	display: none;
}
.msgTip {
	float: right;
	width: 33%;
	padding-left: 0;
}
</style>
