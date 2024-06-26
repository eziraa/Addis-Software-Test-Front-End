import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/customHook";
import {
  DeleteButton,
  FavoriteIcon,
  FavoritedIcon,
  MusicIcon,
  Pause,
  Play,
  PopUpContainer,
  SongActions,
  SongAlbum,
  SongArtist,
  SongContainer,
  SongDisplayer,
  SongDuration,
  SongHeader,
  SongInfo,
  SongInfoContainer,
  SongMetaData,
  SongTitle,
  SongsNotFound,
  UpdateButton,
  VerticalDots,
} from "./components.style";
import { SongResponse } from "../../../typo/songs/response";
import LoadingSpinner, { SmallSpinner } from "../spinner/spinner";
import { ScrollBar } from "../../utils/scrollbar.style";
import {
  deleteSongRequest,
  setCurrentSongForAction,
  setCurrentSongToPlay,
} from "../../../store/song/songSlice";
import { formatTime } from "../music_player/music-player";
import { CloseButton } from "../modal/components.style";
import {
  addFavoriteSongRequested,
  loadMyFavoriteSongsRequested,
  removeSongFromMyFavoriteRequested,
  setMinorTask,
} from "../../../store/user/userSlice";
import {
  ADD_SONG_TO_PLAYLIST,
  SEARCH_SONG_FROM_ALL,
  SEARCH_SONG_FROM_PLAYLIST,
  SEARCH_SONG_FROM_YOUR_SONGS,
  SEE_ALL_SONGS,
  SEE_MY_SONGS,
  SEE_PLAYLIST_SONGS,
  SELECT_PLAYLIST_TO_ADD_SONG,
  UPDATE_SONG,
} from "../../../config/constants/user-current-task";
import {
  addSongToPlaylistRequested,
  loadPlaylistsRequested,
  removeSongFromPlaylistRequested,
} from "../../../store/playlist/playlistSlice";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CgPlayListAdd, CgPlayListRemove } from "react-icons/cg";
import { PlayListBtn } from "../see_playlist/components.style";
import { timeAgo } from "../../utils/time_ago";
import { UnderlinedTitle } from "../../utils/titles";

