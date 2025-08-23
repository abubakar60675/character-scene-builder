# Character Scene Builder

A React application that parses movie scripts, detects characters, and allows users to interact with character images in a drag-and-drop interface. Built with Next.js, TypeScript, and integrated with Replicate API for AI image generation.

## Features

- **Script Parsing**: Automatically detects characters from movie scripts using pattern matching
- **Character Detection**: Identifies at least 3 characters from the provided sample script
- **Drag & Drop Interface**: Rearrange characters in the grid and drop them into the scene zone
- **AI Image Generation**: Uses Replicate API with FLUX.1 model to generate character portraits
- **Scene Builder**: Drop zone for building scenes with selected characters
- **Notifications**: Toast notifications when characters are added/removed from scenes
- **Persistent State**: Scene state is saved to localStorage
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix UI primitives
- **Drag & Drop**: react-dnd
- **Image Generation**: Replicate API (FLUX.1 model)
- **State Management**: React hooks with localStorage persistence and Jotai

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Replicate API account (token provided)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd character-scene-builder
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

The Replicate API token is already provided in the example file.

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Parse Script**: The app loads with a sample Batman script. Click "Parse Script & Generate Images" to detect characters and generate their portraits.

2. **Drag Characters**: Once characters are detected, you can drag them around in the grid to reorder them.

3. **Build Scene**: Drag characters from the grid into the "Scene Zone" to add them to your scene. You'll see a notification when characters are added.

4. **Manage Scene**: Remove characters from the scene by clicking the × button on character cards in the scene zone.

5. **Persistent State**: Your scene will be saved automatically and restored when you reload the page.

## API Integration

The app integrates with Replicate API using the FLUX.1 model for image generation:

- **Endpoint**: `https://api.replicate.com/v1/models/black-forest-labs/flux-pro/predictions`
- **Model**: FLUX.1 Pro for high-quality character portraits
- **Prompts**: Automatically generated based on character names and descriptions

## Features Implemented

✅ Script parsing with character detection  
✅ Drag & drop character rearrangement  
✅ Scene zone for building scenes  
✅ Replicate API integration for image generation  
✅ Automatic caption generation  
✅ Toast notifications  
✅ TypeScript implementation  
✅ Responsive design with Tailwind CSS  
✅ localStorage persistence  
✅ Clean, intuitive UI

## Bonus Features

✅ **TypeScript**: Full TypeScript implementation with proper typing  
✅ **Persistent State**: Scene state saved to localStorage  
✅ **Modern Styling**: Tailwind CSS v4 with shadcn/ui components

## Notes

- The app uses a hardcoded Batman script sample for demonstration
- Character detection uses pattern matching to identify character names in ALL CAPS
- Image generation fallbacks to placeholder images if Replicate API fails
- The UI is designed to be intuitive and follows modern design patterns
- Scene state persists across browser sessions using localStorage

\
