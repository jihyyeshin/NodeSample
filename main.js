var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname+url);
    response.end(fs.readFileSync(__dirname + url));
 
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