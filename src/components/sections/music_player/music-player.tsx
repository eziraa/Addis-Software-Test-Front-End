import { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { setCurrentSongToPlay } from "../../../store/song/songSlice";
import { useAppSelector, useAppDispatch } from "../../../utils/customHook";
import { CloseButton } from "../modal/components.style";
import {
  Player,
  Wrapper,
  Details,
  PlayingNow,
  TrackContainer,
  Loader,
  Stroke,
  TrackArt,
  TrackName,
  TrackArtist,
  SliderContainer,
  CurrentTime,
  SeekSlider,
  TotalDuration,
  VolumeContainer,
  VolumeDownIcon,
  VolumeSlider,
  VolumeUpIcon,
  ButtonContainer,
  RandomTrack,
  RandomActive,
  PrevTrack,
  BackIcon,
  PlayPauseTrack,
  IconPause,
  IconPlay,
  NextTrack,
  ForwardIcon,
  RepeatTrack,
  RepeatIcon,
} from "./components.style";

export const formatTime = (seconds: number) => {
  // Format seconds into MM:SS format
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return (
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (remainingSeconds < 10 ? "0" : "") +
    remainingSeconds
  );
};

export default function PlayerComponent() {
  const songs = useAppSelector((state) => state.songs);
  const dispatch = useAppDispatch();
  const [trackIndex, setTrackIndex] = useState(
    songs.current_song_to_play
      ? songs.playing_music_list.indexOf(songs.current_song_to_play)
      : 0
  );
  const [isRandom, setIsRandom] = useState(false);
  const [volume, setVolume] = useState(50); // Initial volume level
  const [currentTime, setCurrentTime] = useState("00"); // Initial volume level
  const [currTrack, setCurrTrack] = useState(
    new Audio(api + songs.current_song_to_play?.song_file)
  );
  const [isPlaying, setIsPlaying] = useState(!currTrack.paused);

  useEffect(() => {
    currTrack.pause();
  }, [songs.current_song_to_play]);
  useEffect(() => {
    currTrack.pause();
    setIsPlaying(false);
    if (trackIndex >= 0 && trackIndex < songs.playing_music_list.length)
      loadTrack(api + songs.playing_music_list[trackIndex].song_file);
  }, [trackIndex]);

  useEffect(() => {
    const updateTimer = setInterval(setUpdate, 1000);
    return () => clearInterval(updateTimer);
  }, [currTrack]);
  const setUpdate = () => {
    setCurrentTime(formatTime(currTrack.currentTime));
  };
  const loadTrack = (address: string) => {
    const track = new Audio(address);
    setCurrTrack(track);
    setVolume(50);
  };

  const playPauseTrack = () => {
    if (isPlaying) {
      currTrack.pause();
      setIsPlaying(false);
    } else {
      currTrack.play();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    currTrack.paused ?? currTrack.pause();
    let newIndex;
    if (isRandom) {
      newIndex = Math.floor(Math.random() * songs.playing_music_list.length);
    } else {
      newIndex = (trackIndex + 1) % songs.playing_music_list.length;
    }
    setTrackIndex(newIndex);
    dispatch(
      setCurrentSongToPlay({
        song: songs.playing_music_list[newIndex],
        song_list: songs.playing_music_list,
      })
    );
  };

  const prevTrack = () => {
    let newIndex;
    if (isRandom) {
      newIndex = Math.floor(Math.random() * songs.playing_music_list.length);
    } else {
      newIndex =
        (trackIndex - 1 + songs.playing_music_list.length) %
        songs.playing_music_list.length;
    }
    setTrackIndex(newIndex);
    dispatch(
      setCurrentSongToPlay({
        song: songs.playing_music_list[newIndex],
        song_list: songs.playing_music_list,
      })
    );
  };
  const randomTrack = () => {
    setIsRandom(!isRandom);
  };

  const handleTimeChange = (event: any) => {
    const time = event.target.value;
    currTrack.currentTime = time;
    setCurrentTime(time);
  };
  const handleDragStart = (event: any) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  if (songs.playing_music_list.length < 0) return;
  return (
    <Player id="draggable" draggable="true" onDragStart={handleDragStart}>
      <Wrapper style={{ position: "relative" }}>
        <CloseButton
          style={{
            top: "0px",
            right: "20px",
          }}
          onClick={() => {
            currTrack.pause();
            dispatch(
              setCurrentSongToPlay({
                song: undefined,
                song_list: [],
              })
            );
          }}
        />
        <Details>
          <PlayingNow>
            PLAYING {trackIndex + 1}/{songs.playing_music_list.length}{" "}
          </PlayingNow>
          <TrackContainer>
            {isPlaying ? (
              <>
                <Loader>
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                  <Stroke />
                </Loader>
              </>
            ) : (
              <TrackArt />
            )}
          </TrackContainer>
          <TrackName> {songs.current_song_to_play?.title} </TrackName>
          <TrackArtist>{songs.current_song_to_play?.artist}</TrackArtist>
        </Details>
        <SliderContainer>
          <CurrentTime> {formatTime(currTrack.currentTime)} </CurrentTime>
          <SeekSlider
            type="range"
            min="0"
            max={currTrack.duration.toString()}
            value={currTrack.currentTime}
            onChange={handleTimeChange}
          />
          <TotalDuration>
            {" "}
            {formatTime(songs.current_song_to_play?.duration || 0)}{" "}
          </TotalDuration>
        </SliderContainer>
        <SliderContainer>
          <VolumeContainer>
            <VolumeDownIcon
              onClick={() => {
                setVolume(volume - 5 > 0 ? volume - 5 : volume);
                currTrack.volume = volume / 100;
              }}
            />
            <VolumeSlider
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                currTrack.volume = volume / 100;
              }}
            />
            <VolumeUpIcon
              onClick={() => {
                setVolume(volume + 5 < 100 ? volume + 5 : volume);
                currTrack.volume = volume / 100;
              }}
            />
          </VolumeContainer>
          <ButtonContainer>
            <RandomTrack
              style={{
                backgroundColor: `${isRandom ? "#a00677" : "transparent"}`,
              }}
              onClick={() => randomTrack()}
            >
              <RandomActive />
            </RandomTrack>
            <PrevTrack onClick={() => prevTrack()}>
              <BackIcon />
            </PrevTrack>
            <PlayPauseTrack onClick={() => playPauseTrack()}>
              {isPlaying ? <IconPause /> : <IconPlay />}
            </PlayPauseTrack>
            <NextTrack onClick={() => nextTrack()}>
              <ForwardIcon />
            </NextTrack>
            <RepeatTrack
              onClick={() => setIsRandom(false)}
              style={{
                backgroundColor: `${isRandom ? "transparent" : "#a00677"}`,
              }}
            >
              <RepeatIcon />
            </RepeatTrack>
          </ButtonContainer>
        </SliderContainer>
      </Wrapper>
    </Player>
  );
}
