// g_tk=1903152385&uin=80583600&format=json&inCharset=utf-8&outCharset=utf-8
// notice=0&platform=h5&needNewCode=1&_=1501499154367
// 抓取真实网站https://y.qq.com/m/index.html 上的数据headers=>Query String Parameters 制取了一半 另一半再recomment.js中
export const commonParams = {
    g_tk: 5381,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0
  }
  
  export const opts = {
    param: 'jsonpCallback'
  }
  
  