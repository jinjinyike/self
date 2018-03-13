<template>
    <div class="right-content-index" style="color:#666;">
        <div style="">
            <section class="left-part">
                <div class="top" :style="backgroundDiv">
                    <div class="left-top-main">
                        <h2>{{storeName}}</h2>
                        <div class="store-intro">
                            <img :src="logoImg" alt="logo">
                            <h3>{{storeDes}}</h3>
                        </div>
                    </div>
                </div>
                <div class="left-body" style="" v-if="radio ==='1'">
                    <div class="left-body-main left-body-main0" v-for="(item,index) in partList" :key="index">
                        <img class="left-body-main-back" :src="item.imgSrc">
                        <img class="delete" src="/static/img/ico_delete@2x.png" @click="deletePartListImg(index)">
                        <img class="editor" src="/static/img/editor.png" @click="editorRight(index)">
                        <div class="back-black"></div>
                        <div class="left-body-tip leftText">{{item.name}}</div>
                    </div>
                </div>
            </section>
            <div id="right-contain" style="float: left;padding: 10px;margin-left:500px;">
                <div class="right-top-1" style="margin-bottom:20px;">
                    <span>店铺名称</span>
                    <!-- <input maxlength="12" class="form-control store-name" type="text" name="" placeholder="请输入店铺名称,最多12个字"> -->
                    <el-input v-model="storeName" placeholder="请输入店铺名称,最多12个字" :maxlength="12" style="width:450px;" v-if="editor===true"></el-input>
                    <span v-else>
                            {{storeName}}
                        </span>
                </div>
                <div class="right-top-2" style="position:relative;">
                    <span style="position:relative;">店铺简介</span>
                    <!-- <input maxlength="100" class="form-control store-intro" type="text" name="" placeholder="请输入店铺简介,最多100个字"> -->
                    <el-input type="textarea" :rows="2" placeholder="请输入店铺简介,最多100个字" v-model="storeDes" :maxlength="100" style="width:450px;" v-if="editor===true">
                    </el-input>
                    <span v-else>
                            {{storeDes}}
                        </span>
                </div>
                <div class="right-top-3" style="border-bottom: 1px dashed #ddd;margin-bottom:20px;padding-bottom:20px;margin-top:20px;">
                    <div class="right-top-3-back" style="position: relative;">
                        <p style="margin-bottom:10px;">店铺背景图</p>
                        <el-upload class="avatar-uploader" action="https://up.qbox.me/" :show-file-list="false" :on-success="handleAvatarSuccess0" :before-upload="beforeAvatarUpload" :data='Additional' v-if="editor===true">
                            <img v-if="backImg" :src="backImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <el-button size="small" type="primary" style='opacity: 0;height: 100%;width: 100%;top: 0;bottom: 0;position: absolute;left: 0;' @click="getQiNiuToken"></el-button>
                        </el-upload>
                        <img :src="backImg" alt="" v-else>
                        <p>尺寸:380*150</p>
                        <div id="html5_1c43uae7q1e40uma1hda10bo37m4_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 0px; height: 0px; overflow: hidden; z-index: 0;">
                            <input id="html5_1c43uae7q1e40uma1hda10bo37m4" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept="">
                        </div>
                    </div>
                    <div class="right-top-3-logo" style="position: relative;">
                        <p style="margin-bottom:10px;">店铺Logo图</p>
                        <el-upload class="avatar-uploader" action="https://up.qbox.me/" :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload" :data='Additional' v-if="editor===true">
                            <img v-if="logoImg" :src="logoImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <el-button size="small" type="primary" style='opacity: 0;height: 100%;width: 100%;top: 0;bottom: 0;position: absolute;left: 0;' @click="getQiNiuToken"></el-button>
                        </el-upload>
                        <img :src="logoImg" alt="" v-else>
                        <p>尺寸:120*120</p>
                        <div id="html5_1c43uae7sotl9o11e3a164k1ce7_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 0px; height: 0px; overflow: hidden; z-index: 0;">
                            <input id="html5_1c43uae7sotl9o11e3a164k1ce7" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept="">
                        </div>
                    </div>
                    <!-- <el-button type="primary" style="">修改</el-button> -->
                    <span class="add-classify" style="background:#4CC8DB;position: relative;top: -20px;left: 169px;float:none;" @click="editor = true" v-if="editor===false">修改</span>
                    <span class="add-classify" style="background:#4CC8DB;position: relative;top: -20px;left: 169px;float:none;" @click="saveStoreBaseInfo" v-else-if="editor===true && firstInit">保存</span>
                </div>
                <div class="choose-modal" style="border-bottom: 1px dashed #ddd;margin-bottom:10px;padding-bottom:20px;">
                    <span>选择店铺模式</span>
                    <el-radio v-model="radio" label="1">分类展示模式</el-radio>
                    <el-radio v-model="radio" label="0">列表展示模式</el-radio>
                    <span class="add-classify" style="background:#4CC8DB;" @click="addPart" v-if="radio==='1'">添加分类</span>
                </div>
                <div class="right-body" style="display: block;" v-if="radio ==='1'">
                    <!-- <span class="add-classify" style="background:#4CC8DB;" @click="addPart">添加分类</span> -->
                    <div class="right-body-1 main-contain0" v-for="(item,index) in partList" :key="index">
                        <p style="line-height:32px;height:32px;">
                            <span>产品分类</span>
                            <el-input v-model="item.name" placeholder="请输入产品分类名称,最多10字" :maxlength="10" style="width:300px;" v-if="item.editor===true"></el-input>
                            <span v-else>{{item.name}}</span>
                            <i class="el-icon-check" @click="editorRight(index)" v-if="item.editor===true && item.shopId" style="cursor:pointer"></i>

                        </p>
                        <div class="right-body-1-main" style="position: relative;">
                            <p style="margin-bottom:10px;margin-top:10px;">该分类背景图</p>
                            <el-upload class="avatar-uploader" action="https://up.qbox.me/" :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload" :data='Additional' v-if="item.editor===true">
                                <img v-if="item.imgSrc" :src="item.imgSrc" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <el-button size="small" type="primary" style='opacity: 0;height: 100%;width: 100%;top: 0;bottom: 0;position: absolute;left: 0;' @click="getQiNiuToken(index)"></el-button>
                            </el-upload>
                            <img :src="item.imgSrc" alt="" v-else>
                            <p>尺寸:185*130</p>
                            <!-- <div id="html5_1c43uae9615n9fjuv6ij1a2eoe_container" class="moxie-shim moxie-shim-html5" style="position: absolute; top: 0px; left: 0px; width: 0px; height: 0px; overflow: hidden; z-index: 0;"><input id="html5_1c43uae9615n9fjuv6ij1a2eoe" type="file" style="font-size: 999px; opacity: 0; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;" multiple="" accept=""></div> -->
                        </div>
                        <span class="manage-product" style="background:#4CC8DB;" @click="showDetail(index)">管理产品</span>
                    </div>
                </div>
                <div class="submit" v-if="saveAllButton === '0'"><span style="background:#4CC8DB;" @click="submitAll" >保存</span></div>
                <div class="submit"  v-else-if="tt"><span style="background:#4CC8DB;" @click="saveStoreType">保存修改</span></div>
            </div>
        </div>
        <el-dialog title="产品管理" :visible.sync="dialogFormVisible" center @close='multipleSelection=[]'>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable" row-key='proNum'>
                <el-table-column type="selection" width="55" :reserve-selection='true'>
                </el-table-column>
                <el-table-column prop="proNum" label="内部编号" width="">
                </el-table-column>
                <el-table-column prop="name" label="产品名称" width="">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitPro">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'component_name',
    data() {
        return {
            firstInit: false,
            saveAllButton: '0',
            editor: false,
            // 店铺名称
            storeName: '',
            // 店铺简介
            storeDes: '',
            // 店铺背景图
            backImg:
                'http://www.vceq.com/upload/resources/image/2016/05/25/798376.jpg?1500715622578',
            // 选择店铺模式
            radio: '1',
            // 店铺id（唯一）
            id: '',
            // 店铺logo
            logoImg: 'http://reso3.yiihuu.com/img_1233505.jpg',
            partList: [
                // {
                //     name: '美术馆',
                //     imgSrc:
                //         'http://pics.ctripfair.com/o_1bni041o3pbq1srav5e13781964i.png?imageslim',
                //     selectArr: [],
                //     editor: false
                // }
            ],
            // 向七牛云上传附带的参数
            Additional: {
                token: ''
            },
            indexKey: '',
            dialogFormVisible: false,
            tableData: [
                // {
                //     proNum: '1',
                //     name: '王小虎'
                // },
            ],
            multipleSelection: [],
            length: 0,
            cc: ''
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            this._initData().then(res => {
                if (res === '') {
                    this.editor = true;
                    return;
                }
                this.length = 0;
                this.saveAllButton = '1';

                let shopSupEntity = res.shopSupEntity;
                this.storeName = shopSupEntity.shopName;
                this.storeDes = shopSupEntity.shopDescribe;
                this.backImg = shopSupEntity.shopPic;
                this.logoImg = shopSupEntity.shopLogo;
                this.radio = this.cc = shopSupEntity.shopType;
                this.id = shopSupEntity.id;
                if (shopSupEntity.id) this.firstInit = true;

                let shopTypeEntityList = res.shopTypeEntityList;
                if (shopTypeEntityList.length === 0) return;
                for (let i = 0; i < shopTypeEntityList.length; i++) {
                    this.partList.push({
                        name: shopTypeEntityList[i].typeName,
                        imgSrc: shopTypeEntityList[i].typeImg,
                        shopId: shopTypeEntityList[i].id,
                        selectArr: [],
                        editor: false
                    });
                }
                console.log(this.partList.length);
                this.length = this.partList.length;
            });
        },
        // 初始化数据
        _initData() {
            return new Promise((resolve, reject) => {
                this.$http
                    .axios({
                        url: '/shopSup/getShopTypeList',
                        method: 'get'
                    })
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject();
                    });
            });
        },
        // 第一次页面保存，提交数据
        _submitAllData(data) {
            return new Promise((resolve, reject) => {
                this.$http
                    .axios({
                        url: '/shopSup/updateShopTypeList',
                        method: 'post',
                        data: data,
                        json: true
                    })
                    .then(res => {
                        resolve(true);
                    })
                    .catch(err => {
                        reject();
                    });
            });
        },
        // 下载产品分类数据
        _loadProType(id) {
            return new Promise((resolve, reject) => {
                this.$http
                    .axios({
                        url: '/shopSup/getShopProductList',
                        method: 'get',
                        params: {
                            shopId: id
                        }
                    })
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject();
                    });
            });
        },
        // 上传产品分类的修改
        _upLoadProType(id, arr) {
            console.log(arr);
            return new Promise((resolve, reject) => {
                this.$http
                    .axios({
                        url: 'shopSup/updateShopTypeProduct',
                        method: 'post',
                        json: true,
                        data: {
                            shopId: id,
                            proNumList: arr
                        }
                    })
                    .then(res => {
                        resolve();
                    })
                    .catch(err => {
                        reject();
                    });
            });
        },
        // 删除分类
        _deletePart(idx) {
            return new Promise((resolve, reject) => {
                this.$http
                    .axios({
                        url: '/shopType/delShopTypeEntity',
                        method: 'post',
                        data: {
                            shopId: this.partList[idx].shopId
                        }
                    })
                    .then(res => {
                        if (res === 1) {
                            resolve();
                        }
                    });
            });
        },
        // 修改店铺基本信息
        _modifyStoreBaseInfo() {
            return new Promise((resolve, reject) => {
                this.$http
                    .axios({
                        url: '/shopSup/updateShopSupEntity',
                        method: 'post',
                        json: true,
                        data: {
                            id: this.id, //后台返
                            // shopCodeqr: '1', //店铺二维码图片
                            shopDescribe: this.storeDes, //店铺描述、简介
                            shopLogo: this.logoImg, //店铺Logo
                            shopName: this.storeName, //店铺名称
                            shopPic: this.backImg //店铺背景
                        }
                    })
                    .then(res => {
                        resolve();
                    });
            });
        },
        // 添加产品分类
        _storeType(data) {
            return new Promise((resolve, reject) => {
                this.$http
                    .axios({
                        url: '/shopSup/updateShopSupType',
                        method: 'post',
                        json: true,
                        data: data
                    })
                    .then(res => {
                        resolve();
                    });
            });
        },
        // 更新产品的分类
        _upLoadPart(idx) {
            return new Promise((resolve, reject) => {
                this.$http
                    .axios({
                        url: '/shopType/updateShopTypeName',
                        method: 'post',
                        json: true,
                        data: {
                            id: this.partList[idx].shopId, //后台返
                            typeName: this.partList[idx].name,
                            typeImg: this.partList[idx].imgSrc
                        }
                    })
                    .then(res => {
                        resolve();
                    });
            });
        },
        saveStoreBaseInfo() {
            this._modifyStoreBaseInfo().then(() => {
                this.editor = false;
                this.partList = [];
                this.loadData();
            });
        },

        deletePartListImg(idx) {
            this.$confirm('确定删除该分类?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    if (!this.partList[idx].shopId)
                        return this.partList.splice(idx, 1);

                    this._deletePart(idx).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.partList.splice(idx, 1);
                        this.partList = [];
                        this.loadData();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 图片成功上传之后返回的数据
        handleAvatarSuccess0(response, file, fileList) {
            this.addPhoto('backImg', response.key);
            // this.successInfo(response.key, this.imgArr1);
        },
        handleAvatarSuccess1(response, file, fileList) {
            this.addPhoto('logoImg', response.key);
            // this.successInfo(response.key, this.imgArr1);
        },
        handleAvatarSuccess2(response, file, fileList) {
            let newVal = `http://pics.ctripfair.com/${response.key}?imageslim`;
            this.partList[this.indexKey].imgSrc = newVal;
        },
        addPhoto(key, val) {
            let newVal = `http://pics.ctripfair.com/${val}?imageslim`;
            this.$data[key] = newVal;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        getQiNiuToken(index) {
            console.log(index);

            this.indexKey = index;

            // 获取token值
            this.$syspub.getQiNiuToken().then(res => {
                this.Additional.token = res;
            });
        },
        addPart() {
            this.partList.push({
                name: '',
                imgSrc: '',
                selectArr: [],
                editor: true
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        showDetail(idx) {
            this.indexKey = idx;
            this.dialogFormVisible = true;

            if (this.tableData.length !== 0) {
                this.$refs.multipleTable.clearSelection();
            }

            let shopId = this.partList[idx].shopId
                ? this.partList[idx].shopId
                : '';

            this._loadProType(shopId).then(res => {
                this.tableData = [];

                if (this.partList[idx].shopId)
                    this.partList[idx].selectArr = [];

                for (let i = 0; i < res.length; i++) {
                    this.tableData.push({
                        proNum: res[i].proNum,
                        name: res[i].proName
                    });
                    if (res[i].flag !== '0') {
                        this.partList[idx].selectArr.push({
                            proNum: res[i].proNum,
                            name: res[i].proName
                        });
                    }
                }
            });

            setTimeout(() => {
                this.tableData.forEach(row => {
                    if (this.partList[idx].selectArr.length === 0) return;
                    this.partList[idx].selectArr.forEach(item => {
                        if (item.proNum === row.proNum) {
                            this.$refs.multipleTable.toggleRowSelection(row);
                        }
                    });
                });
            }, 500);
        },
        saveStoreType() {
            if (this.verifyBlank())
                return this.$message.error('请完善分类信息');

            let data = {
                shopSupEntity: {
                    id: this.id, //后台返
                    shopType: this.radio //店铺描述、简介
                },
                shopTypeVoList: []
            };

            for (let i = 0; i < this.partList.length; i++) {
                if (this.partList[i].shopId) {
                    continue;
                }
                data.shopTypeVoList.push({
                    typeName: this.partList[i].name,
                    typeImg: this.partList[i].imgSrc,
                    shopProductEntityList: []
                });
                if (this.partList[i].selectArr.length > 0) {
                    for (
                        let j = 0;
                        j < this.partList[i].selectArr.length;
                        j++
                    ) {
                        data.shopTypeVoList[
                            i - parseInt(this.length)
                        ].shopProductEntityList.push({
                            proNum: this.partList[i].selectArr[j].proNum
                        });
                    }
                } else {
                    delete data.shopTypeVoList[i - parseInt(this.length)]
                        .shopProductEntityList;
                }
            }
            this._storeType(data).then(res => {
                console.log('成功');
                this.partList = [];
                this.loadData();
            });
        },
        submitPro() {
            if (!this.partList[this.indexKey].shopId) {
                this.partList[this.indexKey].selectArr = this.multipleSelection;

                this.dialogFormVisible = false;
                // 清空表格的选项
                this.$refs.multipleTable.clearSelection();
                this.dialogFormVisible = false;
                return;
            }

            let arr = [];
            this.multipleSelection.forEach(item => {
                arr.push(item.proNum);
            });
            this._upLoadProType(this.partList[this.indexKey].shopId, arr).then(
                () => {
                    this.partList[
                        this.indexKey
                    ].selectArr = this.multipleSelection;

                    this.dialogFormVisible = false;
                    // 清空表格的选项
                    this.$refs.multipleTable.clearSelection();
                    this.partList = [];
                    this.loadData();
                }
            );
        },
        editorRight(idx) {
            if (!this.partList[idx].editor)
                return (this.partList[idx].editor = true);
            this._upLoadPart(idx).then(() => {
                this.partList[idx].editor = !this.partList[idx].editor;
                this.partList = [];
                this.loadData();
            });
        },
        verifyBlank() {
            let resutl = this.partList.some(item => {
                return item.imgSrc === '' || item.name === '';
            });
            return resutl;
        },
        submitAll() {
            if (this.storeName === '')
                return this.$message.error('请填写店铺名称');
            if (this.storeDes === '')
                return this.$message.error('请填写店铺简介');
            
            let data = {
                shopSupEntity: {
                    shopName: this.storeName,
                    shopDescribe: this.storeDes,
                    shopLogo: this.backImg,
                    shopPic: this.logoImg,
                    shopType: this.radio //店铺类型(0-列表，1-分类)
                },
                shopTypeVoList: []
            };
            this.partList.forEach((item, idx) => {
                data.shopTypeVoList.push({
                    typeName: item.name,
                    typeImg: item.imgSrc,
                    shopProductEntityList: []
                });
                if (item.selectArr.length > 0) {
                    for (let i = 0; i < item.selectArr.length; i++) {
                        data.shopTypeVoList[idx].shopProductEntityList.push({
                            proNum: item.selectArr[i].proNum
                        });
                    }
                } else {
                    delete data.shopTypeVoList[idx].shopProductEntityList;
                }
            });
            this._submitAllData(data).then(res => {
                if (res === true) {
                    console.log('接口成功');
                    this.partList = [];
                    this.editor = false;

                    this.loadData();
                }
            });
        }
    },
    computed: {
        backgroundDiv() {
            return {
                background: 'url(' + this.backImg + ') no-repeat center / cover'
            };
        },
        isAddNewClass() {
            console.log(this.partList.length);
            if (this.partList.length === 0) return false;
            if (this.partList.length !== this.length) return true;
            return false;
        },
        tt() {
            if (this.radio === '1') {
                return this.saveAllButton !== '0' && this.isAddNewClass;
            }
            return this.cc !== this.radio;
        }
    },
    watch: {}
};
</script>

<style lang="scss" scoped>
.left-part {
    position: absolute;
    width: 380px;
    top: 90px;
    bottom: 0;
    overflow-y: auto;
    margin-left: 20px;
    .top {
        background: #ddd;
        height: 200px;
        padding: 10px;
        .left-top-main {
            color: #fff;
            margin-top: 25px;
            h2 {
                height: 20px;
                line-height: 20px;
                text-align: center;
                font-size: 18px;
            }
            .store-intro {
                margin-top: 20px;
                h3 {
                    font-size: 14px;
                    margin-left: 110px;
                }
            }
            img {
                vertical-align: top;
                width: 100px;
                height: 100px;
                float: left;
            }
        }
    }
    .left-body {
        margin-top: 10px;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        padding: 0 2px;
        .left-body-main {
            display: inline-block; // margin: 3px;
            margin-top: 5px;
            height: 125px;
            position: relative;
            img {
                height: 125px;
                width: 180px;
            }
            .delete {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 20px;
                height: 20px;
                background: #000;
                opacity: 0.5;
                cursor: pointer;
            }
            .editor {
                position: absolute;
                top: 10px;
                right: 40px;
                width: 20px;
                height: 20px;
                background: #000;
                opacity: 0.5;
                cursor: pointer;
            }
            .back-black {
                width: 180px;
                position: absolute;
                left: 0;
                bottom: 0;
                height: 40px;
                background: #000;
                opacity: 0.7;
            }
            .left-body-tip {
                position: absolute;
                left: 0;
                bottom: 0;
                height: 40px;
                line-height: 40px;
                color: #fff;
                text-align: center;
                width: 180px;
            }
        }
    }
}
#right-contain {
    width: 545px;
    margin-left: 25px;
    display: inline-block; // border: 1px solid #000;
}
.right-top-3 img,
.right-body-1 img {
    border: 1px solid #ddd;
    width: 138px;
    height: 75px;
}
label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
}
.right-top-3 div {
    display: inline-block;
}
.checkbox-inline img {
    width: 18px;
    height: 18px;
}
.right-body-1 {
    margin-top: 15px;
    border-bottom: 1px dashed #ddd;
} // .right-body-1-main {
//     width: 150px;
//     display: inline-block;
// }
.right-body-1-main {
    width: 150px;
    display: inline-block;
}
.add-classify,
.manage-product {
    display: inline-block;
    width: 90px;
    height: 25px;
    float: right;
    line-height: 27px; // background-image: url(/static/img/btn_full@2x.png);
    background-size: 100% 100%;
    cursor: pointer;
    border-radius: 37px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
}
.right-body-1 input {
    width: 320px;
    height: 30px;
}
.submit {
    text-align: center;
}
.submit span {
    display: inline-block;
    width: 90px;
    height: 25px;
    margin-top: 10px;
    line-height: 27px; // background-image: url(/static/img/btn_full@2x.png);
    background-size: 100% 100%;
    cursor: pointer;
    border-radius: 37px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 77px;
    line-height: 77px;
    text-align: center;
}
.avatar {
    width: 140px;
    height: 77px;
    display: block;
}
</style>
