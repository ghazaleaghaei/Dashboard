

export const getSidebar = createAsyncThunk(
    'data/getSidebar',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/todos")
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    },
)

const initialState = {
    todo: [],
    editedTodo: [],
    loading: false,
    error: ""
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getSidebar.pending, (state, action) => {
            state.loading = true;
            state.todo = [];
            state.error = "";
        }),
            builder.addCase(getSidebar.fulfilled, (state, action) => {
                state.loading = false;
                state.todo = action.payload;
                state.error = "";
            }),
            builder.addCase(getSidebar.rejected, (state, action) => {
                state.loading = false;
                state.todo = [];
                state.error = action.payload;
            })

    },
})
