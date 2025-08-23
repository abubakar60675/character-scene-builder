"use client";

import CharacterCard from "./CharacterCard";
import type { Character } from "@/lib/types";

interface CharacterGridProps {
  characters: Character[];
}
const CharacterGrid = ({ characters }: CharacterGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          isDraggable={true}
        />
      ))}
    </div>
  );
};

export default CharacterGrid;
