<template>
	<div id="calendar">
    <!-- 年份 月份 -->
	    <div class="month">
	        <ul>
	            <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
	            <li class="back-now" @click='backNow()' style="font-size: 14px"><span>回到今天</span></li>
	            <li class="arrow" @click="pickPre(currentYear,currentMonth)"><i class="el-icon-arrow-up"></i></li>
	            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
	                <span class="choose-year">{{ currentYear }}年</span>
	                <span class="choose-month">{{ currentMonth }}月</span>
	            </li>
	            <li class="arrow" @click="pickNext(currentYear,currentMonth)"><i class="el-icon-arrow-down" ></i></li>
	        </ul>
	    </div>
	    <div class="cal-day">
	    <!-- 星期 -->
		    <ul class="weekdays">
		        <li>一</li>
		        <li>二</li>
		        <li>三</li>
		        <li>四</li>
		        <li>五</li>
		        <li>六</li>
		        <li>日</li>
		    </ul>
	    <!-- 日期 -->
		    <ul class="days">
		        <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
		        <li  v-for="dayobject in handerDays" @click="data(dayobject,days)" :class='{blue:dayobject.choosed}'>
		            <!--本月日期-->
		            <span v-if="dayobject.day.getMonth()+1 == currentMonth" >
		                    <!--今天  同年同月同日-->
		                <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" >今天</span>
                        <span  class='red' v-else-if="(dayobject.day.getFullYear() >new Date().getFullYear()||(dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth()>new Date().getMonth())||(dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth()== new Date().getMonth() && dayobject.day.getDate() > new Date().getDate()))&&!dayobject.noDate">{{ dayobject.day.getDate() }}</span>
                        <span v-else >{{ dayobject.day.getDate() }}</span>
		                <span v-if='dayobject.price&&showPrice' class="red price" >{{dayobject.price}}</span>
		            </span>


		        </li>
		    </ul>
	    </div>
	</div>
</template>

<script>
	export default{
		// model: {
		// 	prop: 'dateArr',
		// 	event: 'click'
		// },
        props:{
            obj: {
                type: Array,
                default:function () {
                    return []
                }
            },
            indexNum:{
                type: Number,
                default:function () {
                    return 0
                }
            },
            noDate:{//不可选日期，适用指定特定日期不可选择
                type:Array,
                default:function () {
                    return []
                }
            },
            showPrice:{//是否显示价格
                type:Boolean,
                default:false
            }
        },
		data(){
			return{
				currentDay: 1,
				currentMonth: 1,
				currentYear: 1970,
				currentWeek: 1,
				days: [],
                // [
				// {day:'2017-12-12',price:'2'}
				// ]
			}
		},
		mounted: function() {  //在vue初始化时调用
            // var cur=[{day:'2017-12-1'}];
            this.initData(null);
        },
        computed:{
            handerDays(){
                if(this.noDate.length){
                    let obj = [];
                    for(let i=0;i<this.noDate.length;i++){
                        obj[i] = Object.assign({},this.noDate[i])
                    }
                    obj.forEach(function(item,index){
                        item.day=item.day.split('-');
                    })
                    var cur1=[];
                    for(let i=0;i<obj.length;i++){//摘取当月日期
                        if(obj[i].day[0]==this.currentYear&&obj[i].day[1]==this.currentMonth){
                            cur1.push(obj[i]);
                        }
                    }
                    if(cur1.length){
                        let vm=this;
                        this.days.forEach(function(item,index){
                            if(item.day.getMonth()+1==vm.currentMonth){
                                cur1.forEach(function(item1,index1){
                                    if(item.day.getDate()==item1.day[2]){
                                        item.noDate=true;
                                    }
                                })
                            }
                        })
                    }
                    return this.days
                }
                return this.days

            }
        	
        },
        methods: {
            initData: function(cur) {
                var date;
                if (cur) {
                    date = new Date(cur);
                } else {
                    var now=new Date();
                    var d = new Date(now.getFullYear() , now.getMonth() , 1);
                    d.setDate(35); 
                    date = new Date(this.formatDate(d.getFullYear(),d.getMonth(),1));
                }
                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth()+1;

                this.currentWeek = date.getDay(); // 1...6,0
                if (this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
                 

                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
               	let obj = [];
                for(let i=0;i<this.obj.length;i++){
                	obj[i] = Object.assign({},this.obj[i])
                }
                obj.forEach(function(item,index){
                	item.day=item.day.split('-');
                })
                var cur1=[];
                    for(let i=0;i<obj.length;i++){
                        if(obj[i].day[0]==this.currentYear&&obj[i].day[1]==this.currentMonth){
                            cur1.push(obj[i]);
                        }
                    }
                for (var i = this.currentWeek - 1; i >= 0; i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                    dayobject.day=d;
                    dayobject.choosed=false;
                    if(cur1.length){
                        for(let j=0;j<cur1.length;j++){
                            if(d.getMonth()+1==this.currentMonth&&cur1[j].day[2]==d.getDate()){
                                dayobject.price=cur1[j].price;
                                dayobject.choosed=true;
                            }
                        }
                    }
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                }
                //其他周
                for (var i = 1; i <= 35 - this.currentWeek; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayobject={};
                    dayobject.day=d;
                    dayobject.choosed=false;
                    if(cur1.length){
                        for(let j=0;j<cur1.length;j++){
                            if(d.getMonth()+1==this.currentMonth&&cur1[j].day[2]==d.getDate()){
                                dayobject.price=cur1[j].price;
                                dayobject.choosed=true;
                            }
                        }
                    }
                    this.days.push(dayobject);
                }

            },
            pickPre: function(year, month) {//上一月

                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                var d = new Date(this.formatDate(year , month , 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            },
            pickNext: function(year, month) {//下一月
                var d = new Date(this.formatDate(year , month , 1));
                d.setDate(35);
                this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            },
            pickYear: function(year, month) {
                alert(year + "," + month);
            },
            backNow:function(){//回到今天
                this.initData(null);
            },
            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function(year,month,day){
                var y = year;
                var m = month;
                if(m<10) m = "0" + m;
                var d = day;
                if(d<10) d = "0" + d;
                return y+"-"+m+"-"+d
            },
            hangdDate(val){//处理单个日期转换
                let y = val.getFullYear();  
                let m = val.getMonth() + 1;  
                m = m < 10 ? '0' + m : m;  
                let d = val.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                return y + '-' + m + '-' + d;           
            },
            data(dayobject,days){
                //单选  用于获取某个日期的信息
                //多选  添加日期
                if(dayobject.day.getMonth()+1 == this.currentMonth){
                let day1=this.hangdDate(dayobject.day);
                var d=new Date(Date.parse(day1.replace(/-/g,"/")));
                var curDate=new Date();
                if(d >=curDate&&!dayobject.noDate){
                    dayobject.choosed=!dayobject.choosed;
                            if(dayobject.choosed){
                                this.obj.push({day:day1,price:'$'})
                            }else{
                                dayobject.price='';
                                let item={day:day1,price:'$'};
                                let index=this.isInclude(this.obj,day1);
                                this.obj.splice(index,1)
                            }
                            this.$emit('getdata',this.obj,this.indexNum);
                    }
                }
            },
            isInclude(obj,item1){
            	let obj1=obj;
            	for(let i=0;i<obj.length;i++){
            		if(obj[i].day==item1){
            			return i
            		}
            	}
            	return false
            }
        }
	}
</script>
<style scoped>
   @import '../../../assets/pcCss/calander.css'
</style>