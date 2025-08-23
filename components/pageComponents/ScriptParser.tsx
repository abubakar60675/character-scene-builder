"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { Character } from "@/lib/types";
import { parseScript } from "@/lib/utils";
import { generateCharacterImage } from "@/lib/actions";
import { useMutation } from "@tanstack/react-query";

// Sample script from IMSDb for testing
const SAMPLE_SCRIPT = `FADE IN:

EXT. GOTHAM CITY - NIGHT

The city sprawls beneath a dark sky, neon lights cutting through the shadows.

BATMAN
(into comm device)
Alfred, I'm seeing movement in the warehouse district.

ALFRED (V.O.)
Be careful, Master Bruce. The Joker's men have been spotted in that area.

INT. WAREHOUSE - CONTINUOUS

JOKER stands in the center of the room, his maniacal grin visible even in the dim light.

JOKER
(laughing)
Oh, Batsy! Come out, come out, wherever you are!

HARLEY QUINN enters from the shadows, baseball bat in hand.

HARLEY QUINN
Puddin', the cops are getting closer. We should scram!

JOKER
(spinning around)
Not yet, my dear Harley. The fun is just beginning!

BATMAN crashes through the skylight, cape billowing dramatically.

BATMAN
It's over, Joker.

JOKER
(clapping slowly)
Bravo! Right on cue, as always.`;

interface ScriptParserProps {
  handleCharactersDetected: (characters: Character[]) => void;
}

const ScriptParser: React.FC<ScriptParserProps> = ({
  handleCharactersDetected,
}) => {
  const [script, setScript] = useState(SAMPLE_SCRIPT);

  const handleParseScript = async () => {
    try {
      // Parse the script to detect characters
      const detectedCharacters = parseScript(script);

      // Generate images for each character
      const charactersWithImages = await Promise.all(
        detectedCharacters.map(async (character) => {
          try {
            const imageUrl = await generateCharacterImage(
              character.name,
              character.description
            );
            return {
              ...character,
              imageUrl,
              caption: `${character.name} - ${character.description}`,
            };
          } catch (error) {
            console.error(
              `Failed to generate image for ${character.name}:`,
              error
            );
            return {
              ...character,
              caption: `${character.name} - ${character.description}`,
            };
          }
        })
      );

      handleCharactersDetected(charactersWithImages);
    } catch (error) {
      console.error("Failed to parse script:", error);
    }
  };

  const { mutate, isPending } = useMutation({ mutationFn: handleParseScript });

  const handleSubmit = () => {
    mutate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Script Parser</CardTitle>
        <CardDescription>
          Parse your script to automatically detect characters and generate
          their images
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Paste your script here..."
          className="min-h-[200px] font-mono text-sm"
        />
        <Button
          onClick={handleSubmit}
          disabled={isPending || !script.trim()}
          className="w-full cursor-pointer"
          type="button"
        >
          {isPending
            ? "Processing Script..."
            : "Parse Script & Generate Images"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ScriptParser;
