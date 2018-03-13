<template>
	<div class="right-content-index">
		<el-table style='width:100%;margin-bottom:10px' :data='tableData' >
			<el-table-column type='index' :index="indexMethod" label='序号' align="center" width="80"></el-table-column>
			<!-- <el-table-column prop='' label='序号' align="center" width=''></el-table-column> -->
			<el-table-column prop='proName' label='产品名称' align="center" width=''></el-table-column>
			<el-table-column prop='proLeaveTime' label='出发团期' align="center" width=''></el-table-column>
			<el-table-column prop='totalRest' label='数量' align="center" width=''></el-table-column>
			<el-table-column prop='tempName' label='分销商' align="center" width=''></el-table-column>
			<el-table-column prop='type' label='用户类型' align="center" width=''></el-table-column>
			<el-table-column prop='tempTel' label='联系电话' align="center" width=''></el-table-column>
			<el-table-column label='详情' align="center" width=''>
				<template slot-scope="scope">
					<span class='blue'>详情</span>
				</template>
			</el-table-column>
			<el-table-column  label='操作' align="center" width='160'>
				<template slot-scope="scope">
					<span class='blue' @click='delPlan1(scope.row.id)'>取消占位</span>
					<span class='blue' style="margin-left:10px" @click='add(scope.row.id)'>正式预定</span>
				</template>
			</el-table-column>
		</el-table>
		<div class="item-bottom pagination"  align="right" >
			<el-pagination background
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="currentPage"
			      :page-sizes="[10, 50, 100, 150]"
			      :page-size="pagesize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>
		</div>
		<!-- 删除占位 -->
		<el-dialog title="" :visible.sync="dialogVisible2"  width="35%" center>
		  <div style='text-align:center'> <i class='el-icon-info'></i><span style="margin-left:5px">确定取消此占位？</span></div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible2 = false">取 消</el-button>
		    <el-button type="primary" @click="delPlan">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				tableData:[],
				//默认每页数据量
				pagesize: 10,
				//默认高亮行数据id
				highlightId: -1,
				//当前页码
				currentPage: 1,
				//查询的页码
				start: 1,
				//默认数据总数
				totalCount: 0,
				dialogVisible2:false,
			}
		},
		created(){
			this.loadData();
		},
		
		methods:{
			add(id){//正式预定
				this.$http.axios({
					url:this.$api.getOrderRestInfoByID,
					method:'get',
					params:{id}
				}).then(res=>{
					this.$router.push({
					name:"addOrder",
					query:{id:id}
				})
				})
				
			},
			delPlan1(id){
				this.id=id;
				this.dialogVisible2=true;
			},
			delPlan(){
				this.$http.axios({
					url:this.$api.delOrderRest,
					method:'post',
					data:{'id':this.id}
				}).then(res=>{
					if(res==1) this.$message.success('删除成功')
						this.dialogVisible2=false;
						this.loadData();
				})

			},
			loadData(){
			let obj={
					start:this.currentPage,
					size:this.pagesize
				}
			this.$http.axios({
				url:this.$api.getOrderRestByParam,
				method:'get',
				params:obj
			}).then(res=>{
				let obj=[];
				res.orderList.forEach(function(item,index){
					let obj1={
						tempName:item.tempName,
						proLeaveTime:item.proLeaveTime,
						proName:item.proName,
						tempTel:item.tempTel,
						totalRest:item.totalRest,
						type:item.distributionId,
						id:item.id
					};
					obj1.type=item.isSystem==1?"系统用户":'临时用户'
					obj.push(obj1)
				})
				this.tableData=obj;
				this.totalCount=res.count;
			})
		},
			changePage() {
			  this.currentPage = 1;
			},
			//每页显示数据量变更
	        handleSizeChange: function(val) {
	            this.changePage();
	            this.pagesize = val;
	            this.loadData();
	        },
	        //页码变更
	        handleCurrentChange: function(val) {
	            this.currentPage = val;
	            this.loadData();
	        },
	        // 序号
	        indexMethod(index) {
	          let num = (this.currentPage - 1) * this.pagesize + 1 + index;
	          return num;
	        },
		}
	}
</script>
<style scoped>
	.blue{
		color:#45C8DC;
		cursor: pointer;
	}
</style>