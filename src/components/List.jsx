import { createSignal, createEffect } from 'solid-js'
import Todo from './Todo'
import Trash from '../assets/trash.svg'

function List({ id, title, todoArray, removeList }) {
	let input

	const [todos, setTodos] = createSignal([])

	createEffect(() => {
		const todoData = localStorage.getItem(`Todos-${id}`)
		if (todoData) {
			setTodos(JSON.parse(todoData))
		}
	})

	const addTodo = () => {
		if (!input.value || input.value == '') return

		let text = input.value.trim()
		text = text[0].toUpperCase() + text.slice(1)

		let todo = {
			id: Math.floor(Math.random() * 10000),
			date: Date.now(),
			text: text,
			done: false,
		}

		setTodos([...todos(), todo])
		input.value = ''
		saveToLocalStorage()
	}

	const enterPressed = (e) => {
		if (e.keyCode != 13) return
		addTodo()
	}

	const updateTodo = (index) => {
		let todo = todos()[index]
		todo.done = !todo.done
		saveToLocalStorage()
	}

	const removeTodo = (index) => {
		let todosCopy = [...todos()]
		todosCopy.splice(index, 1)
		setTodos(todosCopy)
		saveToLocalStorage()
	}

	const saveToLocalStorage = () => {
		localStorage.setItem(`Todos-${id}`, JSON.stringify([...todos()]))
	}

	return (
		<section class='p-6 w-full border rounded-lg relative hover:shadow-lg duration-100'>
			<div
				onClick={() => removeList()}
				class='absolute top-0 right-0 p-6 opacity-0 hover:opacity-100 duration-100 cursor-pointer select-none'>
				<span class='text-red-500'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						class='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						stroke-width='2'>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
						/>
					</svg>
				</span>
			</div>
			<h1 class='text-2xl text-center mb-4 font-medium'>{title}</h1>
			<div class='flex flex-row h-auto justify-center mb-4'>
				<input
					type='text'
					ref={input}
					onKeyDown={(e) => enterPressed(e)}
					class='border border-grey-300 mr-2 rounded-lg px-2 w-full'
				/>
				<button
					onClick={() => addTodo()}
					class='px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 duration-100'>
					Add
				</button>
			</div>
			<div class=''>
				<For
					each={todos()}
					fallback={
						<p class='text-gray-500 ml-2'>
							No todos just yet...
						</p>
					}>
					{(todo, index) => (
						<Todo
							id={todo.id}
							index={index()}
							text={todo.text}
							done={todo.done}
							removeTodo={() => removeTodo(index())}
							updateTodo={() => updateTodo(index())}
						/>
					)}
				</For>
			</div>
		</section>
	)
}

export default List
