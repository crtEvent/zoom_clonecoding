# Zoom Clone coding

Zoom Clone using WebRTC ans Websockets

### 0. INTRODUCTION
#### 0.2 Server setup
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
#### 1.2 WebSockets in NodeJS
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

#### 1.3 WebSocket Events & 1.4 WebSocket Messages
<details>

ws를 사용해서 backend와 frontend사이에 connection(연결) 생성
1. server.js (backend)
    ```javascript
    wss.on("connection", (socket) => {
        console.log("Connection to Browser!✅");
        socket.on("close", () => console.log("Disconnected from the Browser!❌"));
        socket.on("message", (message) => {
            console.log(message.toString('utf8'));
        });
        socket.send("hello!");
    });
    ```
    - socket을 받기 위해 connection 연결
    - server.js에서 console.log는 터미널창에 나타난다
    - close 이벤트 추가: 서버가 오프라인이 될때(브라우저(탭)이 닫힐때)
    - message 이벤트 추가: front에서 전달된 메세지 처리
    - socket.send() : front로 메세지 보내기
2. app.js (frontend)
    ```javascript
    const socket = new WebSocket(`ws://${window.location.host}`);

    socket.addEventListener("open", () => {
       console.log("Connected to Server!✅");
    })

    socket.addEventListener("message", (message) => {
       console.log("New message: ", message.data);
    });

    socket.addEventListener("close", () => {
       console.log("Disconnected from Server!❌");
    });

    setTimeout(() => {
       socket.send("hello from the browser!");
    }, 10000); // 10s 뒤에 실행
    ```
    - frontend에서 backend로 연결
    - open 이벤트 추가: 브라우저가 열리면 실행
    - message 이벤트 추가: backend에서 보낸메지 처리
    - close 이벤트 추가: 서버엣 연결을 끊은 경우
    - socket.send(): backend로 메세지 보내기
- ` (backtick, grave accent, backquoto, 억음부호)
    - 키보드 숫자 1의 왼쪽에 있는 거(tap키 위에 있는거)
    - C++이나 Java 같은 프로그램 언어에서는 ', " 과 동일하게 사용하지만, javascript에서는 다른게 쓰인다
    - 템플릿 리터럴(Template literals): 문자열 안에서 ${}(place holder, 플레이스 홀더)를 쓰기 위해 사용함
    - 이를 템플릿 리터럴(Template literals)이라고 한다: 정의)내장된 표현식을 허용하는 문자열 리터럴
    ```javascript
    console.log("정답: " + answer);
    console.log(`정답: ${answer}`); // Template literals
    ```
</details>

#### 1.6 Chat Completed
<details>

user가 보낸 message를 다시 모든 user에게 돌려주는 기능 추가
1. src/views/home.pug 에 form, input, button, ul 추가
2. src/public/js/app.js
    - submit시 input의 내용을 서버에 전달
3. src/server.js
    - frontend에서 전달받은 message를 모든 user에게 전달
</details>

#### 1.7 Nicknames-1 & 1.8 Nicknames-2
<details>

메세지를 ul list에 추가하기
메세지에 닉네임 추가하기
1. src/views/home.pug
    - 닉네임 form 추가
2. src/public/js/app.js
    - 닉네임 input값(Javascript Object)을 String 타입(JSON 문자열)으로 변환하는 메서드 추가
    - 닉네임을 backend로 전달하는 함수 추가(String 타입으로 전달)
    - backend에서 받은 메세지를 home.pug의 ul list에 추가
3. src/server.js
    - frontend에서 받은 messege(JSON 문자열)를 다시 Javascript Object로 변환(const parsedMsg)
    - 변환된 messege를 분류(switch(parsedMsg.type){})
    - parsedMsg.type === "nickname" -> socket에 저장
    - parsedMsg.type === "new_message" -> 닉네임과 함께 forntend에 전달
<br>

##### 왜 Javascript Object를 String으로 바꿔줘야하는가?
- 연결하고 싶은 back-end 서버가 javascript 서버가 아닐 수도 있기 때문
- websocket은 브라우저에 있는 API -> 백엔드에서는 다양한 프로그래밍 언어를 사용할 수 있기 때문에 이 API는 어떠한 판단도 하지 않음

##### socket 안에 정보를 저장 할 수 있다
```javascript
socket[] = "data";
```
</details>

### 2. SOCKETIO
#### 2.0 SocketIO vs WebSockets
<details>

socket IO: 실시간, 짧은 대기시간, 양방향, event 기반의 통신을 가능하게 하는 라이브러리(or 프레임워크)
- 자동 재연결 지원, 연결 끊김 확인, 바이너리 지원
    - socket IO는 연결이 어떤 이유에서든지 끊어지면, 재연결을 시도
    - 만약, websocket으로 연결이 안되면, socket IO는 다른 것을 이용해서 연결
    - websocket은 Socket IO가 실시간, 양방향, event 기반 통신을 제공하는 방법 중 하나
- 실시간 기능 같은 것들을 더 쉽게 만드는 편리한 코드를 제공
</details>

#### 2.1 Installing SocketIO
<details>

1. socketIO 설치
    - npm i socket.io
2. src/server.js
    - socket.io import 
    ```javascript
    import { Server } from "socket.io";
    ```
    -http server에 socket.io 연결
    ```javascript
    const httpServer = http.createServer(app);
    const wsServer = new Server(httpServer);
    ```
    - socket.ot에 connection시 log 출력
    ```javascript
    wsServer.on("connection", (socket) => {
        console.log(socket);
    })
    ```
3. src/public/js/app.js
    - frontend에도 socket.io 적용
    ```javascript
    const socket = io();
    ```
4. src/views/home.pug
    - socket.io script 추가
    ```javascript
    script(src="/socket.io/socket.io.js")
    ```
</details>

#### 2.2 SocketIO is Amazing
<details>

1. src/views/home.pug
    - room name을 입력받을 form, input 생성
2. src/public/js/app.js
    - socket.emit()으로 frontend에서 backend로 이벤트 전달
    - 첫번째 argument에는 event 이름
        - emit과 on은 같은 이름, 같은 string 이어야 한다
    - argument는 어떤 object도 다 보낼 수 있다
    - argument는 여러개 보낼 수 있다(가변인자)
    - callback 함수(서버에서 호출하는 function)는 맨 마지막 argument에 넣어 줘야 한다
    ```javascript
    function backendDone(msg) {
        console.log(`The backend says: `, msg);
    }

    function handleRoomSubmit(event) {
        event.preventDefault();
        const input = form.querySelector("input");
        socket.emit("enter_room", input.value, backendDone);
        input.value = ""; 
    }
    ```
3. src/server.js
    - socket.on()으로 frontend에서 전달된 이벤트를 받아옴
    - 첫번째 argument에는 event 이름
        - emit과 on은 같은 이름, 같은 string 이어야 한다
    ```javascript
    socket.on("enter_room", (msg, done) => {
        setTimeout(() => {
            done("hello fron the backend");
        }, 10000);
    });
    ```

</details>