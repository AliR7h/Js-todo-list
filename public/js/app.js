let $ = document;
const inputElem = $.getElementById("itemInput");
const addButton = $.getElementById("addButton");
const clearButton = $.getElementById("clearButton");
const todoListElem = $.getElementById("todoList");

let todosArray = [];

function addNewTodo() {
  let newTodoTitle = inputElem.value.trim();

  if (newTodoTitle) {
    let newTodoObj = {
      id: Date.now(),
      title: newTodoTitle,
      complete: false,
    };

    todosArray.push(newTodoObj);
    setLocalStorage(todosArray);
    todosGenerator(todosArray);
    inputElem.value = "";
    inputElem.focus();
  }
}

function setLocalStorage(todosList) {
  localStorage.setItem("todos", JSON.stringify(todosList));
}

function todosGenerator(todosList) {
  todoListElem.innerHTML = "";

  todosList.forEach(function (todo) {
    // ایجاد عناصر
    let newTodoLiElem = $.createElement("li");
    newTodoLiElem.className =
      "flex items-center justify-between px-4 py-2 rounded-lg shadow bg-gray-100";

    let newTodoLabelElem = $.createElement("label");
    newTodoLabelElem.innerHTML = todo.title;
    newTodoLabelElem.className = todo.complete
      ? "text-gray-400 line-through"
      : "text-gray-800";

    let newTodoCompleteBtn = $.createElement("button");
    newTodoCompleteBtn.className =
      "bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded-lg";
    newTodoCompleteBtn.innerHTML = todo.complete ? "UnComplete" : "Complete";
    newTodoCompleteBtn.addEventListener("click", function () {
      editTodo(todo.id);
    });

    let newTodoDeleteBtn = $.createElement("button");
    newTodoDeleteBtn.className =
      "bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-lg";
    newTodoDeleteBtn.innerHTML = "Delete";
    newTodoDeleteBtn.addEventListener("click", function () {
      removeTodo(todo.id);
    });

    newTodoLiElem.append(
      newTodoLabelElem,
      newTodoCompleteBtn,
      newTodoDeleteBtn
    );
    todoListElem.append(newTodoLiElem);
  });
}

function editTodo(todoId) {
  todosArray = todosArray.map((todo) => {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;
    }
    return todo;
  });

  setLocalStorage(todosArray);
  todosGenerator(todosArray);
}

function removeTodo(todoId) {
  todosArray = todosArray.filter((todo) => todo.id !== todoId);
  setLocalStorage(todosArray);
  todosGenerator(todosArray);
}

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

  if (localStorageTodos) {
    todosArray = localStorageTodos;
  } else {
    todosArray = [];
  }

  todosGenerator(todosArray);
}

function clearTodos() {
  todosArray = [];
  setLocalStorage(todosArray);
  todosGenerator(todosArray);
}

// Event Listeners
window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addNewTodo);
clearButton.addEventListener("click", clearTodos);
inputElem.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    addNewTodo();
  }
});
