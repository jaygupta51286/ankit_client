import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [timeLeft, setTimeLeft] = useState("00 days 00 hours 00 minutes 00 seconds left");
  const [showForm, setShowForm] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState("");

  useEffect(() => {
    const countdown = setInterval(() => {
      const targetDate = new Date("2024-11-30T23:59:59").getTime(); // Adjust to the end of November 30th
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(countdown);
        setTimeLeft("00 days 00 hours 00 minutes 00 seconds left");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days < 10 ? '0' + days : days} days ${hours < 10 ? '0' + hours : hours} hours ${minutes < 10 ? '0' + minutes : minutes} minutes ${seconds < 10 ? '0' + seconds : seconds} seconds left`);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    accountNumber: '',
    mt5Number: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/participants", { ...formData, broker: selectedBroker });
      alert('Registration successful!');
    } catch (error) {
      console.error(error);
      alert('There was an error registering your details.');
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">Future skill lab</div>
        <div className="header-buttons">
          <button className="header-btn" onClick={() => document.getElementById('how-to-join').scrollIntoView()}>How to Join</button>
          <button className="header-btn" onClick={() => document.getElementById('competition-details').scrollIntoView()}>Competition Details</button>
          <button className="header-btn" onClick={() => document.getElementById('why-join').scrollIntoView()}>Why Join</button>
          <button className="header-btn" onClick={() => document.getElementById('conditions').scrollIntoView()}>Conditions</button>
          <button className="header-btn" onClick={() => document.getElementById('benefits').scrollIntoView()}>Benefits</button>
        </div>
      </header>

      <main>
        <section className="prizes-countdown">
          <div className="countdown">
            <h2>🔥 Trading Challenge: Double Win Opportunity!</h2>
            <p>{timeLeft}</p>
          </div>
          <div className="prizes">
            <div className="prize-card">
              <h3>🥇 1st Prize</h3>
              <p>$100 + 10k Funded Account, Refunded Amount if you Pass Funded Account.</p>
            </div>
            <div className="prize-card">
              <h3>🥈 2nd Prize</h3>
              <p>$50 + 10k Funded Account, Refunded Amount if you Pass Funded Account.</p>
            </div>
            <div className="prize-card">
              <h3>🥉 3rd Prize</h3>
              <p>$30 + 5k Funded Account, Refunded Amount if you Pass Funded Account.</p>
            </div>
            <div className="prize-card">
              <h3>🏅 4th Prize</h3>
              <p>$20 + 5k Funded Account, Refunded Amount if you Pass Funded Account.</p>
            </div>
            <div className="prize-card">
              <h3>🎖️ 5th to 10th Prizes</h3>
              <p>$10 each</p>
            </div>
          </div>
        </section>

        <section className="register-section">
          <button className="register-btn" onClick={() => setShowForm(true)}>Register for the Competition</button>
        </section>

        {showForm && (
          <section className="competition-registration">
            <h2>Register for the Competition</h2>
            <form onSubmit={handleFormSubmit} className="form-container">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                required
              />
              <input
                type="text"
                name="mt5Number"
                placeholder="MT5 Number"
                value={formData.mt5Number}
                onChange={(e) => setFormData({ ...formData, mt5Number: e.target.value })}
                required
              />

              <div className="broker-buttons">
                <button
                  type="button"
                  className={`broker-btn ${selectedBroker === 'Exness' ? 'active' : ''}`}
                  onClick={() => setSelectedBroker('Exness')}
                >
                  Exness
                </button>
                <button
                  type="button"
                  className={`broker-btn ${selectedBroker === 'Hantec Market' ? 'active' : ''}`}
                  onClick={() => setSelectedBroker('Hantec Market')}
                >
                  Hantec Market
                </button>
              </div>

              <button type="submit" className="submit-btn">Register</button>
            </form>
          </section>
        )}

        {/* Sections for How to Join, Competition Details, Why Join, Conditions, and Benefits */}
        <section id="how-to-join" className="info-section">
          <h2>How to Join the Competition</h2>
          <p>Create an Account: Click on the link Exness or Hantec Market and sign up on our partner platform. Only accounts created through this link will qualify.</p>
          <p>Deposit $100: Fund your account with a minimum of $100 to be eligible for the competition.</p>
          <p>Start Trading: Once your account setup and deposit is complete, start trading and aim for the highest profit!</p>
        </section>

        <section id="competition-details" className="info-section">
          <h2>Competition Details</h2>
          <p>Challenge Period: 1st Dec 2024 - 31st Dec 2024</p>
          <p>Objective: Achieve the highest profit during the competition period.</p>
        </section>

        <section id="why-join" className="info-section">
          <h2>Why Join?</h2>
          <p>Gain Real Trading Experience: Improve your skills in a live market environment.</p>
          <p>Chance to Win Real Money: Compete for cash prizes and showcase your talent!</p>
          <p>Network with Traders: Connect with other passionate traders and learn together.</p>
        </section>

        <section id="conditions" className="info-section">
          <h2>Conditions</h2>
          <ul>
            <li>1st priority - Minimum 0.50 cent lot required per day (lot size: 0.01 to maximum 0.10 acceptable).</li>
            <li>2nd priority - Daily minimum withdrawal: $10 to max.</li>
            <li>3rd priority - Weekly & Monthly minimum withdrawal: $10 to max.</li>
            <li>4th priority - Overall maximum withdrawal and Maximum Winning Percentage (Based on your deposit amount).</li>
            <li>Deposit & Withdrawal methods: Local, Bank, Crypto, Neteller, and Skrill.</li>
            <li>Trading Platforms: Hantec Market or Exness; Withdraw all winnings by Telegram.</li>
          </ul>
        </section>
        

        <section id="benefits" className="info-section">
          <h2>Benefits</h2>
          <ul>
            <li>Free registration for the first 100 participants.</li>
            <li>Guaranteed prizes for top performers.</li>
            <li>Exclusive webinars and training materials.</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="social-media">
            <a href="https://twitter.com" className="social-link">Twitter</a>
            <a href="https://facebook.com" className="social-link">Facebook</a>
            <a href="https://instagram.com" className="social-link">Instagram</a>
          </div>
          <div className="contact-us">
            <h4>Contact Us</h4>
            <p>Email: support@tradingchallenge.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
        <div className="copyright">
          <p>© 2024 Futureskilllab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
