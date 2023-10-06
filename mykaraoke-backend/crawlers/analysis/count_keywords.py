import json
from fuzzywuzzy import fuzz
from format_map import format_map
from categories_map import categories_map
from one_to_many_map import one_to_many_map
from similarity_map import similarity_map
from filter_out_words import filter_out_words

filename = "dataset_indeed-scraper_2023-09-16_01-10-37-409"
filename2 = "dataset_indeed-scraper_2023-10-06_00-26-33-590"

with open(
    f"keywords_extracted/{filename}.json",
    "r",
    encoding="utf-8",
) as json_file:
    data = json.load(json_file)


with open(
    f"keywords_extracted/{filename2}.json",
    "r",
    encoding="utf-8",
) as json_file:
    data = data + json.load(json_file)

keyword_map = {}

for keyword_list in data:
    for keyword in keyword_list:
        keyword = keyword.lower()
        if keyword in keyword_map:
            keyword_map[keyword] += 1
        else:
            keyword_map[keyword] = 1


for from_keyword, to_keywords in one_to_many_map.items():
    if from_keyword in keyword_map:
        store_value = keyword_map[from_keyword]
        del keyword_map[from_keyword]
        for to_keyword in to_keywords:
            if to_keyword in keyword_map:
                keyword_map[to_keyword] += store_value
            else:
                keyword_map[to_keyword] = store_value

for from_keyword, to_keyword in similarity_map.items():
    if from_keyword in keyword_map:
        if to_keyword in keyword_map:
            keyword_map[to_keyword] += keyword_map[from_keyword]
        else:
            keyword_map[to_keyword] = keyword_map[from_keyword]
        del keyword_map[from_keyword]


for from_format, to_format in format_map.items():
    if from_format in keyword_map:
        keyword_map[to_format] = keyword_map[from_format]
        del keyword_map[from_format]

sorted_items = sorted(keyword_map.items(), key=lambda x: x[1], reverse=False)


filtered_words = [
    item for item in sorted_items if item[1] > 9 and item[0] not in filter_out_words
]

category_map = {}
for keyword_tuple in filtered_words:
    if keyword_tuple[0] in categories_map:
        category_map[keyword_tuple[0]] = (
            keyword_tuple[1],
            categories_map[keyword_tuple[0]],
        )
    else:
        category_map[keyword_tuple[0]] = keyword_tuple[1]

# print(category_list)

# count_strings = ["responsive design", "rwd", "responsive web design"]
# for count_string in count_strings:
#     if count_string in keyword_map:
#         print(f"{count_string}: {keyword_map[count_string]}")
#     else:
#         print(f"{count_string}: 0")

# for item in category_list:
#     if fuzz.ratio(item[0], "next") > 30:
#         print(item)

with open(f"keywords_counted/{filename2}.json", "w", encoding="utf-8") as file:
    json.dump(category_map, file, indent=4)
