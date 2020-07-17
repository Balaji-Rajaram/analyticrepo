const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

// Create Schema
const analyticSchema = new mongoose.Schema(
    {
        url:{
            type:String,
            unique:true,
            required:true
        },
        ip:[],
        date:[],
        location:[],
    }
);

module.exports = analytics = mongoose.model("analytics", analyticSchema);