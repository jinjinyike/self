<!-- 组件 -->
<template>
	<div class="login">
		<header>
			<div class="logo-wrapper">
				<img src="/static/img/logo.png" alt="">
			</div>
			<!-- <div class="info-select">
				<h2 :class="{active:pageNum === 1}" @click="pageNum=1">产品介绍</h2>
				<span></span>
				<h2 :class="{active:pageNum === 2}" @click="pageNum=2">供应商注册</h2>
				<span></span>
				<h2 :class="{active:pageNum === 3}" @click="pageNum=3">分销商注册</h2>
				<span></span>
				<h2 :class="{active:pageNum === 4}" @click="pageNum=4">APP下载</h2>
			</div> -->
		</header>
		<!-- 登录页面，首页 -->
		<div class="login-info" v-if="pageNum===1">
			<div>
				<span class="company-info">Copyright © 2016-{{getYear}} 天津市同游会  All Rights Reserved 津ICP备16007815号-1</span>
				<div class="img">
					<img src="/static/img/login_img.png" alt="">
				</div>
				<div class="login-info-word">
					<div class="tab-wrapper">
						<span class="tab" @click='tabshow = 1' :class="{active:tabshow===1}">账号登录</span>
						<span class="tab" @click='tabshow = 2' :class="{active:tabshow===2}">扫码登录</span>
					</div>
					<div class="tab-info-wrapper">
						<div class="tab-info" v-if="tabshow === 1">
							<el-alert :title="errInfo" type="error" show-icon v-if="showErrInfo" :closable="false">
							</el-alert>
							<p class="name">
								<el-input placeholder="用户名/手机" v-model.trim="login.user" @blur='verificationUser' :maxlength='20' @keyup.native.enter="AccountLogin">
									<i slot="prefix" class="el-input__icon el-icon-user"></i>
								</el-input>
							</p>
							<p class="password">
								<el-input placeholder="密码" v-model.trim="login.password" @blur='verificationPassword' :type="pwdType" :maxlength='16' @keyup.native.enter="AccountLogin">
									<i slot="prefix" class="el-input__icon el-icon-password"></i>
									<i slot="suffix" class="el-input__icon el-icon-date" :class='{eye:eye,eyeClose:eyeClose}' @click="changeEye"></i>
								</el-input>
							</p>
							<p class="Verification">
								<el-input v-model="login.verificationCodes" placeholder="请输入验证码" :maxlength='4' @keyup.native="login.verificationCodes=login.verificationCodes.replace(/\D/g,'')" @keyup.native.enter="AccountLogin"></el-input>
								<el-button type="primary" @click="verificationCode">{{login.verificationCodesInfo}}</el-button>
							</p>

							<el-button type="primary" class="submit" @click="AccountLogin">登录</el-button>

						</div>
						<div class="tab-info tab-info-2" v-else>
							<img src="/static/img/liantu.png" alt="" width="160" height="160">
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <register-gong v-if="pageNum === 2" />
		<register-fen v-if="pageNum === 3" /> -->
	</div>
</template>

