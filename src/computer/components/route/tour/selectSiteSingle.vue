<template>
    <div>
        <el-dialog title="" :visible.sync="showTabs" width='476px' @close='close' @open='open'>
            <section class="color flex is-justify-center is-align-center">
                <p class="flex is-align-center">
                    <span class="pay1"></span>已付款</p>
                <p class="flex is-align-center">
                    <span class="unpay1"></span>未付款</p>
                <p class="flex is-align-center">
                    <span class="occ1"></span>占位</p>
                <p class="flex is-align-center">
                    <span class="cancel1"></span>取消</p>
            </section>
            <section>
                <div class="carBox">
                    <p class="flex is-justify-space-between">
                        <span style="color:#929AB1;background:#ddd;">司机</span>
                        <span style="margin-right:0px;color:#929AB1;background:#ddd;">导游</span>
                    </p>
                    <p v-for="(items,idx) in siteArr">
                        <span v-for="(key,value) in items" v-selectColor='{DATA:carInfo[orderIndex],limitNum,addOcc,deleteCancel}' ref="span">{{key}}</span>
                    </p>
                </div>
            </section>
        </el-dialog>
    </div>
</template>

<script>
function _init(el, binding) {
    let limitNum = binding.value.limitNum;
    let pay = binding.value.DATA.pay;
    let unpay = binding.value.DATA.unpay;
    let occ = binding.value.DATA.occ;
    let cancel = binding.value.DATA.cancel;
    if (pay) {
        // 支付
        pay.forEach(item => {
            if (parseInt(el.innerText) === parseInt(item)) {
                el.classList.add('pay');
            }
        });
    }
    if (unpay) {
        // 支付
        unpay.forEach(item => {
            if (parseInt(el.innerText) === parseInt(item)) {
                el.classList.add('unpay');
            }
        });
    }
    if (cancel) {
        // 支付
        cancel.forEach(item => {
            if (parseInt(el.innerText) === parseInt(item)) {
                el.classList.add('cancel');
            }
        });
    }
    el['@clickSite'] = e => {
        let cancelNum = document.getElementsByClassName('cancel');
        let occNum = document.getElementsByClassName('occ');
        if (
            e.target.classList.contains('unpay') ||
            e.target.classList.contains('pay')
        )
            return;
        if (e.target.classList.contains('cancel')) {
            e.target.classList.remove('cancel');
            binding.value.deleteCancel(e.target.innerText);
            return;
        }
        if (
            (cancelNum.length < limitNum &&
                occNum.length < limitNum - cancelNum.length) ||
            (!cancelNum.length && occNum.length < limitNum)
        ) {
            e.target.classList.toggle('occ');
        } else {
            e.target.classList.remove('occ');
        }
        let arr = [];
        for (let i = 0; i < occNum.length; i++) {
            arr.push(occNum[i].innerText);
        }
        binding.value.addOcc(arr);
    };
    el.addEventListener('click', el['@clickSite']);
}
export default {
    name: 'component_name',
    props: {
        // 是否显示页面
        showTab: {
            type: Boolean,
            required: true
        },
        // 限制的游客数
        limitNum: {
            required: true,
            type: Number
        },
        // 选择的车型座位数
        siteNum: {
            required: true,
            type: Number
        },
        // 重置订单的编号
        orderIndex: {
            required: true,
            type: Number
        }
    },
    data() {
        return {
            showTabs: this.showTab,
            // 每个页面的车辆信息
            carInfo: [
                {
                    isPay: false,
                    pay: [],
                    unpay: [],
                    occ: [],
                    cancel: []
                },
                {
                    isPay: true,
                    pay: [],
                    unpay: [],
                    occ: [],
                    cancel: []
                }
            ],
            pay: [],
            unpay: [],
            siteArr: []
        };
    },
    mounted() {
        this.setSeating();
    },
    methods: {
        // 初始化座位布局
        setSeating() {
            this.siteArr = [];
            let siteNum = (parseInt(this.siteNum) - 7) % 4 === 0 ? false : true;
            let arr = [];
            if (siteNum === false) {
                for (let i = 1; i <= parseInt(this.siteNum) - 7; i++) {
                    arr.push(i);
                    if (i % 4 === 0) {
                        this.siteArr.push(arr);
                        arr = [];
                    }
                }
                this.siteArr.push([
                    parseInt(this.siteNum) - 6,
                    parseInt(this.siteNum) - 5,
                    parseInt(this.siteNum) - 4,
                    parseInt(this.siteNum) - 3,
                    parseInt(this.siteNum) - 2
                ]);
            } else {
                let allRow = (parseInt(this.siteNum) - 9) / 4;
                let addRow = Math.ceil(allRow / 2);
                for (let i = 1; i <= parseInt(this.siteNum) - 7; i++) {
                    if (i === addRow * 4 + 1) {
                        this.siteArr.push([i, i + 1]);
                        i = i + 1;
                    } else {
                        arr.push(i);
                        if (arr.length === 4) {
                            this.siteArr.push(arr);
                            arr = [];
                        }
                    }
                }
                this.siteArr.push([
                    parseInt(this.siteNum) - 6,
                    parseInt(this.siteNum) - 5,
                    parseInt(this.siteNum) - 4,
                    parseInt(this.siteNum) - 3,
                    parseInt(this.siteNum) - 2
                ]);
            }
        },
        _initColor(type) {
            let val = document.getElementsByClassName(type);
            let length = val.length;
            for (let i = 0; i < length; i++) {
                if (val[i] === undefined) break;
                val[i].classList.remove(type);
                i = i - 1;
            }
        },
        open() {
            this._initColor('cancel');
            this._initColor('pay');
            this._initColor('unpay');

            this.carInfo[this.orderIndex].unpay = this.unpay.concat([]);
            this.carInfo[this.orderIndex].pay = this.pay.concat([]);
            console.log(this.carInfo[this.orderIndex].unpay);
            if (
                this.carInfo[this.orderIndex].unpay.length > 0 &&
                this.carInfo[this.orderIndex].cancel.length > 0
            ) {
                let unpay = this.carInfo[this.orderIndex].unpay;
                let cancel = this.carInfo[this.orderIndex].cancel;
                let arr_0 = [];
                for (let i = 0; i < unpay.length; i++) {
                    for (let j = 0; j < cancel.length; j++) {
                        if (unpay[i] === cancel[j]) {
                            unpay.splice(i, 1);
                            i = i - 1;
                        }
                    }
                }
            }
            if (
                this.carInfo[this.orderIndex].pay.length > 0 &&
                this.carInfo[this.orderIndex].cancel.length > 0
            ) {
                let pay = this.carInfo[this.orderIndex].pay;
                let cancel = this.carInfo[this.orderIndex].cancel;
                let arr_0 = [];
                for (let i = 0; i < pay.length; i++) {
                    for (let j = 0; j < cancel.length; j++) {
                        if (pay[i] === cancel[j]) {
                            pay.splice(i, 1);
                            i = i - 1;
                        }
                    }
                }
            }
        },
        close() {
            try {
                // 当页面关闭，判断该订单是否选择座位
                // if (this.carInfo[this.orderIndex].occ.length === 0)
                //     throw '未选择座位';
                // if (this.carInfo[this.orderIndex].occ.length !== this.limitNum)
                //     throw '所选择的人数和订单人数不符合';
                if (this.carInfo[this.orderIndex].occ.length === 0)
                    return this.$emit('close');
               

                this.carInfo[this.orderIndex].cancel = [
                    ...new Set([
                        ...this.carInfo[this.orderIndex].cancel,
                        ...this.carInfo[this.orderIndex].occ
                    ])
                ];
                if (this.carInfo[this.orderIndex].isPay) {
                    // 该订单付过钱了
                    if (this.carInfo[this.orderIndex].occ.length === 0) return;
                    this.carInfo[this.orderIndex].occ.forEach(item => {
                        this.pay.push(item);
                    });
                } else {
                    // 该订单未付钱
                    if (this.carInfo[this.orderIndex].occ.length === 0) return;
                    this.carInfo[this.orderIndex].occ.forEach(item => {
                        this.unpay.push(item);
                    });
                }
                this.carInfo[this.orderIndex].occ = [];
                this._initColor('occ');
                this.$emit('close');
            } catch (error) {
                console.error(error);
            }
        },
        addOcc(arr) {
            this.carInfo[this.orderIndex].occ = arr;
        },
        deleteCancel(val) {
            this.carInfo[this.orderIndex].cancel.forEach((item, idx, arr) => {
                if (item === val) arr.splice(idx, 1);
            });
            this.unpay.forEach((item, idx, arr) => {
                if (item === val) arr.splice(idx, 1);
            });
            this.pay.forEach((item, idx, arr) => {
                if (item === val) arr.splice(idx, 1);
            });
        }
    },
    watch: {
        siteNum: {
            // deep: true,
            handler(val, oldVal) {
                this.setSeating();
            }
        },
        showTab(val) {
            this.showTabs = val;
        }
    },
    computed: {},
    directives: {
        selectColor: {
            inserted: function(el, binding) {
                el.removeEventListener('click', el['@clickSite']);
                _init(el, binding);
            },
            componentUpdated: function(el, binding) {
                el.removeEventListener('click', el['@clickSite']);
                _init(el, binding);
            },
            unbind: function(el, binding) {
                el.removeEventListener('click', el['@clickSite']);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
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
button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    color: #4cc8db;
}
header {
    .section-car {
        span {
            font-size: 20px;
            &.active {
                cursor: pointer;
                color: #4cc8db;
            }
        }
        .center {
            margin: 0 5px;
        }
    }
    .section-add {
        position: absolute;
        left: 300px;
    }
}
.carBox {
    border: 1px solid #000;
    width: 56%;
    margin: 0 auto;
    padding: 10px;
    p {
        span {
            cursor: pointer;
            display: inline-block;
            text-align: center;
            border: 1px solid #000;
            width: 38px;
            height: 28px;
            line-height: 28px;
            margin: 10px 10px 0 0;
            &:last-child {
                margin-right: 0;
            }
            &.pay {
                background: #d81e06;
                color: #fff;
            }
            &.unpay {
                background: #1296db;
                color: #fff;
            }
            &.occ {
                background: #000;
                color: #fff;
            }
            &.cancel {
                background: #fe9900;
                color: #fff;
            }
        }
        &:not(:last-child) {
            span {
                &:nth-child(2) {
                    margin-right: 61px;
                }
            }
        }
    }
}
.color {
    margin: 10px 0;
    p {
        &:not(:last-child) {
            margin-right: 10px;
        }
    }
    span {
        display: inline-block;
        width: 25px;
        margin-right: 5px;
        height: 13px;
        &.pay1 {
            background: #d81e06;
        }
        &.unpay1 {
            background: #1296db;
        }
        &.occ1 {
            background: #000;
        }
        &.cancel1 {
            background: #fe9900;
        }
    }
}
</style>
