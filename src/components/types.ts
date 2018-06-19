export interface IVideoClip {
  id: string;
  title: string;
  endTime: number;
  startTime: number;
  src: string;
  image: string;
  tags: string[];
}

export interface IVideoClipOptional {
  id?: string;
  title?: string;
  endTime?: number;
  startTime?: number;
  src?: string;
  image?: string;
  tags?: string[];
}
