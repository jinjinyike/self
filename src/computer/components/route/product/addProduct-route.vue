<template>
	<div class="route-arrange">
		<!-- <div class="arrange-top">
			<div class="arrange-title">路线行程安排</div> -->
			<el-button type="primary" plain size='small' class="add" @click='addDay()' style='display:none;'>添加+</el-button>
		<!-- </div> -->
		<div class="content">
			<div v-for='(item,index) in daylist'>
				<div class="attraction">
					<!-- <span class="fir-span">第 <span class="colorG"> {{index+1}} </span> 天</span> -->
					<span class="fir-span"><el-tag>第 {{index+1}} 天</el-tag></span>
					<el-input v-model="item.input1"  placeholder="景区/目的地"></el-input> --
					<el-input v-model="item.input2" placeholder="景区/目的地"></el-input> --
					<el-input v-model="item.input3" placeholder="景区/目的地"></el-input> --
					<el-input v-model="item.input4" placeholder="景区/目的地"></el-input> --
					<el-input v-model="item.input5" placeholder="景区/目的地"></el-input> --
					<el-input v-model="item.input6" placeholder="景区/目的地"></el-input>
				</div>
				<div class="interest">
					<span class="fir-span">行程特色</span>
					<el-input class="routeShow"
					  type="textarea"
					  :maxlength="50"
					  :autosize="{ minRows: 2, maxRows: 4}"
					  placeholder="请输入内容(最多50字)"
					  v-model="item.routeFeature">
					</el-input>
				</div>
				<div class="editor" @click="tapUp(index)" @mouseover='tapUpOver'>
					<span class="fir-span" style="vertical-align:top;">详细行程</span>
					<div id="editor-container">
						<quill-editor ref='myQuillEditor'
									v-model="item.detailRoute"
									:options="item.editorOption"
									@blur="onEditorBlur($event)"
									@focus="onEditorFocus($event)"
									@ready="onEditorReady($event)"
									@change="onEditorChange(index)">
						</quill-editor>
					</div>
					<el-upload class="upload-demo" :action="qnLocation" :before-upload='beforeUploadImg' :data="uploadData" :on-success='upScuccess'
				      ref="uploadImg" style="display:none;" accept="image/jpeg,image/jpg,image/png">
						<el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
				    </el-upload>
					<el-upload class="upload-demo" :action="qnLocation" :before-upload='beforeUploadVideo' :data="uploadData" :on-success='upScuccess'
				      ref="uploadVideo" style="display:none;" accept="video/mp4,video/rmvb">
						<el-button size="small" type="primary" id="videoInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
				    </el-upload>

				</div>
				<div class="traffic">
					<span class="fir-span">交通形式</span>
					<el-select v-model="item.proTraffic" placeholder="选择交通" style='width:20%'>
					    <el-option
					      v-for="item1 in item.options1"
					      :key="item1"
					      :label="item1"
					      :value="item1">
					    </el-option>
					 </el-select>
				</div>
				<div class="meal">
					<span class="fir-span">旅行用餐</span>
					<el-select v-model="item.proEat" placeholder="包含用餐" style='width:20%'>
					    <el-option
					      v-for="item1 in item.options2"
					      :key="item1.value"
					      :label="item1.label"
					      :value="item1.value">
					    </el-option>
					</el-select>
					<el-checkbox-group
					    v-model="item.checkedMeals"
					    :min="1"
					    :max="4" class="item-left" @change="handleCheckedMealChange" v-if="item.proEat=='1'">
					    <el-checkbox v-for="meal in item.meals" :label="meal" :key="meal">{{meal}}</el-checkbox>
				  	</el-checkbox-group>
				</div>
				<div class="hotel" v-show='isContainHotel==1'>
					<span class="fir-span">酒店住宿</span>
					<el-select v-model="item.proHotel" placeholder="选择交通" style='width:20%'>
					    <el-option
					      v-for="item1 in item.proHotelMain"
					      :key="item1.value"
					      :label="item1.label"
					      :value="item1.value">
					    </el-option>
					</el-select>
					<el-input v-model="item.hotel" v-if="item.proHotel=='1'" placeholder="请输入具体或者同级酒店名称" style="width:40%"></el-input>
					<!-- <div class="deleteday">
						<el-button type="primary" plain size='small' class="add" @click='deleteDay(index)' v-show="index>0">删除-</el-button>
					</div> -->
				</div>
			</div>
			<div class="button-area">
	            <el-button type="primary" plain size='middle'  @click="backTwo">上一步</el-button>
	            <el-button type="primary" plain size='middle' @click="threeSave" style='margin-left:30px'>保存</el-button>
	            <el-button type="primary" plain size='middle' style='margin-left:30px' @click="nextFour">下一步</el-button>
	        </div>
        </div>
	</div>
