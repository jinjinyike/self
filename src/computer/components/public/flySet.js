'use strict'
		let arr=[
				{ value: '中国南方航空公司', label: '中国南方航空公司' },
				{ value: '中国联航', label: '中国联航' },
				{ value: '中国国际航空公司', label: '中国国际航空公司' },
				{ value: '中国东方航空公司', label: '中国东方航空公司' },
				{ value: '春秋航空', label: '春秋航空' },
				{ value: '山东航空', label: '山东航空' },
				{ value: '四川航空', label: '四川航空' },
				{ value: '深圳航空公司', label: '深圳航空公司' },
				{ value: '海南航空', label: '海南航空' },
				{ value: '吉祥航空', label: '吉祥航空' },
				{ value: '厦门航空', label: '厦门航空' },
				{ value: '奥凯航空公司', label: '奥凯航空公司' },
				{ value: '上海航空公司', label: '上海航空公司' },
				{ value: '青岛航空', label: '青岛航空' },
				{ value: '九元航空', label: '九元航空' },
				{ value: '首都航空', label: '首都航空' },
				{ value: '天津航空', label: '天津航空' },
				{ value: '瑞丽航空', label: '瑞丽航空' },
				{ value: '国泰航空', label: '国泰航空' },
				{ value: '澳门航空', label: '澳门航空' },
				{ value: '国泰港龙航空', label: '国泰港龙航空' },
				{ value: '中华航空', label: '中华航空' },
				{ value: '香港航空', label: '香港航空' },
				{ value: '长荣航空', label: '长荣航空' },
				{ value: '中国西南航空公司', label: '中国西南航空公司' },
				{ value: '云南航空公司', label: '云南航空公司' },
				{ value: '长城航空公司', label: '长城航空公司' },
				{ value: '武汉航空公司', label: '武汉航空公司' },
				{ value: '中国西北航空公司', label: '中国西北航空公司' },
				{ value: '中国北方航空公司', label: '中国北方航空公司' },
				{ value: '中国航空股份有限公司', label: '中国航空股份有限公司' },
				{ value: '新疆航空公司', label: '新疆航空公司' },
				{ value: '中国新华航空公司', label: '中国新华航空公司' },
				{ value: '山西航空公司', label: '山西航空公司' },
				{ value: '长安航空公司', label: '长安航空公司' },
				{ value: '祥鹏航空', label: '祥鹏航空' },
				{ value: '成都航空', label: '成都航空' },
				{ value: '河北航空', label: '河北航空' },
				{ value: '昆明航空', label: '昆明航空' },
				{ value: '大连航空', label: '大连航空' },
				{ value: '幸福航空', label: '幸福航空' },
				{ value: '西藏航空', label: '西藏航空' },
				{ value: '英安航空', label: '英安航空' },
				{ value: '重庆航空', label: '重庆航空' },
				{ value: '西部航空', label: '西部航空' },
				{ value: '大新华航空', label: '大新华航空' },
				{ value: '乌鲁木齐航空', label: '乌鲁木齐航空' },
				{ value: '北部湾航空', label: '北部湾航空' },
				{ value: '福州航空', label: '福州航空' },
				{ value: '阿联酋航空公司', label: '阿联酋航空公司' },
				{ value: '卡塔尔航空公司', label: '卡塔尔航空公司' },
				{ value: '阿提哈航空公司', label: '阿提哈航空公司' },
				{ value: '俄罗斯航空', label: '俄罗斯航空' },
				// { value: '英国航空', label: '英国航空' },
				{ value: '日本航空', label: '日本航空' },
				{ value: '日本全日空', label: '日本全日空' },
				{ value: '汉莎航空', label: '汉莎航空' },
				{ value: '维珍航空', label: '维珍航空' },
				{ value: '加拿大航空', label: '加拿大航空' },
				{ value: '亚洲航空', label: '亚洲航空' },
				{ value: '达美航空', label: '达美航空' },
				{ value: '大韩航空', label: '大韩航空' },
				{ value: '新加坡航空', label: '新加坡航空' },
				{ value: '马来西亚航空公司', label: '马来西亚航空公司' },
				{ value: '新西兰航空', label: '新西兰航空' },
				{ value: '美国联合航空', label: '美国联合航空' },
				{ value: '荷兰皇家航空', label: '荷兰皇家航空' },
				{ value: '高丽航空', label: '高丽航空' },
				{ value: '法国航空', label: '法国航空' },
				{ value: '北欧航空', label: '北欧航空' },
				{ value: '澳大利亚航空', label: '澳大利亚航空' },
				{ value: '芬兰航空公司', label: '芬兰航空公司' },
				{ value: '意大利航空公司', label: '意大利航空公司' },
				{ value: '文莱皇家航空公司', label: '文莱皇家航空公司' },
				{ value: '哈萨克斯坦航空公司', label: '哈萨克斯坦航空公司' },
				{ value: '埃塞俄比亚航空公司', label: '埃塞俄比亚航空公司' },
				{ value: '波兰航空', label: '波兰航空' },
				{ value: '美国长青国际', label: '美国长青国际' },
				{ value: '以色列航空', label: '以色列航空' },
				{ value: '印度尼西亚鹰', label: '印度尼西亚鹰' },
				{ value: '乌兹别克斯坦航空公司', label: '乌兹别克斯坦航空公司' },
				{ value: '新加坡胜安航空公司', label: '新加坡胜安航空公司' },
				{ value: '罗马尼亚航空公司', label: '罗马尼亚航空公司' },
				{ value: '瑞士航空公司', label: '瑞士航空公司' },
				{ value: '蒙古航空公司', label: '蒙古航空公司' },
				{ value: '奥地利航空公司', label: '奥地利航空公司' },
				{ value: '巴基斯坦国际', label: '巴基斯坦国际' },
				{ value: '澳洲航空公司（快达）', label: '澳洲航空公司（快达）' },
				{ value: '缅甸国际航空公司', label: '缅甸国际航空公司' },
				{ value: '尼泊尔王家航空公司', label: '尼泊尔王家航空公司' },
				{ value: '越南航空公司', label: '越南航空公司' },
				{ value: '伊朗航空公司', label: '伊朗航空公司' },
				{ value: '伏尔加第聂伯航空公司', label: '伏尔加第聂伯航空公司' },
				{ value: '乌克兰航空公司', label: '乌克兰航空公司' }
			];
export default arr
