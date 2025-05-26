import { createSlice } from "@reduxjs/toolkit";

type storyType = {
  _id: string;
  userId: string;
  type: string;
  content: string;
  likes: [];
  disLikes: [];
  reactions: [];
  comments: [];
  createdAt: Date;
  updatedAt: Date;
};

type storyObjType = {
  personalStories: Array<storyType>;
  userStories: Array<storyType>;
};

const initialState: storyObjType = { personalStories: [], userStories: [] };

const story = createSlice({
  name: "story",
  initialState,
  reducers: {
    setStory: (state = initialState, action) => {
      if (Object.keys(action.payload).length !== 0) {
        return { ...state, ...action.payload };
      }
      return action.payload;
    },
  },
});

export default story.reducer;
export const { setStory } = story.actions;
