import { BackIcon, ForwardIcon } from "../../utils/icons/navigation_icon";
import {
  Player,
  Wrapper,
  Details,
  PlayingNow,
  TrackContainer,
  TrackName,
  TrackArtist,
  SliderContainer,
  SeekSlider,
  VolumeContainer,
  VolumeSlider,
  ButtonContainer,
  RandomTrack,
  PrevTrack,
  PlayPauseTrack,
  NextTrack,
  RepeatTrack,
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
  return (
    <Player>
      <Wrapper style={{ position: "relative" }}>
        <Details>
          <PlayingNow>PLAYING current_index / Total_song</PlayingNow>
          <TrackContainer></TrackContainer>
          <TrackName> Track Name </TrackName>
          <TrackArtist> Artist </TrackArtist>
        </Details>
        <SliderContainer>
          <SeekSlider type="range" min="0" />
        </SliderContainer>
        <SliderContainer>
          <VolumeContainer>
            <VolumeSlider type="range" min="0" max="100" />
          </VolumeContainer>
          <ButtonContainer>
            <RandomTrack></RandomTrack>
            <PrevTrack>
              <BackIcon />
            </PrevTrack>
            <PlayPauseTrack></PlayPauseTrack>
            <NextTrack>
              <ForwardIcon />
            </NextTrack>
            <RepeatTrack></RepeatTrack>
          </ButtonContainer>
        </SliderContainer>
      </Wrapper>
    </Player>
  );
}