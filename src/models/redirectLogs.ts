
import mongoose from "mongoose";

const analyticSchema = new mongoose.Schema({
    url_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'url'
    },
    os_name:{
        type:String,
        // required:true
    },
    device_name:{
        type:String,
        // required:true
    },
    ip_address:{
        type:String,
        // required:true
    },
    user_agent:{
        type:String
    },
    // geoLocation:{
    //     type:[]
    // },
    topic:{
        type:String
    }
},{
    timestamps:true
})

export const analyticsModel = mongoose.model('analytic',analyticSchema)