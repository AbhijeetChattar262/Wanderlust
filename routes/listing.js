const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })

//INDEX ROUTE
router.get("/", wrapAsync(listingController.index));

//CREATE ROUTE
router
    .route("/new")
    .get(isLoggedIn, listingController.renderNewForm)
    .post(isLoggedIn,
        upload.single("listing[image][url]"),
        validateListing,
        wrapAsync(listingController.addNewListing)
    )

router
    .route("/:id")
    //SHOW ROUTE
    .get(wrapAsync(listingController.showListing))
    //DELETE ROUTE
    .delete(isLoggedIn, wrapAsync(listingController.deleteListing));

//EDIT ROUTE
router
    .route("/:id/edit")
    .get(isLoggedIn, wrapAsync(listingController.renderEditForm))
    .put(isLoggedIn, isOwner, upload.single("listing[image][url]"), validateListing, wrapAsync(listingController.updateListing));

module.exports = router;
