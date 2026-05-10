import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if(!name||!email||!message){
            return res.json({message:"please fill all the form"})
        }
        const newMessage = await Contact.create({
            name, email, message

        });
        res.json({ message: "message Send Successfully", newMessage })
    } catch (err) {
        res.status(500).json({
            
            error: err.message,
            err
        });
    }


}

//get all Message

export const getAllContact = async (req, res) => {
    const message=await Contact.find().sort({createdAt:-1})
    res.json(message)
}


export const deleteContact = async (req,res) => {
            await Contact.findByIdAndDelete(req.params.id);
                    res.json({ message: "Product Deleted Successfully" })

    
}