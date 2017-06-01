Deep Serverside Nodejs migration.


5/15  ALLEN ver 0.2.4

  로그인 기능 연동중.

  암호화 모듈 crypto 추가.

  기능 실행 로직
  router -> controller -> model -> FRONT-END

  model에서 controller로 돌아가지 않고 바로 render, redirct 한다. (콜백처리를 해도 동기적 실행 불가)


5/16  ALLEN  ver 0.2.5

  session 추가.
  async를 이용한 콜백해결
  로그아웃 추가
  memberUid 추가
  쿼리문들을 config/sql로 빼서 정리


5/25  ALLEN  ver 0.2.6

  암호화 복호화 에러 수정 (gibberish라는 js로 수정)
  setProfile Front 적용 (Back 필요)

5/29  ALLEN  ver 0.2.7

  setProfile 완료.
  로그인 할때 memberUid 세션 추가

5/29  ALLEN  ver 0.2.8

  nodejs - s3 연동.
    memberImg 사진업로드하면 s3에 등록
  views/temp 폴더 생성.
  config/key.js 필요.

5/30  ALLEN ver 0.3.0

  대망의 Member(Auth) Method 완료.
  UploadController, Model, query 추가.
  MemberUid, UploadEncryptFileName ->  AWS에 올라가는 String은 영문,숫자만 (commonController.checkSpecialPattern)


6/1  ALLEN  ver 0.3.1

  ReNaming 
