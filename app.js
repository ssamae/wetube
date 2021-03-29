import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { localMiddleware } from "./middlewares";

import routes from "./routes";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";

const app = express();




// app.use(helmet())  // 동영상 재생 안되는 문제 때문에 수정
app.use(helmet({contentSecurityPolicy: false})); 


app.set('view engine', "pug");
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

// middleware를 호출

export default app;
//



// 미들웨어 case
// app.use((req,res,next) => {

// })

// app.use(function(req,res,next){

// })

// const localMiddleware = (req,res,next) =>{

// }

// GET/POST
// url을 적을 때 브라우저는 get메소드를 실행 함
// 웹사이트 로그인 할때 post 메소드가 실행 됌
// 즉 요청 시 GET, 정보 전달 시 POST
// 이거시 http의 작동 방식