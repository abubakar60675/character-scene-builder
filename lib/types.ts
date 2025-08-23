export interface Character {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  caption?: string;
  isGenerating?: boolean;
}

export interface ScriptLine {
  type: "character" | "dialogue" | "action" | "scene";
  content: string;
  character?: string;
}
