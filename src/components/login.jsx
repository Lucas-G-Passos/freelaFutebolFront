import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function login(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_BACKENDURL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/aluno");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError("Erro ao tentar fazer login.");
    }
  }

  return (
    <div id="rootLogin">
      <div id="login-form">
        <form id="form" onSubmit={login}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            className="input"
            required
          />
          <button type="submit" id="button-login" className="botao">
            Login
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
