<template>
    <div class="main">
        <el-dialog title="" :visible.sync="showTabs" width='1150px'>
            <div id="pdf">
                <header class="flex is-justify-center is-align-center">
                    <h1>
                        发团名单
                    </h1>
                </header>
                <table cellpadding='0' cellspacing='0' style="width:1100px;">
                    <tr class="" style="border:none;">
                        <td align='' colspan="8" rowspan="" style="text-align:left;">
                            <span style="margin-right:20px;">团队编号</span>
                            <span style="display:inline-block;width:120px;;">{{detailData.teamSelfNum}}</span>
                            <span style="margin-right:10px;">导游信息</span>
                            <span style="margin-right:10px;" v-if="detailData.teamGuideEntityList">
                                                                                {{detailData.teamGuideEntityList[0].guideName}}
                                                                            </span>
                            <span v-if="detailData.teamGuideEntityList">
                                                                                {{detailData.teamGuideEntityList[0].guidePhone}}
                                                                            </span>
                        </td>
                    </tr>
                    <tr class="" style="border:none;">
                        <td align='' colspan="8" rowspan="" style="text-align:left;">
                            <span style="margin-right:20px;">发团日期</span>
                            <span style="display:inline-block;width:120px;">2017-07-08</span>
                            <span style="margin-right:10px;">司机信息</span>
                            <span style="margin-right:10px;">
                                                                                欧阳少华
                                                                            </span>
                            <span style="margin-right:10px;">
                                                                                1399312312
                                                                            </span>
                            <span>A3800</span>
                        </td>
                    </tr>
                    <tr class="" style="border:none;">
                        <td align='' colspan="8" rowspan="" style="text-align:left;">
                            <span style="margin-right:20px;">团队人数</span>
                            <span style="display:inline-block;width:120px;">总共 {{53}} 人</span>
                            <!-- <span>其中</span>
                                                    <span style="margin-right:10px;">成人 {{20}} 人</span>
                                                    <span style="margin-right:10px;">儿童 {{20}} 人</span>
                                                    <span style="margin-right:10px;">学生 {{20}} 人</span>
                                                    <span style="margin-right:10px;">老人 {{20}} 人</span> -->
                        </td>
                    </tr>
                    <tr class="" style="border:none;" v-if="oneBedRoom!==0 || doubleRoom!==0 || threeRoom!==0 || threeFamilyRoom!==0 || fourRoom!==0 || moreRoom!==0">
                        <td align='' colspan="8" rowspan="" style="text-align:left;">
                            <span style="margin-right:20px;">预定房间</span>
                            <span style="margin-right:10px;" v-if="oneBedRoom!==0">大床房 {{oneBedRoom}} 间</span>
                            <span style="margin-right:10px;" v-if="doubleRoom!==0">双人标间  {{doubleRoom}} 间</span>
                            <span style="margin-right:10px;" v-if="threeRoom!==0">三人标间 {{threeRoom}} 间</span>
                            <span style="margin-right:10px;" v-if="threeFamilyRoom!==0">三人家庭间 {{threeFamilyRoom}} 间</span>
                            <span style="margin-right:10px;" v-if="fourRoom!==0">四人间 {{fourRoom}} 间</span>
                            <span style="margin-right:10px;" v-if="moreRoom!==0">多人间 {{moreRoom}} 间</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="8" style="text-align:left;">
                            <div v-for="(item,index) in detailData.teamHotelEntityList">
                                <div class="" style="float:left;">
                                    <span>
                                                                            酒店名称
                                                                        </span>
                                    <span>
                                                                            {{item.hotelName}}
                                                                        </span>
                                </div>
                                <div style="float:right;line-height:20px;">
                                    <p style="margin:0px;">
                                        <span style="margin-right:20px;">联系人</span>
                                        <span style="margin-right:20px;">{{item.hotelLinkName}}</span>
                                        <span style="margin-right:20px;">联系电话</span>
                                        <span>{{item.hotelLinkPhone}}</span> (
                                        <span v-if="item.standardRoom !== 0">大床房{{item.standardRoom}}间</span>
                                        <span v-if="item.doubleRoom !== 0">双人间{{item.doubleRoom}}间</span>
                                        <span v-if="item.threeRoom !== 0">三人间{{item.threeRoom}}间</span>
                                        <span v-if="item.threeFamilyRoom !== 0">三人家庭房{{item.threeFamilyRoom}}间</span>
                                        <span v-if="item.fourRoom !== 0">四人间{{item.fourRoom}}间</span>
                                        <span v-if="item.moreRoom !== 0">多人间{{item.moreRoom}}间</span> )
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="8" style="text-align:left;">
                            <div v-for="(item,index) in detailData.teamVisEntityList">
                                <div class="" style="float:left;">
                                    <span>
                                                                            景区名称
                                                                        </span>
                                    <span>
                                                                            {{item.visName}}
                                                                        </span>
                                </div>
                                <div style="float:right;line-height:20px;">
                                    <p style="margin:0px;">
                                        <span style="margin-right:20px;">联系人</span>
                                        <span style="margin-right:20px;">{{item.visLinkName}}</span>
                                        <span style="margin-right:20px;">联系电话</span>
                                        <span>{{item.visLinkPhone}}</span>
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="">
                        <td style="border:none;">内部编号</td>
                        <td>联系人</td>
                        <td>联系电话</td>
                        <td>人数</td>
                        <td>预定房间信息</td>
                        <td>集合时间</td>
                        <td>集合地点</td>
                        <td>备注</td>
                    </tr>
                    <tr class="" style="vertical-align:middle;" v-for="(item,index) in tableData" :key="index">
                        <td style="border:none;">{{item.proSelfNum}}</td>
                        <td>{{item.linkName}}</td>
                        <td>{{item.linkPhone}}</td>
                        <td>{{item.num}}</td>
                        <td>
                            <p style="" v-if="item.hotel.oneBedRoom !== 0">大床房 {{item.hotel.oneBedRoom}} 间</p>
                            <p style="" v-if="item.hotel.doubleBedRoom !== 0">双人标间 {{item.hotel.doubleBedRoom}} 间</p>
                            <p style="" v-if="item.hotel.threeStandardRoom !== 0">三人标间 {{item.hotel.threeStandardRoom}} 间</p>
                            <p style="" v-if="item.hotel.threeFamilyRoom !== 0">三人家庭间 {{item.hotel.threeFamilyRoom}} 间</p>
                            <p style="" v-if="item.hotel.fourBedRoom !== 0">四人间 {{item.hotel.fourBedRoom}} 间</p>
                            <p style="" v-if="item.hotel.moreBedRoom !== 0">多人间 {{item.hotel.moreBedRoom}} 间</p>
                        </td>
                        <td>
                            {{item.proGatherTime}}
                        </td>
                        <td>
                            {{item.proGatherPlace}}
                        </td>
                        <td>
                            {{item.guideRemarks}}
                        </td>
                    </tr>
                </table>
                <p style="color:red;">备注：此行程仅供参考，最终以出团通知单或者实际行程为准</p>
            </div>
            <el-button type="primary" @click='print' style="margin:20px auto 0;display:block;">打印</el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showTabs: false,
                tableData: [],
                detailData: '',
                threeFamilyRoom: '',
                moreRoom: '',
                oneBedRoom: '',
                doubleRoom: '',
                threeRoom: '',
                fourRoom: ''
            };
        },
        props: {
            // id: {
            //     type: String,
            //     default: ''
            // }
        },
        created() {
            // if(this.showTabs) this.loadData();
        },
        methods: {
            doShowTabs(){
                this.showTabs = true;
            },
            loadData(obj) {
                let id = obj ? obj : this.id;
                this.$http
                    .axios({
                        url: this.$api.getPlanDetilById + '/' + id,
                        method: 'get',
                        // params: { orderId: this.orderId }, // get方式传值
                        json: false,
                        error: true
                    })
                    .then(res => {
                        (this.detailData = {}), (this.tableData = []);
                        this.storeData(res);
                    })
                    .catch(err => {
                        // this.err = true;
                        // console.log(123);
                        (this.detailData = {}), (this.tableData = []);
                        this.$message.error('订单有误');
                    });
            },
            storeData(res) {
                this.threeFamilyRoom = res.threeFamilyRoom;
                this.moreRoom = res.moreRoom;
                this.oneBedRoom = res.oneBedRoom;
                this.doubleRoom = res.doubleRoom;
                this.threeRoom = res.threeRoom;
                this.fourRoom = res.fourRoom;
                this.tableData = res.visitorData.dataList;
                this.detailData = res.teamVo;
                console.log(this.detailData);
                if (this.detailData.teamDriverEntityList) {
                    for (
                        let i = 0; i < this.detailData.teamDriverEntityList.length; i++
                    ) {
                        let enter = this.detailData.teamDriverEntityList[i];
                        if (enter.tool !== '0') {
                            enter.driverFee = 0;
                            if (enter.adultNum)
                                enter.driverFee += parseInt(
                                    enter.adultNum * enter.adultPrice
                                );
                            if (enter.childNum)
                                enter.driverFee += parseInt(
                                    enter.childNum * enter.childPrice
                                );
                        }
                    }
                }
                if (this.detailData.groundVoList.length > 0) {
                    for (let i = 0; i < this.detailData.groundVoList.length; i++) {
                        let enter = this.detailData.groundVoList[i];
                        if (enter.groundType === '1') {
                            if (enter.teamDriverEntityList) {
                                for (
                                    let j = 0; j < enter.teamDriverEntityList.length; j++
                                ) {
                                    if (
                                        enter.teamDriverEntityList[j].tool !== '0'
                                    ) {
                                        let text = enter.teamDriverEntityList[j];
                                        text.driverFee = 0;
                                        if (text.adultNum)
                                            text.driverFee += parseInt(
                                                text.adultNum * text.adultPrice
                                            );
                                        if (text.childNum)
                                            text.driverFee += parseInt(
                                                text.childNum * text.childPrice
                                            );
                                    }
                                }
                            }
                        }
                    }
                }
            },
            print() {
                this.createPdf('pdf');
            },
            createPdf(printpage) {
                // let newWindow = window.open(); //打开新窗口
                let codestr = document.getElementById(printpage).innerHTML; //获取需要生成pdf页面的div代码
                window.document.write(codestr); //向文档写入HTML表达式或者JavaScript代码
                window.document.close(); //关闭document的输出流, 显示选定的数据
                let head = document.getElementsByTagName('head')[0];
                var style = document.createElement('link');
                style.href = '/static/css/pdf.css';
                style.rel = 'stylesheet';
                style.type = 'text/css';
                head.appendChild(style);
                console.log(window);
                setTimeout(() => {
                    window.print(); //打印当前窗口
                    // this.$router.push({
                    //     path: '/index/tourManage'
                    // });
                    // location.reload();
                }, 500);
                return true;
            }
        }
    };
</script>

<style lang="scss" scoped media='print'>
    .flex {
        display: flex;
    }
    .is-justify-center {
        justify-content: center;
    }
    .is-justify-space-between {
        justify-content: space-between;
    }
    .is-align-center {
        align-items: center;
    }
    .margin-right {
        margin-right: 20px;
    }
    .main {
        width: 688px;
        #pdf {
            header {
                font-size: 14px;
                span {
                    position: absolute;
                    left: 20px;
                }
                margin-bottom: 10px;
            }
            table {
                border: 1px solid #797979;
                tr {
                    padding: 10px;
                    vertical-align: middle;
                    td {
                        padding: 10px;
                    }
                    td:nth-child(1) {
                        width: 80px;
                        text-align: center;
                    }
                    &:not(.title) {
                        border: 1px solid #797979;
                        td:nth-child(1) {
                            border-right: 1px solid #797979;
                        }
                        td:nth-child(2) {
                            div {
                                &:nth-child(1) {
                                    border-bottom: 1px dashed #797979;
                                    padding-bottom: 10px;
                                }
                                margin-top: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
