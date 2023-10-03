import json

# from sklearn.feature_extraction.text import CountVectorizer
import re
import os
from dotenv import load_dotenv
import openai

load_dotenv()

openai.api_key = os.environ.get("OPENAI_KEY")

filename = "dataset_indeed-scraper_2023-09-16_01-10-37-409"

with open(
    f"input_data/{filename}.json",
    "r",
    encoding="utf-8",
) as json_file:
    data = json.load(json_file)

try:
    with open(f"output_data/{filename}.json", "r", encoding="utf-8") as file:
        previous_data = json.load(file)
except FileNotFoundError:
    previous_data = []

descriptions = [item["description"] for item in data]
# print(len(previous_data))

start_index = len(previous_data)
for index, description in enumerate(descriptions):
    if index >= start_index:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "The user will give you a job description. I want you to return to me a comma delimited list of technical keywords sought for in the job description.",
                },
                {"role": "user", "content": description},
            ],
        )
        keywords = completion.choices[0].message.content
        keywords = [word.strip() for word in keywords.split(",")]
        previous_data.append(keywords)
        with open(f"keywords_extracted/{filename}.json", "w", encoding="utf-8") as file:
            json.dump(previous_data, file, indent=4)
        print(f"added {index}")
        print(completion)

# completion = openai.ChatCompletion.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {
#             "role": "system",
#             "content": "The user will give you a job description. I want you to extract, only if available, the type of position (frontend, backend, fullstack, devops, test, or uiux), the level of experience (entry, junior, mid, or senior), if the job is remote (true or false), the education required (Bachelor, Master's, PhD, or high school), and the salary (in per hour or per year). Return the information as a comma-delimited list with the following: type, level, remote, education, and salary (leave empty if not present).",
#         },
#         {"role": "user", "content": descriptions[-2]},
#     ],
# )


# def create_regex_pattern(input_string):
#     case_insensitive_pattern = rf"(?i)\b{input_string}\b"
#     return case_insensitive_pattern


