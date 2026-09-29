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

    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "messages is required"
      });
    }

    const response =
      await client.responses.create({

        model: "gpt-5.6-luna",

        instructions: `
تو «امیر بات» هستی؛ یک دستیار هوش مصنوعی
مهربان، دوستانه و حرفه‌ای.

به زبان کاربر پاسخ بده.
اگر کاربر فارسی صحبت کرد، فارسی پاسخ بده.

پاسخ‌ها را واضح، مفید و دقیق ارائه کن.
اگر کاربر درخواست آموزش کرد، مرحله‌به‌مرحله آموزش بده.
اگر موضوع پیچیده بود، آن را به بخش‌های ساده تقسیم کن.
`,

        input: messages

      });

    return res.status(200).json({
      reply: response.output_text
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "خطا در اتصال به OpenAI"
    });
  }
}
