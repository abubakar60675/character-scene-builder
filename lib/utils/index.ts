import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Character } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseScript(scriptText: string): Character[] {
  const lines = scriptText.split("\n").filter((line) => line.trim());
  const characters = new Map<string, Character>();

  // Character detection patterns
  const characterLinePattern = /^([A-Z][A-Z\s]+)$/;
  const characterDialoguePattern = /^([A-Z][A-Z\s]+)\s*($$[^)]*$$)?$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines and scene headers
    if (
      !line ||
      line.startsWith("FADE") ||
      line.startsWith("EXT.") ||
      line.startsWith("INT.")
    ) {
      continue;
    }

    // Check if this line is a character name
    const characterMatch = line.match(characterLinePattern);
    if (characterMatch) {
      const characterName = characterMatch[1].trim();

      // Skip common script elements that aren't characters
      if (isScriptElement(characterName)) {
        continue;
      }

      if (!characters.has(characterName)) {
        const description = generateCharacterDescription(
          characterName,
          scriptText
        );
        characters.set(characterName, {
          id: `char-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: characterName,
          description,
        });
      }
    }
  }

  return Array.from(characters.values());
}

function isScriptElement(text: string): boolean {
  const scriptElements = [
    "FADE IN",
    "FADE OUT",
    "CUT TO",
    "DISSOLVE TO",
    "MATCH CUT",
    "CONTINUOUS",
    "LATER",
    "MEANWHILE",
    "MONTAGE",
    "SERIES OF SHOTS",
    "TITLE CARD",
    "SUPER",
    "INSERT",
    "CLOSE UP",
    "WIDE SHOT",
  ];

  return scriptElements.some((element) => text.includes(element));
}

function generateCharacterDescription(
  characterName: string,
  scriptText: string
): string {
  // Generate contextual descriptions based on character names and script context
  const descriptions: Record<string, string> = {
    BATMAN: "Dark vigilante hero in cape and cowl, brooding and determined",
    JOKER:
      "Maniacal villain with green hair and white face paint, chaotic and unpredictable",
    "HARLEY QUINN":
      "Former psychiatrist turned villain, playful but dangerous with colorful outfit",
    ALFRED: "Distinguished elderly butler, wise and loyal with British accent",
    SUPERMAN:
      "Heroic figure in blue and red costume with cape, strong and noble",
    "WONDER WOMAN": "Amazonian warrior princess with golden armor and lasso",
    "SPIDER-MAN":
      "Young hero in red and blue suit with web patterns, agile and witty",
    "IRON MAN":
      "Genius inventor in high-tech armor suit, confident and charismatic",
    "CAPTAIN AMERICA":
      "Super soldier in patriotic costume with shield, honorable and brave",
  };

  // Check for exact matches first
  if (descriptions[characterName]) {
    return descriptions[characterName];
  }

  // Generate description based on context clues in the script
  const characterLines = scriptText
    .split("\n")
    .filter((line) => line.trim().startsWith(characterName));

  if (characterLines.length > 0) {
    // Analyze the character's dialogue and actions for context
    if (
      scriptText.toLowerCase().includes("villain") ||
      scriptText.toLowerCase().includes("evil")
    ) {
      return "Antagonistic character with menacing presence and dark intentions";
    } else if (
      scriptText.toLowerCase().includes("hero") ||
      scriptText.toLowerCase().includes("save")
    ) {
      return "Heroic character with noble bearing and determined expression";
    } else if (
      scriptText.toLowerCase().includes("detective") ||
      scriptText.toLowerCase().includes("cop")
    ) {
      return "Law enforcement character with professional demeanor and keen eyes";
    }
  }

  // Default description
  return "Character with distinctive appearance and strong personality";
}
