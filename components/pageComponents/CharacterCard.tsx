"use client";

import { useDrag } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Character } from "@/lib/types";
import { GripVertical, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface CharacterCardProps {
  character: Character;
  isDraggable?: boolean;
  showRemove?: boolean;
  handleRemoveFromScene?: () => void;
  dragType?: string;
  dragItem?: any;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isDraggable = false,
  showRemove = false,
  handleRemoveFromScene,
  dragType = "character",
  dragItem,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dragType,
      item: dragItem || { character },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: isDraggable,
    }),
    [character, isDraggable, dragType, dragItem]
  );

  return (
    <Card
      ref={isDraggable ? drag : (undefined as any)}
      className={`relative ${isDragging ? "opacity-50 shadow-lg" : ""} ${
        isDraggable ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {showRemove && handleRemoveFromScene && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFromScene();
          }}
          variant="destructive"
          className="absolute -top-3 -right-2  rounded-full w-6 h-6 flex items-center justify-center text-xs text-white cursor-pointer   transition-colors "
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
      <CardContent className="p-4">
        {isDraggable && (
          <div className="absolute top-2 right-2 text-muted-foreground">
            <GripVertical className="h-4 w-4" />
          </div>
        )}

        <div className="space-y-3">
          <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
            {character.isGenerating ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : character.imageUrl ? (
              <Image
                src={character.imageUrl || "/placeholder.svg"}
                alt={character.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{character.name}</h3>
              <Badge variant="secondary">Character</Badge>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {character.description}
            </p>

            {character.caption && (
              <p className="text-xs text-muted-foreground italic">
                {character.caption}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
