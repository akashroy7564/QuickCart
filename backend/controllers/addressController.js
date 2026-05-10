import Address from "../models/Address.js";

// SAve Address
export const saveAddress=async (req,res) => {
    try {
        const address= await Address.create(req.body)
        res.json({message:"Address saved successfully", address})
    } catch (err) {
        res.status(500).json({message:"Error in Saving message",err})
    }
}

export const getAddresses= async(req,res)=>{
    try {
        const addresses=await Address.find({userId:req.params.userId})
        res.json(addresses)
    } catch (err) {
        res.status(500).json({message:"Error in getting message",err})

    }
}