const express = require('express');
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/WebDatabase";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js")

// Serve EJS templates from the views folder and static assets from public/.
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public"), { maxAge: "1d" }));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);



// Connect once at startup so all route handlers can access MongoDB models.
main()
.then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}



const sessionOptions = {
    secret: "mysupersecretcode",
    resave:  false,
    saveUninitialized: true,
    cookie : {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge:  1000 * 60 * 60 * 24 * 3,
        httpOnly: true
    }
};

app.get("/",(req,res)=>{
    res.send("Hi");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// Route groups keep the listing and review APIs organized.
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);




app.all("/*splat", (req, res, next)=>{
 next(new ExpressError(404, "Page not Found!"));
})

app.use((err, req, res, next)=>{
    let {statusCode=500, message="Something went wrong!"} = err;
    // res.status(statusCode).send(message);  
    res.status(statusCode).render("listing/error.ejs", {message});
});
app.listen(port, ()=>{
     console.log("Listening");
});