var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
/* 본문을 위한 template 생성 */
function templateHTML(title, list, body) {
  return `<!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>`;
}
/* 파일의 목록을 보여주는 func */
function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i += 1;
  }
  list += '</ul>';
  return list;
}

var app = http.createServer(function (request, response) {//요청할 때, 응답할 때의 웹브라우저와의 정본
  var _url = request.url;
  var queryData = require('url').parse(_url, true).query;
  var pathname = require('url').parse(_url, true).pathname;

  if (pathname === '/') {//path name은 다 /
    if (queryData.id === undefined) {
      fs.readdir('./data', function (error, filelist) {
        var title = 'welcome';
        var description = 'Hello, Node.js';
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        response.writeHead(200);//성공적으로 전송한 경우는 200
        response.end(template);
      })
    }
    else {
      fs.readdir('./data', function (error, filelist) {
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        })
      })
    }
    //파일을 읽어서 내용을 적용
    //정보를 dynamic 하게 변경
  } else if (pathname === '/create') {
    fs.readdir('./data', function (error, filelist) {
      var title = 'WEB - create';
      var list = templateList(filelist);
      var template = templateHTML(title, list, `
      <form action="http://localhost:3000/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
          <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
          <input type="submit">
      </p>
      </form>
      `);
      response.writeHead(200);//성공적으로 전송한 경우는 200
      response.end(template);
    })
  } else if (pathname === '/create_process') {//post로 보냈을 때의 페이지
    var body = '';
    request.on('data', function (data) {
      body += data;//data를 매번 추가해준다.
    });//post방식으로 전송할 때 데이터가 많으면 컴퓨터에 무리가 갈 수 있음, nodejs에서는 데이터가 많은 경우에 이와 같은 방법을 사용한다
    //데이터를 수신할 때 마다 callback함수를 호출하기로 약속. data라는 매개변수로 그 정보를 받아옴
    request.on('end', function () {
      var post = qs.parse(body);//데이터를 객체화하여 가져온다. 지금까지의 body가 저장되어있을 것이다.
      var title = post.title;
      var description = post.description;

      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        //파일 저장이 끝났다 !
        response.writeHead(302, {Location:`/?id=${title}`});//리다이렉션
        response.end('success');
      })
      //console.log(post);
    });//더이상 들어올 정보가 없으면 이 callback함수를 호출한다. 정보 수신 끝 !
  } else {
    response.writeHead(404);
    response.end('not FOund');
  }

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