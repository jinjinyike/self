<template>
    <div class="findPwd">
        <el-card class="box-card" v-if="page === '1'">

            <div>
                <p class="title">注册使用的手机号</p>
                <el-input placeholder="手机" v-model.trim="tel" :maxlength='11' class="tel-input" :class="{verify:telColor}" v-verity:telColor='changeColor'  @keyup.native="verifyTel">
                </el-input>
            </div>
            <div>
                <p class="title" style="margin-top:10px;">手机验证</p>
                <p class="flex" style="margin: 0 auto;display: block;width: 40%;">
                    <el-input placeholder="输入验证码" v-model.trim="code" style='' :maxlength='6' @keyup.native="code=code.replace(/\D/g,'')">
                    </el-input>
                    <el-button class="sendMessage" @click="sendMsg" :disabled='btnShow' type="text">{{btnInfo}}</el-button>
                </p>

            </div>
            <el-button type="primary" class="next" @click="nextPage" :disabled='nextCanClick'>下一步</el-button>
        </el-card>
        <el-card class="box-card" v-else>
            <div>
                <p class="title">设置密码</p>
                <el-input placeholder="格式为6-16位数字+字母" v-model.trim="first" :type="pwdType" :maxlength='16' class="tel-input" :class="{verify:pwdColor}" v-verity:pwdColor='changeColor'>
                    <i slot="suffix" class="el-input__icon el-icon-date" :class='{eye:eye,eyeClose:eyeClose}' @click="changeEye"></i>
                </el-input>
            </div>
            <p class="flex is-justify-space-around">
                <p class="title" style="margin-top:10px;">确认密码</p>
                <el-input placeholder="格式为6-16位数字+字母" v-model.trim="second" :type="pwdTypeSec" :maxlength='16' class="tel-input" :class="{verify:pwdColorSec}" v-verity:pwdColorSec='changeColor'>
                    <i slot="suffix" class="el-input__icon el-icon-date" :class='{eyeSec:eyeSec,eyeCloseSec:eyeCloseSec}' @click="changeEyeSec"></i>
                </el-input>
            </p>
            <p>
                <el-button type="primary" style="margin:20px auto 0;display:block;" size='mini' @click='submitFindPwd'>确定</el-button>
            </p>

        </el-card>

    </div>
