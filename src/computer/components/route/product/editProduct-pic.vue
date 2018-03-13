<template>
	<div class="pic">
		<section class="section-1" >
			<p>产品封面图（ 建议尺寸： 750 * 400 建议大小： 不超过2M 添加数量： 1 张） </p>
			<el-upload accept="image/jpeg,image/jpg,image/png" :action="actionUrl" class='camera' list-type="picture-card" :on-preview="handlePictureCardPreview" :data='Additional' :limit='1' :before-upload="beforeAvatarUpload2" :on-success='successInfo1' :file-list='proPublicityPic' :on-remove='remove1'>
				<el-button size="small" type="primary" style='opacity:0;height:100%;width:100%' @click="getQiNiuToken"></el-button>
				<i class="el-icon-plus" > </i>
			</el-upload>
		</section>
		<div class="dot"> </div>
		<section class="section-2">
			<p> 产品轮播图（ 建议尺寸： 750 * 400 建议大小： 不超过2M 添加数量： 最少3张 最多6张） </p>
			<div class="flex">
				<el-upload accept="image/jpeg,image/jpg,image/png" :action="actionUrl" class='camera' list-type="picture-card" :on-preview="handlePictureCardPreview" :limit='6' :data='Additional' :before-upload="beforeAvatarUpload2" :on-success='successInfo2' :file-list='proRotationPic' :on-remove='remove2'>
					<el-button size="small" type="primary" style='opacity:0;height:100%;width:100%' @click="getQiNiuToken"></el-button>
					<i class="el-icon-plus"> </i>
				</el-upload>
			</div>

		</section>
		<div class="dot"></div>
		<section class="section-3">
			<p>产品海报图（ 此图片用于生成宣传海报 建议大小： 不超过3M 添加数量： 1 张） </p>
			<el-upload accept="image/jpeg,image/jpg,image/png" :action="actionUrl" class='camera' list-type="picture-card" :on-preview="handlePictureCardPreview" :data='Additional' :limit='1' :before-upload="beforeAvatarUpload3" :on-success='successInfo3' :file-list='proPosterPic' :on-remove='remove3'>
				<el-button size="small" type="primary" style='opacity:0;height:100%;width:100%' @click="getQiNiuToken"></el-button>
				<i class="el-icon-plus"> </i>
			</el-upload>
		</section>
		<el-dialog :visible.sync="dialogVisible" size="tiny">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<div class="dot"></div>
		<div class="button-area">

			<!-- <el-button type="primary" plain size='middle' @click='beforePage'> 上一步 </el-button> -->
			<el-button type="primary" plain size='middle' style='' @click='savePic' :disabled='isTrue'>提交</el-button>
		</div>

	</div>
</template>
<script>
import {mapState,mapActions } from 'vuex'
import {qiNiuCor} from '@/common/utils/sysconst' //系统常量

export default {
	name: 'component_name',
	data() {
		return {
			isTrue:false,
			dialogVisible: false,
			dialogImageUrl: '',
			actionUrl: qiNiuCor,
			Additional: {},	// 向七牛云上传附带的参数
			proPublicityPic: [], // 封面图
			proRotationPic: [], // 轮播图
			proPosterPic: [],// 海报图
		};
	},
	methods: {
		remove2(file, fileList){
			this.proRotationPic = fileList
		},
		remove1(file, fileList){
			this.proPublicityPic=fileList;
		},
		remove3(file, fileList){
			this.proPosterPic=fileList;
		},
		savePic() {
			if (!this.proPosterPic[0].url) return this.$message.error('请上传海报图');
			if (this.proRotationPic.length < 3)
				return this.$message.error('轮播图至少3张');
			if (!this.proPublicityPic[0].url) return this.$message.error('请上传封面图');

			var obj = {};
			obj.proPosterPic = this.proPosterPic[0].url; // 海报图
			obj.proPublicityPic = this.proPublicityPic[0].url; // 封面图
			let proRotationPic=''
			for(let i =0;i<this.proRotationPic.length;i++){
				proRotationPic += this.proRotationPic[i].url+','
			}
			obj.proRotationPic = proRotationPic.substring(0,proRotationPic.length-1); // 轮播图
			obj.proNum =this.SproNum;
			console.log(obj);
			let data={};
			data.routeProEntity=obj;
			this.isTrue=true;
			this.$http
				.axios({
					url: this.$api.updateRouteProEntity,
					method: 'post',
					data: data,
					json: true
				})
				.then(res => {
					this.isTrue=false;
					this.$message.success('修改成功');
				}).catch(()=>{
					this.isTrue=false;
				});
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		// 点击放大图片回调的数据
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		// 判断图片不能大于2mb
		beforeAvatarUpload2(file) {
			return this.$syspub.limitSize(file,2);
		},
		// 判断图片不能大于3mb
		beforeAvatarUpload3(file) {
			return this.$syspub.limitSize(file,3);
		},
		getQiNiuToken() {
			// 获取token值
			this.$syspub.getQiNiuToken().then(res=>{
				this.Additional.token  = res;
			});
		},
        /**
         * name,picStore
         */
        successInfo(name,picStore){
            let obj = {};
			obj.url = this.$syspub.getQiNiuPic(name); //获取图片链接
			// console.log(obj);
			// console.log(this.picStore)
            picStore.push(obj); // 封面图
        },
		// 图片成功上传之后返回的数据
		successInfo1(response, file, fileList) {
            this.successInfo(response.key,this.proPublicityPic);
		},
		successInfo2(response, file, fileList) {
			this.successInfo(response.key,this.proRotationPic);
		},
		successInfo3(response, file, fileList) {
			this.successInfo(response.key,this.proPosterPic);

		}
		
	},
	watch:{
		basic:{
			handler(val, oldVal) {
				if(this.basic.routeProEntity.proPublicityPic){ // 封面
					this.proPublicityPic=[];
					this.proPublicityPic.push({url:this.basic.routeProEntity.proPublicityPic});
				}
				if(this.basic.routeProEntity.proPosterPic){ // 海报
					this.proPosterPic=[];
					this.proPosterPic.push({url:this.basic.routeProEntity.proPosterPic});
				}
				if(this.basic.routeProEntity.proRotationPic){ // 轮播
					this.proRotationPic=[];
					for(let i=0;i<this.basic.routeProEntity.proRotationPic.split(',').length;i++){
						this.proRotationPic.push({url:this.basic.routeProEntity.proRotationPic.split(',')[i]});
					}
				}
			},
			deep:true
		}
	},
	computed: {
		...mapState('editRoutePro',['SproNum','basic']),
	},
};
</script>
<style lang='scss' scoped>
@import '../../../../assets/pcCss/addProduct.css';
.pic{
	color: #666;
}
header {
	padding: 10px;
}
.el-upload{
	border:none;
}
header,
section {
	padding: 15px 30px;
}
h1,
p {
	font: normal;
}
p {
	margin: 10px;
}
.flex {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.el-upload--picture-card {
	background: url('/static/img/ico_upload@2x.png') no-repeat center;
	background-size: contain;
}
</style>
