<template>
    <div class="right-content-index ground-manage">
        <div class="ground-manage-title">地接社管理</div>
        <p>
            <span>地接社名称</span>
            <el-input class="ground-name" placeholder="请输入地接社名称(最多20字)" v-model="agencyName" :maxlength="20"></el-input>
        </p>
        <p>
            <span>业务联系人</span>
            <el-input placeholder="请输入业务联系人姓名" v-model="contactName" class="employee-name"></el-input><!--
            --><el-input placeholder="请输入业务联系人电话" v-model="contactPhone" class="employee-phone" :maxlength="11"></el-input>
        </p>
        <div style="text-align:center;margin-top:10px;">
            <el-button type="primary" @click="sureAdd">确定添加</el-button>
        </div>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                agencyName:'', // 地接社名称
                contactName:'', // 业务联系人姓名
                contactPhone:'' // 业务联系人电话
            }
        },
        methods:{
            sureAdd(){
                let obj = {};
                obj.agencyName = this.agencyName; // 地接社名称
                obj.contactName = this.contactName; // 业务联系人姓名
                obj.contactPhone = this.contactPhone; // 业务联系人电话
                this.$http
				.axios({
					url:this.$api.addLocalGround,
					method: 'post',
					data: obj,
					json: true
				})
				.then(res => {
					// this.$message.success('拆分成功');
					// this.loadData();
                    // this.splitTeamDialog = false;
                    this.$message.success('地接社添加成功');
                    this.agencyName = '';
                    this.contactName = '';
                    this.contactPhone = '';
				});
            }
        },
        // created(){
        //     this.$http
		// 		.axios({
		// 			url:this.$api.addLocalGround,
		// 			method: 'post',
		// 			data: obj,
		// 			json: true
		// 		})
		// 		.then(res => {
		// 			// this.$message.success('拆分成功');
		// 			// this.loadData();
        //             // this.splitTeamDialog = false;
        //             this.$message.success('地接社添加成功');
        //             this.agencyName = '';
        //             this.contactName = '';
        //             this.contactPhone = '';
		// 		});
        // }
    }
</script>
<style lang='scss' scoped>
    .ground-manage{
        padding: 30px;
        color: #666;
        .ground-manage-title{
            line-height: 40px;
            border-bottom: 1px solid #ddd;
        }
        p{
            line-height: 50px;
            border-bottom: 1px dashed #ddd;
            .ground-name{
                width: 35%;
            }
            .employee-name{
                width: 15%;
            }
            .employee-phone{
                width: 19%;
                margin-left: 1%;
            }
        }
    }
</style>

