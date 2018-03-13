/**
 * author:by@Deng
 * email:by@6886432@163.com
 * version:1.0
 * descriptioin: pc端和移动端请求后台接口
 */

export default {
    orderDetail: '/orderBase/getOrderDetailById1', //订单详情具体信息
    downloadPro: '/routePro/downloadProGather', //下载集合时间地点模板
    uploadExcel: '/routePro/parseExcelData', //导入集合时间地点\
    appProBasic: '/routePro/addRouteProFirst', //添加产品基本信息服务
    getProNum: '/routePro/createRoutePro', //获取产品编号
    routePlatoonItem: '/routePlatoonItem/insertRoutePlatoonItemEntity', //添加产品团期服务
    login: '/userLogin/login', // pc登录接口
    VerifyUserName: '/userLogin/querryExsist', //注册页面验证用户名是否存在
    register: '/userRegister/userRegister', //新用户注册
    getCode: '/userLogin/getValidate', //获得注册手机验证码
    confirmTelCode: '/userRegister/checkUserphoneInfoValidate', //验证验证码
    addProductIntroduction: '/routePro/addRouteProLast', // 产品详情页提交
    addRouteProLast: 'routePro/addRouteProLast', //上传图片
    addRouteProThird: '/routePro/addRouteProThird', // 行程路线
    showInfo: '/userRegister/findByUserId', //账户基本信息回显
    refreshInfo: '/userRegister/updateCompanyInfo', //修改账户基本信息
    getRouteCommandList: '/routePro/getRouteCommandList', // pc管理产品
    routeProUp: 'routePro/up', //产品上架
    routeProDown: 'routePro/down', //产品下架
    routeProDeal: 'routePro/deal', //产品删除
    getCompanyTree: '/company/getCompanyTree', // 公司架构获得左侧树
    addDepartment: '/department/insertDepartment', // 添加部门
    reNameDepartment: '/department/updateDepartment', // 修改部门名称
    reNameCompany: '/company/modifyComapnyName', // 修改分公司名称
    getEmployeeDetail: '/employee/detail/', // 获得员工详情
    moveDepartment: '/department/findByClass', // 部门调动
    changStaffInfo: '/employee/detail/', // 修改员工资料
    getEmployeeTable: '/employee/findListByClass', //获得员工列表
    addNewCompany: '/company/addCompany', //添加新公司
    refindPasswordEmp: '/userLogin/refindPasswordEmp', //修改员工密码
    refindPasswordCom: '/userLogin/refindPasswordCom', //修改公司密码
    addEmployee: '/employee/addEmployee', // 添加新员工
    updateEmployee: '/employee/updateEmployee', //提交员工资料修改
    deleteDepartment: '/department/deleteDepartment', //删除部门
    moveEmployee: '/employee/moveEmployee', //提交员工迁移
    deleteEmployee: '/employee/delete/', //删除员工
    getEmployeeListByCurrentUser: '/employee/getEmployeeListByCurrentUser', //获取公司员工

    /************修改路线产品********/
    getAllRouteProducts: '/routePro/getAllRouteProducts', //修改产品中获取所有产品
    getRouteProEntity: 'routePro/getRouteProEntity', //修改产品中获取基本信息
    updateRouteProEntity: 'routePro/updateRouteProEntity', //修改产品中提交基本信息
    getRoutePlatoonDateList: '/routePlatoonItem/getRoutePlatoonDateList', //获取产品的团期接口
    deleteRoutePlatoonItemByProNum: 'routePlatoonItem/deleteRoutePlatoonItemByProNum', //修改产品删除产品团期
    modifyRoutePlatoonItemAdd: '/routePlatoonItem/modifyRoutePlatoonItemAdd', //修改产品添加团期
    updateRoutePromotions: '/routePro/updateRoutePromotions', //修改产品促销信息
    getRoutePlanEntityByProNum: '/routePro/getRoutePlanEntityByProNum', //修改产品信息回显行程
    updateRouteProThird: '/routePlan/updateRouteProThird', //修改产品行程提交
    updateRouteGatherInfo: '/routePro/updateRouteGatherInfo', //修改产品集合信息
    updateRoutePriceEntity: '/routePro/updateRoutePriceEntity', //修改产品价格体系
    getRouteRestEveryDay: '/routePlatoonItem/getRouteRestEveryDay', //获取有效的余位日期
    modifyProRest: '/routePlatoonItem/modifyProRest', //修改产品余位
    /************计划位********/
    addRouteRestEntity: '/routeRest/addRouteRestEntity', //添加计划位
    getRouteRestListByUserId: '/routeRest/getRouteRestListByUserId', //查找已经添加的计划位产品
    getAvailableProduct: '/routeRest/getAvailableProduct', //查找可被添加的计划位产品
    addRestProductValid: '/routeRest/addRestProductValid', //计划位添加产品
    delRouteRestDayByDate: '/routeRestDay/delRouteRestDayByDate', //删除计划位日期
    updateRouteDayRest: '/routeRestDay/updateRouteDayRest', //更新计划位日期数量
    addRouteRestDayByRest: '/routeRest/addRouteRestDayByRest', //根据计划位名称增加计划位日期
    getRouteRestMapList: '/routeRest/getRouteRestMapList', //查询计划位费用信息
    updateRestProductValid: '/routeRest/updateRestProductValid', //删除计划位
    findById: '/routeRestDay/findById/', //点击修改回显计划位预算
    updateRouteRestDay: '/routeRestDay/updateRouteRestDay', //修改计划位预算
    insertRouteRestFee: '/routeRestFee/insertRouteRestFee', //添加打款信息
    findByRouteRestFee: '/routeRestFee/findByRouteRestFee', //查询打款信息
    getRestListByCurrentUser: '/routeRest/getRestListByCurrentUser', //计划位查询
    getRouteDayRestByRestId: '/routeRestDay/getRouteDayRestByRestId', //对应计划位日期
    getOrderRestList: '/orderRest/getOrderRestList', //计划位对应的订单
    /************订单********/
    getResverdRest: '/orderRest/getResverdRest', //查询占位接口
    addOrderRest: '/orderRest/addOrderRest', //添加预留座位接口
    getOrderRestByParam: '/orderRest/getOrderRestByParam', //分页占位回显信息
    delOrderRest: '/orderRest/delOrderRest', //取消余位占位
    getPlatoonOrderInfoByDate: '/routePlatoonItem/getPlatoonOrderInfoByDate', //产品某天对应的信息
    getOrderRestInfoByID: '/orderRest/getOrderRestInfoByID', //占位对应的信息
    addOrderRoute: '/orderBase/addOrderRoute/self', //添加订单
    getOrderAuditList: '/orderRoute/getOrderAuditList', //订单审核列表
    auditSuccess: '/orderRoute/auditSuccess/', //审核通过
    getChildCompanyByUserId: '/company/getChildCompanyByUserId', // 分公司
    getOrderPaginateList: '/orderRoute/getOrderPaginateList', // 订单查询列表
    getOrderRouteDetail: 'orderRoute/getOrderRouteDetail', // 订单详情
    routeProDeal: 'routePro/deal', //产品删除
    getProductDetail: '/routePro/getRouteProductDetail', // 获得产品详情
    getRouteProductByDate: '/routePlatoonItem/getRouteProductByDate', //获取产品团期某天内容
    getOrderRouteForm: '/orderRoute/getOrderRouteForm', //订单查询表格导出
    /********发团管理*****/
    getTeamPaginateList: '/teamItem/getTeamPaginateList', // 获取发团管理列表
    getTeamItemByParamPaginate: 'teamItem/getTeamItemByParamPaginate', // 短信通知列表
    getTeamVisitorList: '/teamItem/getTeamVisitorList', // 获取拆分团列表
    modifyDividTeam: '/teamItem/modifyDividTeam', // 拆分团队
    savePlan: '/teamBase/savePlan', // 发团安排保存
    getPlanById: '/teamBase/getPlanById', // 发团安排进行回显
    getPlanDetilById: '/teamBase/getPlanDetilById', // 发团管理详情
    getVisitorsForm: '/teamBase/getVisitorsForm', // 发团名单下载
    getGuideBillById: '/guideBillBase/getGuideBillById/', // 导游报账
    getGuideBillByParamPaginate: '/guideBillBase/getGuideBillByParamPaginate', // 导游报账列表
    saveGuideBill: 'guideBillBase/saveGuideBill', //导游报账
    /***** 资源管理 *****/
    addLocalGround: '/localGround/add', // 地接社管理
    getLocalGroundList: '/localGround/getLocalGroundList', // 获取地接社列表
    /******** 用户管理*******/
    distributorGroupAddGroup: '/distributorGroup/addGroup', // 分销商添加群组
    distributorGroupGetGroupList: '/distributorGroup/getGroupList', // 获取群组列表
    distributorGroupDetail: '/distributorGroup/findById/', //群组详情
    distributorGroupUpdate: '/distributorGroup/update', // 修改群组资料
    queryDistributorExist: '/distributor/queryDistributorExist/', // 分销商手机号检测
    getDisList: '/distributor/getDisList', // 获取分销商列表
    addDistributor: '/distributor/addDistributor', // 添加分销商
    addDistributorSalesman: '/distributorSalesman/addDistributorSalesman', // 添加业务员
    distributorDetail: '/distributor/detail/', // 分销商详情
    distributorFindById: '/distributor/findById/', // 支付信息
    distributorUpdate: '/distributor/update', // 支付设置传值
    updateDistributor: '/distributor/updateDistributor', // 修改分销商信息
    distributorFindByClass: '/distributor/findByClass', // 群组详情
    modifyMoveGroup: '/distributor/modifyMoveGroup', // 群组成员移动
    getRegistCom: '/userInfo/getRegistCom', // 获得总公司列表
    distributorGroupDelGroup: '/distributorGroup/delGroup/', //删除群组
    getDistributorList: '/distributor/getDistributorList', //获取分销商信息
    getDistributorSalesmanList: '/distributorSalesman/getDistributorSalesmanList', //业务员列表{disNum}
    /************以上pc请求api,以下移动端请求api********/

    /************以上移动端请求api,以下管理员请求api********/
    adminLogin: '/userAdmin/login', // 管理员登录接口
    adminGetRouteCommandList: '/admin/getRouteCommandList', // 管理员审核列表
    audityes: 'admin/audityes', //管理员产品审核通过，
    auditno: 'admin/auditno', //管理员产品审核不通过
    adminFindAllUserListPaginate: 'admin/findAllUserListPaginate', //用户审核
    getDetail: 'admin/findInfoById' //用户审核点击详情
};