import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchEntity, createEntity, updateEntity, deleteEntity } from "./contentAPI";

const initialState = {
  value: 0,
  entities: [],
};


export const fetchEntityAsync = createAsyncThunk(
  "content/fetchEntity",
  async () => {
    const response = await fetchEntity();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const createEntityAsync = createAsyncThunk(
  "content/createEntity",
  async (entity) => {
    const response = await createEntity(entity);
    console.log("createAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateEntityAsync = createAsyncThunk(
  "content/updateEntity",
  async (entity) => {
    const response = await updateEntity(entity);
    console.log("updateAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteEntityAsync = createAsyncThunk(
  "content/deleteEntity",
  async (id) => {
    const response = await deleteEntity(id);
    console.log("deleteAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchEntityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEntityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.entities= action.payload;
      })
      .addCase(createEntityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEntityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("action",action.payload);
        state.entities.push(action.payload);
      })
      .addCase(updateEntityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEntityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const ind= state.entities.findIndex(item => item.id==action.payload.id);
        state.entities[ind]=action.payload;
        // state.entities.push(action.payload);
      })
      .addCase(deleteEntityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEntityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index= state.entities.findIndex(item=>item.id===action.payload.id);
        state.entities.splice(index,1);
      });
  },
});

export const { increment } = contentSlice.actions;


export const selectEntity = (state) => state.content.entities;


export default contentSlice.reducer;

// const fetchEntities = async () => {
//   // try {
//   //   const response = await axios.get('http://localhost:3001/entities');
//   //   setEntities(response.data);
//   // } catch (error) {
//   //   console.error('Error fetching entities:', error);
//   // }
// };

// const createEntity = async () => {
//   // try {
//   //   await axios.post('http://localhost:3001/entities', {
//   //     name: entityName,
//   //     attributes,
//   //   });
//   //   fetchEntities();
//   // } catch (error) {
//   //   console.error('Error creating entity:', error);
//   // }
// };

// const deleteEntity = async (id) => {
//   // try {
//   //   await axios.delete(`http://localhost:3001/entities/${id}`);
//   //   fetchEntities();
//   // } catch (error) {
//   //   console.error('Error deleting entity:', error);
//   // }
// };

// const fetchEntityData = async (id) => {
//   // try {
//   //   const response = await axios.get(`http://localhost:3001/entities/${id}`);
//   //   setSelectedEntity(response.data);
//   // } catch (error) {
//   //   console.error('Error fetching entity data:', error);
//   // }
// };