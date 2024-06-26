import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateType } from "../../typo/user/states";
import {
  AddFavoriteSongsParams,
  GetMyFavoriteParams,
  LoginParameters,
  SignUpParameters,
} from "../../typo/user/parameters";
import { UserResponse } from "../../typo/user/response";
import { SongResponse } from "../../typo/songs/response";
const defaultUserResponse = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  favorite_songs: [],
  my_songs: [],
  my_playlists: [],
};

const InitialUserState: UserStateType = {
  loading: false,
  user: defaultUserResponse,
  isLogin: false,
  isOnAction: false,
  favorite_songs: [],
  minorTask: undefined,
  majorTask: undefined,
  isLogout: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState: InitialUserState,
  reducers: {
    loginRequest: (state, _: PayloadAction<LoginParameters>) => {
      state.loading = true;
    },
    loginDone: (state, action: PayloadAction<UserResponse>) => {
      state.user = action.payload;
      state.loading = false;
      state.minorTask = undefined;
      state.isLogin = true;
    },
    signUpRequest: (state, _: PayloadAction<SignUpParameters>) => {
      state.loading = true;
    },
    setMinorTask: (state, actions: PayloadAction<string | undefined>) => {
      state.minorTask = actions.payload;
    },
    setMajorTask: (state, actions: PayloadAction<string | undefined>) => {
      state.majorTask = actions.payload;
    },

    addFavoriteSongRequested: (
      state,
      _: PayloadAction<AddFavoriteSongsParams>
    ) => {
      state.isOnAction = true;
    },

    addFavoriteSongDone: (state, action: PayloadAction<SongResponse>) => {
      state.isOnAction = false;
      state.favorite_songs?.push(action.payload);
    },

    loadMyFavoriteSongsRequested: (
      state,
      _: PayloadAction<GetMyFavoriteParams>
    ) => {
      state.loading = true;
      state.favorite_songs = [];
    },
    loadMyFavoriteSongsDone: (state, action: PayloadAction<SongResponse[]>) => {
      state.loading = false;
      state.favorite_songs = action.payload;
    },
    removeSongFromMyFavoriteRequested: (
      state,
      _: PayloadAction<AddFavoriteSongsParams>
    ) => {
      state.isOnAction = true;
    },

    removeSongFromMyFavoriteDone: (
      state,
      action: PayloadAction<SongResponse>
    ) => {
      state.favorite_songs = state.favorite_songs.filter(
        (song) => song.id !== action.payload.id
      );
      state.isOnAction = false;
      state.minorTask = undefined;
    },
    loadMySongsRequested: (state, _: PayloadAction<GetMyFavoriteParams>) => {
      state.loading = true;
      state.user.my_songs = [];
    },
    loadMySongsDone: (state, action: PayloadAction<SongResponse[]>) => {
      state.loading = false;
      state.user.my_songs = action.payload;
    },
    logoutRequested: (state) => {
      state.isLogout = true;
    },
    logoutDone: (state) => {
      state.loading = false;
      state.user = defaultUserResponse;
      state.isLogin = false;
      state.isOnAction = false;
      state.favorite_songs = [];
      state.minorTask = undefined;
      state.majorTask = undefined;
      state.isLogout = false;
    },
  },
});

export const {
  loginDone,
  loginRequest,
  signUpRequest,
  setMajorTask,
  setMinorTask,
  addFavoriteSongRequested,
  addFavoriteSongDone,
  loadMyFavoriteSongsRequested,
  loadMyFavoriteSongsDone,
  removeSongFromMyFavoriteRequested,
  removeSongFromMyFavoriteDone,
  loadMySongsRequested,
  loadMySongsDone,
  logoutRequested,
  logoutDone,
} = UserSlice.actions;
export default UserSlice.reducer;

