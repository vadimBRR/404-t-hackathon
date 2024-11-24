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
        "Analyze the following document and extract the main points in concise bullet points. Focus on:
        - The type or purpose of the document (e.g., report, proposal, guide, etc.).
        - Key sections or topics covered.
        - Notable dates, names, figures, or events mentioned.
        - The intended audience or users of the document.
        - Any critical actions, conclusions, or decisions outlined.
    
        Provide the summary strictly in bullet-point format with no additional commentary.
    
        Document:{info_in_detail}
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
        print(main_info)
        return self._analyze_user_form(main_info)

    def score_of_correct_doc(self, short_anlz) -> int:
        prompt = f"""
        Evaluate the following document on a scale of 0 to 100 based based on this info: {self.short_anlz}(how it relavent to it) and on the criteria below:
        1. Relevance (20%): Does the document address the topic or question effectively?
        2. Accuracy (20%): Are the facts presented in the document correct and verifiable?
        3. Clarity (20%): Is the content well-structured and easy to understand?
        4. Completeness (20%): Does the document comprehensively cover the required points?
        5. Originality (20%): Does the document present ideas or solutions in a creative way?

        Document:
        \"\"\"
        {self.user_form}
        \"\"\"

        Provide a single overall score between 0 and 100 and explain the reasoning behind the score. Only one number without explanation.
        """

        answer = self._chat_question(prompt)
        return int(answer.choices[0].message.content)


