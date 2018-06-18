import { IPlaylistItem } from "../components/types";

export const showSpinnerNextVideo = (
  currentTime,
  endTime,
  duration,
  autoPlaylist
) => {
  const fixEndTime = endTime > duration ? duration : endTime;
  return currentTime >= fixEndTime && duration !== 0 && autoPlaylist;
};

export const findIndexPlaylistForId = (
  playlist: IPlaylistItem[],
  id: string
): any => {
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].id === id) {
      return i;
    }
  }
  return null;
};

export const findPlaylistItemForId = (playlist, id): IPlaylistItem => {
  return playlist[findIndexPlaylistForId(playlist, id)];
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

export function setStorage(key, value) {
  if (key && typeof value !== "undefined") {
    window.localStorage[key] = JSON.stringify(value);
  }
}

export function getStorage(key) {
  const value = window.localStorage[key];

  return value ? JSON.parse(value) : undefined;
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
