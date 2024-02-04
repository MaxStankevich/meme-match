import { get } from "lodash";

export const getMemeImageUrl = (meme) => {
  return get(meme, "sources[0].cdnLink");
};
