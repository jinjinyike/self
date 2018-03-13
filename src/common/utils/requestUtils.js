/**
 * author: by@Deng
 * email: by6886432@163.com
 * description: 自定义axios封装
 */
'use strict'

import qs from 'qs'
import axios from 'axios'
import loadUtils from '@/common/load/loadUtils.js' //加载中动画
import { Message } from 'element-ui' //消息提示
import router from '@/computer/router'   //路由

const baseURL = process.envconfig.API_HOST; // 请求基地址
const TIMEOUT = 40000; //请求超时时间,单位: ms

const code_status = {
    SUCCESS: 200, // 请求成功
    NO_ERROR: 400, // 后台自定义抛出异常
    NO_REQUEST: 404, // 错误地址
    NO_METHOD: 405, // 请求type方式错误
    NO_JSON: 415, // json请求错误
    BIZ_ERR: 500, // 业务请求异常
    NET_ERR: 501, // 网络连接异常，请稍候再试
}


export default {
    axios(options) {
        return new Promise((resolve, reject) => {

            //请求头部
            let header = {
                'X-Requested-With': 'XMLHttpRequest',
                "Accept": "application/json",
                "Content-Type": "application/json; charset=UTF-8"
            };
            if (options.method.toLowerCase() != 'get') {
                header = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }

                //是否json请求
                if (options.json) {
                    header = {
                        'X-Requested-With': 'XMLHttpRequest',
                        "Accept": "application/json",
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                    if (options.data) {
                        options.data = JSON.stringify(options.data);
                    }
                } else {
                    //post请求 k/v传值方式
                    if (options.data) {
                        options.data = qs.stringify(options.data); //序列化请求数据
                    }
                }
            }

            //创建axios实例
            let instance = axios.create({
                baseURL: baseURL,
                url: options.url,
                method: options.method,
                timeout: TIMEOUT, //请求超时
                responseType: 'json', //default
                withCredentials: true, // 是否允许带cookie
                headers: header,
                onUploadProgress: progressEvent => {
                    //上传时

                },
                onDownloadProgress: progressEvent => {
                    //下载时

                },
            })

            //请求拦截
            instance.interceptors.request.use(res => {

                //这里可以判断是否登陆超时


                //若有,则执行
                if (options.animate) {
                    options.animate(); //自定义执行动画
                } else {
                    if (options.load) {
                        loadUtils.loading(); //默认动画
                    }
                }

                return res;
            }, error => {
                //消息提示
                Message({
                    showClose: true,
                    message: '请求失败',
                    type: 'error'
                });
                return Promise.reject(error);
            });


            //请求响应
            instance(options).then(res => {
                //如果是文件下载
                if (res.headers && (res.headers['content-type'] === 'application/octet-stream;charset=UTF-8')) {
                    let iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.src = res.request.responseURL;
                    iframe.onload = function() {
                        document.body.removeChild(iframe)
                    }
                    document.body.appendChild(iframe);
                    loadUtils.closeLoading(); //关闭加载动画
                    return;
                }


                //响应成功,继续走回调
                resolve(res.data.data);
                loadUtils.closeLoading(); //关闭加载动画
            }).catch(error => {
                //响应失败
                loadUtils.closeLoading(); //关闭加载动画

                let res_data = JSON.parse(JSON.stringify(error));
                console.log(res_data);

                //超时
                if (error.toString().startsWith(`Error: timeout of ${TIMEOUT}ms exceeded`)) {
                    //消息提示
                    Message({
                        showClose: true,
                        message: '网络慢,请稍候再试...',
                        type: 'error'
                    });
                    reject();
                    return;
                } else {
                    switch (res_data.response.status) {
                        case 400: //400--后台自定义抛出异常
                            if (res_data.response.data) {
                                let tip = res_data.response.data.message;
                                if(tip==='登录超时'){
                                    //跳转登录页
                                    router.push({ path: '/' });
                                }else{
                                    if(!options.error){
                                        Message({
                                            showClose: true,
                                            message: tip,
                                            type: 'warning'
                                        });
                                    }else{

                                    }
                                }
                            }
                            break;
                        case 500: //500--后台解析错误
                            //消息提示
                            // let tip;
                            if (res_data.response.data) {
                                let tip = res_data.response.data.message;
                                Message({
                                    showClose: true,
                                    message: tip,
                                    type: 'warning'
                                });
                            }
                            break;
                    }
                }
                if (res_data.response.data) {
                    reject(res_data.response.data.message);
                }
            });
        })
    },
    updaloadExcel(options) {
        return new Promise((resolve, reject) => {

            //创建axios实例
            let instance = axios.create({
                baseURL: baseURL,
                url: options.url,
                method: options.method,
                timeout: TIMEOUT, //请求超时
                responseType: 'json', //default
                withCredentials: true, // 是否允许带cookie
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })

            //请求拦截
            instance.interceptors.request.use(res => {
                return res;
            });


            //请求响应
            instance(options).then(res => {

                //响应成功,继续走回调
                resolve(res);
            }).catch(error => {
                //响应失败
                let err = JSON.parse(JSON.stringify(error)).response.data;
                if (err) {
                    reject(err.message);
                }

            });
        })
    }
}


/**
 * use example
 *
    this.$http.axios({
        url:'',   //必须
        method:'get/post',       //必须
        data:{},    //可选--请求数据,post方式时才有,要求传对象格式
        params:{},  //可选--请求数据,get方式时才有,要求传对象格式(get方式也可以直接将param放在url上,二选一)
        json:true,      //可选--为true时表示json请求方式，不传或者false表示普通k/v请求
        load:true,  //可选--为ture自定义默认动画,false或不传时没有动画
        animate:animate,      //可选--请求时自定义动画
        error:true, //是否由系统抛出错误 true-不抛出，false-抛出
    }).then(resolve=>{
        console.log('成功了');     //成功回调
    }).catch(err=>{
        // console.log("失败了")   //失败回调
    }).then(resolve=>{
        //若有异步执行则继续执行
        //没有异步操作则没有该then函数
    })
 *
 * 注:
 *   A. 传json形式时请用post方式
 *   B. 后台单独返string类型时可能被处理成number类型,用时确认一下
 *
 */
