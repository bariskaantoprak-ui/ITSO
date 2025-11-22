
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEventDescription = async (
  title: string,
  rawNotes: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Sen profesyonel bir etkinlik yöneticisi ve metin yazarısın. İskenderun Ticaret ve Sanayi Odası (İTSO) URGE projesi için aşağıdaki etkinlik başlığı ve ham notlardan yola çıkarak,
      kurumsal, ilgi çekici ve profesyonel bir "Etkinlik Açıklaması" (yaklaşık 100-150 kelime) yaz.
      
      Etkinlik Başlığı: ${title}
      Ham Notlar: ${rawNotes}
      
      Lütfen sadece oluşturulan metni döndür, başka bir açıklama ekleme.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "İçerik oluşturulamadı.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "İçerik oluşturulurken bir hata oluştu. Lütfen manuel olarak giriniz.";
  }
};

// Feature: Image Generation/Editing
export const generateEventImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: {
                parts: [{ text: prompt + " photorealistic, professional event banner" }]
            },
            config: {
                // Ensure no unsupported configs are passed for image generation if not needed
            }
        });
        
        // Extract image from response
        const part = response.candidates?.[0]?.content?.parts?.[0];
        if (part && part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
        // Fallback or if text is returned (Flash Image sometimes describes instead of generating if not prompted correctly for output)
        return ""; 
    } catch (error) {
        console.error("Image Gen Error:", error);
        return "";
    }
};
