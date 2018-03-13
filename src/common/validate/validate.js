'use strict'
import { Message }  from 'element-ui'
export default{
	
    checkNum1(obj){// 增加字母数字验证，不为则以‘’代替
        obj= obj.replace(/[^a-zA-Z0-9]/g,"");
        return obj;
    },
    checkNum(obj){// 数字验证
        obj = obj.replace(/[^0-9]/g,"");
        return obj;
    },
    checkNumPos(obj){// 正整数数字验证
        obj = obj.replace(/[^0-9]/g,"");
        obj=obj==0?'':obj;
        return obj;
    }
}
