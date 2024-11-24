import os
from dotenv import load_dotenv

from src.backend.agent import Agent
from src.backend.pdf_to_text import PDF_To_Class

load_dotenv('../local.env')

if __name__ == '__main__':
    api_key = os.getenv("OPENAI_API_KEY")
    model = "gpt-4o"
    example_pdf = "backend/data/input/example_form.pdf"
    input_pdf = "backend/data/input/input.pdf"

    pdf_to_txt = PDF_To_Class()
    example_txt = pdf_to_txt.pdf_to_text_with_format(example_pdf)
    input_txt = pdf_to_txt.pdf_to_text_with_format(input_pdf)
    agent = Agent(api_key=api_key, model=model, example_form=example_txt, user_form=input_txt)
    result = agent.analyze()
    print(result)