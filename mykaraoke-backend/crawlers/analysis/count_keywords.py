import json

filename = "dataset_indeed-scraper_2023-09-16_01-10-37-409"

with open(
    f"keywords_extracted/{filename}.json",
    "r",
    encoding="utf-8",
) as json_file:
    data = json.load(json_file)

keyword_map = {}

for keyword_list in data:
    for keyword in keyword_list:
        keyword = keyword.lower()
        if keyword in keyword_map:
            keyword_map[keyword] += 1
        else:
            keyword_map[keyword] = 1

one_to_many_map = {"html/css": ["html", "css"]}

similarity_map = {
    "front-end": "frontend",
    "reactjs": "react",
    "css3": "css",
    "html5": "html",
    "angularjs": "angular",
    "angular.js": "angular",
    "react.js": "react",
    "node": "node.js",
    "nodejs": "node.js",
    "node js": "node.js",
    "continuous integration": "ci/cd",
    "continuous deployment": "ci/cd",
    "user experience": "ui/ux",
    "ux": "ui/ux",
    "user experiences": "ui/ux",
    "ui design": "ui/ux",
    "golang": "go",
    "oop": "object-oriented programming",
    "object oriented programming": "object-oriented programming",
    "object-oriented design": "object-oriented programming",
    "amazon web services": "aws",
    "google cloud": "gcp",
    "google cloud platform": "gcp",
    "front-end technologies": "frontend",
    "front-end development": "frontend",
    "frontend development": "frontend",
    "back-end": "backend",
    "back-end development": "backend",
    "backend development": "backend",
    "back end": "backend",
    "front end": "frontend",
    "frontend engineer": "frontend",
    "full-stack": "fullstack",
    "full stack": "fullstack",
    "visual design": "design",
    "ci/cd tools": "ci/cd",
    "tests": "testing",
    "agile software development": "agile",
    "agile methodologies": "agile",
    "agile environment": "agile",
    "agile development": "agile",
    "tdd": "test-driven development",
    "test driven development": "test-driven development",
    "artificial intelligence": "ai",
    "quality assurance": "qa",
    "quality": "qa",
    "maintain": "maintenance",
    "nosql databases": "nosql",
    "sql databases": "sql",
    "sql queries": "sql",
    "nextjs": "next.js",
    "rest apis": "rest",
    "rest api": "rest",
    "mobile development": "mobile",
    "designing": "design",
    "test": "testing",
    "deployments": "deployment",
    "problem solving skills": "problem solving",
    "maintaining": "maintenance",
    "prototypes": "prototyping",
    "apis": "api",
    "test cases": "testing",
    "vue.js": "vue",
    "vuejs": "vue",
    "web application": "web applications",
    "web app": "web applications",
    "responsive web design": "responsive design",
}

format_map = {"react": "React.js"}

for from_keyword, to_keyword in similarity_map.items():
    if from_keyword in keyword_map:
        if to_keyword in keyword_map:
            keyword_map[to_keyword] += keyword_map[from_keyword]
        else:
            keyword_map[to_keyword] = keyword_map[from_keyword]
        del keyword_map[from_keyword]

for from_keyword, to_keywords in one_to_many_map.items():
    if from_keyword in keyword_map:
        for to_keyword in to_keywords:
            if to_keyword in keyword_map:
                keyword_map[to_keyword] += keyword_map[from_keyword]
            else:
                keyword_map[to_keyword] = keyword_map[from_keyword]
        del keyword_map[from_keyword]

# for from_format, to_format in format_map.items():
#     if from_format in keyword_map:
#         keyword_map[to_format] = keyword_map[from_format]
#         del keyword_map[from_format]

sorted_items = sorted(keyword_map.items(), key=lambda x: x[1], reverse=False)

# print(sorted_items)

# with open(f"keywords_counted/{filename}.json", "w", encoding="utf-8") as file:
#     json.dump(sorted_items, file, indent=4)

filter_out_words = [
    "computer science",
    "benefits",
    "software engineer",
    "equity",
    "equal opportunity employer",
    "diversity",
    "religion",
    "race",
    "technology",
    "sexual orientation",
    "engineers",
    "age",
    "product managers",
    "national origin",
    "color",
    "compensation",
    "implementation",
    "dental",
    "ca",
    "experience",
    "bachelor's degree",
    "tools",
    "parental leave",
    "paid time off",
    "code",
    "tools",
    "marital status",
    "medical",
    "gender identity",
    "sex",
    "technologies",
    "disability",
    "web technologies",
    "veteran status",
    "coding",
    "vision",
    "features",
    "scalable",
    "base salary",
    "vision insurance",
    "san francisco",
    "california",
    "culture",
    "new features",
    "compensation package",
    "building",
    "disability insurance",
    "san jose",
    "investors",
    "dental coverage",
    "growth",
    "skills",
    "determination",
    "salary range",
    "equal opportunity",
    "ancestry",
    "snacks",
    "benefits package",
    "expression",
    "paid holidays",
    "bonus",
    "flexible time off",
    "offices",
    "holidays",
    "citizenship",
    "gender expression",
    "competitive compensation",
    "retirement plan",
    "business",
    "medical coverage",
    "accommodations",
    "tuition reimbursement",
    "bachelor's degree",
    "equal employment opportunity",
    "bugs",
    "vision coverage",
    "employee assistance program",
    "platforms",
    "flexible spending account",
    "genetic information",
    "projects",
    "401(k)",
    "401k",
    "full-time",
    "software engineers",
    "impact",
    "customers",
    "qualifications",
    "feedback",
    "industry trends",
    "base pay",
    "reasonable accommodations",
    "salary",
    "pay range",
    "pregnancy",
    "competitive salary",
    "bug fixes",
    "resume",
    "pto",
    "metrics",
    "medical benefits",
    "continuous improvement",
    "stock options",
    "protected veteran status",
    "implement",
    "health insurance",
    "disability status",
    "remote",
    "libraries",
    "solutions",
    "production",
    "gender",
    "remote work",
    "senior software engineer" "support",
    "location",
    "inclusion",
    "services",
    "build",
    "engineering team",
    "platform",
    "industry experience",
    "tooling",
    "funding",
]

tuples_with_count_gt_10 = [
    item for item in sorted_items if item[1] > 9 and item[0] not in filter_out_words
]

print(tuples_with_count_gt_10)

count_strings = ["responsive design", "rwd", "responsive web design"]
for count_string in count_strings:
    if count_string in keyword_map:
        print(f"{count_string}: {keyword_map[count_string]}")
    else:
        print(f"{count_string}: 0")
