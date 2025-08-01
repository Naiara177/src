import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some(u => u.email === email);

    if (exists) {
      alert("Usuário já cadastrado.");
    } else {
      users.push({ email, senha });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
