import { IVideoClip } from "../../components";
import { IFormSuccess } from "./type";

export const validRequired = (value: string = ""): boolean => {
  return !!value.trim().length;
};

export const validTime = (value: string = ""): boolean => {
  return value.replace(/\s|\_/g, '').length - 2 === 6;
};

export const getTime = (value: string = ""): number => {
  const hmsArray = value.split(":");
  return +hmsArray[0] * 60 * 60 + +hmsArray[1] * 60 + +hmsArray[2];
};

export const validImageURL = (url: string = ""): boolean => {
  return url.match(/\.(jpeg|jpg|gif|png)/) !== null;
};

export const validVideoURL = (url: string = ""): boolean => {
  return url.match(/\.mp4/) != null;
};

export const parseFormtoPlaylist = (value: IFormSuccess): IVideoClip => {
  return {
    endTime: getTime(value.endTime),
    id: String(Date.now()),
    image: value.image,
    src: value.video,
    startTime: getTime(value.startTime),
    tags: value.tags,
    title: value.title
  };
};
