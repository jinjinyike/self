<!-- 公司员工 -->
<!-- <employee :employeeType="2" style="width:27%" ref="employeeId"></employee> -->
<template>
    <el-select v-model="employeeValue" filterable placeholder="请选择">
        <el-option v-for="item in employeeArr" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
        </el-option>
    </el-select>
</template>
<script>
export default {
	data() {
		return {
			employeeArr: [{ value: '0', label: '不限员工' }],
			employeeValue: ''
		};
	},
	props: {
		employeeType: {
			type: Number,
			default: function() {
				return 1;
			}
		}
	},
	created() {
        // z注：‘1’代表添加订单，产品员工(只显示可用员工） ‘2’代表 所有员工（已离职） ‘3’代表所有员工（包含 disabled）
		// 审核员工
		if (this.employeeType == 1) {
			this.$http
				.axios({
					url: this.$api.getEmployeeListByCurrentUser + '?statu=1',
					method: 'get',
					// data: obj,
					json: true
				})
				.then(res => {
					for (let i = 0; i < res.length; i++) {
						this.employeeArr.push({
							label: res[i].jobNumber + ' ' + res[i].name,
							value: res[i].userId
						});
					}
				})
				.catch(err => {
					// this.save=false;
				});
		}
		if (this.employeeType == 2) {
			this.$http
				.axios({
					url: this.$api.getEmployeeListByCurrentUser,
					method: 'get',
					// data: obj,
					json: true
				})
				.then(res => {
					for (let i = 0; i < res.length; i++) {
						this.employeeArr.push(
							res[i].statu == 0
								? {
										label: res[i].jobNumber + ' ' + res[i].name + '（已离职）',
										value: res[i].userId
									}
								: {
										label: res[i].jobNumber + ' ' + res[i].name,
										value: res[i].userId
									}
						);
					}
				});
		}
		if (this.employeeType == 3) {
			this.$http
				.axios({
					url: this.$api.getEmployeeListByCurrentUser,
					method: 'get',
					// data: obj,
					json: true
				})
				.then(res => {
					for (let i = 0; i < res.length; i++) {
						this.employeeArr.push(
							res[i].statu == 0
								? {
										label: res[i].jobNumber + ' ' + res[i].name,
										value: res[i].userId,
										disabled: true
									}
								: {
										label: res[i].jobNumber + ' ' + res[i].name,
										value: res[i].userId
									}
						);
					}
				});
		}
	}
};
</script>
