import { useState, useEffect } from "react";
import api from "../api/axios";


export default function contact() {
    const [userMessage, setUserMessage] = useState([])
    const [msg, setMsg] = useState(false)

    const loadMessage = async () => {
        const res = await api.get("/contact")
        setUserMessage(res.data)
    };

    useEffect(() => {
        loadMessage()
    }, [])

    const deletedMessage = async (id) => {
        await api.delete(`/contact/${id}`)
        

        setMsg(true);
        setTimeout(() => {
            setMsg(false)
        }, 1000)

        loadMessage()
    }


    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                📩 User Messages
            </h1>

            <div className="max-w-4xl mx-auto space-y-4">

                {userMessage.map((userMsg) => (
                    <div
                        key={userMsg._id}
                        className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition duration-300"
                    >

                        <div className="flex justify-between items-start">

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {userMsg.name}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {userMsg.email}
                                </p>
                            </div>

                            <button
                                onClick={() => deletedMessage(userMsg._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                            >
                                Delete
                            </button>

                        </div>

                        <p className="mt-4 text-gray-700 leading-relaxed border-t pt-3">
                            {userMsg.message}
                        </p>

                    </div>
                ))}

                {msg && <div className="fixed top-19 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce">
                    ❎ Message Deleted</div>}

            </div>


        </div>
    )
}