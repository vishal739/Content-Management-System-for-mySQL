import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTableData, createTableData, updateTableData, deleteTableData } from "./tableDataAPI";

const initialState = {
  value: 0,
  table: [],
};


export const fetchTableDataAsync = createAsyncThunk(
  "tableData/fetchTableData",
  async (entity) => {
    console.log("fetchAsyncTableDta:",entity);
    const response = await fetchTableData(entity);
    console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createTableDataAsync = createAsyncThunk(
  "tableData/createTableData",
  async (tableData) => {
    const response = await createTableData(tableData);
    console.log("createAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateTableDataAsync = createAsyncThunk(
  "tableData/updateTableData",
  async (tableData) => {
    const response = await updateTableData(tableData);
    console.log("updateAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteTableDataAsync = createAsyncThunk(
  "tableData/deleteTableData",
  async (data) => {
    const response = await deleteTableData(data);
    console.log("deleteAsync: ",response);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchTableDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTableDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.table= action.payload.data;
      })
      .addCase(createTableDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTableDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("action",action.payload);
        state.table.push(action.payload.data);
      })
      .addCase(updateTableDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTableDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("updateTableAsync: ",action.payload.data);
        const ind= action.payload.data.index;
        const attribute=action.payload.data.attribute;

        state.table[ind][attribute]=action.payload.data.value;
        // state.data.push(action.payload);
      })
      .addCase(deleteTableDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTableDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index= action.payload.index;
        //state.table.findIndex(item=>item.id===action.payload.id);
        state.table.splice(index,1);
      });
  },
});

export const { increment } = tableDataSlice.actions;


export const selectTableData = (state) => state.tableData.table;


export default tableDataSlice.reducer;

// const fetchEntities = async () => {
//   // try {
//   //   const response = await axios.get('http://localhost:3001/data');
//   //   setEntities(response.data);
//   // } catch (error) {
//   //   console.error('Error fetching data:', error);
//   // }
// };

// const createTableData = async () => {
//   // try {
//   //   await axios.post('http://localhost:3001/data', {
//   //     name: tableDataName,
//   //     attributes,
//   //   });
//   //   fetchEntities();
//   // } catch (error) {
//   //   console.error('Error creating tableData:', error);
//   // }
// };

// const deleteTableData = async (id) => {
//   // try {
//   //   await axios.delete(`http://localhost:3001/data/${id}`);
//   //   fetchEntities();
//   // } catch (error) {
//   //   console.error('Error deleting tableData:', error);
//   // }
// };

// const fetchTableDataData = async (id) => {
//   // try {
//   //   const response = await axios.get(`http://localhost:3001/data/${id}`);
//   //   setSelectedTableData(response.data);
//   // } catch (error) {
//   //   console.error('Error fetching tableData data:', error);
//   // }
// };