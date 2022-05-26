import { createEffect } from 'solid-js'

function Todo({ id, index, text, done, removeTodo, updateTodo }) {
	return (
		<div
			for='check'
			class='grid grid-col-todo items-center overflow-auto border border-gray-200 pl-2 py-1 rounded-lg mb-2 cursor-pointer hover:translate-x-2 duration-100 bg-white accent-blue-600 hover:accent-blue-500 '>
			<input
				type='checkbox'
				id={id}
				class='mr-4 cursor-pointer h-full '
				checked={done}
				onChange={() => updateTodo()}
			/>
			<label
				for={id}
				class={`text-lg  select-none cursor-pointer text-gray-900`}>
				{text}
			</label>
			<div
				onClick={() => removeTodo()}
				class='h-full flex items-center px-2 opacity-0 hover:opacity-100 select-none duration-100 cursor-pointer'>
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
		</div>
	)
}

export default Todo
