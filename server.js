var PORT = 9889;
var http = require('http');

function jsonSplit(url) {
  if (!url.includes('/jsonp.js')) {
    return {};
  }
  var propsArr = url.split('?');
  // 如果请求头并不包含回调函数名，请求参数则返回空对象
  if (!propsArr[1]) {
    return {};
  }
  var properties = propsArr[1].split('&');
  var resultProps = properties.map(function(item) {
    return item.split('=');
  })
  var result = {};
  for (var i = 0, len = resultProps.length; i < len; i++) {
    result[resultProps[i][0]] = resultProps[i][1];
  }
  return result;
}

// 模拟查询数据库
function querySQL(info) {
  return info + Math.floor(Math.random() * 100);
}

// 产生jsonp返回的结果
function generateResponseData(obj) {
  var result = {};
  for (var i in obj) {
    if (i !== 'callback') {
      result[i] = querySQL(obj[i]);
    }
  }
  return JSON.stringify(result);
}

var server = http.createServer(function(request, response) {
  // 获取想要访问的url
  var url = request.url;
  // 获取请求的地址
  var referer = request.headers.referer;

  // ajax 处理,当访问／xhr目录时，视为ajax请求
  if (url.includes('/xhr')) {
    console.log('xhr request received');
    var accessDomain = '*';
    response.writeHead(200, {
      'Content-Type': 'text/plain',
      // 参考http://stackoverflow.com/questions/10636611/how-does-access-control-allow-origin-header-work
      // 解决跨域权限问题，结果为'＊'会通知浏览器，该此返回的数据运行所有的网站访问
      // 同样的如果将其设置为 http://www.forclan.com则只允许forclan域名下的页面访问
      // 相当于返回的数据由浏览器视为与’accessDomain‘同域
      'Access-Control-Allow-Origin': accessDomain,
    });
    
    // put your CORS results here
    var obj = {
      name: 'forclan',
      age: 1080,
      port: PORT,
      requestReferer: referer
    };
    response.end(JSON.stringify(obj));
  }
  else if (url.includes('/jsonp.js')) {
    console.log('jsonp request received');
    
    // 将接收到到查询语句转换为json对象
    var receiveObj = jsonSplit(url);
    // 从json对象中分离
    var responseData = generateResponseData(receiveObj);
    response.writeHead(200, {
      'Content-Type': 'text/javascript',
    })
    var callbackName = receiveObj.callback || '';
    response.end(callbackName + '(' + responseData + ');' + 'console.log("jsonp received")');
  }
});
server.listen(PORT);
console.log('Server runing at port: ' + PORT + '.');