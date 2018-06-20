import { IVideoClip } from "../components/types";

export const isiOS =
  !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

export const isMobile = window.innerWidth <= 768;

export const showSpinnerNextVideo = (
  currentTime,
  endTime,
  duration,
  autoPlaylist
) => {
  const fixEndTime = endTime > duration ? duration : endTime;
  return currentTime >= fixEndTime && duration !== 0 && autoPlaylist;
};

export const findVideoClipIndexForId = (
  playlist: IVideoClip[],
  id: string
): any => {
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].id === id) {
      return i;
    }
  }
  return null;
};

export const findVideoClipForId = (playlist: IVideoClip[], id): IVideoClip => {
  return playlist[findVideoClipIndexForId(playlist, id)];
};

export const isTypeEqual = (component1, component2) => {
  const type1 = component1.type;
  const type2 = component2.type;

  if (typeof type1 === "string" || typeof type2 === "string") {
    return type1 === type2;
  }

  if (typeof type1 === "function") {
    return type1 === component2;
  }

  return false;
};

export function formatTime(secondsParam = 0, guide = secondsParam) {
  let seconds: any = Math.floor(secondsParam % 60);
  let minutes: any = Math.floor((secondsParam / 60) % 60);
  let hours: any = Math.floor(secondsParam / 3600);
  const guideMinutes = Math.floor((guide / 60) % 60);
  const guideHours = Math.floor(guide / 3600);

  if (isNaN(secondsParam) || secondsParam === Infinity) {
    hours = minutes = seconds = "-";
  }

  hours =
    hours > 0 || guideHours > 0
      ? hours < 10
        ? `0${hours}:`
        : `${hours}:`
      : "";

  minutes = `${
    (hours || guideMinutes >= 10) && minutes < 10 ? `0${minutes}` : minutes
  }:`;

  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return hours + minutes + seconds;
}

export const arrayShuffle = array => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export function setStorage(key, value) {
  if (key && typeof value !== "undefined") {
    window.localStorage[key] = JSON.stringify(value);
  }
}

export function getStorage(key) {
  const value = window.localStorage[key];

  return value ? JSON.parse(value) : undefined;
}

export function cleanDeprecatedStorage(name, version) {
  Object.keys(window.localStorage)
    .filter(
      keyStore =>
        keyStore.indexOf(name) > -1 && keyStore.indexOf(version) === -1
    )
    .forEach((key: any) => {
      delete window.localStorage[key];
    });
}

export function copy(ob: any) {
  return JSON.parse(JSON.stringify(ob));
}

export function convertToTimeRange(time, duration) {
  if (isNaN(duration) || duration === 0) {
    return 0;
  }
  return (Math.round(time) * 1000) / Math.round(duration);
}

export function convertToTime(time, duration = 0) {
  return Math.round((Math.round(time) * Math.round(duration)) / 1000);
}

export const formatTooltipRange = (duration: number) => time => {
  return formatTime(convertToTime(time, duration));
};

export const getRandomArray = (arr: any[]) => {
  return Math.floor(Math.random() * arr.length);
};

export const getPlaylistActions = (
  index: number,
  playlist: IVideoClip[],
  repeat: boolean,
  random: boolean
): {
  currentVideoClip?: IVideoClip;
  backVideoClip?: IVideoClip;
  nextVideoClip?: IVideoClip;
} => {
  let nextVideoClip;
  let backVideoClip;
  let currentVideoClip;

  if (index !== null) {
    if (random) {
      const newPlaylist = playlist.filter(
        (videoClip, indexVideo) => index !== indexVideo
      );

      nextVideoClip = newPlaylist[getRandomArray(newPlaylist)];
    } else {
      nextVideoClip = playlist[index + 1];
      backVideoClip = playlist[index - 1];

      if (repeat && !nextVideoClip) {
        nextVideoClip = playlist[0];
      }
    }

    currentVideoClip = playlist[index];
    return {
      backVideoClip,
      currentVideoClip,
      nextVideoClip
    };
  }
  return {};
};
