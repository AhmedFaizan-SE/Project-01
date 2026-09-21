const Listing = require("../models/listing");

module.exports.index = async (req,res)=>{
     const allListings = await Listing.find({});
     res.render("listing/index.ejs", {allListings});
};

module.exports.newListing = (req,res)=>{
    res.render("listing/new.ejs");
};

module.exports.showListing = async (req, res)=>{
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
};

module.exports.createListing = async(req,res,next)=>{

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.editListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/edit.ejs", {listing});
};

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You're not owner of this listing!")
        return res.redirect(`/listings/${id}`);

    }
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
        req.flash("success", "Listing updated.");

    res.redirect(`/listings/${id}`);
};

module.exports.delListing = async(req, res)=>{
    let {id} = req.params;
   let deleteListing = await Listing.findByIdAndDelete(id);
       req.flash("success", "Listing Deleted.");

   res.redirect("/listings");
};