interface PopUPProps {
  popUpIndex: number;
  setPopUpIndex: (index: number) => void;
}
function MusicTable({ popUpIndex, setPopUpIndex }: PopUPProps) {
  const songs = useAppSelector((state) => state.songs);
  const user = useAppSelector((state) => state.user);
  const playlists = useAppSelector((state) => state.playlists);

  const [song_list, setSongList] = useState<SongResponse[]>(songs.songs);
  const dispatch = useAppDispatch();
  const [actionItemIndex, setActionItemIndex] = useState(-1);

  useEffect(() => {
    if (user.majorTask === SEE_ALL_SONGS) {
      setSongList(songs.songs);
     user.user.id !== "" &&
       dispatch(loadMyFavoriteSongsRequested({ user_id: user.user.id }));
    } else if (user.majorTask === ADD_SONG_TO_PLAYLIST)
      setSongList(songs.songs);
    else if (user.majorTask === SEE_PLAYLIST_SONGS)
      setSongList(playlists.songs);
    else if (user.majorTask === SEE_MY_SONGS) setSongList(user.user.my_songs);
    else {
      setSongList(songs.query_set);
    }
  }, [
    songs.songs,
    user.user,
    songs.query_set,
    playlists.songs,
    user.majorTask,
  ]);

  const onDelete = (song: SongResponse) => {
    dispatch(setCurrentSongForAction(song));
    dispatch(deleteSongRequest(Number(song.id)));
    setPopUpIndex(-1);
  };
  const onUpdate = (song: SongResponse) => {
    dispatch(setCurrentSongForAction(song));
    dispatch(setMinorTask(UPDATE_SONG));
    setPopUpIndex(-1);
  };
  const onSelect = (song: SongResponse) => {
    dispatch(
      addSongToPlaylistRequested({
        playlist_id: playlists.currentPlaylist?.id || "",
        song_id: song.id,
      })
    );
  };
  const addSongToPlaylist = async (song: SongResponse) => {
    await dispatch(loadPlaylistsRequested(user.user.id));
    await dispatch(setCurrentSongForAction(song));
    await dispatch(setMinorTask(SELECT_PLAYLIST_TO_ADD_SONG));
    setPopUpIndex(-1);
  };

  if (
    ![
      SEE_ALL_SONGS,
      SEE_PLAYLIST_SONGS,
      ADD_SONG_TO_PLAYLIST,
      SEARCH_SONG_FROM_ALL,
      SEARCH_SONG_FROM_PLAYLIST,
      SEARCH_SONG_FROM_YOUR_SONGS,
      SEE_MY_SONGS,
    ].includes(user.majorTask || "")
  )
    return;
  if (songs.loading || user.loading || playlists.loading) {
    return <LoadingSpinner />;
  }
  return (
    <SongDisplayer>
      <UnderlinedTitle>
        {user.majorTask == SEE_ALL_SONGS && "All songs "}{" "}
        {user.majorTask == SEE_PLAYLIST_SONGS && "All songs from this playlist"}{" "}
        {[
          SEARCH_SONG_FROM_ALL,
          SEARCH_SONG_FROM_PLAYLIST,
          SEARCH_SONG_FROM_YOUR_SONGS,
        ].includes(user.majorTask ?? "") && " Songs Based on your query"}{" "}
        {user.majorTask == SEE_MY_SONGS && "All songs you uploaded"}{" "}
      </UnderlinedTitle>
      <ScrollBar
        style={{
          position: "relative",
          width: "70vw",
          maxHeight: "60vh",
          paddingBottom: "22vh",
        }}
      >
        {song_list.length === 0 ? (
          <SongHeader>
            <SongsNotFound>No songs found</SongsNotFound>
          </SongHeader>
        ) : (
          song_list.map((song, index, song_list) => (
            <SongContainer key={index}>
              <SongMetaData>
                {song.id !== songs.current_song_to_play?.id ? (
                  <Play
                    onClick={async () => {
                      await dispatch(
                        setCurrentSongToPlay({
                          song: undefined,
                          song_list: [],
                        })
                      );
                      setTimeout(() => {
                        dispatch(
                          setCurrentSongToPlay({
                            song,
                            song_list,
                          })
                        );
                      }, 0);
                    }}
                  />
                ) : (
                  <Pause
                    onClick={async () => {
                      songs.current_song.pause();
                      await dispatch(
                        setCurrentSongToPlay({
                          song: undefined,
                          song_list: [],
                        })
                      );
                    }}
                  />
                )}
                <MusicIcon />
                <SongInfoContainer>
                  <SongTitle> {song.title} </SongTitle>
                  <SongInfo>
                    <SongArtist> {song.artist} </SongArtist>
                    <SongAlbum> {song.album || "No Album"} </SongAlbum>
                    <p>{timeAgo(song.created_at)}</p>
                  </SongInfo>
                </SongInfoContainer>
              </SongMetaData>
              <SongActions>
                {user.majorTask === ADD_SONG_TO_PLAYLIST ? (
                  <PlayListBtn
                    onClick={() => {
                      setActionItemIndex(index);
                      onSelect(song);
                    }}
                    disabled={playlists.adding}
                  >
                    {playlists.adding && index == actionItemIndex ? (
                      <SmallSpinner />
                    ) : (
                      <>
                        <CgPlayListAdd size={18} />
                        Add
                      </>
                    )}
                  </PlayListBtn>
                ) : null}
                {user.majorTask === SEE_PLAYLIST_SONGS &&
                  (playlists.removing && index === actionItemIndex ? (
                    <SmallSpinner />
                  ) : (
                    <CgPlayListRemove
                      style={{ color: "#B41515", fontSize: "2.4rem" }}
                      onClick={async () => {
                        setActionItemIndex(index);
                        await dispatch(
                          removeSongFromPlaylistRequested({
                            playlist_id: playlists.currentPlaylist?.id || "",
                            song_id: song.id,
                          })
                        );
                      }}
                    />
                  ))}
                {user.isOnAction && index === actionItemIndex ? (
                  <SmallSpinner />
                ) : user.favorite_songs.some((item) => song.id === item.id) ? (
                  <FavoritedIcon
                    onClick={() => {
                      setActionItemIndex(index);
                      dispatch(
                        removeSongFromMyFavoriteRequested({
                          user_id: user.user.id || "",
                          song_id: song.id,
                        })
                      );
                    }}
                  />
                ) : (
                  <FavoriteIcon
                    onClick={() => {
                      setActionItemIndex(index);
                      dispatch(
                        addFavoriteSongRequested({
                          user_id: user.user?.id || "",
                          song_id: song.id,
                        })
                      );
                    }}
                  />
                )}

                <div
                  style={{
                    minWidth: "5vw",
                    display: "flex",
                    gap: "1vw",
                  }}
                >
                  <SongDuration>{formatTime(song.duration || 0)} </SongDuration>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <VerticalDots
                      onClick={() => {
                        setPopUpIndex(index);
                      }}
                    />

                    {index === popUpIndex && (
                      <PopUpContainer
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <CloseButton
                          style={{ top: "4px", right: "4px", color: "white" }}
                          onClick={() => setPopUpIndex(-1)}
                        />
                        {user.user.id === song.customer && (
                          <>
                            <DeleteButton onClick={() => onDelete(song)}>
                              <RiDeleteBin6Fill size={16} />
                              Delete
                            </DeleteButton>
                            <UpdateButton
                              style={{ marginTop: "0" }}
                              onClick={() => onUpdate(song)}
                            >
                              <MdModeEditOutline size={16} />
                              Edit
                            </UpdateButton>
                          </>
                        )}
                        <UpdateButton
                          style={{ marginTop: "0" }}
                          onClick={() => addSongToPlaylist(song)}
                        >
                          <CgPlayListAdd size={16} />
                          Add to playlist
                        </UpdateButton>
                      </PopUpContainer>
                    )}
                  </div>
                </div>
              </SongActions>
            </SongContainer>
          ))
        )}
      </ScrollBar>
    </SongDisplayer>
  );
}

export default MusicTable;
