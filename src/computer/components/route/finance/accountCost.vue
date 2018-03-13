<template>
	<div class="commen">
		<div class="flex">
			<div class="menu-item item-fir">
				<div class="item-pic flex">
					<div class="item-lf">
						<img src="/static/img/pay.png" alt="">
					</div>
					<div class="item-rt">
						<p class="pay">账户金额 {{num}}</p>
							<span class="deal">套餐</span>
              <span class="deal">购买</span>
					</div>
				</div>
			</div>
			<div class="menu-item">
				<div class="item-pic flex">
					<div class="item-lf">
						<img src="/static/img/order.png" alt="">
					</div>
					<div class="item-rt">
						<p class="order">短信剩余 {{num}}</p>
						<span class="deal">套餐</span>
            <span class="deal">购买</span>
					</div>
				</div>
			</div>
			<div class="menu-item">
				<div class="item-pic flex">
					<div class="item-lf">
						<img src="/static/img/message.png" alt="">
					</div>
					<div class="item-rt">
						<p class="message">营销推送 {{num}}</p>
						<span class="deal">套餐</span>
            <span class="deal">购买</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				num:0
			}
		}
	}
</script>

<style lang='scss' scoped>
	.commen{
		.flex{
			display:flex;
			margin-top: 20px;
		}
		.flex:nth-child(2){
			margin-top:16px;
		}
		.main {
		    width: calc(100% -200px);
		 }
		.menu-item{
			margin-left: 1%;
			width: 32%;
			height: 167px;
			opacity: 0.96;
			background: #FFFFFF;
			box-shadow: 0 0 5px 0 rgba(121,121,121,0.32);
			border-radius: 4px;
		}
		.item-fir{
			margin-left: 1%;
		}
		.item-pic{
			margin: 31px 13.3%;
		}
		.item-pic img{
			width: 106px;
			height: 106px;
		}
		.item-rt{
			margin-top: 10px;
			margin-left: 9%;
			p{
				font-size: 22px;
			}
			.deal{
				display:inline-block;
				margin-top:32px;
				width:54px;
				height:24px;
				line-height:24px;
				text-align:center;
				border: 1px solid #2E333C;
				border-radius: 2px;
				cursor:pointer;
			}
			.order{
				color:#EC6D68;
			}
			.customer{
				color: #68B6EC;
			}
			.message{
				color: #9972B6;
			}
			.audit{
				color:#6885EC;
			}
			.pay{
				color: #EC68A7;
			}
			.arrange{
				color: #ECBF68;
			}
		}
	}
</style>
