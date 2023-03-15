# 8BB-TOKEN server
## 설치
* $ npm install
* env.example 파일을 .env파일로 바꾸고 환경변수 설정, 아래 환경변수 설정 설명 참조
* 데이터베이스 설정
  데이터베이스 생성 
  $ npx sequelize db:migrate 로 테이블 생성, 테이블이 잘 생성됐는지 확인!
* 각자 발급받은 cert.pem, key.pem 파일 server 폴더에 넣기
* $ npm run start 로 서버시작! $ npm run dev는 nodemon으로 서버시작
* https://localhost:PORT 로 접속!

## 환경변수 설정
DATABASE_PASSWORD=  //데이터베이스 패스워드
DATABASE_USERNAME=  //데이터베이스 아이디
DATABASE_NAME=      //생성한 데이터 베이스 이름
PORT=               //서버 포트 설정

//서버계정은 ganache 계정목록중 첫번째것으로 설정, ganache 서버를 재시작시 address와 pk 가 변경될수 있으니 변경되면 아래값도 같이 수정
SERVER_ADDRESS=     //서버계정 address, ganache 계정목록의 첫번째것으로 입력
SERVER_PRIVATE_KEY= //서버계정 pk, ganache 계정목록의 첫번째것으로 입력