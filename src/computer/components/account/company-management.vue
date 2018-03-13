<template>
    <div class="management">
        <div class="title-list">
            <p class="h1">
                <span style="width: 80%;display: inline-block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{topCompanyName}}</span>
                <el-dropdown trigger="click" class="menu-wrapper" @command='parentCompany'>
                    <span class="el-dropdown-link menu">
                        下拉菜单
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='新增部门'>新增部门</el-dropdown-item>
                        <el-dropdown-item command='新增分公司'>新增分公司</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </p>
            <ul>
                <!-- 总公司的部门 -->
                <li class="title" v-for="(item,index) in topCompanyDep" :key="index">
                    <p>
                        <span v-toggle v-if="item.editor" @click="showDetailStaff({departmentId:item.id,companyId:topCompanyId,companyName:topCompanyName})">{{item.name}}</span>
                        <el-input placeholder="" v-model="item.name" v-else style="padding-left: 14px;width: 93%;">
                            <i slot="suffix" class="el-input__icon" @click='changeEditor({first:index},"总公司",item.id)' style="display:inline-block;background:url('/static/img/gou.png') no-repeat center / contain;width:20px;height:20px;padding-top:10px;"></i>
                        </el-input>
                        <el-dropdown trigger="click" class="menu-wrapper" v-if="item.editor" @command='optMethod_dep'>
                            <span class="el-dropdown-link menu">
                                下拉菜单
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(opt,idx) in departmentOpt" :command='[opt,index,item.id]' :key="idx">{{opt}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </p>
                </li>
                <li style="width:100%;border-top: 1px solid #D5D5D5;margin-top:10px;margin-bottom:10px;height:1px;"></li>
                <!-- 分公司 -->
                <li class="title" v-for="(item,index0) in childCompany">
                    <p>
                        <span v-toggle v-if="item.editor" class="childCompany" ref="childCompany" style="font-size:16px;">{{item.companyName}}</span>
                        <el-input placeholder="" v-model="item.companyName" v-else style="padding-left: 14px;width: 93%;">
                            <i slot="suffix" class="el-input__icon" @click='changeEditor({first:index0},"分公司",item.id)' style="display:inline-block;background:url('/static/img/gou.png') no-repeat center / contain;width:20px;height:20px;padding-top:10px;"></i>
                        </el-input>
                        <el-dropdown trigger="click" class="menu-wrapper" placement='bottom' v-if="item.editor" @command='optMethod_com'>
                            <span class="el-dropdown-link menu">
                                下拉菜单
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(opt,idx) in companyOpt" :command='[opt,index0,item.id]' :key="idx">{{opt}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </p>
                    <ul class="info" ref="info">
                        <!-- 分公司的部门 -->
                        <li v-for="(items,index1) in item.departmentVos" :key="index1" style="cursor: pointer;">
                            <i v-if="items.editor" @click="showDetailStaff({departmentId:items.id,companyId:item.id,companyName:item.companyName})" style="font-style:normal;padding-left:14px;display: inline-block;width: 70%;">{{items.name}}</i>
                            <el-input placeholder="" v-model="items.name" v-else style="padding-left: 14px;width: 93%;">
                                <!-- <i slot="suffix" class="el-input__icon" @click='items.editor = !items.editor' style="display:inline-block;background:url('/static/img/gou.png') no-repeat center / contain;width:20px;height:20px;padding-top:10px;"></i> -->
                                <i slot="suffix" class="el-input__icon" @click='changeEditor({first:index0,second:index1},"分公司部门",items.id)' style="display:inline-block;background:url('/static/img/gou.png') no-repeat center / contain;width:20px;height:20px;padding-top:10px;"></i>
                            </el-input>
                            <el-dropdown trigger="click" class="menu-wrapper" @command='optMethod_depChild' v-if="items.editor">
                                <span class="el-dropdown-link menu">
                                    下拉菜单
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(opt,idx) in departmentOpt" :command='[opt,index0,index1,items.id]' :key="idx">{{opt}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div style="margin-left:200px;">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column label="员工工号" prop="jobNumber" width="100">
                    <!-- <template slot-scope="scope">{{ scope.row.date }}
</template>-->
                </el-table-column>
                <el-table-column prop="name" label="员工姓名">
                </el-table-column>
                <el-table-column prop="phone" label="联系电话">
                </el-table-column>
                <el-table-column label="职务" w prop="job">
                    <!--<template slot-scope="scope">
	 {{ scope.row.date }}
