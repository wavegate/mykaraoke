import json
import openai
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.environ.get("OPENAI_KEY")

filename = "dataset_indeed-scraper_2023-09-16_01-10-37-409"

# {
#     "model": "gpt-3.5-turbo",
#     "messages": [
#       {
#         "role": "system",
#         "content": "You are a helpful assistant."
#       },
#       {
#         "role": "user",
#         "content": "Hello!"
#       }
#     ]
#   }

with open(
    f"input_data/{filename}.json",
    "r",
    encoding="utf-8",
) as json_file:
    data = json.load(json_file)

descriptions = [item["description"] for item in data]


testValue = 1

value = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "system",
            "content": "The user will give you a job description. I want you to return to me a comma delimited list of technical keywords sought for in the job description.",
        },
        {"role": "user", "content": descriptions[testValue]},
    ],
}

with open(
    f"jsonl_files/{filename}.json",
    "a",
    encoding="utf-8",
) as file:
    json.dump(value, file)
    file.write("\n")

# completion = openai.ChatCompletion.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {
#             "role": "system",
#             "content": "The user will give you a job description. I want you to extract the type of job. Return the response as one of: frontend, fullstack, backend, security, or testing. If none, return None.",
#             # "content": "The user will give you a job description. I want you to extract, only if available, type of job (one of: frontend, fullstack, backend, security, or testing), the level of experience (as one of: entry, junior, mid, or senior), if the job is remote (true or false), the lowest level of education required (one of: Bachelor's, Master's, PhD, or high school). Return the information as a comma-delimited list with the following: type, level, remote, education (leave empty if not present).",
#         },
#         {"role": "user", "content": positionNames[testValue] + ". " + descriptions[0]},
#     ],
# )

"""
python api_request_parallel_processor.py \
  --requests_filepath jsonl_files/data/example_requests_to_parallel_process.jsonl \
  --save_filepath examples/data/example_requests_to_parallel_process_results.jsonl \
  --request_url https://api.openai.com/v1/completions \
  --max_requests_per_minute 1500 \
  --max_tokens_per_minute 125000 \
  --token_encoding_name cl100k_base \
  --max_attempts 5 \
  --logging_level 20
"""
