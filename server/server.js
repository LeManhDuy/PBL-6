require("dotenv").config();
const express = require("express");
const slackErrors = require('./slack_error.js');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRouter = require("./routes/auth.js");
const principalRouter = require("./routes/principal.js");
const affairRouter = require("./routes/affair.js");
const subjectRouter = require("./routes/subject.js");
const subjectTeacherRouter = require("./routes/subject_teacher.js");
const teacherRouter = require("./routes/teacher.js");
const parentRouter = require("./routes/parent.js");
const gradeRouter = require("./routes/grade.js");
const feeCategoryRouter = require("./routes/fee_category.js");
const feeRouter = require("./routes/fee");
const periodRouter = require("./routes/period.js");
const classRouter = require("./routes/class.js");
const pupilRouter = require("./routes/pupil.js");
const scheduleRouter = require("./routes/schedule.js");
const notificationRoute = require("./routes/notification.js");
const scoreRoute = require("./routes/score.js");
const commentRoute = require("./routes/comment.js");
const statisticRoute = require("./routes/statistic.js");

const app = express();
app.use(express.json());

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
app.use("/api/principal", principalRouter);
//affair
app.use("/api/affair", affairRouter);
//subject
app.use("/api/subject", subjectRouter);
//subject
app.use("/api/teacher", teacherRouter);
//subject teacher
app.use("/api/subject_teacher", subjectTeacherRouter);
//grade
app.use("/api/grade", gradeRouter);
//class
app.use("/api/class", classRouter);
//parents
app.use("/api/parent", parentRouter);
//fee category
app.use("/api/feecategory", feeCategoryRouter);
//fee
app.use("/api/fee", feeRouter);
//pupil
app.use("/api/pupil", pupilRouter);
//schedule
app.use("/api/schedule", scheduleRouter);
//period
app.use("/api/period", periodRouter);
//notification
app.use("/api/notification", notificationRoute);
//score
app.use("/api/score", scoreRoute);
//comment
app.use("/api/comment", commentRoute);
//statistic
app.use("/api/statistic", statisticRoute);

const port = process.env.PORT || "8000";
app.set("port", port);

// expection to slack
app.use(slackErrors({ webhookUri: 'https://hooks.slack.com/services/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', channel: '#general' }));

//port
app.listen(process.env.PORT || 8000, function () {
    console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
    );
});
