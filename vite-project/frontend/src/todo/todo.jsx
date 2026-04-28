import React, { useMemo, useRef, useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './todo.css';

function Todo() {
  const initialItems = useMemo(
    () => [
      { id: 2, text: 'Розділити новини по підгрупам', done: false },
    ],
    []
  );

  const [items, setItems] = useState(initialItems);
  const [newText, setNewText] = useState('');
  const nextId = useRef(4);

  const toggleItem = (id) => {
    setItems(prev => prev.map(item => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const addItem = (e) => {
    e.preventDefault();
    const text = newText.trim();
    if (!text) return;

    setItems(prev => [{ id: nextId.current++, text, done: false }, ...prev]);
    setNewText('');
  };

  return (
    <div className="todo-page">
      <Header />

      <main className="todo-main">
        <h1 className="todo-title">TODO</h1>
        <p className="todo-subtitle">Список задач для наступних ітерацій.</p>

        <form className="todo-form" onSubmit={addItem}>
          <input
            className="todo-input"
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Додати новий пункт..."
          />
          <button className="todo-add" type="submit">Add</button>
        </form>

        <ul className="todo-list">
          {items.map((item) => (
            <li key={item.id} className={`todo-item ${item.done ? 'done' : ''}`}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(item.id)}
              />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}

export default Todo;
