import axios from "axios";

const nudgeEmail = async (lastClickTime, setShowPopUp) => {
  const currentTime = new Date();

  const options = {
    from: process.env.REACT_APP_EMAIL_USERNAME,
    to: "USEREMAIL@gmail.com",
    subject: "You are being NUDGED",
    text: "STOP your BS, and GET READY to work out",
  };

  if (!lastClickTime || currentTime - lastClickTime >= 3600000) {
    try {
      await axios.post("http://localhost:4000/api/email", options);
      console.log("Email sent successfully");
      return currentTime; // Return current time for setting last click time
    } catch (error) {
      console.error("Error sending email:", error);
    }
  } else {
    setShowPopUp(true);
    setTimeout(() => setShowPopUp(false), 3000);
    console.log("You can only nudge once per hour");
  }
};

export default nudgeEmail;