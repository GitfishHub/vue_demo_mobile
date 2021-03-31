import jsonp from './jsonp' //导入封装好的jsop
import axios from 'axios'
import { commonParams, opts } from './config' //导入配置好的参数
 
/**
 * jsonp 抓取推荐页轮播图数据
 * 接口：https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
 * commonParams是在config.js里
 * 1 platform uin needNewCode
 * 2 上述字段来自 抓取真实网站https://y.qq.com/m/index.html 上的数据headers=>Query String Parameters
 * commonParams是在config.js里
 */
export function getRecommend() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = Object.assign({}, commonParams, {
    platform: 'h5', // 请求来源H5平台
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, opts)
}







