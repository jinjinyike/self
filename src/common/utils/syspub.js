/**
 * @author:by@Deng
 * @timer:2016-12-07
 * @email:by@6886432@163.com
 * @version:1.0
 * @title:系统的公共js (systemPublic --> syspub)
 */
'use strict';

import requestUtils from '@/common/utils/requestUtils' //自定义封装axios请求
import { qiNiuBaseUrl, baseURL } from '@/common/utils/sysconst' //系统常量
import { Message } from 'element-ui' //消息提示

export default {
    /**
     * 获取七牛云基本信息
     * name: 链接名字
     * suffix: 是否要加图片瘦身后缀
     */
    getQiNiu(name, qiNiuName, suffix) {
        if (name == "") return null;

        if (suffix) {
            return qiNiuName + name + "?imageslim";
        }
        return qiNiuName + name;
    },
    /**
     * 拼接七牛云图片链接
     */
    getQiNiuPic(name) {
        return this.getQiNiu(name, qiNiuBaseUrl, true);
    },
    /**
     * 拼接七牛云视频链接
     */
    getQiNiuVideo(name) {
        return this.getQiNiu(name, qiNiuBaseUrl, false);
    },
    /**
     * 获取后台七牛云接口返回token值
     */
    getQiNiuToken() {
        return requestUtils.axios({
            url: "/currency/getQiNiuToken",
            method: 'post',
        }).then(res => {
            return res;
        })
    },
    /*
    限制上传文件的大小 视频和图片
    file指文件 num限制的大小
    */
    limitSize(file, num) {
        console.log(file);
        if (!num) {
            num = 2;
        }
        const judge = file.size / 1024 / 1024 < num;
        if (!judge) {
            Message({
                showClose: true,
                message: '上传文件大小不能超过' + num + 'MB!',
                type: 'error'
            });
        }
        return judge;
    },
}