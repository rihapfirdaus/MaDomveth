const todos = [];
const RENDER_EVENT = 'render-todo';

function generateId() {
    return +new Date();
}

function today() {
    var today = new Date();
    document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
}

document.getElementById("formDisplayOut").addEventListener('click', function () {
    document.getElementById("formDisplayOut").classList.add("choosen");
    document.getElementById("formDisplayIn").classList.remove("choosen");
    document.querySelector('label[for="money"]').innerText = "berapa uang yang habis:";
});

document.getElementById("formDisplayIn").addEventListener('click', function () {
    document.getElementById("formDisplayIn").classList.add("choosen");
    document.getElementById("formDisplayOut").classList.remove("choosen");
    document.querySelector('label[for="title"]').innerText = "keperluan:";
    document.querySelector('label[for="money"]').innerText = "berapa uang yang masuk:";
});

document.querySelectorAll('input[type="date"]').setAttribute('value', today());

//popup
function ShowPopUp() {
    document.getElementById('blur').style.display = 'block';
    document.getElementById('addButton').style.display = 'none !important';
    document.getElementById('clsButton').style.display = 'block';
    document.getElementById('formSection').style.display = 'block';
}

function HiddenPopUp() {
    if ((window.matchMedia('(max-width: 600px)')).matches) {
        document.getElementById('blur').style.display = 'none';
        document.getElementById('addButton').style.display = 'block';
        document.getElementById('clsButton').style.display = 'none';
        document.getElementById('formSection').style.display = 'none';
    }
}

// function generateTodoObject(id, desc, timestamp, cashOut, cashIn, isOut) {
//     return {
//         id,
//         desc,
//         timestamp,
//         cashOut,
//         cashIn,
//         isOut
//     }
// }

// function findTodo(todoId) {
//     for (todoItem of todos) {
//         if (todoItem.id === todoId) {
//             return todoItem;
//         }
//     }
//     return null;
// }

// function findTodoIndex(todoId) {
//     for (index in todos) {
//         if (todos[index].id === todoId) {
//             return index;
//         }
//     }
//     return -1;
// }

// function makeTodo(todoObject) {
//     const {
//         id,
//         desc,
//         timestamp,
//         cashOut,
//         cashIn,
//         isOut
//     } = todoObject;

//     const bungkustable = document.createElement('tr');
//     const tanggaltbl = document.createElement('td');
//     tanggaltbl.innerText = timestamp;

//     const desctbl = document.createElement('td');
//     desctbl.innerText = desc;

//     const masuktbl = document.createElement('td');
//     masuktbl.innerText = cashOut;

//     const keluartbl = document.createElement('td');
//     keluartbl.innerText = cashIn;

//     bungkustable.append(tanggaltbl, desctbl, masuktbl, keluartbl);
//     bungkustable.setAttribute('id', `todo-${id}`);

//     return bungkustable;
// }

// function addTodo() {
//     const desc = document.getElementById('title').value;
//     const timestamp = document.getElementById('date').value;
//     const cash = document.getElementById('money').value;

//     const generatedID = generateId();
//     const todoObject = generateTodoObject(generatedID, textTodo, timestamp, numberia, false);
//     todos.push(todoObject);

//     document.dispatchEvent(new Event(RENDER_EVENT));
//     saveData();
// }

// function addTaskToCompleted(todoId /* HTMLELement */ ) {
//     const todoTarget = findTodo(todoId);
//     if (todoTarget == null) return;

//     todoTarget.isCompleted = true;
//     document.dispatchEvent(new Event(RENDER_EVENT));
//     saveData();
// }

// function removeTaskFromCompleted(todoId /* HTMLELement */ ) {
//     const todoTarget = findTodoIndex(todoId);
//     if (todoTarget === -1) return;
//     todos.splice(todoTarget, 1);

//     document.dispatchEvent(new Event(RENDER_EVENT));
//     saveData();
// }

// function undoTaskFromCompleted(todoId /* HTMLELement */ ) {
//     const todoTarget = findTodo(todoId);
//     if (todoTarget == null) return;

//     todoTarget.isCompleted = false;
//     document.dispatchEvent(new Event(RENDER_EVENT));
//     saveData();
// }

// document.addEventListener('DOMContentLoaded', function () {
//     const submitForm /* HTMLFormElement */ = document.getElementById('form');

//     submitForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         addTodo();
//     });
//     if (isStorageExist()) {
//         loadDataFromStorage();
//     }
// });


// document.addEventListener(RENDER_EVENT, function () {
//     const uncompletedTODOList = document.getElementById('tables');
//     const listCompleted = document.getElementById('completed-todos');

//     // clearing list item
//     uncompletedTODOList.innerHTML = '';
//     // listCompleted.innerHTML = '';

//     for (todoItem of todos) {
//         const todoElement = makeTodo(todoItem);
//         uncompletedTODOList.appendChild(todoElement);
//     }
// });

// function saveData() {
//     if (isStorageExist()) {
//         const parsed = JSON.stringify(todos);
//         localStorage.setItem(STORAGE_KEY, parsed);
//         document.dispatchEvent(new Event(SAVED_EVENT));
//     }
// }

// const SAVED_EVENT = 'saved-todo';
// const STORAGE_KEY = 'TODO_APPS';

// function isStorageExist() /* boolean */ {
//     if (typeof (Storage) === undefined) {
//         alert('Browser kamu tidak mendukunng local storage');
//         return false;
//     }
//     return true;
// }

// document.addEventListener(SAVED_EVENT, function () {
//     console.log(localStorage.getItem(STORAGE_KEY));
// });

// function loadDataFromStorage() {
//     const serializedData = localStorage.getItem(STORAGE_KEY);
//     let data = JSON.parse(serializedData);

//     if (data !== null) {
//         for (const todo of data) {
//             todos.push(todo);
//         }
//     }
//     document.dispatchEvent(new Event(RENDER_EVENT));
// }
// console.log(document.getElementById("date").value);
