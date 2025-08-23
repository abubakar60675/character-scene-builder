"use client";

import { useDrop, useDrag } from "react-dnd";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CharacterCard from "./CharacterCard";
import type { Character } from "@/lib/types";
import { Plus } from "lucide-react";

interface SceneZoneProps {
  characters: Character[];
  handleCharacterDrop: (character: Character) => void;
  handleRemoveFromScene: (characterId: string) => void;
  handleSceneReorder: (dragIndex: number, hoverIndex: number) => void;
}

export function SceneZone({
  characters,
  handleCharacterDrop,
  handleRemoveFromScene,
  handleSceneReorder,
}: SceneZoneProps) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "character",
      drop: (item: { character: Character }) => {
        handleCharacterDrop(item.character);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [handleCharacterDrop]
  );

  return (
    <Card
      className={`min-h-[400px] transition-colors ${
        isOver ? "bg-accent/50 border-primary" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Scene Zone
        </CardTitle>
        <CardDescription>
          Drag characters here to build your scene. Characters in the scene:{" "}
          {characters.length}
        </CardDescription>
      </CardHeader>
      <CardContent ref={drop as any}>
        {characters.length === 0 ? (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <div className="text-center space-y-2">
              <Plus className="h-12 w-12 text-muted-foreground/50 mx-auto" />
              <p className="text-muted-foreground">
                Drop characters here to add them to the scene
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map((character, index) => (
              <SortableCharacterCard
                key={character.id}
                character={character}
                index={index}
                handleSceneReorder={handleSceneReorder}
                handleRemoveFromScene={() =>
                  handleRemoveFromScene(character.id)
                }
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface SortableCharacterCardProps {
  character: Character;
  index: number;
  handleSceneReorder: (dragIndex: number, hoverIndex: number) => void;
  handleRemoveFromScene: () => void;
}

function SortableCharacterCard({
  character,
  index,
  handleSceneReorder,
  handleRemoveFromScene,
}: SortableCharacterCardProps) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "scene-character",
      drop: (item: { index: number }) => {
        if (item.index !== index) {
          handleSceneReorder(item.index, index);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [index, handleSceneReorder]
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "scene-character",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index]
  );

  return (
    <div
      ref={(node) => drop(drag(node)) as any}
      className={`${isDragging ? "opacity-50" : ""} ${
        isOver ? "scale-105 transition-transform" : ""
      }`}
    >
      <CharacterCard
        character={character}
        isDraggable={true}
        showRemove={true}
        handleRemoveFromScene={handleRemoveFromScene}
        dragType="scene-character"
        dragItem={{ index }}
      />
    </div>
  );
}
