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
};

const UserSlice = createSlice({
  name: "user",
  initialState: InitialUserState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginParameters>) => {
      state.loading = true;
    },
    loginDone: (state, action: PayloadAction<UserResponse>) => {
      state.user = action.payload;
      state.loading = false;
      state.minorTask = undefined;
      state.isLogin = true;
    },
    signUpRequest: (state, action: PayloadAction<SignUpParameters>) => {
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
      action: PayloadAction<AddFavoriteSongsParams>
    ) => {
      state.isOnAction = true;
    },

    addFavoriteSongDone: (state, action: PayloadAction<SongResponse>) => {
      state.isOnAction = false;
      state.favorite_songs?.push(action.payload);
    },

    loadMyFavoriteSongsRequested: (
      state,
      action: PayloadAction<GetMyFavoriteParams>
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
      action: PayloadAction<AddFavoriteSongsParams>
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
    loadMySongsRequested: (
      state,
      action: PayloadAction<GetMyFavoriteParams>
    ) => {
      state.loading = true;
      state.user.my_songs = [];
    },
    loadMySongsDone: (state, action: PayloadAction<SongResponse[]>) => {
      state.loading = false;
      state.user.my_songs = action.payload;
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
} = UserSlice.actions;
export default UserSlice.reducer;

