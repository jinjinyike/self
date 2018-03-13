<template>
	<div>
		<section class="user-info">
			<transition>
				<div :style="{padding:paddingBottom,height:boxHeight}" ref="personBox" class="personBox">
					<div class="img-wrapper" style="padding-top:13px;">
						<img src="/static/img/ico_head@2x.png" alt="" class="avator" v-showInfo='showInfo'>
					</div>
					<!-- <div class="user-name">
						{{userInfo.userName}}
					</div>
					<div class="job-num">
						工号：{{userInfo.jobNumber}}
					</div>
					<div class="job">
						职务：{{userInfo.job}}
					</div> -->
				</div>
			</transition>
		</section>
		<section class="item-list">
			<el-menu default-active="1" class="el-menu-vertical-demo" background-color="#3b4966" text-color="#fff" unique-opened :router='true' style='border:none;'>
				<el-submenu index="1">
					<template slot="title" @click="commen">
						<router-link to='/index/commen'>
							<img src="/static/img/chanpin.png" alt="" class="icon">
							<span>路线管理</span>
						</router-link>
					</template>
					<!-- <el-menu-item index="1-1" :route='{"path":"/index/addProduct"}'>添加产品</el-menu-item> -->
					<el-menu-item index="1-2" :route='{"path":"/index/productAudit"}'>产品审核</el-menu-item>
					<!-- <el-menu-item index="1-3" :route='{"path":"/index/editRouteProduct"}'>修改产品</el-menu-item> -->
					<!-- <el-menu-item index="1-4">产品查询</el-menu-item> -->
				</el-submenu>
				<el-submenu index="2">
					<template slot="title" @click="commen">
						<router-link to='/index/commen'>
							<img src="/static/img/yonghu.png" alt="" class="icon">
							<span>用户管理</span>
						</router-link>
					</template>
					<!-- <el-menu-item index="1-1" :route='{"path":"/index/addProduct"}'>添加产品</el-menu-item> -->
					<el-menu-item index="1-2" :route='{"path":"/index/userAudit"}'>用户审核</el-menu-item>
				</el-submenu>
				<!-- <el-submenu index="2">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/chanpin.png" alt="" class="icon">
							<span>订单管理</span>
						</router-link>
					</template>
					<el-menu-item index="2-1">余位查询</el-menu-item>
					<el-menu-item index="2-2">占位处理</el-menu-item>
					<el-menu-item index="2-3">添加订单</el-menu-item>
					<el-menu-item index="2-4">订单查询</el-menu-item>
					<el-menu-item index="2-5">订单退款</el-menu-item>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/dinweijiankong.png" alt="" class="icon">
							<span>控卫管理</span>
						</router-link>
					</template>
					<el-menu-item index="3-1">添加计划位</el-menu-item>
					<el-menu-item index="3-2">管理计划位</el-menu-item>
					<el-menu-item index="3-3">计划位查询</el-menu-item>

				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/fatuan.png" alt="" class="icon">
							<span>发团管理</span>
						</router-link>
					</template>
					<el-menu-item index="4-1">旅游团安排</el-menu-item>
					<el-menu-item index="4-2">旅游团管理</el-menu-item>
					<el-menu-item index="4-3">旅游团报账</el-menu-item>
					<el-menu-item index="4-4">出团通知单</el-menu-item>

				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/fatuan.png" alt="" class="icon">
							<span>费用申报</span>
						</router-link>
					</template>
					<el-menu-item index="5-1">发团费用申报</el-menu-item>
					<el-menu-item index="5-2">计划位费用申报</el-menu-item>

				</el-submenu>
				<el-submenu index="6">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/shenhe.png" alt="" class="icon">
							<span>审核管理</span>
						</router-link>
					</template>
					<el-menu-item index="6-1">产品审核</el-menu-item>
					<el-menu-item index="6-2">订单审核</el-menu-item>
					<el-menu-item index="6-3">退款审核</el-menu-item>
					<el-menu-item index="6-4">费用申报审核</el-menu-item>

				</el-submenu>
				<el-submenu index="7">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/yonghu.png" alt="" class="icon">
							<span>用户管理</span>
						</router-link>
					</template>
					<el-menu-item index="7-1">添加用户</el-menu-item>
					<el-menu-item index="7-2">管理用户</el-menu-item>
					<el-menu-item index="7-3">用户权限</el-menu-item>

				</el-submenu>
				<el-submenu index="8">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/ziyuan.png" alt="" class="icon">
							<span>资源管理</span>
						</router-link>
					</template>
					<el-menu-item index="8-1">地接资源</el-menu-item>
					<el-menu-item index="8-2">导游领队</el-menu-item>
					<el-menu-item index="8-3">酒店住宿</el-menu-item>
					<el-menu-item index="8-4">景区门票</el-menu-item>
					<el-menu-item index="8-5">交通管理</el-menu-item>
					<el-menu-item index="8-6">餐饮服务</el-menu-item>
					<el-menu-item index="8-7">购物店</el-menu-item>

				</el-submenu>
				<el-submenu index="9">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/caiwu.png" alt="" class="icon">
							<span>财务中心</span>
						</router-link>
					</template>
					<el-menu-item index="9-1">付款管理</el-menu-item>
					<el-menu-item index="9-2">收入管理</el-menu-item>
					<el-menu-item index="9-3">支出管理</el-menu-item>
					<el-menu-item index="9-4">业务利润统计</el-menu-item>

				</el-submenu>
				<el-submenu index="10">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/shuju.png" alt="" class="icon">
							<span>数据统计</span>
						</router-link>
					</template>
					<el-menu-item index="10-1">订单数据</el-menu-item>
					<el-menu-item index="10-2">用户数据</el-menu-item>
					<el-menu-item index="10-3">业绩数据</el-menu-item>
					<el-menu-item index="10-4">利润数据</el-menu-item>

				</el-submenu>
				<el-submenu index="11">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/quanxian.png" alt="" class="icon">
							<span>权限管理</span>
						</router-link>
					</template>
					<el-menu-item index="11-1">审批权限</el-menu-item>

				</el-submenu>
				<el-submenu index="12">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/zhanghao.png" alt="" class="icon">
							<span>账号管理</span>
						</router-link>
					</template>
					<el-menu-item index="12-1" :route='accounManage' @click='hideCommon'>基本信息</el-menu-item>
					<el-menu-item index="12-2">公司架构</el-menu-item>

				</el-submenu>
				<el-submenu index="13">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/xiaoxi.png" alt="" class="icon">
							<span>消息管理</span>
						</router-link>
					</template>
					<el-menu-item index="13-1">发送消息</el-menu-item>
					<el-menu-item index="13-2">查看消息</el-menu-item>

				</el-submenu>
				<el-submenu index="14">
					<template slot="title">
						<router-link to='/index/commen'>
							<img src="/static/img/yinxiao.png" alt="" class="icon">
							<span>产品营销</span>
						</router-link>
					</template>
					<el-menu-item index="14-1">积分管理</el-menu-item>
					<el-menu-item index="14-2">活动报名</el-menu-item>
					<el-menu-item index="14-3">精准营销</el-menu-item>

				</el-submenu>

				<el-menu-item index="15">
					<router-link to='/index/commen'>
						<img src="/static/img/qianzhen.png" alt="" class="icon">
						<span>签证管理</span>
					</router-link>
				</el-menu-item> -->

			</el-menu>
		</section>
	</div>
