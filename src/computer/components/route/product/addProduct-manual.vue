<template>
    <div class="manual">
        <!-- <header>
            <h1>产品说明</h1>
        </header>
        <div class="dot"></div> -->
        <section class="section-1 flex">
            <h2>产品特色</h2>
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea1">
            </el-input>
        </section>
        <div class="dot"></div>
        <section class="section-2 flex">
            <h2>费用说明</h2>
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea2">
            </el-input>
        </section>
        <div class="dot"></div>
        <section class="section-3 flex">
            <h2>预订须知</h2>
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea3">
            </el-input>
        </section>
        <div class="dot"></div>
        <section class="section-4 flex" v-if="showTextarea4">
            <h2>签证须知</h2>
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea4">
            </el-input>
        </section>
        <div class="dot"></div>
        <div class="button-area">
            <el-button type="primary" plain size='middle' style='' @click="back">上一步</el-button>
            <el-button type="primary" plain size='middle' @click="submitPage">保存</el-button>
            <el-button type="primary" plain size='middle' style='' @click="nextFivePage">下一步</el-button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'component_name',
	data() {
		return {
			textarea1: '',
			textarea2: '',
			textarea3: '',
			textarea4: '',
			showTextarea4: false
		};
	},
	created() {},
	methods: {
		...mapActions('addPro', ['allTotal', 'changeTab']),
		submitPage(){
			let data = {
				proNum: this.proNum,
				proFeatures: this.textarea1,
				proCostDescription: this.textarea2,
				proOrderNotice: this.textarea3,
				proVisaNotice: this.textarea4
			};
			this.$http.axios({
					url: this.$api.addProductIntroduction,
					method: 'post',
					data: data,
					json: true
				})
				.then(res => {
					this.$message.success('产品说明保存成功');
				})
				.catch(error => {
					console.log(error);
				});
		},
		nextFivePage() {
			let data = {
				proNum: this.proNum,
				proFeatures: this.textarea1,
				proCostDescription: this.textarea2,
				proOrderNotice: this.textarea3,
				proVisaNotice: this.textarea4
			};

			if (this.textarea1.length === 0) return this.$message.error('请输入产品特色');

			if (this.textarea2.length === 0) return this.$message.error('请输入费用说明');

			if (this.textarea3.length === 0) return this.$message.error('请输入预订须知');

			if (this.basic.routeProEntity.proType.split(',')[0] !== '出境游') {
                console.log(123)
				delete data.proVisaNotice;
			} else {
				if (this.textarea4.length === 0) {
					return this.$message.error('请输入签证须知');
				}
			}
			this.$http
				.axios({
					url: this.$api.addProductIntroduction,
					method: 'post',
					data: data,
					json: true
				})
				.then(res => {
					// if (res === 1) {
						// 成功提交数据
						this.allTotal(res);
						this.changeTab('five');
					// }
				})
				.catch(error => {
					console.log(error);
				});
		},
		back() {
			let data = {
				proNum: this.proNum,
				proFeatures: this.textarea1,
				proCostDescription: this.textarea2,
				proOrderNotice: this.textarea3,
				proVisaNotice: this.textarea4
			};
			this.$http
				.axios({
					url: this.$api.addProductIntroduction,
					method: 'post',
					data: data,
					json: true
				})
				.then(res => {
				})
			this.changeTab('third');
		}
	},
	computed: {
		...mapState('addPro', ['basic', 'proNum','manual'])
	},
	watch: {
		'basic.routeProEntity.proType': function(newVal, oldVal) {
			let result = newVal.split(',');
			if (result[0] === '出境游') {
				this.showTextarea4 = true;
			}
		},
		'manual':{
			handler(nval,oval){
				console.log(this.manual);
				// this.proNum = this.manua.proNum;
				this.textarea1= this.manual.proFeatures;
				this.textarea2 = this.manual.proCostDescription;
				this.textarea3 = this.manual.proOrderNotice;
				if(this.showTextarea4){
					this.textarea4 = this.manual.proVisaNotice;
				};
			},
			deep:true
		}
	}
};
</script>
<style lang='scss' scoped>
@import '../../../../assets/pcCss/addProduct.css';
.flex {
	display: flex;
}
.manual{
	color: #666;
}
h1,
h2 {
	font-weight: normal;
	text-align: center;
	width: 74px;
}
// h2{
//     flex-basis: 74px;
// }
.dot {
	border-bottom: 1px dashed #dddddd;
	margin: 20px 15px 20px 15px;
}
.el-textarea {
	width: 660px;
}
.button-area {
	margin: 10px 0 20px 0;
	text-align: center;
}
.button-area .el-button {
	width: 120px;
}
header {
	padding-top: 10px;
}
header,
section {
	padding-left: 30px;
}
</style>
