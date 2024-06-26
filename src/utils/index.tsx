import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { routerConfig } from "../config/router/router";
import songSlice from "../store/song/songSlice";
import notificationSlice from "../store/notification/notificationSlice";
import playlistSlice from "../store/playlist/playlistSlice";
import { rootSaga } from "./saga";
import UserSlice from "../store/user/userSlice";

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.setContext({
  router: routerConfig,
});
const store = configureStore({
  reducer: {
    songs: songSlice,
    user: UserSlice,
    notifications: notificationSlice,
    playlists: playlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "song/addSongRequested",
          "playlist/addPlaylistRequested",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.song_file", "payload.image"],
        // Ignore these paths in the state
        ignoredPaths: ["song.song_file", "playlist.image"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

