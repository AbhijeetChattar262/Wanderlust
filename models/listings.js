const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listing_image",
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q%3D80%26w%3D1000%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%253D%253D&tbnid=1xry7Uo3W1o1mM&vet=1&imgrefurl=https://unsplash.com/images/nature/sunset&docid=DjScsTJm8j1T3M&w=1000&h=667&source=sh/x/im/m1/1&kgs=3d4ac663acabb285&shem=abme,trie",
            set: (v) => {
                return v === ""
                    ? "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q%3D80%26w%3D1000%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%253D%253D&tbnid=1xry7Uo3W1o1mM&vet=1&imgrefurl=https://unsplash.com/images/nature/sunset&docid=DjScsTJm8j1T3M&w=1000&h=667&source=sh/x/im/m1/1&kgs=3d4ac663acabb285&shem=abme,trie"
                    : v;
            }
        },
    },
    price: Number,
    location: String,
    country: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.review } })
    }
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;