const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
// const email= process.env.ADMIN_EMAIL
// const password=process.env.ADMIN_PASSWORD
// const name=process.env.ADMIN_NAME
const DATABASE_URL = process.env.DATABASE_URL;
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const express = require("express");
const logger = require("morgan");
const adminRouter = require("./routers/adminRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/AuthRouter");
const recruiterRouter = require("./routers/recruiterRouter");
const conversation = require("./routers/conversations");
const message = require("./routers/messages");
const connectDb = require("./config/databaseconfig");

const app = express();
app.use(bodyParser.json({ limit: "300kb" }));
connectDb(DATABASE_URL);

const corsOptions = {
    origin: "https://main.d1mvp6z4onxy0.amplifyapp.com",
    credentials: true,
    optionSuccessStatus: 200,
  };

app.use(cors(corsOptions));

// app.use(cors());

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// const addadmin =  async() => {

//     let salt = await bcrypt.genSalt(10)
//     let pass = await bcrypt.hash(password, salt)
//        await adminDB.insertMany({
//         email,
//         password:pass,
//         Name:name
//       })

//     }
//     addadmin()

app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/recruiter", recruiterRouter);
app.use("/Auth", authRouter);
app.use("/conversation", conversation);
app.use("/message", message);

app.listen(port, () => {});

module.exports = app;
