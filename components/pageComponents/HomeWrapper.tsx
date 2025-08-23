"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ScriptParser from "./ScriptParser";
import CharacterGrid from "./CharacterGrid";
import { SceneZone } from "./SceneZone";
import type { Character } from "@/lib/types";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { sceneCharactersAtom } from "@/lib/store";

const HomeWrapper = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [sceneCharacters, setSceneCharacters] = useAtom(sceneCharactersAtom);

  const handleCharactersDetected = (detectedCharacters: Character[]) => {
    setCharacters(detectedCharacters);
  };

  const handleCharacterDrop = (character: Character) => {
    // Check if character is already in scene
    if (sceneCharacters.find((c) => c.id === character.id)) {
      toast.error("Character already in scene", {
        description: `${character.name} is already part of the scene.`,
      });

      return;
    }

    setSceneCharacters((prev) => [...prev, character]);
    toast.success("Character added to scene", {
      description: `${character.name} has been added to the scene.`,
    });
  };

  const handleRemoveFromScene = (characterId: string) => {
    setSceneCharacters((prev) => prev.filter((c) => c.id !== characterId));
    toast.success("Character removed", {
      description: "Character has been removed from the scene.",
    });
  };

  const handleSceneReorder = (dragIndex: number, hoverIndex: number) => {
    setSceneCharacters((prev) => {
      const newCharacters = [...prev];
      const draggedCharacter = newCharacters[dragIndex];
      newCharacters.splice(dragIndex, 1);
      newCharacters.splice(hoverIndex, 0, draggedCharacter);
      return newCharacters;
    });
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Abyss Script Parser
              </h1>
              <p className="text-muted-foreground">
                Parse scripts, detect characters, and build scenes with
                AI-generated images
              </p>
            </header>

            <div className="space-y-8">
              {/* Script Parser Section */}
              <ScriptParser
                handleCharactersDetected={handleCharactersDetected}
              />

              {/* Character Grid Section */}
              {characters.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Detected Characters
                  </h2>
                  <CharacterGrid characters={characters} />
                </div>
              )}

              {/* Scene Zone Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Scene Builder</h2>
                <SceneZone
                  characters={sceneCharacters}
                  handleCharacterDrop={handleCharacterDrop}
                  handleRemoveFromScene={handleRemoveFromScene}
                  handleSceneReorder={handleSceneReorder}
                />
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default HomeWrapper;
