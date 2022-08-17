const $todoForm = document.querySelector('.todo-container__form')
const $todoInput = document.querySelector('.todo-container__form__input')
const $todoList = document.querySelector('.todo-list')
const $editForm = document.querySelector('.todo-container__edit-form')
const $editInput = document.querySelector('.todo-container__edit-form__input')
const $cancelEditBtn = document.querySelector('.btn-cancel')
let $oldInputValue

const saveTodo = (text) => {
  const todo = document.createElement('div')
  todo.classList.add('todo-list__todo')

  const todoTitle = document.createElement('h3')
  todoTitle.innerText = text
  todo.appendChild(todoTitle)

  const doneBtn = document.createElement('button')
  doneBtn.classList.add('btn-finish')
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
  todo.appendChild(doneBtn)

  const editBtn = document.createElement('button')
  editBtn.classList.add('btn-edit')
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
  todo.appendChild(editBtn)

  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('btn-delete')
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  todo.appendChild(deleteBtn)

  $todoList.appendChild(todo)
  $todoInput.value = ''
  $todoInput.focus()
}

const toggleForms = () => {
  $editForm.classList.toggle('hide')
  $todoForm.classList.toggle('hide')
  $todoList.classList.toggle('hide')
}

const updateTodo = (text) => {
  const $todos = document.querySelectorAll('.todo-list__todo')
  $todos.forEach((todo) => {
    let $todoTitle = todo.querySelector('h3')

    if($todoTitle.innerText === $oldInputValue) {
      $todoTitle.innerText = text
    }
  })
}

document.addEventListener('click', (e) => {
  const target = e.target
  const parent = target.closest('div')
  let $todoTitle

  if(parent && parent.querySelector('h3')) {
    $todoTitle = parent.querySelector('h3').innerText
  }

  if(target.classList.contains('btn-finish')) {
    parent.classList.toggle('done')
  }

  if(target.classList.contains('btn-remove')) {
    parent.remove()
  }

  if(target.classList.contains('btn-edit')) {
    toggleForms()

    $editInput.value = $todoTitle
    $oldInputValue = $todoTitle
  }
})

$todoForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const $inputValue = $todoInput.value
  if($inputValue) {
    saveTodo($inputValue)
  }
})

$cancelEditBtn.addEventListener('click', (e) => {
  e.preventDefault()

  toggleForms()
})

$editForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const $editInputValue = $editInput.value
  if($editInputValue) {
    updateTodo($editInputValue)
  }

  toggleForms()
})