</template>
<script>
import {
	verificationUser,
	verificationPhone
} from '../../../common/utils/verificationUtils';
export default {
	name: 'component_name',
	data() {
		return {
			page: '1',
			tel: '',
			code: '',
			btnShow: true,
			btnInfo: '发送验证码',
			telIsRight: false,
			errTelMsgShow: false,
			first: '',
			second: '',
			pwdType: 'password',
			pwdTypeSec: 'password',
			eye: false,
			eyeClose: true,
			eyeSec: false,
			eyeCloseSec: true,
			pwdColor: false,
			pwdColorSec: false,
			telColor: false
		};
	},
	methods: {
        verifyTel() {
			if (this.tel.length === 11) {
				let result = verificationPhone(this.tel);
				if (result === '0') {
					return (this.telColor = true);
				}
				this.telColor = false;
				this.btnShow = false;
				this.telIsRight = true;
			}
		},
		nextPage() {
            if(this.telIsRight !== true) return;
			this.page = '2';
		},
		changeColor(color, boo) {
			this.$data[color] = boo;
		},
		// 密码是否可见
		changeEye() {
			this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
			this.eyeClose = !this.eyeClose;
			this.eye = !this.eye;
		},
		changeEyeSec() {
			this.pwdTypeSec = this.pwdTypeSec === 'password' ? 'text' : 'password';
			this.eyeCloseSec = !this.eyeCloseSec;
			this.eyeSec = !this.eyeSec;
		},
		sendMsg() {
			if (this.telIsRight === true) {
				this.$http
					.axios({
						url: `${this.$api.getCode}/refind/${this.tel}`,
						method: 'GET'
					})
					.then(res => {
						console.log(res);
						this.btnShow = true;
						let num = 60;
						let timer = setInterval(() => {
							num--;
							this.btnInfo = `重新发送(${num})`;
							if (num === 0) {
								this.btnInfo = `发送验证码`;
								this.btnShow = false;
								clearInterval(timer);
							}
						}, 1000);
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		submitFindPwd() {
			if (this.first !== this.second) {
                this.$message.error('两次密码不一致')
                return 
            }
            this.$http.axios({
                url:'/userLogin/refindPassword',
                method:'post',
                data:{
                    password:this.$md5.md5(this.first),
                    phone:this.tel,
                    infoValidate:this.code
                }
            }).then(res=>{
                console.log(res)
                if(res===1){
                    this.$message.success('修改成功')
                    this.$router.push({path:'/login'})
                }
            }).catch(err=>[
                console.error(err)
            ])
		}
	},
	computed: {
		nextCanClick() {
			if (this.code.length === 6 && this.telIsRight === true) return false;
			return true;
		}
	},
	directives: {
		verity: {
			inserted: function(el, binding) {
				el['@verityFocus'] = e => {
					
					if (binding.arg === 'pwdColor') {
						if (el.classList.contains('verify')) {
							binding.value('pwdColor');
						}
					}
					if (binding.arg === 'pwdColorSec') {
						if (el.classList.contains('verify')) {
							binding.value('pwdColorSec');
						}
					}
					if (binding.arg === 'telColor') {
						if (el.classList.contains('verify')) {
							binding.value('telColor');
						}
					}
				};
				el['@verifyBlur'] = e => {
					if (binding.arg === 'pwdColor') {
						if (e.target.value === '') return;
						let result = verificationUser(6, 16, e.target.value);

						if (result === '0') {
							binding.value('pwdColor', true);
						} else {
							binding.value('pwdColor', false);
						}
					}
					if (binding.arg === 'telColor') {
						if (e.target.value === '') return;
						let result = verificationPhone(e.target.value);

						if (result === '0') {
							binding.value('telColor', true);
						} else {
							binding.value('telColor', false);
						}
					}
					if (binding.arg === 'pwdColorSec') {
						if (e.target.value === '') return;
						let result = verificationUser(6, 16, e.target.value);

						if (result === '0') {
							binding.value('pwdColorSec', true);
						} else {
							binding.value('pwdColorSec', false);
						}
					}
				};
				el.children[0].addEventListener('focus', el['@verityFocus'], true);
				el.children[0].addEventListener('blur', el['@verifyBlur'], true);
			},
			unbind: function(el) {
				el.children[0].removeEventListener('focus', el['@verityFocus'], true);
				el.children[0].removeEventListener('blur', el['@verifyBlur'], true);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.clearfix::after {
	content: '.';
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
}
.flex {
	display: flex;
}
.box-card {
	width: 50%;
	margin: 50px auto;
	div {
		.title {
			margin-bottom: 10px;
			margin-left: 14vw;
		}
		.tel-input {
			margin: 0 auto;
			display: block;
			width: 40%;
		}

		.sendMessage {
			margin-left: 10px;
		}
	}
	.msgTip {
		width: 40%;
		margin: 10px auto;
	}
	.next {
		margin: 20px auto 10px;
		display: block;
	}
}
.eye {
	background: url('/static/img/eye1.png') no-repeat center;
	background-size: contain;
}
.eyeClose {
	background: url('/static/img/eye2.png') no-repeat center;
	background-size: contain;
}
.eyeSec {
	background: url('/static/img/eye1.png') no-repeat center;
	background-size: contain;
}
.eyeCloseSec {
	background: url('/static/img/eye2.png') no-repeat center;
	background-size: contain;
}
.el-icon-date::before {
	display: none;
}
.verify {
	outline: 1px solid red;
}
</style>