</template>

<script>
	// import '../common/validate/validate.js'
	import {mapState,mapActions } from 'vuex'
	import {qiNiuCor} from '@/common/utils/sysconst' //系统常量
	import { quillEditor } from 'vue-quill-editor'
	import Quill from "quill"
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	export default{
		components: {
		   quillEditor
		},
		data(){
			return{
				index:0,
				fullscreenLoading:false,
				qnLocation: qiNiuCor,
		        uploadData:{},
				isContainHotel:'',
				daylist:[
				]
			}
		},
		methods:{
			addDay(){
				this.daylist.push(
					{
						id:'',
						dayNum:'',
						routeFeature:'',
						input1:'',
						input2:'',
						input3:'',
						input4:'',
						input5:'',
						input6:'',
						proTraffic: '汽车',
						proEat:'0',
						proHotel:'0',
						proHotelMain:[{value:'0',label:'不含住宿'},{value:'1',label:'包含住宿'}],
						options1:["汽车","飞机","轮船","交通自理"],
						options2:[{value:'1',label:'包含用餐'},{value:'0',label:'用餐自理'}],
						checkedMeals:[],
						meals:['早餐','中餐','晚餐'],
						isIndeterminate: true,
						detailRoute:"" ,
						editorOption: {
							placeholder: '请输入内容',
							// modules:{
							// 	toolbar:{
							// 		container:['bold','image','video']
							// 	}
							// }
					       // something config
					    },
					    hotel:''
					})
			},
			// deleteDay(index){
			// 	this.daylist.splice(index,1);
			// },
			backTwo(){
				let obj=this.threeCommit();
				this.$http.axios({
	                url:this.$api.addRouteProThird+'?proNum='+this.proNum,
	                method:'post',
	                data:obj,
                    json:true,
	            }).then(res=>{
					// this.changeTab('second');
					// if(res){
					// 	this.fourCommit(res);
					// 	this.changeTab('fourth');
					// }
				})
				this.changeTab('second');
				// this.changeTab('second');
			},
			nextFour(){//下一步
				for(let i = 0;i<this.daylist.length;i++){
					if(!this.daylist[i].input1 && !this.daylist[i].input2 && !this.daylist[i].input3 && !this.daylist[i].input4 && !this.daylist[i].input5 && !this.daylist[i].input6){
						return this.$message.error('第'+(i+1)+'天至少上传一条目的地');
					}
					if(!this.daylist[i].proTraffic){
						return this.$message.error('第'+(i+1)+'天未选择交通方式');
					}
					if(!this.daylist[i].proEat=='1' && this.daylist.checkedMeals.length==0){
						return this.$message.error('第'+(i+1)+'天未选择用餐状况');
					}
					if(this.isContainHotel=='1'){
						if(this.daylist[i].proHotel=='1' && !this.daylist[i].hotel){
							return this.$message.error('第'+(i+1)+'天未输入酒店名称');
						}
					}
				}
				let obj=this.threeCommit();
				this.$http.axios({
	                url:this.$api.addRouteProThird+'?proNum='+this.proNum,
	                method:'post',
	                data:obj,
                    json:true,
	            }).then(res=>{
					if(res){
						this.fourCommit(res);
						this.changeTab('fourth');
					}
	            })

			},
			threeSave(){//暂存
				let obj=this.threeCommit();
				// console.log(obj);
				// return;
		      	this.$http.axios({
	                url:this.$api.addRouteProThird+'?proNum='+this.proNum,
	                method:'post',
	                data:obj,
                    json:true,
	            }).then(res=>{
					console.log(res);
					this.$message.success('行程安排保存成功');
	            })
			},
			threeCommit(){ // 提交数据
				var routePlanEntityList = [];
				for(let i = 0;i<this.daylist.length;i++){
					let entity = {};
					entity.dayNum = i;
					let attraction = '';
					if(this.daylist[i].input1) attraction = this.daylist[i].input1+',';
					if(this.daylist[i].input2) attraction = attraction+this.daylist[i].input2+',';
					if(this.daylist[i].input3) attraction = attraction+this.daylist[i].input3+',';
					if(this.daylist[i].input4) attraction = attraction+this.daylist[i].input4+',';
					if(this.daylist[i].input5) attraction = attraction+this.daylist[i].input5+',';
					if(this.daylist[i].input6) attraction = tattraction+his.daylist[i].input6+',';
					entity.attraction = attraction.substring(0,attraction.length-1);
					entity.id = this.daylist[i].id; // id
					entity.routeFeature = this.daylist[i].routeFeature; // 行程特色
					entity.detailRoute = this.daylist[i].detailRoute; // 详细行程
					entity.proTraffic = this.daylist[i].proTraffic; // 交通形式
					// entity.proEat = this.daylist[i].proEat; // 用餐状况
					entity.proEat = ''; // 用餐状况
					if(this.daylist[i].proEat == '1'){
						let checkedMeals='';
						for(let j =0;j<this.daylist[i].checkedMeals.length;j++){
							checkedMeals+=this.daylist[i].checkedMeals[j]+','
						}
						entity.proEat = checkedMeals.substring(0,checkedMeals.length-1); // 用餐状况
					}
					if(this.isContainHotel=='1'){
						entity.proHotel = this.daylist[i].proHotel; //酒店住宿
						if(this.daylist[i].proHotel == '1'){
							entity.proHotelName = this.daylist[i].hotel; // 酒店名称
						}
					}
					routePlanEntityList.push(entity);
				}
				return routePlanEntityList;
			},
			routeContain(){
				let obj = this.daylist;
				return obj;
			},
			handleCheckedMealChange(value) {
		        let checkedCount = value.length;
		    },
		    onEditorBlur(editor) {
		    //   console.log('editor blur!', editor)
		    },
		    onEditorFocus(editor) {
		    //   console.log('editor focus!', editor)
		    },
		    onEditorReady(editor) {
				console.log(editor)
		    //   console.log('editor ready!', editor);
			},
			onClickEditor(){},
		    onEditorChange(index) {
				// console.log(this.index);
		    //   this.daylist[0].detailRoute = html
		    },
			tapUp(index){
				this.index = index;
			},
			tapUpOver(){
				for(let i=0;i<this.daylist.length;i++){
					this.$refs.myQuillEditor[i].quill.getModule("toolbar").addHandler("image", this.imgHandler);
					this.$refs.myQuillEditor[i].quill.getModule('toolbar').addHandler('video', this.videoHandler)  // 为视频ICON绑定事件
				}
			},
		    // // 图片,视频上传之前调取的函数
	        beforeUploadImg(file) {
				return this.$syspub.limitSize(file,2); // 限制2M大小
			},
			 beforeUploadVideo(file) {
				 return this.$syspub.limitSize(file,20); // 限制20M大小
			},
		    // // 图片上传成功回调   插入到编辑器中
	        upScuccess(e, file, fileList) {
				this.fullscreenLoading = false;
				let vm = this
				let url = ''
				// 判断上传的文件的类型 image 或 video
				url = this.uploadType === 'image' ? this.$syspub.getQiNiuPic(e.key) : this.$syspub.getQiNiuVideo(e.key);
				// if (this.uploadType === 'image') {    // 获得文件上传后的URL地址
				// 	url = this.$syspub.getQiNiuPic(e.key);
				// 	// this.uploadData = {url};
				// } else if (this.uploadType === 'video') {
				// 	url = this.$syspub.getQiNiuVideo(e.key);
				// }
				if (url != null && url.length > 0) {  // 将文件上传后的URL地址插入到编辑器文本中
					let value = url
					vm.addRange = vm.$refs.myQuillEditor[this.index].quill.getSelection();
					value = value.indexOf('http') !== -1 ? value : 'http:' + value;
					vm.$refs.myQuillEditor[this.index].quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER)   // 调用编辑器的 insertEmbed 方法，插入URL
				} else {
					this.$message.error('插入失败');
				}
				this.$refs['uploadImg'][0].clearFiles();    // 插入成功后清除input的内容
				this.$refs['uploadVideo'][0].clearFiles();    // 插入成功后清除input的内容
			},
		    // 点击图片ICON触发事件
	        imgHandler(state) {
				console.log("我被点击了")
				this.$syspub.getQiNiuToken().then(res=>{
					this.uploadData.token = res;
				})
				this.addRange = this.$refs.myQuillEditor[this.index].quill.getSelection()
				if (state) {
					let fileInput = document.getElementById('imgInput')
					fileInput.click() // 加一个触发事件
				}
				this.uploadType = 'image'
	        },
	        // 点击视频ICON触发事件
	        videoHandler(state) {
				// 调用方法
				this.$syspub.getQiNiuToken().then(res=>{
					this.uploadData.token = res;
				})
				this.addRange = this.$refs.myQuillEditor[this.index].quill.getSelection()
				if (state) {
					let fileInput = document.getElementById('videoInput')
					fileInput.click() // 加一个触发事件
				}
				this.uploadType = 'video'
	        },
			...mapActions('addPro',[
				'threeTotal','changeTab','fourCommit'])
		},
		created(){
				// this.addDay();
		},
		watch:{
			basic:{
				handler(){
					console.log(this.basic);
					this.isContainHotel = this.basic.routeProEntity.isContainHotel;
				},
				deep:true
			},
			// platoon1: {
			// 	handler(val, oldVal) {
			// 		this.daylist=[];
			// 		for(let i = 0;i<this.platoon1.proDays;i++){
			// 			this.addDay();
			// 		}
			// 	},
      		// 	deep: true
			// },
			route:{
				handler(){
					console.log(this.route);
					console.log(this.proNum);
					// return;
					// if()
					// for(let i=0;i<route.routePlanEntityList.length;i++){
					// 	this.addDay();
					// }
					this.daylist=[];
					let route = this.route;
					for(let i = 0;i<route.length;i++){
						this.addDay();
						// this.daylist.push({
							// 		dayNum:'',
							// 		routeFeature:'',
							// 		input1:'',
							// 		input2:'',
							// 		input3:'',
							// 		input4:'',
							// 		input5:'',
							// 		input6:'',
							// 		proTraffic: '',
							// 		proEat:'0',
							// 		proHotel:'0',
							// 		proHotelMain:[{value:'0',label:'不含住宿'},{value:'1',label:'包含住宿'}],
							// 		options1:["汽车","飞机","轮船","交通自理"],
							// 		options2:[{value:'1',label:'包含用餐'},{value:'0',label:'用餐自理'}],
							// 		checkedMeals:[],
							// 		meals:['早餐','中餐','晚餐'],
							// 		isIndeterminate: true,
							// 		detailRoute:"" ,
							// 		editorOption: {
							// 		// something config
							// 		},
							// 		hotel:''
						// 	});
						// if(route.routePlanEntityList.length>0){
							if(route[i].attraction){
								console.log(route[i].attraction);

								let attraction = route[i].attraction.split(',');
								console.log(attraction);
								console.log(attraction.length);
								console.log(attraction[0]);
								console.log(attraction[1]);
								if(attraction.length==1){
									this.daylist[i].input1 = attraction[0];
								}
								if(attraction.length==2){
									console.log(1231231231);
									this.daylist[i].input1 = attraction[0];
									this.daylist[i].input2 = attraction[1];
								}
								if(attraction.length==3){
									this.daylist[i].input1 = attraction[0];
									this.daylist[i].input2 = attraction[1];
									this.daylist[i].input3 = attraction[2];
								}
								if(attraction.length==4){
									this.daylist[i].input1 = attraction[0];
									this.daylist[i].input2 = attraction[1];
									this.daylist[i].input3 = attraction[2];
									this.daylist[i].input4 = attraction[3];
								}
								if(attraction.length==5){
									this.daylist[i].input1 = attraction[0];
									this.daylist[i].input2 = attraction[1];
									this.daylist[i].input3 = attraction[2];
									this.daylist[i].input4 = attraction[3];
									this.daylist[i].input5 = attraction[4];
								}
								if(attraction.length==6){
									this.daylist[i].input1 = attraction[0];
									this.daylist[i].input2 = attraction[1];
									this.daylist[i].input3 = attraction[2];
									this.daylist[i].input4 = attraction[3];
									this.daylist[i].input5 = attraction[4];
									this.daylist[i].input6 = attraction[5];
								}
							}
							this.daylist[i].id = route[i].id;
							this.daylist[i].routeFeature = route[i].routeFeature;
							this.daylist[i].detailRoute = route[i].detailRoute;
							if(!route[i].proTraffic){
								this.daylist[i].proTraffic = '汽车';
							}
							// this.daylist[i].proTraffic = route[i].proTraffic;
							if(route[i].proEat!==''){
								this.daylist[i].proEat = '1'
								for(let j=0;j<route[i].proEat.split(',').length;j++){
									this.daylist[i].checkedMeals.push(route[i].proEat.split(',')[j]);
								}
							}else{
								this.daylist[i].proEat = '0'
							}
							if(route[i].proHotel=='1'){
								this.daylist[i].proHotel = '1';
								this.daylist[i].hotel = route[i].proHotelName;
							}else{
								this.daylist[i].proHotel = '0';
							}
						// }
					}
				},
				deep:true
			}
		},
		computed: {
			...mapState('addPro',['basic','proNum','route','platoon1'])
		    // editor() {
		    //   return this.$refs.myQuillEditor.quillEditor
		    // }
		},
		mounted() {
			// this.addDay();
		}
	}
</script>
<style lang='scss' scoped>
@import '../../../../assets/pcCss/addProduct.css';
	.route-arrange{
		.attraction{
			.el-input{
				width: 10%;
			}
		}
		.interest{
			.routeShow{
				width: 660px;
			}
		}
		.colorG{
			color: #45c8dc;
		}
		.fir-span{
			display:inline-block;
			width:60px;
			color: #666;
		}
		padding: 0 30px;
		.arrange-top{
			display:flex;
			padding-bottom:10px;
			border-bottom:1px solid #ddd;
		}
		.add{
			width:60px;
		}
		.arrange-title{
			flex:1;
			line-height:32px;
		}
		.editor{
			.quill-editor {
			  display:inline-block;
			  width:660px;
			  min-height: 260px;
			  margin-left:10px;
			  .ql-container {
			    // height: 150px;
			  }
			  .ql-snow .ql-picker-label{
				  display: none;
			  }
			}
		}
		.content{
			.attraction,.interest,.traffic,.meal,.hotel,.editor,.deleteday{
				padding:10px 0;
				border-bottom:1px dashed #ddd;
			}
		}
	}
</style>
