/*
node.js 는 비동기 처리를 위한 좋은 기능들을 가지고 있음.

동기 : 일련의 과정으로 일을 처리, 기다렸다가 다음 일을 처리한다.
       (효율적이지만, 복잡하다.)
비동기 : 동시에 여러 가지 일을 처리

* 코드레벨에서의 동기, 비동기
method name 뒤에 sync가 붙어져있음
sync가 붙어져있지 않는 것은 callback함수가 있다.



*/

var fs=require('fs');

//readFileSync: 동기적으로 처리
//return 값을 준다.
// console.log('A');
// var result=fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(result);
// console.log('C');

//readFile: 비동기적으로 처리, 비동기적으로 처리하는 것을 선호함
//callback함수를 3번째 인자로 준다. 읽기 작업이 끝나면 callback함수 
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){//callback함수가 사용됨!!
    console.log(result);//파일을 읽은 후에 처리해줘라~
});//두 번째의 작업을 하기 전에 console.log('C')가 우선 실행됨
console.log('C');

//nodejs의 성능을 끌어올리기 위해서는 비동기적인 방법을 쓰는 것이 좋다 !

