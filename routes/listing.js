const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");

// Index Route
router.get("/", wrapAsync(async (req,res)=>{
     const allListings = await Listing.find({});
     res.render("listing/index.ejs", {allListings});
}));
// New Route
router.get("/new",isLoggedIn, (req,res)=>{
    res.render("listing/new.ejs");
})
// Show Route
router.get("/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({path: "reviews",
        populate: {
            path: "author"
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }
        res.render("listing/show.ejs", {listing});
}));

// Create Route
router.post("/", validateListing, isLoggedIn, wrapAsync( async(req,res,next)=>{

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));
// Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync
    (async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/edit.ejs", {listing});
}));
// Update Route
router.put("/:id",  isLoggedIn, isOwner, validateListing, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You're not owner of this listing!")
        return res.redirect(`/listings/${id}`);

    }
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
        req.flash("success", "Listing updated.");

    res.redirect(`/listings/${id}`);
}));
// Delete Route
router.delete("/:id",  isLoggedIn, isOwner, wrapAsync(async(req, res)=>{
    let {id} = req.params;
   let deleteListing = await Listing.findByIdAndDelete(id);
       req.flash("success", "Listing Deleted.");

   res.redirect("/listings");
}));

module.exports = router;