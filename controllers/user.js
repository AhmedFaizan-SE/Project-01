const User = require("../models/user");

module.exports.renderSignup = (req, res)=> {
    res.render("user/signup.ejs");
};

module.exports.userSignup = async(req, res, next)=>{
   try{
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to AirBnb");
        res.redirect("/listings");
    });
   } catch(e){
    req.flash("error", e.message);
    res.redirect("/signup");
    }
};

module.exports.renderLogin =   (req, res)=>{
    res.render("user/login.ejs")
};

module.exports.userLogin = async(req, res)=>{
        req.flash("success", "Welcome to Airbnb!");
        const redirectUrl = res.locals.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        res.redirect(redirectUrl);
};

module.exports.userLogout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success", "You're logged out!");
        res.redirect("/listings");
    })
};