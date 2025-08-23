"use server";

const apiKey = process.env.REPLICATE_API_KEY;

export async function generateImage(prompt: string) {
  try {
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    if (!apiKey) {
      throw new Error("API key not configured");
    }

    const response = await fetch(
      "https://api.replicate.com/v1/models/black-forest-labs/flux-pro/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Prefer: "wait",
        },
        body: JSON.stringify({
          input: {
            prompt: prompt,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Replicate API error: ${errorText}`);
    }

    const data = await response.json();
    // The response should contain the generated image URL
    const imageUrl =
      typeof data.output === "string"
        ? data.output
        : Array.isArray(data.output)
        ? data.output[0]
        : data.urls?.get || null;

    if (!imageUrl) {
      console.error(" No image URL in response:", data);
      throw new Error("No image URL returned from Replicate");
    }

    console.log("Generated image URL:", imageUrl);
    return { success: true, imageUrl };
  } catch (error) {
    console.error(" Image generation error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate image",
    };
  }
}

// Alternative version that throws errors (for use with error boundaries)
export async function generateImageWithThrow(prompt: string): Promise<string> {
  if (!prompt) {
    throw new Error("Prompt is required");
  }

  const apiKey = process.env.REPLICATE_API_KEY;

  if (!apiKey) {
    console.error(" REPLICATE_API_KEY environment variable is not set");
    throw new Error("API key not configured");
  }

  console.log(" Making request to Replicate API with prompt:", prompt);

  const response = await fetch(
    "https://api.replicate.com/v1/models/black-forest-labs/flux-pro/predictions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        input: {
          prompt: prompt,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(" Replicate API error:", errorText);
    throw new Error(`Replicate API error: ${errorText}`);
  }

  const data = await response.json();
  console.log(" Replicate API response:", data);

  // The response should contain the generated image URL
  const imageUrl =
    typeof data.output === "string"
      ? data.output
      : Array.isArray(data.output)
      ? data.output[0]
      : data.urls?.get || null;

  if (!imageUrl) {
    console.error(" No image URL in response:", data);
    throw new Error("No image URL returned from Replicate");
  }

  console.log(" Generated image URL:", imageUrl);
  return imageUrl;
}

export async function generateCharacterImage(
  characterName: string,
  description: string
): Promise<string> {
  const prompt = `A cinematic portrait of ${characterName}, ${description}, professional movie character design, high quality, detailed`;

  try {
    const result = await generateImage(prompt);

    if (result.success) {
      return result.imageUrl;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("Image generation failed:", error);
    // Return placeholder image if generation fails
    return `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(
      characterName + " character portrait"
    )}`;
  }
}