# keywords = [
# "bun",
#     "laravel",
#     "react",
#     "redux",
#     "vue",
#     "angular",
#     "javascript",
#     "wordpress",
#     "semantic",
#     "a11y",
#     "accessibility",
#     "html",
#     "css",
#     "command line",
#     "github",
#     "agile",
#     "php",
#     "python",
#     "sql",
#     "clean",
#     "scalable",
#     "cms",
#     "content management system",
#     "dxp",
#     "digital experience",
#     "headless",
#     "ecm",
#     "enterprise",
#     "digital asset management",
#     "dam",
#     "quality assurance",
#     "testing",
#     "next",
#     "babel",
#     "sass",
#     "scss",
#     "webpack",
#     "html5",
#     "rest",
#     "photoshop",
#     "ada",
#     "graphic design",
#     "seo",
#     "search engine optimization",
#     "moodle",
#     "aws",
#     "508",
#     "wcag",
#     "metadata",
#     "cross-browser compatibility",
#     "drupal",
#     "input validation",
#     "xss",
#     "csrf",
#     "cors",
#     "frs",
#     "functional requirement specifications",
#     "software requirement specifications",
#     "business requirements document",
#     "srs",
#     "brd",
#     "node",
#     "nodejs",
#     "preprocess",
#     "pre-process",
#     "reusable components",
#     "frontend",
#     "backend",
#     "umi",
#     "api",
#     "java",
#     "dom",
#     "http",
#     "ajax",
#     "xhr",
#     "fetch",
#     "axios",
#     "c++",
#     "c program",
#     "rust",
#     "web services",
#     "soa",
#     "service-oriented architecture",
#     "eai",
#     "enterprise application integration",
#     "soap",
#     "simple object access protocol",
#     "saas",
#     "software as a service",
#     "paas",
#     "graphdb",
#     "graphql",
#     "graph",
#     "ui",
#     "ux",
#     "hci",
#     "security",
#     "xml",
#     "json",
#     "fiori",
#     "sap",
#     "oop",
#     "object-oriented programming",
#     "widget",
#     "theme",
#     "template",
#     "wordpress network",
#     "multisite",
#     "jquery",
#     "mysql",
#     "dynamodb",
#     "lightsail",
#     "terraform",
#     "trpc",
#     "django",
#     "flask",
#     "asp.net",
#     "spring boot",
#     "spring",
#     "database",
#     "documentation",
#     "ruby",
#     "ruby on rails",
#     "rails",
#     "object oriented programming",
#     "gui",
#     "ecmascript",
#     "typescript",
#     "css3",
#     "responsive web design",
#     "functional programming",
#     "mvc",
#     "model-view-controller",
#     "figma",
#     "webflow",
#     "email",
#     "coldfusion",
#     "dreamweaver",
#     "actionscript",
#     "backbone",
#     "ember",
#     "less",
#     "prisma",
#     "styled components",
#     "css-in-js",
#     "tailwind",
#     "headlessui",
#     "chakra",
#     "astro",
#     "cloudinary",
#     "firebase",
#     "strapi",
#     "svelte",
#     "web speech",
#     "reveal",
#     "elasticsearch",
#     "jsonwebtoken",
#     "jwt",
#     "ec2",
#     "s3",
#     "shopify",
#     "dva",
#     "react-hook-form",
#     "formik",
#     "materialui",
#     "bootstrap",
#     "cookie",
#     "unity",
#     "three",
#     "d3",
#     "lodash",
#     "framer",
#     "scrum",
#     "unit test",
#     "integration test",
#     "e2e",
#     "cypress",
#     "enzyme",
#     "jest",
#     "mocha",
#     "chai",
#     "flux",
#     "design pattern",
#     "data structures",
#     "algorithm",
#     "leetcode",
#     "hackerrank",
#     "ionic",
#     "flutter",
#     "react native",
#     "electron",
#     "laminas",
#     "symfony",
#     "magento",
#     "j2ee",
#     "solidity",
#     "perl",
#     "linux",
#     "unix",
#     "emacs",
#     "vim",
#     "memcache",
#     "redis",
#     "elastic compute",
#     "rds",
#     "relational database services",
#     "mariadb",
#     "oracle",
#     "aurora",
#     "storybook",
#     "lambda",
#     "cloudfront",
#     "glacier",
#     "sns",
#     "ebs",
#     "vpc",
#     "kinesis",
#     "iam",
#     "sqs",
#     "beanstalk",
#     "elasticache",
#     "redshift",
#     "sagemaker",
#     "elastic file system",
#     "efs",
#     "cognito",
#     "docker",
#     "kubernetes",
#     "container",
#     "mongodb",
#     "azure",
#     "digitalocean",
#     "subversion",
#     "svn",
#     "mobile-first",
#     "material",
#     "c#",
#     "analytics",
#     "apache",
#     "nginx",
#     "ci/cd",
#     "jenkins",
#     "www",
#     "dns",
#     "flexbox",
#     "grid",
#     "es6",
#     "gitlab",
#     "bitbucket",
#     "owasp",
#     "content security policy",
#     "https",
#     "tls",
#     "ssl",
#     "handshake",
#     "bem",
#     "postcss",
#     "esbuild",
#     "rollup",
#     "parcel",
#     "vite",
#     "prettier",
#     "eslint",
#     "css module",
#     "jsx",
#     "emotion",
#     "custom element",
#     "shadow dom",
#     "bulma",
#     "radix",
#     "testing library",
#     "storage",
#     "socket.io",
#     "web socket",
#     "prpl",
#     "solid",
#     "dry",
#     "yagni",
#     "fcp",
#     "lcp",
#     "singleton",
#     "provider",
#     "observer",
#     "module",
#     "mixin",
#     "hook",
#     "factory",
#     "csr",
#     "ssr",
#     "hydration",
#     "tree shaking",
#     "lighthouse",
#     "internationalization",
#     "rail",
#     "gatsby",
#     "web assembly",
#     "wasm",
#     "blazor",
#     "golang",
#     "postgresql",
#     "orm",
#     "acid",
#     "normalization",
#     "shard",
#     "cap",
#     "influxdb",
#     "oauth",
#     "grpc",
#     "cdn",
#     "monolithic",
#     "microservice",
#     "microfrontend",
#     "serverless",
#     "rabbitmq",
#     "kafka",
#     "neo4j",
#     "caddy",
#     "trello",
#     "slack",
#     "kotlin",
#     "scala",
#     "hash",
#     "hadoop",
#     "bpm",
#     "bpel",
#     "w3c",
#     "pwa",
#     "uml",
#     "i/o",
#     "posix",
#     "centos",
#     "ubuntu",
#     "rhel",
#     "freebsd",
#     "bash",
#     "nano",
#     "powershell",
#     "ftp",
#     "ssh",
#     "port forward",
#     "consul",
#     "istio",
#     "ansible",
#     "github action",
#     "circle ci",
#     "prometheus",
#     "grafana",
#     "datadog",
#     "loki",
#     "jaeger",
#     "new relic",
#     "google cloud",
#     "apollo",
#     "rtk",
#     "balsamiq",
#     "sketch",
#     "inkscape",
#     "illustrator",
#     "creative cloud",
#     "invision",
#     "powerpoint",
#     "word",
#     "box",
#     "dropbox",
#     "ai",
#     "ml",
#     "npm",
#     "selenium",
#     "jsp",
#     "cgi",
#     "a/b test",
#     "jsdoc",
#     "inheritance",
#     "polymorphism",
#     "abstraction",
#     "encapsulation",
#     "kernel",
#     "mobx",
#     "zustand",
#     "load balanc",
#     "clojure",
#     "matlab",
#     "data science",
#     "ms sql",
#     "excel",
#     "filemaker",
#     "nlp",
#     "solr",
#     "mime",
#     "captcha",
#     "struts",
#     "flash",
#     "thunk",
#     "react router",
#     "jasmine",
#     "yaml",
#     "handlebars",
#     "grunt",
#     "gulp",
#     "ant",
#     ".net",
#     "entity framework",
#     "nunit",
#     "cakephp",
#     "bindows",
#     "voldemort",
#     "lucene",
#     "websocket",
#     "vbscript",
#     "lightning",
#     "sdlc",
#     "jpa",
#     "hibernate",
#     "jsf",
#     "wicket",
#     "gwt",
#     "jstl",
#     "xlst",
#     "xsd",
#     "firewall",
#     "soar",
#     "go",
#     "erlang",
#     "ocaml",
#     "rdbms",
#     "zend",
#     "yii",
#     "eclipse",
#     "xcode",
#     "cvs",
#     "concurrent version system",
#     "highchart",
#     "react flow",
#     "winform",
#     "linq",
#     "dapper",
#     "wcf",
#     "windows communication foundation",
#     "sqlite",
#     "saga",
#     "taskscheduler",
#     "spa",
#     "reactive",
#     "karma",
#     "sveltekit",
#     "nx",
#     "vscode",
#     "visual studio",
#     "sublime",
#     "iot",
#     "ar",
#     "vr",
#     "mr",
#     "openxr",
#     "mrtk",
#     "oculus",
#     "openvr",
#     "stencil",
#     "cucumber",
#     "pytest",
#     "robot",
#     "jira",
#     "guru",
#     "salesforce",
#     "developer tools",
#     "appium",
#     "confluence",
#     "java server pages",
#     "common gateway interface",
#     "express",
#     "protractor",
#     "supabase",
#     "nim",
#     "godot",
#     "lisp",
#     "quik",
#     "pocketbase",
#     "surrealdb",
#     "hugo",
#     "tensorflow",
#     "solidjs",
#     "web3",
#     "redwood",
#     "tauri",
#     "nuxt",
#     "assembly",
#     "parallax",
#     "elixir",
#     "passport",
#     "wireframe",
#     "mockup",
#     "asynchronous",
#     "closure",
#     "promise",
#     "postman",
#     "sqa",
#     "monorepo",
#     "composer",
#     "fastapi",
#     "slimphp",
#     "smarty",
#     "webgl",
#     "tdd",
#     "bdd",
#     "mean",
#     "mern",
#     "polymer",
#     "svg",
#     "bitcoin",
#     "ethereum",
#     "shell",
#     "dart",
#     "r lang",
#     "julia",
#     "haskell",
#     "delphi",
#     "apl",
#     "crystal",
#     "cobol",
#     "microsoft sql server",
#     "ibm db2",
#     "couchbase",
#     "heroku",
#     "ibm cloud",
#     "watson",
#     "oracle cloud",
#     "asp.net core",
#     "numpy",
#     "pandas",
#     "pytorch",
#     "apache spark",
#     "yarn",
#     "xamarin",
#     "unreal",
#     "deno",
#     "chef",
#     "pulumi",
#     "notepad++",
#     "intellij",
#     "atom",
#     "macos",
#     "windows",
#     "f#",
#     "stripe",
#     "prototyping",
#     "linear algebra",
#     "statistics",
# ]

