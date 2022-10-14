require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const authRouter = require("./routes/auth.js")
const principalRouter = require("./routes/principal.js")
const app = express()
app.use(express.json())

//database
const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.DATABASE
        )
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()

//cors
app.use(cors())
app.get("/", (req, res) => {
    res.json("Server Startedd")
})

//url
app.use("/api/authentication", authRouter)

//user route
//principal
app.use("/api/admin/principal", principalRouter)


//port
app.listen(process.env.PORT || 8000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});