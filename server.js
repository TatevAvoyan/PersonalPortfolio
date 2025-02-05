const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // You can change this PORT if needed

// Middleware
app.use(cors()); // Allows requests from your frontend
app.use(bodyParser.json()); // Parses JSON data sent by the client

// Endpoint to handle POST request from the contact form
app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send({ success: false, error: 'All fields are required!' });
    }

    try {
        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use Gmail; change as needed (e.g., Outlook, Yahoo)
            auth: {
                user: 'your_email@gmail.com', // Replace with your Gmail address
                pass: 'your_password', // Replace with your Gmail password or app-specific password
            },
        });

        // Email options
        const mailOptions = {
            from: `"${name}" <${email}>`, // The sender info (name and email)
            to: 'tatevik.avoian@gmail.com', // Your email address
            subject: 'New Contact Form Submission',
            text: `You received a new message from your contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Success response
        res.status(200).send({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).send({ success: false, error: 'Failed to send message. Please try again.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});