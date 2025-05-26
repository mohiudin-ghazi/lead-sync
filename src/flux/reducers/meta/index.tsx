import { createSlice } from "@reduxjs/toolkit";

type typeMeta = {
  templates: Array<any>;
};
// @ts-ignore
const initialState: typeMeta = {};

const meta = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setTemplates: (state = initialState, action) => {
      if (Object.keys(action.payload).length !== 0) {
        return { ...state, templates: action.payload };
      }
      return action.payload;
    },
  },
});
export default meta.reducer;

export const { setTemplates } = meta.actions;
