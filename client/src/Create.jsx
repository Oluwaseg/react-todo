import { useState } from "react";
import axios from "axios";

const Create = ({ setTodos }) => {
  const [task, setTask] = useState("");

  const addTodo = () => {
    axios
      .post("http://localhost:3050/creates", { task: task })
      .then((result) => {
        // Update the todos state with the newly added todo
        setTodos((prevTodos) => [...prevTodos, result.data]);
        // Clear the input field after adding the todo
        setTask("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md mx-auto m-3">
      <label
        htmlFor="task"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Task
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z" />
          </svg>
        </div>
        <input
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder="Enter task"
          required
        />
        <button
          type="button"
          onClick={addTodo}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Create;