</template>-->
                </el-table-column>
                <el-table-column prop="userName" label="用户名" width="120">
                </el-table-column>
                <el-table-column label="操作" width="65">
                    <template slot-scope="scope">
                        <el-dropdown trigger="click" class="menu-wrapper" @command='staffMethods' style="padding-top:0px;float:none;">
                            <span class="el-dropdown-link menu">
                                下拉菜单
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(opt,idx) in memberOpt" :command='[opt,scope.$index, scope.row]' :key="idx">{{opt}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <div align="right" class="pagination">
                <div class="self-count">
                    共
                    <span class="colorSky"> {{totalCount}} </span> 条数据
                </div>
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" :page-sizes="[10, 20, 30 ,40]" layout="total,sizes,prev, pager, next ,jumper">
                </el-pagination>
            </div>
        </div>

        <!-- 权限配置 -->
        <!-- <el-card :body-style="{ padding: '0px' }" class="power" v-hide:powerShow='hideTarget' v-if="powerShow"></el-card> -->
        <el-dialog title="权限配置" :visible.sync="powerShow" class="power" width='700px' center>
            <!-- <h2>权限配置</h2> -->
            <p class="flex title">
                <span>配置员工</span>
                <span>001</span>
                <span>欧阳少华</span>
                <span>国内部</span>
                <span style="flex:2">国内设计部主管</span>
                <span>18621212121</span>
            </p>
            <el-checkbox-group v-model="PowerCheckList">
                <p class="flex">
                    <el-checkbox label="产品管理权限"></el-checkbox>
                    <el-checkbox label="订单管理权限"></el-checkbox>
                    <el-checkbox label="控位管理权限"></el-checkbox>
                    <el-checkbox label="用户管理权限"></el-checkbox>
                </p>
                <p class="flex">
                    <el-checkbox label="财务管理权限"></el-checkbox>
                    <el-checkbox label="费用审核权限"></el-checkbox>
                    <el-checkbox label="数据查询权限"></el-checkbox>
                    <el-checkbox label="资源管理权限"></el-checkbox>
                </p>
                <p class="flex">
                    <el-checkbox label="发团安排权限"></el-checkbox>
                    <el-checkbox label="签证管理权限"></el-checkbox>
                    <el-checkbox label="公司管理权限"></el-checkbox>
                    <el-checkbox label="产品营销权限"></el-checkbox>
                </p>
                <p class="flex">
                    <el-checkbox label="费用申报权限"></el-checkbox>
                    <el-checkbox label="报账管理权限"></el-checkbox>
                </p>
                <!-- <p>
					<el-button type="primary" style="margin:0 auto;display:block;" size='mini'>保存</el-button>
				</p> -->
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click="powerShow = false">取 消</el-button>
                <el-button type="primary" @click="powerShow = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 新增分公司 -->
        <!-- <el-card :body-style="{ padding: '0px' }" class="newCompany" v-hide:newCompanyShow='hideTarget' v-if="newCompanyShow"></el-card> -->
        <el-dialog title="新增分公司" :visible.sync="newCompanyShow" class="newCompany" width='380px' center>
            <!-- <h2>新增分公司</h2> -->
            <p class="flex is-justify-space-around">
                <span>分公司名称</span>
                <el-input v-model.trim="newCompanyInfo.companyName" placeholder="请输入内容" class="input"></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>用户名</span>
                <el-input v-model.trim="newCompanyInfo.userName" placeholder="请输入内容" class="input" :class="{verify:userNameColor}" v-verity:userNameColor='changeColor' :maxlength='20'></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>邮箱</span>
                <el-input v-model.trim="newCompanyInfo.mail" placeholder="请输入内容" class="input" :class="{verify:mailColor}" v-verity:mailColor='changeColor'></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>设置密码</span>
                <el-input placeholder="格式为6-16位数字+字母" v-model.trim="newCompanyInfo.pwd" :type="pwdType" :maxlength='16' class="input" :class="{verify:pwdColor}" v-verity:pwdColor='changeColor'>
                    <i slot="suffix" class="el-input__icon el-icon-date" :class='{eye:eye,eyeClose:eyeClose}' @click="changeEye"></i>
                </el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>绑定手机</span>
                <el-input v-model.trim="newCompanyInfo.tel" placeholder="请输入内容" class="input" :class="{verify:telColor}" v-verity:telColor='changeColor' :maxlength='11'></el-input>
            </p>
            <p class="flex">
                <span style="flex:0;flex-basis:88px;">验证码</span>
                <el-input v-model.trim="newCompanyInfo.code" placeholder="请输入内容" class="input" style="flex:1;" :maxlength='6'></el-input>
                <el-button type="text" style="flex:1;" :disabled="codeBtnClick" @click="sendCode">{{codeBtnInfo}}</el-button>
            </p>
            <p class="flex is-justify-space-around">
                <span>分支性质</span>
                <el-select v-model.trim="newCompanyInfo.companyType" placeholder="请选择" class="input">
                    <el-option v-for="item in arr1" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p class="flex is-justify-space-around">
                <span>收款账户</span>
                <el-select v-model.trim="newCompanyInfo.gathering" placeholder="请选择" class="input">
                    <el-option v-for="item in arr2" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newCompanyShow = false">取 消</el-button>
                <el-button type="primary" @click="submitNewCompany">添加</el-button>
            </div>
        </el-dialog>
        <!-- 新增员工 -->
        <!-- <el-card :body-style="{ padding: '0px' }" class="newStaff" v-hide:newStaffShow='hideTarget' v-if="newStaffShow"></el-card> -->
        <el-dialog title="新增员工" :visible.sync="newStaffShow" class="newStaff" width='354px' center>
            <!-- <h2>新增员工</h2> -->
            <p class="flex is-justify-space-around">
                <span>用户名</span>
                <el-input v-model="newStaffInfo.userName" placeholder="请输入内容" class="input" :class="{verify:userNameColor}" v-verity:userNameColor='changeColor'></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>设置密码</span>
                <el-input placeholder="格式为6-16位数字+字母" v-model.trim="newStaffInfo.pwd" :type="pwdType" :maxlength='16' class="input" :class="{verify:pwdColor}" v-verity:pwdColor='changeColor'>
                    <i slot="suffix" class="el-input__icon el-icon-date" :class='{eye:eye,eyeClose:eyeClose}' @click="changeEye"></i>
                </el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>姓名</span>
                <el-input v-model="newStaffInfo.name" placeholder="请输入内容" class="input"></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>工号</span>
                <el-input v-model="newStaffInfo.num" placeholder="请输入内容" class="input"></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>职务</span>
                <el-input v-model="newStaffInfo.job" placeholder="请输入内容" class="input"></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>手机</span>
                <el-input v-model="newStaffInfo.tel" placeholder="请输入内容" class="input" :maxlength='11' :class="{verify:telColor}" v-verity:telColor='changeColor'></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>邮箱</span>
                <el-input v-model="newStaffInfo.mail" placeholder="请输入内容" class="input" :class="{verify:mailColor}" v-verity:mailColor='changeColor'></el-input>
            </p>

            <div slot="footer" class="dialog-footer">
                <el-button @click="newStaffShow = false">取 消</el-button>
                <el-button type="primary" @click="submitNewStaff">添加</el-button>
            </div>
        </el-dialog>
        <!-- 修改员工资料 -->
        <!-- <el-card :body-style="{ padding: '0px' }" class="newStaff" v-hide:reviseStaffShow='hideTarget' v-if="reviseStaffShow"></el-card> -->
        <el-dialog title="修改员工资料" :visible.sync="reviseStaffShow" class="newStaff" width='360px' center>
            <!-- <h2>修改员工资料</h2> -->
            <p class="flex is-justify-space-around">
                <span>用户名</span>
                <el-input v-model="reviseStaff.userNamw" placeholder="请输入内容" class="input" disabled="true"></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>姓名</span>
                <el-input v-model="reviseStaff.name" placeholder="请输入内容" class="input"></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>工号</span>
                <el-input v-model="reviseStaff.num" placeholder="请输入内容" class="input"></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>职务</span>
                <el-input v-model="reviseStaff.job" placeholder="请输入内容" class="input"></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>手机</span>
                <el-input v-model="reviseStaff.tel" placeholder="请输入内容" class="input" :maxlength='11' :class="{verify:telColor}" v-verity:telColor='changeColor'></el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>邮箱</span>
                <el-input v-model="reviseStaff.mail" placeholder="请输入内容" class="input" :class="{verify:mailColor}" v-verity:mailColor='changeColor'></el-input>
            </p>

            <div slot="footer" class="dialog-footer">
                <el-button @click="reviseStaffShow = false">取 消</el-button>
                <el-button type="primary" @click="submitNewStaffEditor">修改</el-button>
            </div>
        </el-dialog>
        <!-- 设置主管 -->
        <!-- <el-card :body-style="{ padding: '0px' }" class="director" v-hide:directorShow='hideTarget' v-if="directorShow"></el-card> -->
        <el-dialog title="设置主管" :visible.sync="directorShow" class="director" width='20%' center>
            <!-- <h2>设置主管</h2> -->
            <el-checkbox-group v-model="directorList">
                <ul>
                    <li v-for="(item,index) in directiveInfo" :key="index">
                        <el-checkbox :label="item"></el-checkbox>
                    </li>
                </ul>

            </el-checkbox-group>

            <div slot="footer" class="dialog-footer">
                <el-button @click="directorShow = false">取 消</el-button>
                <el-button type="primary" @click="directorShow = false">修改</el-button>
            </div>
        </el-dialog>
        <!-- 重置密码 -->
        <!-- <el-card :body-style="{ padding: '0px' }" class="changePwd" v-hide:changePwdShow='hideTarget' v-if="changePwdShow"></el-card> -->
        <el-dialog title="重置密码" :visible.sync="changePwdShow" class="changePwd" width='385px' center>
            <!-- <h2>重置密码</h2> -->
            <p class="flex is-justify-space-around">
                <span>设置密码</span>
                <el-input placeholder="格式为6-16位数字+字母" v-model.trim="rePwd.first" :type="pwdType" :maxlength='16' class="input" :class="{verify:pwdColor}" v-verity:pwdColor='changeColor'>
                    <i slot="suffix" class="el-input__icon el-icon-date" :class='{eye:eye,eyeClose:eyeClose}' @click="changeEye"></i>
                </el-input>
            </p>
            <p class="flex is-justify-space-around">
                <span>确认密码</span>
                <el-input placeholder="格式为6-16位数字+字母" v-model.trim="rePwd.sec" :type="pwdTypeSec" :maxlength='16' class="input" :class="{verify:pwdColorSec}" v-verity:pwdColorSec='changeColor'>
                    <i slot="suffix" class="el-input__icon el-icon-date" :class='{eyeSec:eyeSec,eyeCloseSec:eyeCloseSec}' @click="changeEyeSec"></i>
                </el-input>
            </p>
            <p class="flex">
                <span style="flex:0;flex-basis:88px;">验证码</span>
                <el-input v-model="rePwd.code" placeholder="" class="input" style="flex:1;" :maxlength='6'></el-input>
                <i>发送至18622510531</i>
            </p>
            <p style="padding-left:87px;text-align:left;">
                <el-button type="text" style="flex:1;" :disabled="codeBtnClick" @click="sendCode({modify:true,tel:rePwd.tel})">{{codeBtnInfo}}</el-button>
            </p>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changePwdShow = false">取 消</el-button>
                <el-button type="primary" @click="submitChangePwd">修改</el-button>
            </div>
        </el-dialog>
        <!-- 个人详情 -->
        <!-- <el-card :body-style="{ padding: '0px' }" class="cc" v-hide:staffInfoShow='hideTarget' v-if="staffInfoShow"></el-card> -->
        <el-dialog title="员工详情" :visible.sync="staffInfoShow" class="cc" width='770px' center>
            <!-- <h2>员工详情 -->
            <!-- <span style="float:right;font-size:12px;color:#4CC8DB;">密码重置</span> -->
            <!-- </h2> -->
            <table>
                <tr>
                    <td>员工姓名</td>
                    <td>工号</td>
                    <td>所属部门</td>
                    <td>职务名称</td>
                    <td>邮箱账号</td>
                    <td>手机号码</td>
                </tr>
                <tr>
                    <td>{{staffInfoData.baseInfo.name}}</td>
                    <td>{{staffInfoData.baseInfo.num}}</td>
                    <td>{{staffInfoData.baseInfo.part}}</td>
                    <td>{{staffInfoData.baseInfo.job}}</td>
                    <td>{{staffInfoData.baseInfo.mail}}</td>
                    <td>{{staffInfoData.baseInfo.tel}}</td>
                </tr>
            </table>
            <div class="auto clearfix">
                <div class="title">用户权限</div>
                <div class="authority flex is-justify-space-between">
                    <span v-for="(item,index) in staffInfoData.authorityInfo" :key="index">{{item}}</span>
                </div>
            </div>

            <!-- <div slot="footer" class="dialog-footer">
				<el-button @click="directorShow = false">取 消</el-button>
				<el-button type="primary" @click="directorShow = false">修改</el-button>
			</div> -->
        </el-dialog>
        <!-- 员工调动 -->
        <!-- <el-card :body-style="{ padding: '0px' }" class="cc" v-hide:staffMoveShow='hideTarget' v-if="staffMoveShow" style="width:300px;"></el-card> -->
        <el-dialog title="" :visible.sync="staffMoveShow" class="cc" width='385px' center>
            <h2>调动至{{moveNeedName}}公司</h2>
            <el-select v-model="staffMoveValue" placeholder="请选择" style='display:block;margin:0 auto;'>
                <el-option v-for="item in staffMoveInfo" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

            <div slot="footer" class="dialog-footer">
                <el-button @click="staffMoveShow = false">取 消</el-button>
                <el-button type="primary" @click="submitStaffMove">修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
	verificationUser,
	verificationMail,
	verificationPhone
} from '../../../common/utils/verificationUtils';
export default {
	name: 'component_name',
	data() {
		return {
			/* 1. 左侧公司树数据开始 */
			// 总公司id
			topCompanyId: '',
			// 总公司名字
			topCompanyName: '',
			// 总公司部门
			topCompanyDep: [
				// {
					// 部门名称
					// name: '',
					// 是否编辑
					// editor: true,
					// 部门成员
					// member: [
					// 	{
					// 		num: '001',
					// 		name: '苏简',
					// 		tel: '18622510531',
					// 		job: '前端工程师',
					// 		userName: 'janesu123'
					// 	}
					// ],
					// 部门id
					// id: '',
					// parentId: '',
					// companyId: ''
				// }
			],
			// 分公司
			childCompany: [
				{
					// 分公司名称
					companyName: '',
					// 分公司id
					id: '',
					parentId: '',
					// 分公司是否可编辑
					editor: true,
					// 分公司下属部门
					departmentVos: [
						{
							name: '',
							editor: true,
							id: '',
							parentId: '',
							companyId: ''
						}
					]
				}
			],
			/* 1. 左侧公司树数据结束 */
			// 表格数据
			tableData: [],
			// 表格中选中复选框
			multipleSelection: [],
			// 权限配置
			PowerCheckList: [],
			// 增加主管
			directorList: [],
			directiveInfo: ['你猜', '苏简'],
			// 添加新公司具体信息
			newCompanyInfo: {
				companyName: '',
				userName: '',
				pwd: '',
				tel: '',
				code: '',
				mail: '',
				companyType: '',
				gathering: ''
			},
			// 添加员工具体信息
			newStaffInfo: {
				userName: '',
				pwd: '',
				name: '',
				num: '',
				job: '',
				tel: '',
				mail: ''
			},
			// 修改密码
			rePwd: {
				first: '',
				sec: '',
				code: '',
				tel: '18622510531',
				id: ''
			},
			staffInfoData: {
				baseInfo: {
					name: '123',
					num: '123',
					part: '123',
					job: '123',
					mail: '123',
					tel: '132'
				},
				authorityInfo: [
					'产品管理权限',
					'订单管理权限',
					'控位管理权限',
					'用户管理权限',
					'财务管理权限'
				]
			},
			// 通用的部门权限
			departmentOpt: ['新增员工', '重新命名', '设置主管', '删除部门'],
			// 通用的分公司权限
			companyOpt: ['增加部门', '监管设置', '重置密码', '重新命名', '删除分支'],
			// 通用的员工权限
			memberOpt: [
				'详情',
				'权限设置',
				'重置密码',
				'修改资料',
				'部门调动',
				'删除员工'
			],
			pwdType: 'password',
			pwdTypeSec: 'password',
			// 是否显示密码
			eye: false,
			eyeClose: true,
			eyeSec: false,
			eyeCloseSec: true,
			// 发送验证码的按钮
			codeBtnClick: false,
			// 验证码按钮的信息
			codeBtnInfo: '发送验证码',
			// 员工权限
			powerShow: false,
			// 新增分公司
			newCompanyShow: false,
			// 新增员工
			newStaffShow: false,
			// 新增主管
			directorShow: false,
			// 修改密码
			changePwdShow: false,
			// 员工个人信息
			staffInfoShow: false,
			// 调动员工
			staffMoveShow: false,
			// 修改员工资料
			reviseStaffShow: false,
			arr1: [
				{
					label: '自营',
					value: '0'
				},
				{
					label: '合资',
					value: '1'
				},
				{
					label: '独立核算',
					value: '2'
				}
			],
			arr2: [
				{
					label: '结款至总部账户',
					value: '0'
				},
				{
					label: '结款至分支账户',
					value: '1'
				}
			],
			staffMoveInfo: [
				{
					value: '',
					label: ''
				}
			],
			staffMoveValue: '',
			staffMoveEmployId: '',
			// 控制判断颜色显示
			userNameColor: false,
			mailColor: false,
			pwdColor: false,
			pwdColorSec: false,
			telColor: false,
			//默认每页数据量
			pagesize: 10,
			//默认高亮行数据id
			highlightId: -1,
			//当前页码
			currentPage: 1,
			//查询的页码
			start: 1,
			//默认数据总数
			totalCount: 0,
			// 增加新员工需要传入的部门id
			newStaffId: '',
			// 查询员工需要的id
			staff: {
				departId: ''
			},
			// 修改员工资料
			reviseStaff: {
				departmentId: '',
				userNamw: '',
				name: '',
				num: '',
				job: '',
				tel: '',
				mail: '',
				id: ''
			},
			moveNeedId: '',
			moveNeedName: ''
		};
	},
	created() {
		this.loadData();
		let promise = new Promise((resolve, reject) => {
			let timer = setInterval(() => {
				console.log(123);
				if (this.topCompanyDep.length > 0) {
					clearInterval(timer);
					timer = null;
					resolve();
				}
			}, 1000);
		});
		promise.then(() => {
			this._initStaffData();
		});
	},
	methods: {
		// 初始化页面，默认显示一个有成员的部门
		_initStaffData() {
			for (let i = 0; i < this.topCompanyDep.length; i++) {
				if (this.tableData.length > 0) break;
				console.log(this.topCompanyDep);
				this.showDetailStaff({
					departmentId: this.topCompanyDep[i].id,
					companyId: this.topCompanyId,
					companyName: this.topCompanyName,
					init: true
				});
			}
		},
		loadData() {
			this.$http
				.axios({
					url: this.$api.getCompanyTree,
					method: 'get'
				})
				.then(res => {
					console.log('接口调用成功');
					console.log(res);
					// 总公司id
					this.topCompanyId = res[0].id;
					// 总公司名字
					this.topCompanyName = res[0].companyName;
					// 总公司部门
					this.$set(this.$data, 'topCompanyDep', res[0].departmentVos);
					// this.topCompanyDep = res[0].departmentVos;
					this.topCompanyDep.map(item => {
						this.$set(item, 'editor', true);
						// item.editor = true;
					});
					// 分公司
					this.$set(this.$data, 'childCompany', res[0].companyVos);
					// this.childCompany = res[0].companyVos;
					this.childCompany.map(item => {
						// item.editor = true;
						this.$set(item, 'editor', true);
						item.departmentVos.map(items => {
							// items.editor = true;
							this.$set(items, 'editor', true);
						});
					});
				})
				.catch(err => {
					console.error('接口调用失败');
				});
		},
		// 表格提交完成之后用来初始化数据
		// obj是需要初始化的对象
		initData(obj) {
			for (let key in this.$data[obj]) {
				this.$data[obj][key] = '';
			}
		},
		// 添加新部门
		addNewDepartment(idxOpt, com) {
			if (com === '总公司') {
				console.log(this.topCompanyDep[idxOpt.first]);
				if (this.topCompanyDep[idxOpt.first].name.length !== 0) {
					this.topCompanyDep[idxOpt.first].editor = !this.topCompanyDep[
						idxOpt.first
					].editor;
					this.$http
						.axios({
							url: this.$api.addDepartment,
							method: 'post',
							data: {
								name: this.topCompanyDep[idxOpt.first].name,
								parentId: '0',
								companyId: this.topCompanyId
							},
							json: 'true'
						})
						.then(res => {
							console.log(res);
							this.loadData();
						})
						.catch(err => {
							console.error(err);
						});
					return;
				}
				// 如果没有输入，删除这个新添加的部门
				this.topCompanyDep.splice(idxOpt.first, 1);
			}
			if (com === '分公司部门') {
				console.warn('11111111111111111');
				if (
					this.childCompany[idxOpt.first].departmentVos[idxOpt.second].name
						.length !== 0
				) {
					this.childCompany[idxOpt.first].departmentVos[
						idxOpt.second
					].editor = !this.childCompany[idxOpt.first].departmentVos[
						idxOpt.second
					].editor;
					// 判断添加的部门是分公司的直属部门。还是直属部门的下级部门
					// 如果是前者，parentId:0
					// 否则parentId为直属部门的id
					let idxOptArr = Object.keys(idxOpt);
					let parentId =
						idxOptArr.length === 2
							? '0'
							: this.childCompany[idxOpt.first].departmentVos[idxOpt.second].id;
					console.log(parentId);
					this.$http
						.axios({
							url: this.$api.addDepartment,
							method: 'post',
							data: {
								name: this.childCompany[idxOpt.first].departmentVos[
									idxOpt.second
								].name,
								parentId: parentId,
								companyId: this.childCompany[idxOpt.first].id
							},
							json: 'true'
						})
						.then(res => {
							console.log(res);
							this.loadData();
						})
						.catch(err => {
							console.error(err);
						});
					return;
				}
				// 如果没有输入，删除这个新添加的部门
				this.childCompany[idxOpt.first].departmentVos.splice(idxOpt.second, 1);
			}
			if (com === '分公司') {
				console.warn('11111111111111111');
				if (this.childCompany[idxOpt.first].companyName.length !== 0) {
					this.childCompany[idxOpt.first].editor = !this.childCompany[
						idxOpt.first
					].editor;
					this.$http
						.axios({
							url: this.$api.addDepartment,
							method: 'post',
							data: {
								name: this.childCompany[idxOpt.first].companyName,
								parentId: '0',
								companyId: this.topCompanyId
							},
							json: 'true'
						})
						.then(res => {
							console.log(res);
							this.loadData();
						})
						.catch(err => {
							console.error(err);
						});
					return;
				}
				// 如果没有输入，删除这个新添加的部门
				this.childCompany[idxOpt.first].departmentVos.splice(idxOpt.second, 1);
			}
		},
		// 重命名部门
		reNameDepartment(idxOpt, com, id) {
			if (com === '总公司') {
				if (this.topCompanyDep[idxOpt.first].name.length !== 0) {
					this.topCompanyDep[idxOpt.first].editor = !this.topCompanyDep[
						idxOpt.first
					].editor;
					this.$http
						.axios({
							url: this.$api.reNameDepartment,
							method: 'post',
							data: {
								name: this.topCompanyDep[idxOpt.first].name,
								parentId: '0',
								companyId: this.topCompanyId,
								id: id
							},
							json: 'true'
						})
						.then(res => {
							console.log(res);
							this.loadData();
						})
						.catch(err => {
							console.error(err);
						});
					return;
				}
				// 如果没有输入，删除这个新添加的部门
				this.topCompanyDep.splice(idxOpt.first, 1);
			}
			if (com === '分公司部门') {
				console.warn('11111111111111111');
				if (
					this.childCompany[idxOpt.first].departmentVos[idxOpt.second].name
						.length !== 0
				) {
					this.childCompany[idxOpt.first].departmentVos[
						idxOpt.second
					].editor = !this.childCompany[idxOpt.first].departmentVos[
						idxOpt.second
					].editor;
					// 判断添加的部门是分公司的直属部门。还是直属部门的下级部门
					// 如果是前者，parentId:0
					// 否则parentId为直属部门的id
					let idxOptArr = Object.keys(idxOpt);
					let parentId =
						idxOptArr.length === 2
							? '0'
							: this.childCompany[idxOpt.first].departmentVos[idxOpt.second].id;
					console.log(parentId);
					this.$http
						.axios({
							url: this.$api.reNameDepartment,
							method: 'post',
							data: {
								name: this.childCompany[idxOpt.first].departmentVos[
									idxOpt.second
								].name,
								parentId: parentId,
								companyId: this.childCompany[idxOpt.first].id,
								id: id
							},
							json: 'true'
						})
						.then(res => {
							console.log(res);
							this.loadData();
						})
						.catch(err => {
							console.error(err);
						});
					return;
				}
				// 如果没有输入，删除这个新添加的部门
				this.childCompany[idxOpt.first].departmentVos.splice(idxOpt.second, 1);
			}
			if (com === '分公司') {
				console.warn('11111111111111111');
				if (this.childCompany[idxOpt.first].companyName.length !== 0) {
					this.childCompany[idxOpt.first].editor = !this.childCompany[
						idxOpt.first
					].editor;
					this.$http
						.axios({
							url: this.$api.reNameCompany,
							method: 'post',
							data: {
								companyName: this.childCompany[idxOpt.first].companyName,
								companyId: this.childCompany[idxOpt.first].id
							}
						})
						.then(res => {
							console.log(res);
							this.loadData();
						})
						.catch(err => {
							console.error(err);
						});
					return;
				}
				// 如果没有输入，删除这个新添加的部门
				this.childCompany[idxOpt.first].departmentVos.splice(idxOpt.second, 1);
			}
		},
		// 提交新添加的部门
		changeEditor(idxOpt, com, id) {
			if (id) {
				// 修改原有部门
				this.reNameDepartment(idxOpt, com, id);
				return;
			}
			// 新添加部门
			this.addNewDepartment(idxOpt, com);
		},
		errLog() {
			try {
				if (this.userNameColor === true) throw '用户名错误';
				if (this.mailColor === true) throw '邮箱错误';
				if (this.pwdColor === true) throw '密码错误';
				if (this.telColor === true) throw '手机号错误';
				return true;
			} catch (error) {
				this.$message.error(error);
			}
		},
		changeColor(color, boo) {
			this.$data[color] = boo;
		},
		// 自定义指令调用的方法
		// target是需要隐藏的方块名字
		hideTarget(target) {
			this[target] = !this[target];
		},
		// 员工选项列表调用的方法
		staffMethods(command) {
			let result = command[0];
			if (result === '权限设置') {
				this.powerShow = true;
			}
			if (result === '详情') {
				this.$http
					.axios({
						url: this.$api.getEmployeeDetail + command[2].id,
						method: 'get'
					})
					.then(res => {
						console.log(res);
						let staffInfo = res.employeeVo;
						this.staffInfoData.baseInfo.name = staffInfo.name;
						this.staffInfoData.baseInfo.num = staffInfo.jobNumber;
						this.staffInfoData.baseInfo.part = staffInfo.departmentName;
						this.staffInfoData.baseInfo.job = staffInfo.job;
						this.staffInfoData.baseInfo.mail = staffInfo.email;
						this.staffInfoData.baseInfo.tel = staffInfo.phone;
						this.staffInfoShow = true;
					})
					.catch(err => {
						console.error(err);
					});
			}
			if (result === '部门调动') {
				this.staffMoveShow = true;
				this.$http
					.axios({
						url: this.$api.moveDepartment,
						method: 'post',
						data: {
							statu: 1,
							companyId: this.moveNeedId
						},
						json: 'true'
					})
					.then(res => {
						console.log(res);
						for (let i = 0; i < res.length; i++) {
							if (i > 0)
								this.staffMoveInfo.push({
									label: '',
									value: ''
								});
							this.$set(this.$data.staffMoveInfo[i], 'label', res[i].name);
							this.$set(this.$data.staffMoveInfo[i], 'value', res[i].id);
						}
						this.staffMoveEmployId = command[2].id;
					})
					.catch(err => {
						console.error(err);
					});
			}
			if (result === '删除员工') {
				console.log(command);
				this.deleteStaff(command);
			}
			if (result === '修改资料') {
				this.reviseStaffShow = true;
				this.$http
					.axios({
						url: this.$api.changStaffInfo + command[2].id,
						method: 'get'
					})
					.then(res => {
						console.log(res);
						let staffInfo = res.employeeVo;
						this.reviseStaff.userNamw = staffInfo.userName;
						this.reviseStaff.name = staffInfo.name;
						this.reviseStaff.num = staffInfo.jobNumber;
						this.reviseStaff.job = staffInfo.job;
						this.reviseStaff.mail = staffInfo.email;
						this.reviseStaff.tel = staffInfo.phone;
						this.reviseStaff.id = command[2].id;
						this.reviseStaffShow = true;
					})
					.catch(err => {
						console.error(err);
					});
			}
			if (result === '重置密码') {
				this.changePwdShow = true;
				this.rePwd.employeeId = command[2].id;
			}
		},
		// 总公司的方法
		parentCompany(command) {
			if (command === '新增分公司') {
				this.newCompanyShow = true;
			}
			if (command === '新增部门') {
				this.topCompanyDep.push({
					editor: false,
					name: ''
				});
			}
		},
		// 总公司部门的选项列表中的点击方法
		optMethod_dep(command) {
			if (command[0] === '重新命名') {
				this.topCompanyDep[command[1]].editor = !this.topCompanyDep[command[1]]
					.editor;
				return;
			}
			if (command[0] === '新增员工') {
				this.newStaffShow = true;
				this.newStaffId = command[2];
				return;
			}
			if (command[0] === '删除部门') {
				this.$confirm('是否删除部门?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						this.removeDepartment(command[2]);
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				return;
			}
		},
		// 分公司公司部门的选项列表中的点击方法
		optMethod_depChild(command) {
			if (command[0] === '重新命名') {
				this.childCompany[command[1]].departmentVos[command[2]].editor = !this
					.childCompany[command[1]].departmentVos[command[2]].editor;
				return;
			}
			if (command[0] === '新增员工') {
				this.newStaffShow = true;
				this.newStaffId = command[3];
				console.log(this.newStaffId);
				return;
			}
			if (command[0] === '删除部门') {
				this.$confirm('是否删除部门?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						this.removeDepartment(command[3]);
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				return;
			}
		},
		// 分公司的选项列表中的点击方法
		optMethod_com(command) {
			if (command[0] === '重新命名') {
				this.childCompany[command[1]].editor = !this.childCompany[command[1]]
					.editor;
				console.log(this.childCompany[command[1]]);
				return;
			}
			if (command[0] === '重置密码') {
				this.changePwdShow = true;
				this.rePwd.id = command[2];
			}
			if (command[0] === '增加部门') {
				this.childCompany[command[1]].departmentVos.push({
					name: '',
					editor: false
				});
				this.$refs.info[command[1]].classList.add('active');
				this.$refs.childCompany[command[1]].classList.add('active');
			}
			if (command[0] === '删除分支') {
				this.$confirm('是否删除该分公司?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						this.$http
							.axios({
								url: `/company/delCompany/${command[2]}`,
								method: 'post'
							})
							.then(res => {
								console.log(res);
								if (res === 1) {
									this.loadData();
								}
							})
							.catch(err => {
								console.error(err);
							});
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
			}
		},
		// 展示部门成员的详细内容
		showDetailStaff({ departmentId, companyId, companyName, init }) {
			this.$http
				.axios({
					url: `${this.$api.getEmployeeTable}?start=${this.currentPage -
						1}&size=${
						this.pagesize
					}&sort=asc&departmentId=${departmentId}&order=createDate&statu=1`,
					method: 'get'
				})
				.then(res => {
					if (init) {
						if (res.data.length > 0) {
							this.reviseStaff.departmentId = departmentId;
							this.staff.departId = departmentId;
							this.$set(this.$data, 'tableData', res.data);
							this.$set(this.$data, 'totalCount', res.total);
							this.moveNeedId = companyId;
							this.moveNeedName = companyName;
						}
						return;
					}
					console.log(res);
					this.reviseStaff.departmentId = departmentId;
					this.staff.departId = departmentId;
					this.$set(this.$data, 'tableData', res.data);
					this.$set(this.$data, 'totalCount', res.total);
					this.moveNeedId = companyId;
					this.moveNeedName = companyName;
				})
				.catch(err => {});
		},
		// 表格的多选
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		// 密码是否可见
		changeEye() {
			this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
			this.eyeClose = !this.eyeClose;
			this.eye = !this.eye;
		},
		changeEyeSec() {
			this.pwdTypeSec = this.pwdTypeSec === 'password' ? 'text' : 'password';
			this.eyeCloseSec = !this.eyeCloseSec;
			this.eyeSec = !this.eyeSec;
		},
		// 确定添加新公司
		submitNewCompany() {
			if (
				this.newCompanyInfo.companyName.length === 0 ||
				this.newCompanyInfo.userName.length === 0 ||
				this.newCompanyInfo.mail.length === 0 ||
				this.newCompanyInfo.pwd.length === 0 ||
				this.newCompanyInfo.tel.length === 0 ||
				this.newCompanyInfo.code.length === 0 ||
				this.newCompanyInfo.companyType.length === 0 ||
				this.newCompanyInfo.gathering.length === 0
			) {
				return this.$message.error('请完善信息');
			}
			if (this.errLog()) {
				this.$http
					.axios({
						url: this.$api.addNewCompany,
						method: 'post',
						data: {
							parentId: this.topCompanyId, //对应左侧菜单的id
							name: this.newCompanyInfo.userName, //用户名
							phone: this.newCompanyInfo.tel,
							password: this.$md5.md5(this.newCompanyInfo.pwd),
							email: this.newCompanyInfo.mail,
							infoValidate: this.newCompanyInfo.code,
							compannyName: this.newCompanyInfo.companyName,
							nature: this.newCompanyInfo.companyType, // 分支性质(0自营,1合资，2独立核算)
							receivableAccount: this.newCompanyInfo.gathering // 收款账户（0结款到总部，1结款到分部）
						}
					})
					.then(res => {
						console.log('接口调用成功');
						console.log(res);
						if (res === 1) {
							console.log('新公司添加成功');
							this.newCompanyShow = false;
							// 初始化表格
							this.initData('newCompanyInfo');
							this.loadData();
						}
					})
					.catch(err => {
						console.error('接口调用错误');
					});
			}
		},
		// 发送验证码
		sendCode({ modify, tel }) {
			let url = `${this.$api.getCode}/add/${this.newCompanyInfo.tel}`;
			if (modify) {
				url = `${this.$api.getCode}/modify/${tel}`;
			}
			console.log(url);
			if (
				(this.newCompanyInfo.tel.length === 11 && this.telColor === false) ||
				modify === true
			) {
				this.$http
					.axios({
						url: url,
						method: 'GET'
					})
					.then(res => {
						// if (modify) return;
						this.codeBtnClick = true;
						let num = 60;
						let timer = setInterval(() => {
							num--;
							this.codeBtnInfo = `重新发送(${num})`;
							if (num === 0) {
								this.codeBtnInfo = `发送验证码`;
								this.codeBtnClick = false;
								clearInterval(timer);
							}
						}, 1000);
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
				return;
			}
			this.$message.error('请检查手机号是否正确');
		},
		// 修改密码提交
		submitChangePwd() {
			if (
				this.rePwd.code.length === 0 ||
				this.rePwd.first.length === 0 ||
				this.rePwd.sec.length === 0
			) {
				return this.$message.error('请完善内容');
			}
			if (this.rePwd.first !== this.rePwd.sec) {
				return this.$message.error('两次密码不一致');
			}
			if (this.errLog()) {
				console.log('修改密码成功');
				if (this.rePwd.employeeId) {
					this.$http
						.axios({
							url: this.$api.refindPasswordEmp,
							method: 'post',
							data: {
								employeeId: this.rePwd.employeeId,
								password: this.$md5.md5(this.rePwd.first),
								phone: this.rePwd.tel,
								infoValidate: this.rePwd.code
							}
						})
						.then(res => {
							console.log(res);
							this.initData('rePwd');
							this.$message.success('修改成功');
						})
						.catch(err => {
							console.log(err);
						});
					return;
				}
				this.$http
					.axios({
						url: this.$api.refindPasswordCom,
						method: 'post',
						data: {
							companyId: this.rePwd.id,
							password: this.$md5.md5(this.rePwd.first),
							phone: this.rePwd.tel,
							infoValidate: this.rePwd.code
						}
					})
					.then(res => {
						console.log(res);
						this.initData('rePwd');
						this.$message.success('修改成功');
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		// 新增员工提交
		submitNewStaff() {
			try {
				if (
					this.newStaffInfo.userName.length === 0 ||
					this.newStaffInfo.pwd.length === 0 ||
					this.newStaffInfo.name.length === 0 ||
					this.newStaffInfo.num.length === 0 ||
					this.newStaffInfo.job.length === 0 ||
					this.newStaffInfo.tel.length === 0 ||
					this.newStaffInfo.mail.length === 0
				) {
					throw '请完善信息';
				}
				if (this.errLog()) {
					this.$http
						.axios({
							url: this.$api.addEmployee,
							method: 'post',
							data: {
								departmentId: this.newStaffId,
								userName: this.newStaffInfo.userName,
								password: this.$md5.md5(this.newStaffInfo.pwd),
								phone: this.newStaffInfo.tel,
								name: this.newStaffInfo.name,
								job: this.newStaffInfo.job,
								email: this.newStaffInfo.mail,
								jobNumber: this.newStaffInfo.num
							},
							json: 'true'
						})
						.then(res => {
							console.log(res);
							this.initData('newStaffInfo');
							this.newStaffShow = false;
						})
						.catch(err => {
							console.error(err);
						});
					console.log('新增员工成功');
					// 初始化表格
					this.initData('newCompanyInfo');
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 提交员工资料修改
		submitNewStaffEditor() {
			console.log(123123123);
			try {
				// if (
				// 	this.reviseStaff.userName.length === 0 ||
				// 	this.reviseStaff.name.length === 0 ||
				// 	this.reviseStaff.num.length === 0 ||
				// 	this.reviseStaff.job.length === 0 ||
				// 	this.reviseStaff.tel.length === 0 ||
				// 	this.reviseStaff.mail.length === 0
				// ) {
				// 	throw '请完善信息';
				// }
				if (this.errLog()) {
					this.$http
						.axios({
							url: this.$api.updateEmployee,
							method: 'post',
							data: {
								id: this.reviseStaff.id,
								phone: this.reviseStaff.tel,
								name: this.reviseStaff.name,
								job: this.reviseStaff.job,
								email: this.reviseStaff.mail,
								jobNumber: this.reviseStaff.num
							},
							json: 'true'
						})
						.then(res => {
							console.log(res);
							this.reviseStaffShow = false;
							this.showDetailStaff({
								departmentId: this.reviseStaff.departmentId
							});
							// this.initData('reviseStaff');
						})
						.catch(err => {
							console.error(err);
						});
					console.log('新增员工成功');
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 删除部门
		removeDepartment(id) {
			this.$http
				.axios({
					url: this.$api.deleteDepartment,
					data: {
						id: id
					},
					method: 'post'
				})
				.then(res => {
					console.log(res);
					this.loadData();
				})
				.catch(err => {
					console.error(err);
				});
		},
		//每页显示数据量变更
		handleSizeChange: function(val) {
			this.currentPage = 1;
			this.pagesize = val;
			this.showDetailStaff({
				departmentId: this.staff.departId
			});
		},
		//页码变更
		handleCurrentChange: function(val) {
			this.currentPage = val;
			this.showDetailStaff({
				departmentId: this.staff.departId
			});
		},
		// remove
		// 提交员工迁移
		submitStaffMove() {
			if (this.staffMoveValue.length !== 0) {
				this.$http
					.axios({
						url: this.$api.moveEmployee,
						method: 'post',
						data: {
							employeeId: this.staffMoveEmployId,
							departmentId: this.staffMoveValue
						}
					})
					.then(res => {
						console.log(res);
						this.staffMoveShow = false;
						this.showDetailStaff({
							departmentId: this.reviseStaff.departmentId
						});
					})
					.catch(err => {
						console.error(err);
					});
			}
		},
		// 删除员工
		deleteStaff(command) {
			this.$confirm('确认删除该员工?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$http
						.axios({
							url: this.$api.deleteEmployee + command[2].id,
							method: 'post'
						})
						.then(res => {
							console.log(res);
							if (res === 1) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.totalCount = this.tableData.length;
								this.tableData.splice(command[1], 1);
							}
						})
						.catch(err => {
							console.error(err);
						});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		}
	},
	directives: {
		// 控制列表展开收起
		toggle: {
			inserted: function(el, binding) {
				el.onclick = function() {
					// 判断有下级ul,且其中的li的个数不为0
					if (el.parentNode.nextSibling === null) return;
					let ul_li_length =
						el.parentNode.nextSibling.nextSibling.childNodes.length;
					if (ul_li_length > 0) {
						//有二级菜单
						let ul = el.parentNode.nextSibling.nextSibling;
						if (ul) {
							ul.classList.toggle('active');
							el.classList.toggle('active');
						}
					}
				};
			}
		},
		// 点击内容区域以外的部分，内容区域收起
		hide: {
			inserted: function(el, binding) {
				// console.log(binding)
				el['@hidebox'] = e => {
					// 这里判断如果点击的是列表的选项，阻止之后代码执行
					console.log(e);
					if (
						(e.target.innerText.length !== 0 && e.target.tagName === 'SPAN') ||
						e.target.classList.contains('el-select-dropdown__item') ||
						e.target.classList.contains('el-select-dropdown__list')
					)
						return;
					if (!el.contains(e.target)) {
						binding.value(binding.arg);
					}
				};
				document.addEventListener('click', el['@hidebox'], true);
			},
			unbind: function(el) {
				document.removeEventListener('click', el['@hidebox'], true);
			}
		},
		verity: {
			inserted: function(el, binding) {
				el['@verityFocus'] = e => {
					if (binding.arg === 'userNameColor') {
						if (el.classList.contains('verify')) {
							binding.value('userNameColor', false);
						}
					}
					if (binding.arg === 'mailColor') {
						if (el.classList.contains('verify')) {
							binding.value('mailColor');
						}
					}
					if (binding.arg === 'pwdColor') {
						if (el.classList.contains('verify')) {
							binding.value('pwdColor');
						}
					}
					if (binding.arg === 'pwdColorSec') {
						if (el.classList.contains('verify')) {
							binding.value('pwdColorSec');
						}
					}
					if (binding.arg === 'telColor') {
						if (el.classList.contains('verify')) {
							binding.value('telColor');
						}
					}
				};
				el['@verifyBlur'] = e => {
					if (binding.arg === 'userNameColor') {
						if (e.target.value === '') return;
						let result = verificationUser(6, 20, e.target.value);
						if (result === '0') {
							binding.value('userNameColor', true);
						} else {
							binding.value('userNameColor', false);
						}
					}
					if (binding.arg === 'mailColor') {
						if (e.target.value === '') return;
						let result = verificationMail(e.target.value);
						if (result === '0') {
							binding.value('mailColor', true);
						} else {
							binding.value('mailColor', false);
						}
					}
					if (binding.arg === 'pwdColor') {
						if (e.target.value === '') return;
						let result = verificationUser(6, 16, e.target.value);
						if (result === '0') {
							binding.value('pwdColor', true);
						} else {
							binding.value('pwdColor', false);
						}
					}
					if (binding.arg === 'telColor') {
						if (e.target.value === '') return;
						let result = verificationPhone(e.target.value);
						if (result === '0') {
							binding.value('telColor', true);
						} else {
							binding.value('telColor', false);
						}
					}
					if (binding.arg === 'pwdColorSec') {
						if (e.target.value === '') return;
						let result = verificationUser(6, 16, e.target.value);
						if (result === '0') {
							binding.value('pwdColorSec', true);
						} else {
							binding.value('pwdColorSec', false);
						}
					}
				};
				el.children[0].addEventListener('focus', el['@verityFocus'], true);
				el.children[0].addEventListener('blur', el['@verifyBlur'], true);
			},
			unbind: function(el) {
				el.children[0].removeEventListener('focus', el['@verityFocus'], true);
				el.children[0].removeEventListener('blur', el['@verifyBlur'], true);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.flex {
	display: flex;
	align-items: center; // justify-content: space-between;
}
.is-justify-space-around {
	justify-content: space-around;
}
.is-justify-space-between {
	justify-content: space-between;
}
.menu-wrapper {
	float: right;
	overflow: hidden;
	height: 20px;
	padding: 8px 10px 0 0;
}
.menu {
	display: inline-block;
	background: url('/static/img/menu.png') no-repeat center;
	background-size: contain;
	width: 20px;
	height: 20px; // float: right;
	color: transparent;
	cursor: pointer;
	outline: none;
}
.management {
	clear: both;
	.title-list {
		position: absolute;
		bottom: 0;
		top: 60px;
		overflow-y: auto;
		float: left;
		width: 200px;
		color: #666;
		display: inline-block;
		.menu-wrapper {
			float: right;
			overflow: hidden;
			height: 20px;
			padding: 8px 10px 0 0;
		}
		.menu {
			display: inline-block;
			background: url('/static/img/menu.png') no-repeat center;
			background-size: contain;
			width: 20px;
			height: 20px; // float: right;
			color: transparent;
			cursor: pointer;
			outline: none;
		}
		.h1 {
			font-weight: normal;
			background-color: #eee;
			line-height: 36px;
			padding-left: 10px;
			font-size: 20px;
		}
		& > ul {
			& > li {
				// list-style-type: square;
				list-style: circle; // list-style-image: url('/static/img/angle.png');
				& > p {
					&:hover {
						background-color: #eee;
					}
				}
				li {
					&:hover {
						background-color: #eee;
					}
				}
			}
		}
		.title {
			& > p {
				line-height: 32px;
				& > span {
					cursor: pointer;
					padding-left: 20px;
					width: 70%;
					display: inline-block;
				}
			}
		}
		li:hover {
		}
		.info {
			transition: all 1s;
			display: none;
			li {
				line-height: 32px;
				padding-left: 20px;
			}
			&.active {
				display: block;
			}
		}
	}
	.power {
		// padding: 20px;
		// display: block;
		// position: fixed;
		// top: 50%;
		// z-index: 9;
		// left: 50%;
		// transform: translate(-50%, -50%);
		h2 {
			text-align: center;
			font-size: 18px;
			font-weight: normal;
			margin-bottom: 12px;
		}
		.title {
			span {
				display: inline-block;
				flex: 1;
			}
		}
		p {
			margin-bottom: 10px;
		}
	}
	.newCompany,
	.newStaff {
		// padding: 15px;
		// position: fixed;
		// width: 350px;
		// top: 50%;
		// z-index: 9;
		// left: 50%;
		// transform: translate(-50%, -50%);
		h2 {
			text-align: center;
			font-size: 18px;
			font-weight: normal;
			margin-bottom: 12px;
		}
		p {
			margin-bottom: 10px;
			span {
				flex: 1;
			}
			.input {
				flex: 3;
			}
		}
	}
	.director {
		// padding: 15px;
		// position: fixed;
		// width: 200px;
		// top: 50%;
		// text-align: center;
		// z-index: 9;
		// left: 50%;
		// -webkit-transform: translate(-50%, -50%);
		// transform: translate(-50%, -50%);
		h2 {
			text-align: center;
			font-size: 18px;
			font-weight: normal;
			margin-bottom: 12px;
		}
		ul {
			max-height: 200px;
			overflow-y: auto;
			li {
				margin-bottom: 10px;
			}
		}
		p {
			margin-top: 15px;
		}
	}
	.changePwd {
		// padding: 15px;
		// position: fixed;
		// width: 350px;
		// top: 50%;
		// text-align: center;
		// z-index: 9;
		// left: 50%;
		// -webkit-transform: translate(-50%, -50%);
		// transform: translate(-50%, -50%);
		h2 {
			text-align: center;
			font-size: 18px;
			font-weight: normal;
			margin-bottom: 12px;
		}
		p {
			margin-bottom: 10px;
			span {
				flex: 1;
			}
			.input {
				flex: 3;
			}
			i {
				font-style: normal;
				flex: 2;
			}
		}
	}
	.cc {
		// padding: 15px;
		// position: fixed;
		// width: auto;
		// top: 50%;
		// text-align: center;
		// z-index: 9;
		// left: 50%;
		// -webkit-transform: translate(-50%, -50%);
		// transform: translate(-50%, -50%);
		h2 {
			text-align: center;
			font-size: 18px;
			font-weight: normal;
			margin-bottom: 12px;
			clear: both;
		}
		table {
			tr {
				line-height: 32px;
			}
			td {
				width: 100px;
			}
		}
		.auto {
			.title {
				text-align: left;
				margin-top: 20px;
				margin-bottom: 20px;
			}
			.authority {
				flex-flow: wrap;
			}
		}
	}
}
.cc {
	// padding: 15px;
	// position: fixed;
	// width: auto;
	// top: 50%;
	// text-align: center;
	// z-index: 9;
	// left: 50%;
	// -webkit-transform: translate(-50%, -50%);
	// transform: translate(-50%, -50%);
	h2 {
		text-align: center;
		font-size: 18px;
		font-weight: normal;
		margin-bottom: 12px;
		clear: both;
	}
}
.eye {
	background: url('/static/img/eye1.png') no-repeat center;
	background-size: contain;
}
.eyeClose {
	background: url('/static/img/eye2.png') no-repeat center;
	background-size: contain;
}
.eyeSec {
	background: url('/static/img/eye1.png') no-repeat center;
	background-size: contain;
}
.eyeCloseSec {
	background: url('/static/img/eye2.png') no-repeat center;
	background-size: contain;
}
.el-icon-date::before {
	display: none;
}
.verify {
	outline: 1px solid red;
}
.clearfix::after {
	content: '.';
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
}
.pagination {
	margin-top: 15px;
	display: flex;
	.self-count {
		line-height: 32px;
		width: 100px;
		.colorSky {
			// color: #43c8dc;
			color: #ff746f;
			font-size: 18px;
		}
	}
}
.el-pagination {
	flex: 1;
}
.childCompany {
	background: url('/static/img/add.png') no-repeat 7px;
	background-size: 10px 10px;
	&.active {
		background: url('/static/img/reduce.png') no-repeat 7px;
		background-size: 10px 10px;
	}
}
</style>
