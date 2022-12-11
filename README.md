# Zoom Clone coding

Zoom Clone using WebRTC ans Websockets

# 0. INTRODUCTION
## 0.2 server setup
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