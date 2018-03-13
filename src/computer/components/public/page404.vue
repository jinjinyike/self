<!-- 组件 -->
<template>
    <div class="tmpl" :style="{height:windowHeight}">
        <div id="text">
            <h1>404</h1>
            <p>走丢了！换个页面试一试吧~</p>
            <!-- <p>Most Bitlinks are 4-6 characters, and only include letters and numbers (and are case sensitive).</p> -->
        </div>
        <div id="ripple-control"></div>
        <img id="fish" src="/static/img/fish-404.png" />
        <div id="ripple"></div>
        <div id="cloud1"></div>
        <div id="cloud2"></div>
        <img id="gull" src="/static/img/gull-404.png" />
    </div>
</template>

<!-- 组件导出 -->
<script>
export default {
	data() {
		return {
			windowHeight: ''
		};
	},
	mounted() {
		let vm = this;
		vm.windowHeight = document.documentElement.clientHeight + 'px';
		window.onresize = function() {
			vm.windowHeight = document.documentElement.clientHeight + 'px';
		};
	},
	components: {}
};
</script>

<!-- 本组件样式 -->
<style scoped>
.tmpl {
	font-family: Arial, sans-serif;
	font-size: 12px;
	color: #333;
	background: #f5d1e3 url(/static/img/sky-404.png) repeat-x 0 0;
	color: #fff;
	overflow-x: hidden;
	position: relative;
}
#ripple-control {
	width: 100%;
	height: 100px;
	position: absolute;
	top: 50%;
	left: 0;
	z-index: 10;
}
a {
	text-decoration: none;
	color: #69f;
	outline: none;
}

h1 {
	font-size: 24px;
	line-height: 1.1em;
	margin-bottom: 15px;
	font-weight: normal;
}

p {
	font-size: 14px;
	line-height: 1.2em;
}

#ripple {
	position: relative;
	z-index: 2;
	width: 100%;
	margin-bottom: -5px;
}

div#ripple {
	position: absolute;
	top: 325px;
	background-color: #68a8dc;
	bottom: 5px;
	min-height: 400px;
	opacity: 0.7;
	left: 0px;
}

canvas#ripple {
	height: 100%;
}

#fish {
	position: absolute;
	left: 60%;
	top: 225px;
	z-index: 1;
}

#text {
	position: absolute;
	top: 60%;
	left: 100px;
	z-index: 5;
}

#cloud1 {
	position: absolute;
	top: 50px;
	width: 189px;
	height: 88px;
	left: 50px;
	background: transparent url(/static/img/cloud1-404.png) no-repeat scroll 0 0;
}

#cloud2 {
	position: absolute;
	top: 220px;
	width: 69px;
	height: 29px;
	left: 275px;
	background: transparent url(/static/img/cloud2-404.png) no-repeat scroll 0 0;
}

#gull {
	position: absolute;
	top: 150px;
	left: 75px;
	margin-top: 10px;
}

.bottomLinkList {
	position: absolute;
	bottom: 5px;
	height: 30px;
	line-height: 30px;
	left: 50%;
	margin-left: -275px;
	width: 550px;
	z-index: 500;
	text-align: center;
}

.bottomLinkList li {
	list-style-type: none;
	float: left;
	width: 100px;
	color: #fff;
	height: 30px;
}

.bottomLinkList li a {
	display: block;
	color: #fff;
}

.copy {
	margin-top: -4px;
}

.tm {
	vertical-align: super;
	font-size: 10px;
}
</style>
