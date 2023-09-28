import React, { useState } from 'react'
import { useGetTodosQuery, useDeleteTodoMutation, useUpdateTodoMutation } from '../services/todo'


function TodosView() {

    const { data, error, isLoading } = useGetTodosQuery()
    const [deleteTodo] = useDeleteTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [editTodo, setEditTodo] = useState(null)
    const [editText, setEditText] = useState('')

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
        } catch (error) {
            // Handle error here
        }
    };

    const handleEditClick = (todo) => {
        setEditTodo({
            id: todo.id,
            text: todo.text,
        })
        setEditText(todo.text)
    }

    const handleSaveEdit = async (id) => {
        try {
            await updateTodo({
                id,
                text: editText,
            })
            setEditTodo(null)
        } catch (error) {
            // Handle error here
        }
    }

    return (
        <div>
            <h1>Todos</h1>

            {isLoading && <p>Loading...</p>}
            {error && <p>Something went wrong...</p>}
            <div className='todo-wrap'>
                {data?.map((todo, index) => {
                    return (
                        <div className='item' key={index}>
                            {editTodo?.id === todo.id ? (
                                <input
                                    type='text'
                                    placeholder='Edit todo'
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            ) : (
                                <span key={index}>{todo.text}</span>
                            )}

                            {editTodo?.id === todo.id ? (
                                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                            ) : (
                                <>
                                    <button 
                                        style={{marginLeft: 'auto', marginRight: 10}}
                                        onClick={() => handleEditClick(todo)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    >Delete</button>
                                </>
                            )}
                            
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TodosView 