import { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:5000/todo";

const App = () => {
  const [allTodo, setAllTodo] = useState([]);
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState();

  const getAllTodos = async () => {
    const res = await axios.get(url);
    setAllTodo(res.data);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  console.log("todo", allTodo);

  const addTodo = () => {
    axios
      .post(`${url}/add`, {
        todo,
      })
      .then((data) => {
        console.log("todo added", data);
        getAllTodos();
        setTodo("");
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id, todo) => {
    setEditTodo({ id: id, todo: todo });
  }

  const handleSaveEdit = () => {

    axios
    .put(`${url}/update/${editTodo.id}`, {
      todo: editTodo.todo,
    })
    .then((data) => {
      console.log("todo updated", data);
      getAllTodos();
      setTodo("");
      setEditTodo()
    })
    .catch((err) => console.log(err));
}
  const handleDelete = (id) => {
    axios
      .delete(`${url}/delete/${id}`)
      .then((data) => {
        console.log("todo updated", data);
        getAllTodos();
        setTodo("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button onClick={addTodo} disabled={!todo.length}>
          Add Todo
        </button>
      </div>
      <ul>
        {allTodo?.map((el) => (
          <li key={el?._id} className="flex">
            <div>
              {editTodo && editTodo?.id === el?._id ? (
                <input
                  type="text"
                  value={editTodo?.todo}
                  onChange={(e) => setEditTodo({id: el?._id , todo: e.target.value})}
                />
              ) : (
                el?.todo
              )}
            </div>
            <div style={{ marginLeft: "3rem" }}>
              {editTodo && editTodo?.id === el?._id ? (
                <button
                  className="pointer"
                  onClick={() => handleSaveEdit(el?._id)}
                  style={{ marginRight: "0.5rem" }}
                >
                  Save changes
                </button>
              ) : (
                <button
                  className="pointer"
                  onClick={() => handleEdit(el?._id, el?.todo)}
                  style={{ marginRight: "0.5rem" }}
                >
                  Edit
                </button>
              )}
              <button className="pointer" onClick={() => handleDelete(el?._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
