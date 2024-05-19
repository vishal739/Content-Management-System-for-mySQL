import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAttribute, createAttribute, updateAttribute, deleteAttribute } from "./attributeAPI";

const initialState = {
  value: 0,
  attributes: [],
};


export const fetchAttributeAsync = createAsyncThunk(
  "attribute/fetchAttribute",
  async (entity) => {
    const response = await fetchAttribute(entity);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createAttributeAsync = createAsyncThunk(
  "attribute/createAttribute",
  async (attribute) => {
    const response = await createAttribute(attribute);
    console.log("createAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateAttributeAsync = createAsyncThunk(
  "attribute/updateAttribute",
  async (attribute) => {
    const response = await updateAttribute(attribute);
    console.log("updateAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteAttributeAsync = createAsyncThunk(
  "attribute/deleteAttribute",
  async (attribute) => {
    const response = await deleteAttribute(attribute);
    console.log("deleteAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const AttributeSlice = createSlice({
  name: "attribute",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchAttributeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAttributeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("fetchAttributeAsync: ", action.payload.data)
        state.attributes= action.payload.data;
      })
      .addCase(createAttributeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAttributeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("actionAttribute: ",action.payload);
        state.attributes.push(action.payload.data);
      })
      .addCase(updateAttributeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAttributeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("updatecheck: ",state.attributes, action.payload.data);
        const ind= state.attributes.findIndex(item=>item.COLUMN_NAME===action.payload.data.oldName);
        // const ind= state.attributes.findIndex(item => item.id==action.payload.id);
        const newData = {
          "COLUMN_NAME": action.payload.data.COLUMN_NAME,
          "DATA_TYPE": action.payload.data.DATA_TYPE
         }
        state.attributes[ind]=newData;
        // state.attributes.push(action.payload);
      })
      .addCase(deleteAttributeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAttributeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("deletecheck: ",state.attributes, action.payload.name);
        const index= state.attributes.findIndex(item=>item.COLUMN_NAME===action.payload.name);
        state.attributes.splice(index,1);
      });
  },
});

export const { increment } = AttributeSlice.actions;


export const selectAttribute = (state) => state.attribute.attributes;


export default AttributeSlice.reducer;

// const fetchEntities = async () => {
//   // try {
//   //   const response = await axios.get('http://localhost:3001/attributes');
//   //   setEntities(response.data);
//   // } catch (error) {
//   //   console.error('Error fetching attributes:', error);
//   // }
// };

// const createAttribute = async () => {
//   // try {
//   //   await axios.post('http://localhost:3001/attributes', {
//   //     name: AttributeName,
//   //     attributes,
//   //   });
//   //   fetchEntities();
//   // } catch (error) {
//   //   console.error('Error creating Attribute:', error);
//   // }
// };

// const deleteAttribute = async (id) => {
//   // try {
//   //   await axios.delete(`http://localhost:3001/attributes/${id}`);
//   //   fetchEntities();
//   // } catch (error) {
//   //   console.error('Error deleting Attribute:', error);
//   // }
// };

// const fetchAttributeData = async (id) => {
//   // try {
//   //   const response = await axios.get(`http://localhost:3001/attributes/${id}`);
//   //   setSelectedAttribute(response.data);
//   // } catch (error) {
//   //   console.error('Error fetching Attribute data:', error);
//   // }
// };