<!-- 组件导出 -->
<script>
import {
	verificationUser,
	verificationPhone
} from '../../../common/utils/verificationUtils';
// import registerGong from './register-gong.vue';
// import registerFen from './register-fen';
export default {
	data() {
		return {
			// 页面显示的编号
			// 登录页面：1，供应商注册：2，分销商注册：3，APP下载：4
			pageNum: 1,
			activeName: 'first',
			// 首页两个选项卡的控制显示
			tabshow: 1,
			// 登录的相关信息
			login: {
				// 登录的用户名/手机号
				user: '',
				// 登录的密码
				password: '',
				// 验证码
				verificationCodes: '',
				// 验证码按钮的文字
				verificationCodesInfo: '',
				// 控制验证码按钮是否可用
				verificationCodesButton: false
			},
			// 当所有为true，登录按钮可以点击
			loginButton: {
				forUser: false,
				forPass: false
			},

			// 密码或用户名输入失败时的提示
			errInfo: '请输入正确的密码',
			// 同上，控制是否显示
			showErrInfo: false,
			eye: false,
			eyeClose: true,
			pwdType: 'password',
			getYear: '' // 备案年
		};
	},
	created() {
		if (this.IEVersion() === '0') {
			this.$message.error('您的浏览器版本过低！');
		}
		this.refreshCode();
		this.getYear = new Date().getFullYear(); // 获取当年年份
	},
	methods: {
		tt() {
			console.log(this.login.verificationCodes);
			this.login.verificationCodes = this.login.verificationCodes.replace(
				/\D/g,
				''
			);
		},
		// 初始化/刷新验证码
		refreshCode() {
			// let code = Math.ceil(Math.random() * 10);

			// if (code < 1000) {
			// 	code = Math.ceil(Math.random() * 10000);
			// }
			this.login.verificationCodesInfo = `${Math.floor(
				Math.random() * 10
			)}${Math.floor(Math.random() * 10)}${Math.floor(
				Math.random() * 10
			)}${Math.floor(Math.random() * 10)}`;
		},
		changeEye() {
			this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
			this.eyeClose = !this.eyeClose;
			this.eye = !this.eye;
		},
		changeView() {
			this.loginInfo = false;
			// console.error(123)
		},
		// 验证手机号是否合适
		verificationUser() {
			let nonTel = verificationUser(6, 20, this.login.user);
			let tel = verificationPhone(this.login.user);
			if (this.login.user.length === 0) return;
			if (nonTel === '1' || tel === '1') {
				//手机号或者用户名通过验证
				this.loginButton.forUser = true;
			} else {
				console.warn('用户名格式有误');
				this.errInfo = '您输入的账号格式有误';
				this.showErrInfo = true;
				this.loginButton.forUser = false;
				setTimeout(() => {
					this.showErrInfo = false;
				}, 2000);
			}
		},
		// 验证密码是否正确
		// 6-16位，数字+字母
		verificationPassword() {
			let result = verificationUser(6, 16, this.login.password);
			if (this.login.password.length === 0) return;
			if (result !== '0') return (this.loginButton.forPass = true);

			console.warn('密码格式验证错误');
			this.errInfo = '您输入的密码格式有误';
			this.showErrInfo = true;
			this.loginButton.forPass = false;
			setTimeout(() => {
				this.showErrInfo = false;
			}, 2000);
		},
		// 发送验证码
		verificationCode() {
			this.refreshCode();
		},
		IEVersion() {
			var userAgent = navigator.userAgent; //取得浏览 器的userAgent字符串
			var isIE =
				navigator.userAgent.indexOf('MSIE') >= 0 &&
				navigator.userAgent.indexOf('Opera') < 0; //判断是否IE浏览器
			var isEdge = userAgent.indexOf('Edge') > -1; //判断是否IE的Edge浏览器
			if (isIE) {
				var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
				reIE.test(userAgent);
				var fIEVersion = parseFloat(RegExp['$1']);
				if (fIEVersion == 9) {
					return '9';
				} else if (fIEVersion == 10) {
					return '10';
				} else if (fIEVersion == 11) {
					return '11';
				} else {
					return '0';
				} //IE版本过低
			} else if (isEdge) {
				return 'Edge';
			} else {
				return '-1'; //非IE
			}
		},
		AccountLogin() {
			if (
				parseInt(this.login.verificationCodes) !==
				parseInt(this.login.verificationCodesInfo)
			) {
				this.errInfo = '验证码错误';
				this.showErrInfo = true;
				setTimeout(() => {
					this.showErrInfo = false;
				}, 2000);
				this.verificationCode();
			} else {
				if (this.loginButton.forUser && this.loginButton.forPass) {
					let pwd = this.$md5.md5(this.login.password)
					this.$http
						.axios({
							url: this.$api.adminLogin,
							method: 'POST',
							data: {
								uname: this.login.user,
								pword: pwd
							}
						})
						.then(res => {
							if (res.message === '登录成功') {
								console.log(res);
								// SaveRoleId()
								this.$router.push({ path: '/index' });
							}
							if (res.status === 'error') {
								this.errInfo = res.message;
								this.showErrInfo = true;
								setTimeout(() => {
									this.showErrInfo = false;
								}, 2000);
							}
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					console.warn('输入的密码或者用户名错误');
					this.errInfo = '您输入的账号或登录密码有误';
					this.showErrInfo = true;
					setTimeout(() => {
						this.showErrInfo = false;
					}, 2000);
				}
			}
		}
	},
	components: {
		// registerGong,
		// registerFen
	}
};
</script>

<!-- 本组件样式 -->
<style lang="scss" scoped>
.login {
	margin: 0 auto;
	display: block;
	padding-top: 14px;
	header {
		width: 92%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.logo-wrapper {
			width: 425px;
			height: 72px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.info-select {
			width: 500px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			h2 {
				cursor: pointer;
				color: #39476c;
				font-weight: normal;
				font-size: 18px;
				&.active {
					color: RGBA(69, 200, 220, 1);
				}
			}
			span {
				display: inline-block;
				width: 6px;
				height: 6px;
				background: #39476c;
				border-radius: 50%;
			}
		}
	}
	.login-info {
		background: RGBA(69, 200, 220, 1);
		& > div {
			width: 92%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			position: relative;
			.company-info{
				position: absolute;
				top: 470px;
				color: #fff;
			}
			img {
				width: 498px;
				height: 400px;
				margin: {
					top: 50px;
					bottom: 50px;
				}
			}
			.login-info-word {
				margin-top: 90px;
				width: 320px;
				height: 320px;
				.tab-wrapper {
					margin-bottom: 2px;
					line-height: 40px;
					background: #fff;
					display: flex;
					justify-content: space-around;
					.tab {
						cursor: pointer;
						&.active {
							color: RGBA(69, 200, 220, 1);
						}
					}
				}
				.tab-info-wrapper {
					position: relative;
					.password,
					.name,
					.Verification {
						display: flex;
						justify-content: space-between;
						width: 75%;
						margin: 0 auto;
					}
					.name {
						padding-top: 40px;
						margin-bottom: 10px;
					}
					.password {
						margin-bottom: 10px;
					}
					.Verification {
						display: flex;
						.el-input {
							width: 150px;
							// line-height: 36px;
						}
						.el-button {
							width: 86px;
							padding: 0;
							font-size: 14px;
							line-height: 28px;
							height: 28px;
						}
					}
					.tab-info {
						background: #fff;
						padding-bottom: 64px;
						&.tab-info-2 img {
							width: 160px;
							height: 160px;
							display: block;
							margin: 0 auto 0;
							padding-top: 48px;
						}
					}
				}
			}
		}
	}
}
.el-input {
	width: 100%;
}
.el-icon-user {
	background: url('/static/img/login_ico_user@2x.png') no-repeat center;
	background-size: contain;
	display: inline-block;
	width: 18px;
	height: 22px;
	vertical-align: -webkit-baseline-middle;
}
.el-icon-password {
	background: url('/static/img/login_ico_code@2x.png') no-repeat center;
	background-size: contain;
	display: inline-block;
	width: 18px;
	height: 22px;
	vertical-align: -webkit-baseline-middle;
}
.submit {
	width: 240px;
	height: 36px;
	line-height: 36px;
	padding: 0;
	display: block;
	margin: 0 auto;
	margin-top: 10px;
}
.el-button--primary {
	background: RGBA(69, 200, 220, 1);
	border: none;
}
.el-alert--error {
	width: 75%;
	background: none;
	margin: 0 auto;
	padding-left: 0;
	padding-right: 0;
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
.el-alert--error {
	position: absolute;
	left: 44px;
}
</style>
