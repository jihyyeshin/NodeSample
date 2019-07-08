function a(){
    console.log('A');
}
var a=function(){//익명 함수, 변수의 값으로 주었다.
    console.log('B');
}
/* 자바스크립트에서는 함수가 값이다 */

function slowfunc(callback){
 callback();
}

slowfunc(a);//showfunc를 실행한 후에 callback함수인 a가 실행된다 !!
