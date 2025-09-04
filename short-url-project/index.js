const express = require("express");
var cookieParser = require('cookie-parser')
const path = require('path')
const urlRoute = require("./routes/url.route");
const staticRoute = require('./routes/static.route')
const userRoute = require('./routes/user.route')
const { checkForAuthentication, restrictTo } = require("./middleware/auth");
const { connectToDB } = require("./db/connection");
const URL = require("./models/Url");
const PORT = 8000;

const app = express();
connectToDB("mongodb://127.0.0.1:27017/url-shortner").then(() =>
  console.log("MongoDB Connected")
);

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use("/url", restrictTo(['NORMAL', 'ADMIN']), urlRoute);
app.use('/', staticRoute)
app.use('/user', userRoute)

// Redirecting to original url by shortID
app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    { shortID },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl)
});

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
