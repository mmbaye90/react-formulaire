import React, { useState } from "react";
import "./App.css";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_feVY2TIc0JlRyKZ7ySnLq");

const App = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmail = () => {
      let mail = document.getElementById("not-mail");
      let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (email.match(regex)) {
        mail.style.display = "none";
        return true;
      } else {
        mail.style.display = "block";
        mail.style.animation = "dongle 1s";
        setTimeout(() => {
          mail.style.animation = "none";
        }, 1000);
        return false;
      }
    };

    const failledMessage = () => {
      let msgError = document.querySelector(".form-message");
      msgError.style.opacity = 1;
      msgError.style.background = "crimson";
      msgError.style.color = "#ffff";
      document.getElementById("name").classList.add("error");
      document.getElementById("email").classList.add("error");
      document.getElementById("message").classList.add("error");
    };

    if (name && company && phone && isEmail() && message) {
      sendFeedback("template_batm9jj", {
        name,
        company,
        phone,
        email,
        message,
      });
    } else {
      failledMessage();
    }
  };

  const sendFeedback = (templateId, variables) => {
    emailjs
      .send("service_7yfo8bc", templateId, variables)
      .then((res) => {
        console.log("success !");
        setName("");
        setCompany("");
        setPhone("");
        setEmail("");
        setMessage("");
      })
      .catch(
        (err) =>
          (document.querySelector(".form-message").innerHTML =
            "Une erreur s'est produite, veuillez réessayer.")
      );
  };

  return (
    <form className="contact-form">
      <h2>Contactez-nous</h2>
      <div className="form-content">
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="nom *"
          value={name}
          autoComplete="off"
        />
        <input
          type="text"
          id="company"
          name="company"
          onChange={(e) => setCompany(e.target.value)}
          placeholder="société"
          value={company}
        />
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="téléphone"
          value={phone}
        />
        <div className="email-content">
          <label id="not-mail">Email non valide</label>
          <input
            type="mail"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email *"
            value={email}
            autoComplete="off"
          />
        </div>
        <textarea
          id="message"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="message *"
          value={message}
        />
      </div>
      <input
        className="button"
        type="button"
        value="Envoyer"
        onClick={handleSubmit}
      />
      <div className="form-message">
        Veuillez saisir correctement le formulaire
      </div>
    </form>
  );
};

export default App;
