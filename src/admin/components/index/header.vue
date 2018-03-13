<template>
    <div class="headertop">
        <header>
            <div>
                <img src="/static/img/logo@2x.png" alt="" class="logo">
            </div>

            <h1>天津市同游会科技有限公司</h1>
        </header>
        <div class="button">
            <!-- <el-tooltip class="item" effect="light" content="身份切换" placement="bottom">
                <el-button>
                    <a href="#" class="button-1">1</a>
                </el-button>
            </el-tooltip> -->
            <!-- <el-tooltip class="item" effect="light" content="产品库" placement="bottom">
                <el-button>
                    <a href="#" class="button-2">1</a>
                </el-button>
            </el-tooltip> -->
            <el-tooltip class="item" effect="light" content="退出登录" placement="bottom">
                <el-button>
                    <!-- <a href="#" class="button-3">1</a> -->
					<router-link to="/login" class="button-3">1</router-link>
                </el-button>
            </el-tooltip>
        </div>
    </div>
</template>
<script>
export default {
	name: '',
	data() {
		return {}
	}
}
</script>
<style lang="scss" scoped>
.headertop {
	background: #45c8dc;
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-self: center;
	header {
		display: flex;
		align-items: center;
		img {
			width: 27px;
			height: 35px;
			display: inline;
			margin-top: 3px;
		}
		div {
			width: 40px;
			height: 40px;
			background: #fff;
			text-align: center;
			border-radius: 5px;
			margin-left: 20px;
			margin-right: 14px;
		}
		h1 {
			font-size: 18px;
			color: #fff;
			font-weight: normal;
		}
	}
	.button {
		display: flex;
		align-self: center;
		padding-right: 40px;
		.item {
			background: none;
			border: none;
			margin: 0;
			padding: 0;
			margin-left: 40px;
		}
		a {
			color: transparent;
			display: inline-block;
			width: 20px;
			height: 22px;
			&.button-1 {
				background: url('/static/img/ico_identify@2x.png') no-repeat center;
				background-size: contain;
			}
			&.button-2 {
				background: url('/static/img/81513144872_.pic_hd.jpg') no-repeat center;
				background-size: contain;
			}
			&.button-3 {
				background: url('/static/img/ico_quit@2x.png') no-repeat center;
				background-size: contain;
			}
		}
	}
}
</style>