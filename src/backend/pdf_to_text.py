from openai import OpenAI
import pdfplumber
import os
import fitz

class PDF_To_Class:

    def __init__(self):
        pass

    # reading a pdf file and translating it into text
    def pdf_to_text_with_format(self, input_pdf: str) -> str:
        try:
            with pdfplumber.open(input_pdf) as pdf:
                text = ""
                for page in pdf.pages:
                    text += page.extract_text() + "\n"
        except FileNotFoundError as e:
            print(f"Error: {e}")
        return text

    # signature verification
    def check_visual_signature(self, input_pdf: str) -> (bool or None):
        try:
            doc = fitz.open(input_pdf)
            page = doc[len(doc) - 1]
            images = page.get_images(full=True)
            if images:
                return True
            return False
        except FileNotFoundError as e:
            return None
