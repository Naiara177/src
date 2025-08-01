import { useState } from "react";

export function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: "", title: "", price: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (form.id) {
      // Atualizar
      setProducts(products.map(p => p.id === form.id ? form : p));
    } else {
      // Inserir
      const newProduct = { ...form, id: crypto.randomUUID() };
      setProducts([...products, newProduct]);
    }
    setForm({ id: "", title: "", price: "" });
  };

  const handleEdit = (p) => setForm(p);

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>Gerenciar Produtos</h2>
      <input
        type="text"
        name="title"
        placeholder="Nome"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Preço"
        value={form.price}
        onChange={handleChange}
      />
      <button onClick={handleSave}>
        {form.id ? "Atualizar" : "Cadastrar"}
      </button>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} - R$ {p.price}
            <button onClick={() => handleEdit(p)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
