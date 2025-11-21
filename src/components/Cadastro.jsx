import styles from "./Cadastro.module.css";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    // 1. Criar o usuário no Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
    });

    if (error) {
      setErro(error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      setErro("Erro inesperado ao criar usuário.");
      return;
    }

    // 2. Salvar dados extras na tabela "profiles"
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      email: email,
      nome: nome,
    });

    if (profileError) {
      setErro(profileError.message);
      return;
    }

    setSucesso("Cadastro realizado com sucesso!");
    setNome("");
    setEmail("");
    setSenha("");
  }

  return (
    <div className={styles.container}>
      <h2>Cadastro de Usuário</h2>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </label>
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}