import { create } from "zustand";

type util = {
  displayTime: (mills: number) => string,
  displayIntensity: (intensity: number) => string,
  timeDiff: (currentTime: number, oldTime: number) => string,
  extractYtID: (url: string) => string;
}

export const useUtilStore = create<util>((get, set)=>({
  displayTime: (mills: number) => {
    const date = new Date(mills);
    return date.toLocaleTimeString();
  },
  displayIntensity: (intensity: number) => {
    switch(intensity){
      case 1: return 'Slow'
      case 2: return 'Medium'
      case 3: return 'Fast'
      default: return ''
    }
  },
  timeDiff: (currentTime: number, oldTime: number) => {
    const diff = currentTime - oldTime;
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    if (diff < msPerMinute) {
      return Math.round(diff / 1000) + 's ago';
    } else if (diff < msPerHour) {
      return Math.round(diff / msPerMinute) + 'm ago';
    } else {
      return Math.round(diff / msPerHour) + 'h ago';
    }
  },
  extractYtID: (url: string) : string => {
    const paramString = url.split('v=')[1];
    if (paramString) {
        const videoId = paramString.split('&')[0];
        return videoId;
    }
    return "";
  },
}))