import React, { useState } from 'react'
import { useAddTodoMutation } from '../services/todo'

function AddTodo() {
    const [value, setValue] = useState('')
    const [addTodo] = useAddTodoMutation();

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (value.trim() === '') {
            return;
        }
        console.log(value);
        await addTodo(value);
        setValue('')
    }

    return (
        <>
            <h1>Add Todo</h1>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text" 
                    placeholder="Add Todo..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button >Add Todo</button>
            </form>
        </>
    )
}

export default AddTodo