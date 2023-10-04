import json

import re
import os
from dotenv import load_dotenv
import openai

load_dotenv()

openai.api_key = os.environ.get("OPENAI_KEY")

filename = "dataset_indeed-scraper_2023-09-16_01-10-37-409"

with open(
    f"keywords_counted/{filename}.json",
    "r",
    encoding="utf-8",
) as json_file:
    data = json.load(json_file)


last_50 = data[-30:]

last_50_keywords = [tup[0] for tup in last_50]
last_50_keywords_joined = ",".join(last_50_keywords[::-1])

query = f"Please generate me a perfect resume for a web developer using these 50 keywords: {last_50_keywords_joined}"
print(query)
# completion = openai.ChatCompletion.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {"role": "user", "content": query},
#     ],
# )

# print(completion)
