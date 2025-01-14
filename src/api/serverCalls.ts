import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const sendEmail = async (name: string, email: string, message: string) => {
    const response = await axios.post(`${API_BASE_URL}/send-email`, {
        from: email,
        subject: 'Message from portfolio website',
        message: `${message}\n\n${name} | ${email}`
    });
    return response.data;
}