import { atomWithStorage } from "jotai/utils";
import { Character } from "../types";

export const sceneCharactersAtom = atomWithStorage<Character[] | []>(
  "sceneCharacters",
  []
);
