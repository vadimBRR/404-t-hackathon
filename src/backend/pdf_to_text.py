from openai import OpenAI
import pdfplumber
import os
import fitz

class PDF_To_Class:

    def __init__(self, filepath_key: str, filepath_input_templates: str, filepath_input: str,):
        self.filepath_key = filepath_key
        self.filepath_input_templates = filepath_input_templates
        self.filepath_input = filepath_input
        self.api_key= self.reading_key()

    # read API key
    def reading_key(self) -> str:
        with open(self.filepath_key, "r") as file:
            api_key = file.read().strip()
        return api_key

    # reading a pdf file and translating it into text
    def pdf_to_text_with_format(self) -> str:
        try:
            with pdfplumber.open(self.filepath_input_templates) as pdf:
                text = ""
                for page in pdf.pages:
                    text += page.extract_text() + "\n"
        except FileNotFoundError as e:
            print(f"Error: {e}")
        return text

    # signature verification
    def check_visual_signature(self) -> bool:
        try:
            doc = fitz.open(self.filepath_input_templates)
            page = doc[len(doc) - 1]
            images = page.get_images(full=True)
            if images:
                return True
            return False
        except FileNotFoundError as e:
            return None

    # connect chat gpt
    def chat_question(self,qustion: str) -> str:
        MODEL = "gpt-4o"
        client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", self.api_key))
        completion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Help me with my math homework!"},
                {"role": "user", "content": qustion}
            ]
        )
        return completion.choices[0].message.content