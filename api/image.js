import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "prompt is required"
      });
    }

    const result =
      await client.images.generate({

        model: "gpt-image-2",

        prompt: prompt,

        size: "1024x1024"
      });


    const base64 =
      result.data?.[0]?.b64_json;


    if (!base64) {
      throw new Error(
        "No image returned"
      );
    }


    return res.status(200).json({

      image:
        `data:image/png;base64,${base64}`

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "خطا در ساخت تصویر"
    });
  }
}
