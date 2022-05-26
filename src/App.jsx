import logo from './logo.svg'
import styles from './index.css'
import { createEffect, createSignal, For, Show, onMount } from 'solid-js'
import Todo from './components/Todo'
import List from './components/List'

function App() {
	let listInput

	const [lists, setLists] = createSignal([])

	onMount(() => {
		const listData = localStorage.getItem('TodoLists')
		if (listData) {
			setLists(JSON.parse(listData))
		}
		console.log(lists())
	})

	const enterPressed = (e) => {
		if (e.keyCode != 13) return
		addList()
	}

	const addList = () => {
		if (!listInput.value || listInput.value == '') return
		let text = listInput.value.trim()
		text = text[0].toUpperCase() + text.slice(1)
		let list = {
			id: Math.floor(Math.random() * 10000),
			title: text,
			todoArray: [],
		}
		setLists([...lists(), list])
		listInput.value = ''
		saveToLocalStorage()
	}

	const removeList = (index, id) => {
		let listsCopy = [...lists()]
		listsCopy.splice(index, 1)
		setLists(listsCopy)
		localStorage.removeItem(`Todos-${id}`)
		saveToLocalStorage()
	}

	const saveToLocalStorage = () => {
		localStorage.setItem('TodoLists', JSON.stringify([...lists()]))
	}

	return (
		<main class='w-screen h-screen bg-white flex flex-col items-center select-none'>
			<h1 class='text-3xl font-semibold mt-4'>Todo Dashboard</h1>
			<div class='p-6 flex w-96'>
				<input
					type='text'
					ref={listInput}
					onKeyDown={(e) => enterPressed(e)}
					class='border border-grey-300 mr-2 rounded-lg px-2 flex-1'
				/>
				<button
					onClick={() => addList()}
					class='px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 duration-100 '>
					Add List
				</button>
			</div>
			<Show when={lists().length <= 0}>
				<div class='text-center text-xl text-gray-500'>
					No lists just yet...
				</div>
			</Show>
			<Show when={lists().length > 0}>
				<div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2 lg:gap-6 md:gap-4 px-2 md:px-4 lg:px-6'>
					<For each={lists()}>
						{(list, index) => (
							<List
								id={list.id}
								title={list.title}
								todoArray={list.todos}
								removeList={() =>
									removeList(index(), list.id)
								}
							/>
						)}
					</For>
				</div>
			</Show>
			{/* <List id='1' title='Todo List' todoArray={[]} />
				<List id='2' title='House Work' todoArray={[]} />
				<List id='3' title='House Work' todoArray={[]} />
				<List id='4' title='House Work' todoArray={[]} /> */}
		</main>
	)
}

export default App
