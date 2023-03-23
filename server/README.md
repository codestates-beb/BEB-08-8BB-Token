# 8BB-TOKEN server
## 설치
* $ npm install
* /server/common 폴더안에 dataStore.sol, erc20.sol, erc721.sol 3개를 ganache에 서버계정으로 배포
* env.example 파일을 .env파일로 바꾸고 환경변수 설정, 아래 환경변수 설정 설명 참조
* 데이터베이스 설정
  * 데이터베이스 생성 
  * $ npx sequelize db:migrate 로 테이블 생성, 테이블이 잘 생성됐는지 확인!
* 각자 발급받은 cert.pem, key.pem 파일 /server 폴더에 넣기
* $ npm run start 로 서버시작! $ npm run dev는 nodemon으로 서버시작
* https://localhost:PORT 로 접속!

## 환경변수 설정
* DATABASE_PASSWORD=  //데이터베이스 패스워드
* DATABASE_USERNAME=  //데이터베이스 아이디
* DATABASE_NAME=      //생성한 데이터 베이스 이름
* PORT=               //서버 포트 설정
* SERVER_ADDRESS=     //서버계정 address, ganache 계정목록의 첫번째것으로 입력
* SERVER_PRIVATE_KEY= //서버계정 pk, ganache 계정목록의 첫번째것으로 입력
* PROVIDER_ADDRESS=   //web3에 연결할 provider주소, ganache에 연결되는 주소 (ex-> http://127.0.0.1:7545)
* ERC20_CONTRACT_ADDRESS=         //erc20.sol의 ICToken 컨트랙트 주소
* ERC721_CONTRACT_ADDRESS=        //erc721.sol의 NFTLootBox 컨트랙트 주소
* DATASTORE_CONTRACT_ADDRESS=     //dataStore.sol의 DataStore 컨트랙트 주소

## 주의 사항
* 서버계정은 ganache 계정목록중 첫번째것으로 설정, ganache 서버를 재시작시 address와 privatekey 가 변경될수 있으니 변경되면 환경변수값도 같이 수정
* ganache 서버 재시작시 생성한 유저 지갑계정을 찾지 못해 NFT mint나 토큰전송이 안될 수 있음. 다시 회원가입 진행해 새로운 지갑계정을 생성해야 함
* 계정의 이더가 0일 경우 NFT mint나 유저간 토큰전송이 안됨