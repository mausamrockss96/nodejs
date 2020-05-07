//model ma database ko schema design huncha


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    message: String,
    point: Number
    
    }, {
    timestamps: true

    })



    var productSchema = new Schema({
    name: String,
    brand: String,
    category: 
    {
        type:String,
        required: true
    },
    price: Number,
    color: String,
    batchNo: String,
    weight: Number,
    description: String,
    image: String,
    tags: [String],
    discount:{
        discountedItem: Boolean,
        discountType: String,
        discountValue: String
    },
    manuData: Date,
    expiryData: Date,
    
    //product ma kasley add garyo bhanera dekhnu paryo

    user: {
        type: Schema.Types.ObjectId  ,         //mongodb le specify gareko id matra aucha
        ref: 'user'         //reference chai kun collection bata diney, bholiparsi yo product kasley add garyo bhanera, userko
                            //entire ino lyauna sakchau like offers ma kun product ho thapauna
                



    },
    reviews: [reviewSchema],    //multiple huna sakcha reviewschema
    quantity: Number,
    status: {
        type: String,
        enum: ['available', 'sold', 'out-of-stock', 'booked'],
        default: 'available'
    }

}, {
    timestamps: true
})
var product = mongoose.model('product', productSchema);  //'product' is collectionName, yesley validate garne bhaneko producSchema

module.exports = product;