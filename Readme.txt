Deep Serverside Nodejs migration.


5/15  ALLEN

로그인 기능 연동중. 

암호화 모듈 crypto 추가.

기능 실행 로직
router -> controller -> model -> FRONT-END

model에서 controller로 돌아가지 않고 바로 render, redirct 한다. (콜백처리를 해도 동기적 실행 불가)
