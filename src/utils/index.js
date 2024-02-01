import { getBaseUrl } from "../axios.js";

export const getMemeImageUrl = (meme) => {
  if (!meme?.id) return "";
  return meme.sources?.length
    ? `${getBaseUrl()}/memes/${meme.id}/sources/${meme.sources[0]?.id}/image`
    : `${getBaseUrl()}/memes/${meme.id}/sources/${meme.id}/image`;
};
