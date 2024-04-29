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
                id: Date.now(),
                image: payload.image,
                name: payload.name,
                price: payload.price,
                status: payload.status,
                permissions: payload.permissions
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
                status: payload.status
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
                image: payload.image,
                name: payload.name,
                price: payload.price,
                status: payload.status,
                permissions: payload.permissions
            })
            console.log(response.data)
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
            state.editedProduct.push(state.products.find(item => item.id === action.payload.id))
            console.log(state.editedProduct)
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
                state.products.push(action.payload)
            }),
            builder.addCase(deleteProduct.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(item => item.id !== action.payload.id)
            }),
            builder.addCase(toggleProduct.fulfilled, (state, action) => {
                const selectedProduct = state.products.find(item => item.id === action.payload.id);
                selectedProduct.status = action.payload.status;
            }),
            builder.addCase(editProduct.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
                const selectedItem = state.products.find(item => item.id === Number(action.payload.id));
                console.log(selectedItem);
                selectedItem.name = action.payload.name;
                selectedItem.image = action.payload.image;
                selectedItem.price = action.payload.price;
                selectedItem.status = action.payload.status;
                selectedItem.permissions = action.payload.permissions;
                state.editedProduct = [];
            })


    },
})

export const { edit } = dataSlice.actions

export default dataSlice.reducer
