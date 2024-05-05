import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    products: [],
    editedProduct: [],
    loading: false,
    error: "",
    length: 0
}
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/products?_page=${payload.pageNum}&_limit=6`)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    },
)
export const getProductsLength = createAsyncThunk(
    'products/getProductsLength',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/productsLength")
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
            const response = await axios.all([
                axios.post("http://localhost:5000/products", {
                    id: Date.now(),
                    image: payload.image,
                    name: payload.name,
                    price: payload.price,
                    status: payload.status,
                    permissions: payload.permissions
                }),
                axios.put("http://localhost:5000/productsLength", {
                    length: payload.length + 1
                })
            ]).then(axios.spread((Info) => {
                console.log(Info.data)
                return Info.data
            }));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    },
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (payload, thunkAPI) => {
        try {
            await axios.all([
                axios.delete(`http://localhost:5000/products/${payload.id}`),
                axios.put("http://localhost:5000/productsLength", {
                    length: payload.length - 1
                })
            ])
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
            const response = await axios.patch(`http://localhost:5000/products/${payload.id}`, {
                status: payload.status
            })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    },
)

export const editProduct = createAsyncThunk(
    'products/editProduct',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.patch(`http://localhost:5000/products/${payload.id}`, {
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

const dataSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        edit: (state, action) => {
            state.editedProduct = []
            state.editedProduct.push(state.products.find(item => item.id === action.payload.id))
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
                state.length++
                // state.products.push(action.payload)
            }),
            builder.addCase(deleteProduct.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.length--
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
                console.log(state.products[0]);
                const selectedProduct = state.products.find(item => item.id === action.payload.id);
                selectedProduct.image = action.payload.image;
                selectedProduct.name = action.payload.name;
                selectedProduct.price = action.payload.price;
                selectedProduct.permissions = action.payload.permissions;
                selectedProduct.status = action.payload.status;
                state.loading = false;

            }),
            builder.addCase(getProductsLength.fulfilled, (state, action) => {
                state.length = action.payload.length
            })


    },
})

export const { edit } = dataSlice.actions

export default dataSlice.reducer
