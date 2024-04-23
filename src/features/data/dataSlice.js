import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    products: [],
    editedProduct: [],
    loading: false,
    error: ""
}
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/products?_page=1&_limit=2")
            console.log(response)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    },
)

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/products", {
                title: payload.title,
                id: Date.now(),
                completed: false
            })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    },
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (payload, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:5000/products/${payload.id}`)
            return { id: payload.id }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    },
)

export const toggleProduct = createAsyncThunk(
    'products/toggleProduct',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.patch(`http://localhost:5000/procuts/${payload.id}`, {
                completed: payload.completed
            })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    },
)

export const editProduct = createAsyncThunk(
    'products/editAsyncProduct',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.patch(`http://localhost:5000/products/${payload.id}`, {
                title: payload.title
            })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    },
)

const dataSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        edit: (state, action) => {
            state.editedProduct = []
            state.editedProduct.push(state.todo.find(item => item.id === action.payload.id))
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true;
            state.products = [];
            state.error = "";
        }),
            builder.addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = "";
            }),
            builder.addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.products = [];
                state.error = action.payload;
            }),
            builder.addCase(addProduct.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.todo.push(action.payload)
            }),
            builder.addCase(deleteProduct.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.todo = state.todo.filter(item => item.id !== action.payload.id)
            }),
            builder.addCase(toggleProduct.fulfilled, (state, action) => {
                const selectedTodo = state.todo.find(item => item.id === action.payload.id);
                selectedTodo.completed = action.payload.completed;
            }),
            builder.addCase(editProduct.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
                const selectedItem = state.todo.find(item => item.id === action.payload.id)
                selectedItem.title = action.payload.title
                state.editedTodo = []
            })


    },
})

export const { edit } = dataSlice.actions

export default dataSlice.reducer