# regex_keywords = [create_regex_pattern(keyword) for keyword in keywords]

# stack = {
#     "full-stack": [r"full[-\s]?stack", 0],
#     "front-end": [r"front[-\s]?end", 0],
#     "back-end": [r"back[-\s]?end", 0],
#     "UI/UX": [r"ui/ux", 0],
#     "DevOps": [r"devops", 0],
# }

# experience = {
#     "junior": [r"(junior)|(entry)", 0],
#     "mid-level": [r"mid", 0],
#     "senior": [r"senior", 0],
# }

# education = {
#     "Bachelor's": [r"(bachelor[\']?s)|(\bba\b)|(\bbs\b)", 0],
#     "Master's": [r"(master[\']?s)|(\bms\b)", 0],
#     "PhD": [r"(phd)|(doctor)", 0],
# }

# language = {
#     "HTML": [r"html", 0],
#     "CSS": [r"css", 0],
#     "JavaScript": [r"(javascript)|(js)", 0],
#     "TypeScript": [r"typescript", 0],
#     "PHP": [r"php", 0],
#     "Java": [r"\bjava\b", 0],
#     "Python": [r"python", 0],
#     "Kotlin": [r"kotlin", 0],
#     "Swift": [r"swift", 0],
#     "Dart": [r"dart", 0],
#     "C#": [r"c#", 0],
#     "C": [r"\bc\b", 0],
#     "C++": [r"c\+\+", 0],
#     "R": [r"\br\b", 0],
#     "Lua": [r"lua", 0],
#     "Go": [r"[.\s]go[.\s]", 0],
#     "Rust": [r"rust", 0],
#     "Ruby": [r"ruby", 0],
#     "Perl": [r"perl", 0],
#     "Clojure": [r"clojure", 0],
#     "Scala": [r"\bscala\b", 0],
# }