</template>
<script>
export default {
	name: 'sidebar',
	data() {
		return {
			paddingBottom: '0px',
			boxHeight: '100%',
			userInfo: {
				userName: '用户名',
				jobNumber: '001',
				job: '销售主管'
			},
			tabData: [
				{
					id: 0,
					label: '产品管理',
					img: '/static/img/chanpin.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					id: 1,
					label: '订单管理',
					img: '/static/img/chanpin.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					id: 2,
					label: '控卫管理',
					img: '/static/img/dinweijiankong.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					id: 3,
					label: '发团管理',
					img: '/static/img/fatuan.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					id: 4,
					label: '费用申请',
					img: '/static/img/chanpin.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					id: 5,
					label: '审核管理',
					img: '/static/img/shenhe.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					id: 6,
					label: '用户管理',
					img: '/static/img/yonghu.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					id: 7,
					label: '资源管理',
					img: '/static/img/ziyuan.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					id: 8,
					label: '产品管理',
					img: '/static/img/chanpin.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					label: '产品管理',
					img: '/static/img/chanpin.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					label: '产品管理',
					img: '/static/img/chanpin.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					label: '产品管理',
					img: '/static/img/chanpin.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					label: '产品管理',
					img: '/static/img/chanpin.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					label: '产品管理',
					img: '/static/img/chanpin.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				},
				{
					label: '产品管理',
					img: '/static/img/chanpin.png',
					childrenShow: false,
					children: [
						{
							label: '添加产品'
						}
					]
				}
			],
			accounManage:{
				path:'/index/accountBase'
			}
		};
	},
	mounted() {},
	methods: {
		commen() {
			// :route='{"path":"/index/commen"}'
		},
		// 隐藏index的common部分
		hideCommon() {
			this.$emit('hide-common');
		},
		showInfo(eve) {
			if (this.$refs.personBox.style.height === 'auto') {
				this.$refs.personBox.style.height = '100%';
				this.$refs.personBox.style.paddingBottom = '0px';
				return;
			}

			this.$refs.personBox.style.height = 'auto';
			this.$refs.personBox.style.paddingBottom = '10px';
		}
	},
	components: {
		//   Tooltip
	},
	directives: {
		showInfo: {
			bind: function(el, binding) {
				// console.log(el);
				el.addEventListener('mouseover', binding.value);
				el.addEventListener('mouseleave', binding.value);
			},
			unbind: function(el,binding) {
				el.removeEventListener('mouseover', binding.value);
				el.removeEventListener('mouseleave', binding.value);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.user-info {
	position: relative;
	background-color: #5e6d8b;
	width: 146px;
	height: 86px;
	margin: 10px auto 0;
	text-align: center;
	.avator {
		width: 60px;
		height: 60px;
		margin: 0 auto;
		border-radius: 50%;
	}
	.user-name {
		font-size: 16px;
		color: #fff;
		margin: 10px 0;
	}
	.job-num,
	.job {
		color: #dfe3f0;
		font-size: 12px;
	}
	.item {
		background: none;
		border: none;
		color: #fff;
		padding-left: 0;
		padding-right: 0;
	}
}
.item-list {
	margin-top: 32px;
	span {
		color: #fff;
	}
	.el-menu-item.is-active {
		background-color: rgb(47, 58, 82);
	}
	.el-submenu .el-menu-item {
		min-width: auto;
		height: 36px;
		line-height: 36px;
		padding-left: 62px;
	}
	img {
		width: 20px;
		height: 20px;
		vertical-align: middle;
		margin-right: 9px;
	}
}
.el-menu-vertical-demo {
	border: none;
}
.personBox {
	position: absolute;
	width: 100%;
	overflow: hidden;
	z-index: 10;
	background: #5e6d8b;
	transition: all 0.2s linear;
}
</style>