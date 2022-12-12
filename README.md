# Zoom Clone coding

Zoom Clone using WebRTC ans Websockets

### 0. INTRODUCTION
#### 0.2 server setup
<details>

1. 프로젝트 초기화
    - npm init -y
        - npm(Node Packaged Manager): Node.js로 만들어진 모듈을 웹에서 받아서 설치하고 관리해주는 프로그램
        - npm init : 프로젝트 초기화(내용이 비어있는 package.json 생성)
        - -y : defualt값으로 package.json 생성
2. package.json 수정
    - script, main 삭제
    - description 추가
    - license MIT로 변경
3. Nodemon 설치
    - npm i nodemon -D
4. Babel 설치
    - npm i @babel/core @babel/cli @babel/node -D
5. Preset 설치
    - npm i @babel/preset-env -D
6. Express 설치
    - npm i express
7. Pug 설치
    - npm i pug
8. nodemon.json 추가 & nodemon 설정
    - exec key 추가(src/server.js에 대해 babel-node 명령문 실행)
9. babel.config.json 추가
    - 사용할 preset 입력
10. package.json script 추가
    - dev key 추가: nodemon 호출 -> nodemon.js의 코드 실행
11. src/server.js 추가
    - express import
    - app 생성 후 app.listen(3000) : 3000port로 실행
12. 실행
    - npm run dev

</details>

#### 0.3 Frontend Setup
<details>

1. server.js에 Pug 설정
2. server.js에 route 설정
    - ecpress()로 home.pug를 렌더링 함
3. server.js에 static file 등록
    - /public 경로에 있는 파일들(현재 app.js)이 static으로 등록
4. home.pug 수정
    - script 적용 app.js
    - html 뼈대 코드 작성
    - MVP CSS 적용
5. app.js 수정
    - 이곳에 js코드 작성함
    - 테스트 용으로 alert 작성
6. nodemon 설정 변경
    - /public 경로의 파일들을 ignore로 지정
    - ignore: 해당 경로의 파일이 변경되어도 서버가 재시작 되지 않음
    - front-end가 변경될 때는 server까지 재시작할 필요 없음

</details>

### 1. CHAT WITH WEBSOCKETS
#### 1.3 WebSocket Events
<details>

1. catchall url 만들기(server.js 수정)
    - 다른 경로("/*") 이동시 다시 home("/")으로 redirect 되도록 설정
2. ws(WebSocket) 설치
    - npm i ws
3. WebSocket 서버 적용
    - ws와 express를 합칠 예정
    - 원래 express는 http를 사용함
    - server.js ->import http
    - server.js -> import ws
    - code 삽입
    ```javascript
    const server = http.createServer(app);
    const wss = new WebSocket.server({server});
    ```
    - http와 ws를 다 사용할 수 있다(2개의 protocol 다 같은 port를 공유)
    - http서버가 필요한 이유는 views, static files, home, redirection을 사용하기 위함

</details>