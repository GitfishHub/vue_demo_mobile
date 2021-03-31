
const honeybee = 'http://palmobility-test.bee.timanetwork.net/api/' //测试环境,接口前缀
 //const honeybee = 'https://palmobility.com/api/' //生产环境,接口前缀



//注册登录
const Register = {
	getCode: honeybee + '/pluto-admin/plutoadmin/userLogin/getCode', //获取验证码
}
const Wallet =
{
	searchChildrenAdministrativeRegion:honeybee + 'pluto-admin/plutoadminbasic/administrativeRegion/searchChildrenAdministrativeRegion',
}
