
<template>
	<div class="vue-city-picker" @mouseout="endChoice" @mouseover="startMouseOver">
		<input v-show="!noInput" type="text" autocomplete="off" disableautocomplete :name="field" :id="field" :value="currCityName" :placeholder="placeholder" @focus="startChoice" @keypress="startChoice" @blur="endChoice" ref="input">
		<!--城市选择-->
		<div class="vcp-panel" v-show="cityPanelIsShow">
			<h5>城市选择</h5>
			<ul class="vcp-tags">
				<li :class="{'z-on': item==tagKey}" v-for="item in tagsArr" @click="choiceTag(item)">{{ item }}</li>
			</ul>
			<div class="vcp-list">
				<div :class="{'z-hot': initial == 'hot'}" v-for="(initial, citys) in cityList" v-show="currTagIncludes(citys)">
					<h6 v-if="citys != 'hot'">{{ citys }}</h6>
					<ul>
						<li v-for="v in initial" @click="choiceCity(v.id,v.name)" :title="v.name">{{ v.name }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
'use strict';
export default {
	model: {
		prop: 'inputcity',
		event: 'change'
	},
	props: {
		field: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		noInput: {
			type: Boolean,
			default: false
		},
		// 城市列表
		cityList: {
			type: Object,
			default: function() {
				return window.CITY_PICKER_LIST || {};
			}
		},
		// 没有热门城市
		noHot: {
			type: Boolean,
			default: false
		},
		inputcity: {
			type: String,
			default: ''
		}
	},
	data() {
		let tagsArr = ['热门', 'ABCDE', 'FGHJ', 'KLMN', 'PQRST', 'WXYZ'],
			tagKey = '热门',
			tags = {};
		if (this.noHot) {
			tagsArr = ['ABCD', 'EFGH', 'JKL', 'MNPQ', 'RSTW', 'XYZ'];
			tagKey = 'ABCD';
		}
		tagsArr.forEach(item => {
			if (item == '热门') {
				tags[item] = ['hot'];
			} else {
				tags[item] = item.split('');
			}
		});
		return {
			cityPanelIsShow: false,
			isMouseOver: false,
			tagsArr,
			tags,
			tagKey,
			nowCity: ''
		};
	},
	created() {},
	mounted() {
		// 	// console.log(this.inputcity);
		// if(this.inputcity){
		// 	this.nowCity = this.inputcity;
		// 	this.$emit('change', `${this.currCityName}[${this.nowCity}]`);
		// }
	},
	computed: {
		// 当前城市名字
		currCityName() {
			let { nowCity, cityList } = this,
				cityName = '';

			Object.keys(cityList).forEach(item => {
				cityList[item].forEach(item => {
					if (nowCity == item.id) {
						cityName = item.name;
					}
				});
			});
			// this.nowCity = cityName
			return cityName;
		},
		currTag() {
			return this.tags[this.tagKey];
		}
	},
	watch: {
		nowCity() {
			this.$emit('change', `${this.currCityName}[${this.nowCity}]`);
		}
	},
	methods: {
        assignGather(){
            if(this.inputcity){
            	this.nowCity = this.inputcity;
                this.$emit('change', `${this.currCityName}[${this.nowCity}]`);
            }
        },
		// 列表是否属于当前标签
		currTagIncludes(ini) {
			return this.currTag.includes(ini);
		},
		// 选择标签
		choiceTag(key) {
			this.tagKey = key;
		},
		// 开始城市选择
		startChoice(e) {
			if (e && e.type == 'keypress') {
				e.returnValue = false;
			}
			this.cityPanelIsShow = true;
		},
		choiceCity(id, name) {
			// this.value = id
			this.nowCity = id;
			this.immEndChoice();
		},
		// 鼠标离开城市选择区域时超过一定时间，关闭城市面板
		endChoice(e) {
			let that = this,
				inputEle = that.$refs.input;
			if (e.type == 'mouseout') {
				that.isMouseOver = false;
			}
			setTimeout(function() {
				if (!that.isMouseOver && inputEle != document.activeElement) {
					that.cityPanelIsShow = false;
				}
			}, 300);
		},
		startMouseOver() {
			this.isMouseOver = true;
		},
		// 立即关闭城市面板
		immEndChoice() {
			this.isMouseOver = true;
			this.cityPanelIsShow = false;
		}
	}
};
</script>


<style lang='scss' scoped>
$grey1: #ddd;
$grey2: #f2f2f3;
$c1: #45c8dc;

@keyframes vueCityPicker {
	0% {
		opacity: 0;
		transform: translate(-50%, -50%) scale(0);
	}

	100% {
		opacity: 1;
		transform: translate(0) scale(1);
	}
}

.vue-city-picker {
	width: 18.2%;
	display: inline-block;
	margin: 0 20px 0 10px;
	position: relative;
	padding: 0;
	font: 12px/1.5 'Microsoft YaHei', tahoma, arial, 'Hiragino Sans GB',
		'\\5b8b\4f53', sans-serif;
	color: #555;

	* {
		margin: 0;
		padding: 0;
		box-sizing: content-box;
	}

	input {
		display: block;
		width: 88%;
		height: 28px;
		padding: 0 15px;
		border: 1px solid $grey1;
		outline: none;
		font-size: 14px;
		color: #606266;
	}
	input::-webkit-input-placeholder,
	input:-moz-placeholder,
	input::-moz-placeholder,
	input:-ms-input-placeholder {
		color: #000;
	}
	li {
		list-style-type: none;
	}

	.vcp-panel {
		position: absolute;
		z-index: 99999;
		left: 0;
		padding: 12px 10px 0;
		width: 360px;
		border: 1px solid $grey1;
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.18);
		overflow: hidden;
		background-color: #fff;
		animation: vueCityPicker 0.1s ease-out;

		h5 {
			margin-bottom: 5px;
			padding-left: 2px;
			color: #aaa;
			line-height: 1.5;
			font-weight: normal;
		}

		.vcp-tags {
			overflow: hidden;
			margin: 5px 0;

			li {
				box-sizing: border-box;
				width: 60px;
				line-height: 20px;
				display: block;
				float: left;
				background-color: $grey2;
				text-align: center;
				border-left: 1px solid #fff;
				cursor: pointer;

				&:first-child {
					border-left: none;
				}

				&:hover {
					color: $c1;
				}

				&.z-on {
					background-color: $c1;
					color: #fff;
				}
			}
		}

		.vcp-list {
			overflow: hidden;
			border-bottom: 10px solid #fff;

			> div {
				margin: 1px 0 -1px;
				padding: 5px 0;
				line-height: 24px;
				border-bottom: 1px dashed #eee;
				overflow: hidden;

				h6 {
					float: left;
					font-weight: normal;
					color: $c1;
					font-size: 13px;
					width: 30px;
					padding-left: 5px;
				}

				ul {
					overflow: hidden;

					li {
						float: left;
						width: 60px;
						padding-left: 4px;
						cursor: pointer;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;

						&:hover {
							background-color: $grey2;
							color: $c1;
						}
					}
				}

				&.z-hot {
					padding-left: 10px;

					ul {
						li {
							padding-left: 6px;
						}
					}
				}
			}
		}
	}
}
</style>
