import { HeartFill, Heart, StarFill, Star } from 'react-bootstrap-icons';
import songWinner from '../assets/audios/songWinner.mp3';

const audioWin = new Audio(songWinner);
export const countScore = 1000;
export const playSongIfScoreMatches = (score: number) => {
  if (score >= countScore) {
    audioWin.play();
  }
  return score;
};

export const stopPlaySong = () => {
  audioWin.pause();
  audioWin.currentTime = 0;
};

export const getLifeIcons = (life: number) => {
  if (life === 3) {
    return (
      <div className="flex justify-center items-center">
        <div className="hearts-wrap">
          <HeartFill className="heart-icon" />
          <HeartFill className="heart-icon" />
          <HeartFill className="heart-icon" />
        </div>
      </div>
    );
  }

  if (life === 2) {
    return (
      <div className="flex justify-center items-center">
        <div className="hearts-wrap">
          <HeartFill className="heart-icon" />
          <HeartFill className="heart-icon" />
          <Heart className="heart-icon" />
        </div>
      </div>
    );
  }

  if (life === 1) {
    return (
      <div className="flex justify-center items-center">
        <div className="hearts-wrap">
          <HeartFill className="heart-icon" />
          <Heart className="heart-icon" />
          <Heart className="heart-icon" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="hearts-wrap">
        <Heart className="heart-icon" />
        <Heart className="heart-icon" />
        <Heart className="heart-icon" />
      </div>
    </div>
  );
};

export const getStarsIcons = (assertPercetage: number) => {
  if (assertPercetage > 89) {
    return (
      <div>
        <div className="stars-wrap flex justify-center items-center">
          <StarFill className="star-perfect" />
          <StarFill className="star-perfect" />
          <StarFill className="star-perfect" />
          <StarFill className="star-perfect" />
          <StarFill className="star-perfect" />
        </div>
      </div>
    );
  }

  if (assertPercetage > 69) {
    return (
      <div className="stars-wrap flex justify-center items-center">
        <StarFill className="star-icon" />
        <StarFill className="star-icon" />
        <StarFill className="star-icon" />
        <StarFill className="star-icon" />
        <Star className="star-icon" />
      </div>
    );
  }

  if (assertPercetage > 49) {
    return (
      <div className="stars-wrap flex justify-center items-center">
        <StarFill className="star-icon" />
        <StarFill className="star-icon" />
        <StarFill className="star-icon" />
        <Star className="star-icon" />
        <Star className="star-icon" />
      </div>
    );
  }

  if (assertPercetage > 29) {
    return (
      <div className="stars-wrap flex justify-center items-center">
        <StarFill className="star-icon" />
        <StarFill className="star-icon" />
        <Star className="star-icon" />
        <Star className="star-icon" />
        <Star className="star-icon" />
      </div>
    );
  }

  if (assertPercetage > 1) {
    return (
      <div className="stars-wrap flex justify-center items-center">
        <StarFill className="star-icon" />
        <Star className="star-icon" />
        <Star className="star-icon" />
        <Star className="star-icon" />
        <Star className="star-icon" />
      </div>
    );
  }

  return (
    <div className="stars-wrap flex justify-center items-center">
      <Star className="star-icon" />
      <Star className="star-icon" />
      <Star className="star-icon" />
      <Star className="star-icon" />
      <Star className="star-icon" />
    </div>
  );
};
