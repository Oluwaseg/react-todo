import { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // Import delete icon
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md"; // Import radio button icons

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3050/")
      .then((result) => setTodos(result.data))
      .catch((error) => console.log(error));
  }, []);

  const editTodo = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    const updatedTodo = { ...todo, done: !todo.done };

    axios
      .put(`http://localhost:3050/updates/${id}`, updatedTodo)
      .then((result) => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((error) => console.log(error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3050/delete/${id}`)
      .then((result) => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="py-8 px-4 max-w-md w-full mx-auto lg:py-16 lg:px-12 rounded-lg shadow-lg bg-gray-800 text-white">
        <h2 className="text-red-400 text-4xl mb-4 text-center">Home</h2>
        <Create setTodos={setTodos} />
        {todos.length === 0 ? (
          <div className="text-center">
            <p className="text-red-400 text-lg font-semibold">No Todo Found</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md text-gray-800"
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => editTodo(todo._id)}
                >
                  {todo.done ? (
                    <MdRadioButtonChecked className="text-red-600 h-5 w-5" />
                  ) : (
                    <MdRadioButtonUnchecked className="text-blue-600 h-5 w-5" />
                  )}
                  <span className={`ml-3 ${todo.done ? "line-through" : ""}`}>
                    {todo.task}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
