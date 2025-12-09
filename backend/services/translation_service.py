import os
import google.generativeai as genai

class TranslationService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set.")

        genai.configure(api_key=self.api_key)

        # UPDATED MODEL
        self.model = genai.GenerativeModel("gemini-2.5-flash")

    def translate_to_urdu(self, text: str) -> str:
        prompt = f"""
        You are a professional Urdu translator for academic textbooks.
        Translate the following text into Urdu.
        Keep headings, structure, formulas, and code blocks unchanged.

        TEXT:
        {text}
        """

        try:
            response = self.model.generate_content(prompt)

            # FIXED response parsing
            return response.candidates[0].content.parts[0].text

        except Exception as e:
            print("Gemini Error:", e)
            raise


translation_service = TranslationService()
