import React, { useState, useMemo, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Settings from "./components/pages/settings/Settings";
import Game from "./components/pages/game/Game";
import Score from "./components/pages/score/Score";
function App() {
  //defines constant which will show in footer so I dont have to change date every year
  const d = new Date();
  const year = d.getFullYear();

  //defined routes and what page will show on specific path
  return (
    <div className="App">
      <Router>
        <header></header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/game" element={<Game />} />
          <Route path="/score" element={<Score />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
      <footer id="footer">
        © <span className="year">{year}</span> ČVUT FEL KAJ Jan Bajer
      </footer>
    </div>
  );
}

export default App;
