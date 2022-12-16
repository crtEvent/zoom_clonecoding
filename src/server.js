import http from "http";
import WebSocket from "ws";
import express from "express";
import res from "express/lib/response";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "(Anonymous)";
    console.log("Connection to Browser!✅");
    socket.on("close", () => console.log("Disconnected from the Browser!❌"));
    socket.on("message", (message) => {
        const parsedMsg = JSON.parse(message.toString('utf8'));
        switch(parsedMsg.type) {
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${parsedMsg.payload}`));
                break;
            case "nickname":
                socket["nickname"] = parsedMsg.payload;
                break;
        }
        
    });
});

server.listen(3000, handleListen);
