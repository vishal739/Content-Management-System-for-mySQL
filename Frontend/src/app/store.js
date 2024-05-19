import { configureStore } from "@reduxjs/toolkit";
import entityReducer  from "../features/Entity/entitySlice"
import attributeReducer from "../features/Attribute/attributeSlice"
import tableDataReducer from "../features/tableData/tableDataSlice"
export const store = configureStore({
  reducer: {
    entity: entityReducer,
    attribute: attributeReducer,
    tableData: tableDataReducer
  },
});
