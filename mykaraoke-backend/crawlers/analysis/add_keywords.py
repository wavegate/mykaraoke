import json
from filter_out_words import filter_out_words
from similarity_map import similarity_map
from format_map import format_map
from categories_map import categories_map

filename = "dataset_indeed-scraper_2023-09-16_01-10-37-409"
filename2 = "dataset_indeed-scraper_2023-10-06_00-26-33-590"
filename3 = "dataset_indeed-scraper_2023-10-15_15-43-09-792"

with open(
    f"input_data/{filename}.json",
    "r",
    encoding="utf-8",
) as json_file:
    jobDescriptions = json.load(json_file)

with open(
    f"input_data/{filename2}.json",
    "r",
    encoding="utf-8",
) as json_file:
    jobDescriptions = jobDescriptions + json.load(json_file)

with open(
    f"input_data/{filename3}.json",
    "r",
    encoding="utf-8",
) as json_file:
    jobDescriptions = jobDescriptions + json.load(json_file)

with open(
    f"keywords_extracted/{filename}.json",
    "r",
    encoding="utf-8",
) as json_file:
    keywords = json.load(json_file)

with open(
    f"keywords_extracted/{filename2}.json",
    "r",
    encoding="utf-8",
) as json_file:
    keywords = keywords + json.load(json_file)

with open(
    f"keywords_extracted/{filename3}.json",
    "r",
    encoding="utf-8",
) as json_file:
    keywords = keywords + json.load(json_file)

with open(
    f"keywords_counted/{filename3}.json",
    "r",
    encoding="utf-8",
) as json_file:
    countedKeywords = json.load(json_file)

for i in range(len(jobDescriptions)):
    currentKeywords = []

    for keyword in keywords[i]:
        keyword = keyword.lower()
        foundWord = False
        if keyword in filter_out_words:
            continue
        if keyword in categories_map:
            foundWord = True
        if keyword in similarity_map:
            foundWord = True
            keyword = similarity_map[keyword]
        if keyword in format_map:
            foundWord = True
            keyword = format_map[keyword]
        if foundWord:
            currentKeywords.append(keyword)

    jobDescriptions[i]["keywords"] = currentKeywords


with open(
    f"jobDescriptions_with_keywords/{filename3}.json", "w", encoding="utf-8"
) as file:
    json.dump(jobDescriptions, file, indent=4)
