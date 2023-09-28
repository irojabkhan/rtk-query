import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            providesTags: ['Todo'],
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: { text: todo },
            }),
            invalidatesTags: ['Todo'],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                id,
            }),
            invalidatesTags: ['Todo'],
        }),
        updateTodo: builder.mutation({
            query: ({ id, text }) => ({
                url: `/todos/${id}`,
                method: 'PATCH',
                body: { text },
            }),
            invalidatesTags: ['Todo'],
        })
    })
})

export const { useGetTodosQuery, useDeleteTodoMutation, useAddTodoMutation, useUpdateTodoMutation } = todoApi