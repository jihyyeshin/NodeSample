var http = require('http');
var fs = require('fs');
var url=require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData=require('url').parse(_url, true).query;
    var title=queryData.id;
    if(_url == '/'){
      title='Welcome';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    //정보를 dynamic 하게 변경
    var template=`
    <!doctype html>
<html>
<head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1>
  <ol>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
  </ol>
  <h2>${title}</h2>
  <p>
    Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language. Although most often used to set the visual style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications.
  </p>
</body>
</html>

    `
    response.end(template);
 
});
app.listen(3000);//3000번 포트 접속
/*
웹 브라우저에게 서로 다른 페이지를 만들어서 보낼 수 있다.
url을 이용하자 !

http: 프로토콜(통신 규칙)
domain name(host): 인터넷에 접속되어있는 host(컴퓨터 주소)
port: 한 대의 컴퓨터 안에 여러 개의 서버가 있는데, 이 서버를 구분
port번호를 생략하면 80
query string*: query string의 값을 변경하면 웹 서버에게 데이터를 전송할 수 있다.
*/