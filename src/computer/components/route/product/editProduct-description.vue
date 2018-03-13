<template>
    <div class="manual">
        <section class="section-1 flex">
            <h2>产品特色</h2>
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model.trim="textarea1">
            </el-input>
        </section>
        <div class="dot"></div>
        <section class="section-2 flex">
            <h2>费用说明</h2>
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model.trim="textarea2">
            </el-input>
        </section>
        <div class="dot"></div>
        <section class="section-3 flex">
            <h2>预订须知</h2>
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model.trim="textarea3">
            </el-input>
        </section>
        <div class="dot"></div>
        <section class="section-4 flex" v-if="showTextarea4">
            <h2>签证须知</h2>
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model.trim="textarea4">
            </el-input>
        </section>
        <div class="dot" v-if="showTextarea4"></div>
        <div class="button-area">
            <el-button type="primary" plain size='middle' style='' @click="nextFivePage"  :disabled='isTrue'>提交</el-button>
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
			showTextarea4: false,
			isTrue:false
		};
	},
	created() {},
	methods: {
		// ...mapActions('editRoutePro', ['allTotal', 'changeTab']),
		nextFivePage() {
			let data = {
				proNum: this.SproNum,
				proFeatures: this.textarea1,
				proCostDescription: this.textarea2,
				proOrderNotice: this.textarea3,
				proVisaNotice: this.textarea4
			};

			if (!this.textarea1) return this.$message.error('请输入产品特色');

			if (!this.textarea2) return this.$message.error('请输入费用说明');

			if (!this.textarea3) return this.$message.error('请输入预订须知');

			if (this.basic.routeProEntity.proType.split(',')[0] !== '出境游') {
				delete data.proVisaNotice;
			} else {
				if (!this.textarea4) {
					return this.$message.error('请输入签证须知');
				}
			}
			this.isTrue=true;
			let obj={};
			obj.routeProEntity=data;
			this.$http.axios({
					url: this.$api.updateRouteProEntity,
					method: 'post',
					data: obj,
					json: true
				})
				.then(res => {// 成功提交数据
					this.$message.success('修改成功')
					this.isTrue=false;
				})
				.catch(error => {
					this.isTrue=false;
				});
		}
		
	},
	computed: {
		...mapState('editRoutePro', ['SproNum','basic'])
	},
	watch: {
		'basic.routeProEntity': function(newVal, oldVal) {
			let obj=this.basic.routeProEntity
			let result = obj.proType.split(',');
			if (result[0] === '出境游') {
				this.showTextarea4 = true;
				this.textarea4=obj.proVisaNotice;
			}
			this.textarea1=obj.proFeatures;
			this.textarea2=obj.proCostDescription;
			this.textarea3=obj.proOrderNotice;
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
