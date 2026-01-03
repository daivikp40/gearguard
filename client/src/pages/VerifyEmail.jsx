import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState("Verifying...");

    useEffect(() => {
        const verify = async () => {
            try {
                await axios.post(`${API_URL}/auth/verify-email`, { token });
                setStatus("Email Verified Successfully! You can now login.");
            } catch (err) {
                setStatus("Verification failed. Link might be invalid or expired.");
            }
        };
        verify();
    }, [token]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="p-8 bg-white shadow rounded text-center">
                <h2 className="text-2xl font-bold mb-4">{status}</h2>
                <Link to="/login" className="text-blue-600 hover:underline">Go to Login</Link>
            </div>
        </div>
    );
};
export default VerifyEmail;