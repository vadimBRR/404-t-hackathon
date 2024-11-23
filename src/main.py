from dotenv import load_dotenv
import os
from lxml.html._diffcommand import read_file

from src.backend.agent import Agent

load_dotenv("../local.env")
api_key = os.getenv('OPENAI_API_KEY')

if __name__ == '__main__':
    model = "gpt-4o-mini"

    correct_file_path = ""
    user_file_path = ""

    correct_text = read_file(correct_file_path)
    user_text = read_file(user_file_path)

    agent = Agent(model=model, api_key=api_key, example_form=correct_text, user_form=user_text)
    result = agent.analyze()
    print(result)
