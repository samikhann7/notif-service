import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';  // Import the EmailJS SDK

function App() {
  const [notifications, setNotifications] = useState([]);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new WebSocket('ws://192.168.0.114:8000/ws');  // Use your FastAPI server IP

    socket.onopen = () => {
      console.log("WebSocket connected!");
    };

    // Handle incoming WebSocket messages
    socket.onmessage = (event) => {
      const newNotification = event.data;
      setNotifications((prev) => [...prev, newNotification]);

      // Send email using EmailJS when new notification is received
      sendEmail(newNotification);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    // Cleanup WebSocket connection
    return () => socket.close();
  }, []);

  // Function to send email using EmailJS
  const sendEmail = (notificationMessage) => {
    const emailData = {
      subject: "New Notification",
      message: notificationMessage,
      to_email: "ksami1831@gmail.com"  // Change this to the recipient's email
    };

    // Send email via EmailJS
    emailjs.send(
      'service_iadvcmi',  // Replace with your EmailJS service ID
      'template_mgomuik',  // Replace with your EmailJS template ID
      emailData,           // Data to send
      '6MDq6JdHpwf13cL0c'       // Replace with your EmailJS User ID
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
  };

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// npm start