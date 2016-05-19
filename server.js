var PORT = 9889;
var http = require('http');
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
      // 解决跨域权限问题，结果为＊会通知浏览器，该此返回的数据运行所有的网站访问
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
});
server.listen(PORT);
console.log('Server runing at port: ' + PORT + '.');