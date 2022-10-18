
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const authRouter = require("./routes/auth.js")
const principalRouter = require("./routes/principal.js")
const affairRouter = require("./routes/affair.js")
const subjectRouter = require("./routes/subject.js")
const teacherRouter = require("./routes/teacher.js")
const parentRouter = require("./routes/parent.js");
const gradeRouter = require("./routes/grade.js");
const app = express()
app.use(express.json())


//database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
connectDB();

//cors
app.use(cors());
app.get("/", (req, res) => {
    res.json("Server Startedd");
});

//url
app.use("/api/authentication", authRouter);

//user route
//principal
app.use("/api/admin/principal", principalRouter);
//affair
app.use("/api/admin/affair", affairRouter);
//subject

app.use("/api/subject", subjectRouter)
//subject
app.use("/api/teacher", teacherRouter)

app.use("/api/subject", subjectRouter);
//grade
app.use("/api/admin/grade", gradeRouter);
//parents
app.use("/api/admin/parent", parentRouter);

//port
app.listen(process.env.PORT || 8000, function () {
    console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
    );
});
