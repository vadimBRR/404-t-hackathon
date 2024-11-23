import os
from openai import OpenAI
from openai.types.chat import ChatCompletion


class Agent(object):
    def __init__(self, api_key, model, example_form, user_form):
        self.example_form = example_form
        self.user_form = user_form
        self.model = model
        self.api_key = api_key
        self.client = OpenAI(api_key=self.api_key)

    def _chat_question(self, prompt: str) -> ChatCompletion:
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        return completion

    def _extract_main_info(self, info_in_detail: str):
        prompt = f"""
        "Summarize the key details from the following document description, focusing on:

        The purpose of the document.
        Key topics or sections covered.
        Any important dates, names, or figures mentioned.
        The intended audience or users of the document.
        Any significant actions or decisions associated with it.
        Keep the summary concise and in bullet points.
        
        Do it short and primarily
        The document: {info_in_detail}
        """

        return self._chat_question(prompt).choices[0].message.content

    def _analyze_example_form(self) -> str:
        prompt = f"""
        Analyze the given document to extract key insights, summarize the main points, identify significant trends or patterns, and highlight any notable themes or conclusions."

        {self.example_form}
        """

        return self._chat_question(prompt).choices[0].message.content

    def _analyze_user_form(self, example_analyze: str) -> str:
        prompt = f"""
                Based on a given information {example_analyze} 
                tell what is wrong with this file:{self.user_form}
                """

        return self._chat_question(prompt).choices[0].message.content

    def analyze(self) -> str:
        example_analyze = self._analyze_example_form()
        main_info = self._extract_main_info(example_analyze)
        return self._analyze_user_form(main_info)
