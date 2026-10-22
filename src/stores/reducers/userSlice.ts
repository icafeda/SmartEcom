import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage'


// 1. Khai báo kiểu dữ liệu cho User
export interface UserProfile {
  uid: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
}

interface UserState {
  userData: UserProfile | null; // Cấu hình userData chứa uid hoặc null
  isSignIn: boolean
}

const initialState: UserState = {
  userData: null,
  isSignIn: false
};

const userSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserProfile>) => {
      state.userData = action.payload;
      AsyncStorage.setItem("USER_DATA", JSON.stringify(action.payload))
      state.isSignIn = false;
    },
    setIsSignIn: (state, action: PayloadAction<boolean>) => {
      state.isSignIn = action.payload
    }
  },
});

export const { setUserData, setIsSignIn } = userSlice.actions;
export default userSlice.reducer