# frontend_framework = {
#     "React": [r"react", 0],
#     "Angular": [r"angular", 0],
#     "Vue": [r"vue", 0],
#     "Ember": [r"\bember", 0],
#     "Svelte": [r"svelte", 0],
#     "jQuery": [r"jquery", 0],
#     "WebAssembly": [r"(web\s?assembly)|(wasm)", 0],
#     "Next": [r"next.js", 0],
#     "Gatsby": [r"gatsby", 0],
# }

# backend_framework = {
#     "Django": [r"django", 0],
#     "Flask": [r"flask", 0],
#     "Ruby on Rails": [r"rails", 0],
#     "ASP.net": [r"(asp.net)|(\b.net\b)", 0],
#     "Spring": [r"spring", 0],
#     "Express": [r"express", 0],
#     "Laravel": [r"laravel", 0],
# }

# database = {
#     "Oracle": [r"oracle", 0],
#     "MySQL": [r"mysql", 0],
#     "PostgreSQL": [r"postgresql", 0],
#     "MS SQL": [r"(ms\s?sql)|(microsoft sql)", 0],
#     "SQLite": [r"sqlite", 0],
#     "MongoDB": [r"mongodb", 0],
#     "Redis": [r"redis", 0],
#     "MariaDB": [r"maria", 0],
#     "Firebase": [r"firebase", 0],
#     "Cassandra": [r"cassandra", 0],
#     "DB2": [r"db2", 0],
#     "Elasticsearch": [r"elasticsearch", 0],
#     "GraphQL": [r"graphql", 0],
# }

