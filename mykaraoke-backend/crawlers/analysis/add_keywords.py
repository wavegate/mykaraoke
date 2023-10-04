import json
from count_keywords import filter_out_words, similarity_map, format_map

filename = "dataset_indeed-scraper_2023-09-16_01-10-37-409"

with open(
    f"input_data/{filename}.json",
    "r",
    encoding="utf-8",
) as json_file:
    jobDescriptions = json.load(json_file)

with open(
    f"keywords_extracted/{filename}.json",
    "r",
    encoding="utf-8",
) as json_file:
    keywords = json.load(json_file)

for i in range(len(jobDescriptions)):
    currentKeywords = []

    for keyword in keywords[i]:
        keyword = keyword.lower()
        foundWord = False
        if keyword in similarity_map:
            keyword = similarity_map[keyword]
            foundWord = True
        if keyword in format_map:
            keyword = format_map[keyword]
            foundWord = True
        if foundWord:
            currentKeywords.append(keyword)

    jobDescriptions[i]["keywords"] = currentKeywords


with open(
    f"jobDescriptions_with_keywords/{filename}.json", "w", encoding="utf-8"
) as file:
    json.dump(jobDescriptions, file, indent=4)
