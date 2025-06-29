import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { InforProject } from "./type";

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setInforProject: (state, action: PayloadAction<InforProject>) => {
      state.inforProject = action.payload;
    },
  },
});

export const { setInforProject } = ProjectSlice.actions;
export default ProjectSlice.reducer;