# css = {
#     "Bootstrap": [r"bootstrap", 0],
#     "Tailwind": [r"tailwind", 0],
#     "Material": [r"material", 0],
#     "SASS": [r"(scss)|(sass)", 0],
#     "LESS": [r"\bless\b", 0],
# }

# cms = {
#     "Wordpress": [r"wordpress", 0],
#     "Drupal": [r"drupal", 0],
#     "Joomla": [r"joomla", 0],
#     "Magento": [r"magento", 0],
# }

# module_bundler = {
#     "Webpack": [r"webpack", 0],
#     "Parcel": [r"parcel", 0],
#     "Rollup": [r"rollup", 0],
#     "Browserify": [r"browserify", 0],
# }

# cloud = {
#     "AWS": [r"aws", 0],
#     "Google cloud": [r"google cloud", 0],
#     "Azure": [r"azure", 0],
#     "Heroku": [r"heroku", 0],
# }

# container = {"Docker": [r"docker", 0], "Kubernetes": [r"kubernetes", 0]}

# testing = {
#     "Jest": r"jest",
#     "Mocha": r"mocha",
#     "Cypress": r"cypress",
#     "Enzyme": r"enzyme",
# }

# big_array = {
#     "language": language,
#     "frontend_framework": frontend_framework,
#     "backend_framework": backend_framework,
#     "database": database,
#     "css": css,
#     "cms": cms,
#     "module_bundler": module_bundler,
#     "cloud": cloud,
#     "container": container,
#     "testing": testing,
# }

# # Initialize a dictionary to store the counts for each regex
# counts = {keyword: 0 for keyword in keywords}

# # Extract descriptions from the 'items' array
# descriptions = [item["description"] for item in data]

# # Iterate through the list of strings
# for string in descriptions:
#     # Iterate through the list of regex expressions
#     for keyword in keywords:
#         # Check if the string matches the current regex
#         if re.search(create_regex_pattern(keyword), string):
#             # If it matches, increment the count for that regex
#             counts[keyword] += 1

# # Print the counts for each regex and the total count
# # for regex, count in regex_counts.items():
# #     print(f"Regex: {regex} - Count: {count}")

# sorted_counts = sorted(counts.items(), key=lambda x: x[1], reverse=False)

# for keyword, count in sorted_counts:
#     print(f"keyword: {keyword} - Count: {count}")

# vectorizer = CountVectorizer(
#     token_pattern="[a-zA-Z0-9$&+,:;=?@#|<>.^*()%!-]+", stop_words="english"
# )
# # # Print the list of descriptions
# # # for description in descriptions:
# # #     print(description)

# X = vectorizer.fit_transform(descriptions)
# feature_names = vectorizer.get_feature_names_out()
# count_list = X.toarray().sum(axis=0)
# word_count_dict = dict(zip(feature_names, count_list))
# # Sort the dictionary by counts in descending order
# sorted_word_count = dict(
#     sorted(word_count_dict.items(), key=lambda item: item[1], reverse=False)
# )

# print(sorted_word_count)
# # filtered_list = [
# #     (s, sorted_word_count[s])
# #     for s in sorted_word_count
# #     if any(word == s for word in sorted_word_count)
# # ]
# # print(filtered_list)

# import numpy as np


# class NpEncoder(json.JSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, np.integer):
#             return int(obj)
#         if isinstance(obj, np.floating):
#             return float(obj)
#         if isinstance(obj, np.ndarray):
#             return obj.tolist()
#         return super(NpEncoder, self).default(obj)


# with open("datafile", "w") as file:
#     json.dump(sorted_word_count, file, cls=NpEncoder)
