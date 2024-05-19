import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchEntity, createEntity, updateEntity, deleteEntity } from "./entityAPI";

const initialState = {
  value: 0,
  entities: [],
};


export const fetchEntityAsync = createAsyncThunk(
  "entity/fetchEntity",
  async () => {
    console.log("calledFetchEntity");
    const response = await fetchEntity();
    console.log("FetchEntityAsync: ",response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createEntityAsync = createAsyncThunk(
  "entity/createEntity",
  async (entity) => {
    const response = await createEntity(entity);
    console.log("createAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateEntityAsync = createAsyncThunk(
  "entity/updateEntity",
  async (entity) => {
    const response = await updateEntity(entity);
    console.log("updateAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteEntityAsync = createAsyncThunk(
  "entity/deleteEntity",
  async (entity) => {
    const response = await deleteEntity(entity);
    console.log("deleteAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const entitySlice = createSlice({
  name: "entity",
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
        state.entities= action.payload.data;
      })
      .addCase(createEntityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEntityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("action",action.payload);
        const data={"Tables_in_vahan_db" : action.payload.data}
        state.entities.push(data);
      })
      .addCase(updateEntityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEntityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("updatecheckasync: ",action.payload)
        const ind= state.entities.findIndex(item=>item.Tables_in_vahan_db===action.payload.oldName);
        const data={"Tables_in_vahan_db" : action.payload.newName}
        state.entities[ind]=data;
        // state.entities.push(action.payload);
      })
      .addCase(deleteEntityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEntityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("deletecheckasync: ",action.payload.entity)
        const index= state.entities.findIndex(item=>item.Tables_in_vahan_db===action.payload.entity);
        state.entities.splice(index,1);
      });
  },
});

export const { increment } = entitySlice.actions;


export const selectEntity = (state) => state.entity.entities;


export default entitySlice.reducer;

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