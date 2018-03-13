<!-- 组件 -->
<template>
	<div id="index" class="flex">
		<side-bar id="sidebar" ref='sidebar' :style='{height:sideBarHeight}' @hide-common='commenShow=false'></side-bar>
		<div class="main">
			<public-header></public-header>
			<!-- <commen v-show='commenShow'></commen> -->
			<router-view :style='{height:mainHeight}' style="overflow-y:auto;"></router-view>
		</div>
	</div>
</template>

<!-- 组件导出 -->
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import example from '@/computer/components/example'; //示例
import sideBar from './sidebar.vue';
import publicHeader from './header.vue';
import commen from './commen.vue';
export default {
	data() {
		return {
			// 侧边栏的高度
			sideBarHeight: ''
			// commenShow: true
		};
	},
	beforeCreate() {
		this.$http
			.axios({
				url: 'employee/getUserInfo',
				method: 'get'
			})
			.then(res => {
				this.saveBaseInfo(res)
			})
			.catch(err => {
				console.error(err);
			});
	},
	mounted() {
		this.fillHeight();
	},
	methods: {
		...mapMutations('userModule', ['saveBaseInfo']),
		fillHeight() {
			let vm = this;
			// 这里设置侧边栏的高度
			//   保持和屏幕高度一致
			let windowHeight = document.documentElement.clientHeight;

			window.onresize = function() {
				// alert(123)
				windowHeight = document.documentElement.clientHeight;
				vm.sideBarHeight = `${windowHeight}px`;
			};
			vm.sideBarHeight = `${windowHeight}px`;
		},
		// 添加产品引入addPro.js
		...mapActions('addPro', ['changeRoute'])
	},
	computed: {
		mainHeight() {
			return parseInt(this.sideBarHeight) - 80 + 'px';
		}
	},
	components: {
		sideBar,
		publicHeader,
		commen
	},
	watch: {
		// 监听路由的变化 点击产品添加回到基本信息页面
		$route() {
			if (this.$route.name == 'addProduct') {
				this.changeRoute('first');
			}
		}
	}
};
</script>

<!-- 本组件样式 -->
<style lang='scss' scoped>
.flex {
	display: flex;
}

#index {
	#sidebar {
		overflow-y: auto;
		width: 180px;
		background-color: #3b4966;
		height: 100%;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	.main {
		background: #f5f6fa;
		width: calc(100% - 180px);
	}
}
</style>
