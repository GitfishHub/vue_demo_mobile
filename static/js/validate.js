/*校验*/
var validate={
  /*手机号校验*/
  mobileValidate:function(value){
    var reg =/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/g;
    if(!reg.test(value)){
      return false;
    }else {
      return true;
    }
  },
  /*姓名校验*/
  nameValidate:function(value){
    var reg=/^[\u4e00-\u9fa5A-Za-z\d]+$/;//只能输入汉字,字母和数字
    if(!reg.test(value)){
      return false;
    }else {
      return true;
    }
  },
  /*身份证号校验*/
  IDValidate:function(value){
    var reg=/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    if(!reg.test(value)){
      return false;
    }else {
      return true;
    }
  },
  //车牌号校验
  carNumberValidate: function (value) {
  	var reg = /^(([A-Za-z](([0-9]{5}[DFa-z])|([DFa-z]([A-HJ-NP-Za-z0-9])[0-9]{4})))|([A-Za-z][A-HJ-NP-Za-z0-9]{4}[A-HJ-NP-Za-z0-9挂学警港澳使领]))$/;
  						
//						/^[A-Za-z]{1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警港澳]{1}$/;
  	if (!reg.test(value)) {
  		return false
  	} else {
  		return true
  	}
  }
}
