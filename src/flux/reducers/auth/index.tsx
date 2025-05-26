import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id: string;
  username: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone?: string;
  dob: string;
  gender: string;
  role: "provider" | "client" | "admin"; // Updated to match schema
  about: {
    city: string;
    country: string;
    images: Array<string>;
    notifications: string;
    preferredGender: string;
    userId: string;
    _id: string;
    profilePic: string;
    interestsTags: Array<string>;
    lookingForTags: Array<string>;
    photos: Array<string>;
  };
};

type AuthState = {
  user: User;
  token: string | null;
  loading: boolean; // Flag to track the loading state
};

// @ts-ignore
const initialState: AuthState = {}

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<AuthState>>) => {
      console.log("Setting user:", action.payload.user);
      if (action.payload.user) {
        state.user = action.payload.user;
        state.token = action.payload.token || null;
      }
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // Set the loading flag when an authentication request starts/ends
      state.loading = action.payload;
    },
    clearUser: (state) => {
      // Clear user and token, reset loading state
      // @ts-ignore
      state.user = null;
      state.token = null;
      state.loading = false;
    },
  },
});

export default auth.reducer;
export const { setUser, setLoading, clearUser } = auth.actions;
