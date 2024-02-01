import { getBaseUrl } from "../axios.js";

export const getMemeImageUrl = (meme) => {
  return `${getBaseUrl()}/memes/${meme.id}/sources/${meme.sources[0]?.id}/image`;
};
