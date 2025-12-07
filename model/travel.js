import mongoose from "mongoose";

const schema = mongoose.Schema({
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    dayCount: {
        type: Number,
        required: true
    },
    todose: {
        type: [string],
        require: true
    },
    image: {
        type: [String],
        required: true
    },
    imageFlag: {
        type: String,
        required: true
    },
    titlePersian: {
        type: String,
        required: true
    },
    titleEnglish: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    travelRole: {
        type: String,
        required: true
    },
    cityRole: {
        type: String,
        required: true
    },
    isOff: {
        type: Boolean,
        required: true
    },
    offDiscount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    children: {
        type: Number,
        required: true
    },
    publish: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
schema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'travel'
});
const BlogModel = mongoose.models?.Travel || mongoose.model("Travel", schema)