# DATA992-Summer-2025-Team1

# _Capstone Project_

## About

Capstone project for Team 1 @ University of North Carolina's Master of Applied Data Science.

## Problem Statement:

NetApp’s extensive library of technical documentation, authored in AsciiDoc and hosted on GitHub, plays a crucial role in product development, customer support, and implementation success. However, the unstructured nature of this content makes it difficult to retrieve relevant information quickly—resulting in slower onboarding, longer troubleshooting times, and inconsistent knowledge sharing.
We aim to address this challenge by developing a metadata enrichment system using natural language processing and machine learning. The focus will be on the bluexp-automation repository, analyzing text blocks, headers, code, and tables to extract key entities, topics, semantic relationships, and contextual tags. This enriched metadata will feed into a prototype retrieval system that significantly enhances searchability and contextual understanding.
The project will be constrained by access to existing documentation, GitHub-based workflows, and available compute for NLP models. It must deliver a working prototype, performance metrics comparing baseline and augmented search, and visualizations that communicate its impact.
Stakeholders—including NetApp documentation teams, internal engineers, and external users—will benefit from faster, more accurate access to the right documentation at the right time. Ultimately, the project will help NetApp improve operational efficiency, reduce cognitive load for its users, and set a precedent for intelligent document retrieval systems.

## Project Objectives:

- Explore and analyze NetApp open-source documentation - beginning with the BlueXP-Automation API repository.
- Employ NLP models to identify and extract key entities, concepts, and relationships within the textual content, enhancing the metadata with semantic tags and topic modeling results
- Write a detailed report and an executive presentation discussing our findings, sharing our methodologies, and offering recommendations for further development.

## Contributors

[Adam Green](https://www.linkedin.com/in/agreen01/) | [Hubert Hwang](https://www.linkedin.com/in/hubert-hwang-1280076a) | [Jimmy Kruse](https://www.linkedin.com/in/jimmy-kruse-a7a021122) | [Dorn Lee](https://www.linkedin.com/in/dorn-l-79b204a7/) | 
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src=https://github.com/agreen8911/Full-Racks-Academy_Grace_Shopper/assets/124797284/f0564196-7ec8-4572-b784-d40f5edd3b4b width = "150" /> | <img src=https://github.com/user-attachments/assets/c6c69712-0df6-477b-8275-57d81a927008 width = "150" /> | <img src=https://github.com/user-attachments/assets/266bdfc3-9bc2-4774-a1a0-0e9a8ba4cf20 width = "150" /> | <img src=https://github.com/user-attachments/assets/1703f1e3-60a1-4b65-92a1-f0be7774ae38 width = "150" /> |
|[<img src="https://user-images.githubusercontent.com/36062933/108450440-38656600-7233-11eb-9ed0-34ecedcae435.png" width="20"> ](https://github.com/agreen8911)   |   [<img src="https://user-images.githubusercontent.com/36062933/108450440-38656600-7233-11eb-9ed0-34ecedcae435.png" width="20"> ](https://github.com/hhwang919)    |   [<img src="https://user-images.githubusercontent.com/36062933/108450440-38656600-7233-11eb-9ed0-34ecedcae435.png" width="20"> ](https://github.com/jrkruser)    |   [<img src="https://user-images.githubusercontent.com/36062933/108450440-38656600-7233-11eb-9ed0-34ecedcae435.png" width="20"> ](https://github.com/dl9133)    |
|[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/agreen01/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/hubert-hwang-1280076a) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/jimmy-kruse-a7a021122) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="20"> ](https://www.linkedin.com/in/dorn-l-79b204a7)     |            

## Data Sources

This project is based on NetApp's BlueXP-Automation GitHub repository, which can be found here: https://github.com/NetAppDocs/bluexp-automation 

##   Project Plan


---

###  Scope

Utilizing NLP techniques, generate enriched metadata tags to augment existing search retrieval processes and improve returned results, including both the total number of relevant documents and the highest quality (highest relevance) documentation.

---

###  Methodology

- Extract repository(ies) text to be analyzed utilizing Python methods.
- Conduct data preprocessing to ensure a clean training/evaluation dataset. The dataset preprocessing includes:
  - Parsing the YAML front-matter to use as higher priority
  - Removing empty lines (whitespace)
  - Removing Ascii markup and comments
  - Removing stop-words
  - Converting all text to lower-case
  - Tokenizing the cleaned text for model training
- Generate metadata tags utilizing NLP techniques, such as BERT-based models, including KeyBERT and LLM-generated tags.
  - Metadata tag generation approaches being explored include:
    - BERTopic Modeling with RAKE & TF-IDF
    - Fine-tuned T5 model with KeyBERT and a secondary grading model for tag quality evaluation
    - LLM-augmented generation
- Build and integrate a secondary **grading model** to evaluate the relevance of generated tags to document content.
  - Grading model assigns a score to the relevancy of the generated tag (from the first model) and classifies it as relevant (1) or not (0).
- Test project methodology via user-defined querying and comparing returned NetApp documentation.

---
## Data Visualization


The visualization we created is a d3 js web portal. We include some data analysis of the NetApp Bluexp repository under "EDA." 
There are two formats for analyzing the repository. The "explorer" provides a high level overview and breakdown of the metadata we generated. Also, there is an "Org-chart"
which provides a more personalized and in depth view of the repository.

![EDA Chart](./images/eda-chart.png "EDA Chart")
![Explorer Chart](./images/explorer-chart.png "Explorer Chart")
![Org Chart](./images/org-chart.png "Org Chart")

D3, or Data-Driven Documents, is a popular Javascript library for building interactive web-based visualizations. In order to load data into a D3 visualization from your machine, you need to be running the application on a server.
 
I strongly recommend using python to boot up a local server instance using the terminal command :
    
    python3 -m http.server
    
and then opening the corresponding page in the browser (typically http://localhost:8000/index.html) to an external site. But the command prompt will tell you if you're loading on a different port than 8000. Other than that, you'll just need access to a browser and an IDE capable of doing HTML development (I like minimalist tools like Notepad++, Atom, Brackets, or Sublime, but VSCode and other full-featured IDEs work just as well).
 
### Terminal Python HTTP server
To terminate the python HTTP server, you can use the keyboard shortcut:
 
    Control + C (Ctrl+C)
 
### python3 -m http.server isn't working
1. Check if you have Homebrew installed by running
    brew --version
 
2. If you see "command not found" error, you'll need to install Homebrew first by running
    brew install python3
 
3. After installation, restart your terminal and try running
    python3 -m http.server
 
4. If server starts successfully, you should see a message like
    "Serving HTTP on 0.0.0.0 port 8000"
---

## Data Analysis
---

##  Roles

| Member        | Role             | Duties                                                                 |
|---------------|------------------|------------------------------------------------------------------------|
| Adam Green    | Data Engineer    | Ensure GitHub repo is updated, consolidate models, refactor code       |
| Dorn Lee      | Project Manager  | Communicate with stakeholders, organize meetings, manage team tasks    |
| Jimmy Kruse   | ML Developer     | Build and evaluate models (BERT, LLM, Grading)                         |
| Hubert Hwang  | Lead Researcher  | Provide a list of candidate models/techniques for the group            |

---

##  Schedule & Milestones

####  Sprint 3 Release (June 22)
- Access zipped GitHub repo for `.adoc` files
- Review literature for modeling techniques
- Explore BERT, LLM, and grading models
- Begin testing to establish a baseline
- Generate metadata tags using NLP
- Perform EDA analysis
- Formulate Project Plan

####  Group Status Report (June 27)
- Report team progress to stakeholders
- Share model testing results
- Present short- and long-term goals
- Discuss issues and blockers

####  Sprint 4 Release (July 6)
- Evaluate techniques:
  - KeyBERT + cosine similarity
  - KeyBERT + nearest neighbor
  - KeyBERT + T5
  - BERTopic with RAKE & TF-IDF
  - LLM augmentation
- Compare and optimize models

####  Data Visualization (July 14)
- Visualize data summary and stats
- Present the metadata tag pipeline
- Show model performance
- Analyze terminology in tags

####  Sprint 5 Release (July 20)
- Final testing and evaluation
- Identify best-performing models
- Finalize visualizations and insights
- Summarize key findings
- Prepare final presentation

####  Data Analysis (July 21)
- Techniques: BERT, LLM, Grading, KeyBERT, etc.
- Evaluate tag relevance
- Score the tags with the grading model

####  Final Presentation (July 23)
- Dynamic visuals
- Summary of findings
- Key achievements and insights
- Recommendations
- Dashboard demo

---

###  Challenges

- Queries may lack context or be overly brief (e.g., one-word queries)
- Similar content across `.adoc` files causes retrieval conflicts
- No stakeholder-defined test plan or benchmark exists for comparison
- Lack of performance baseline from NetApp’s current metadata system

---








## Data Plan

We intend to focus on the .adoc (AsciiDoc) files from the NetAppDocs/bluexp-automation GitHub repository. Additional files json, yml, and yaml will be explored. 
Specific data of interest includes section titles, headers, code snippets, and descriptive text from documentation; Explore raw and cleaned text content for model training.

### Goal:
- Create enriched or new metadata for improved search and classification.
- Support semantic tag generation and topic modeling.
- Incorporate novel methods and ideas


### Data Collection Methods
- Utilize python methods to crawl documents
- Parse files to extract structured metadata and raw textual content.
- Scrape additional NetApp documentation for larger training sets.
  
## Data Cleaning and Validation

### Preprocessing Tasks:

- Remove AsciiDoc/Markdown syntax and metadata tags.
- Normalize casing, punctuation, and stop words.
- Perform stemming or lemmatization.
- Deduplicate entries across versions.


### Validation Strategies:
- Manual inspection of semantic tag outputs.
- Cross-check required metadata fields and normalize naming conventions.
- Compare model retrieval results against NetApp’s internal search and stakeholder queries.
- Segment data for training/validation/testing.

## Data Dictionary 

| **Field Name**           | **Type**         | **Description**                                                   |
|--------------------------|------------------|-------------------------------------------------------------------|
| `doc_id`                 | String           | Identifier or name of the document/file.                          |
| `doc_path` / `doc_url`   | String           | Path or URL to the document.                                      |
| `doctype`                | String           | Type of document (e.g., adoc, json).                              |
| `raw_text`               | Text             | Original textual content without formatting.                      |
| `preprocessed_text`      | Text             | Cleaned and normalized text used for model input.                 |
| `embeddings`             | List[float]      | Dense vector representations for retrieval or classification.     |
| `generated_topics`       | List[String]     | Topics extracted via modeling or classification.                  |
| `generated_metadata_tags`| List[String]     | Metadata labels generated for semantic search.                    |
| `service_name`           | String           | Name of the NetApp service (e.g., cloud-backup).                  |
| `last_updated`           | DateTime         | Last modified date from Git commit history.                       |




## Literature Review

Our project explores NLP-based metadata generation to improve document retrieval from the NetApp BlueXP documentation set. The literature covers techniques in hybrid retrieval, taxonomy-driven metadata design, query reformulation, topic modeling, and automated tag evaluation. Together, these sources inform our approach of using BERT-based models (e.g., BERTopic, KeyBERT), LLM-driven summaries, and rule-based extraction to generate and validate metadata tags.

See the [full literature review here](literature_review.md).


# DATA992-Summer-2025-Team1

## Repository Structure

```
root-Summer-2025-Team1/
├── .github/
│   ├── CODEOWNERS
│   └── .gitignore
├── data/
│   ├── bluexp-dataset/
│   │   ├── uuid_file_map.csv
│   │   └── tenancyv4/
│   │       └── tenancyv4.yaml
├── docs/
│   └── literature_review.md
├── final-proposal.ipynb
├── images/
├── metadata-concepts/
│   ├── cell_2_extracted_adoc_docs
│   ├── cell_3_extracted_metadata.json
│   ├── metadata_catalog.json
│   ├── Named_Entity_Rec.ipynb
│   ├── preprocessing-metadata-proposed.ipynb
│   └── summarizer_classifier_metadata.ipynb
├── notebooks/
│   ├── 01_data_retrieval.ipynb
│   ├── 02_eda.ipynb
│   ├── 03_preprocessing.ipynb
│   └── ...
├── proof-of-concepts/
│   └── nearest_neighbor.ipynb
├── README.md
├── requirements.txt
├── setup.py
├── src/
├── visualization/
│   ├── css/
│   │   └── main.css
│   ├── eda/
│   │   └── eda.html
│   ├── explorer/
│   │   ├── explorer.html
│   │   └── js/
│   │       └── tree.js
│   ├── index.html
│   └── org-chart/
│       ├── org-chart.html
│       └── js/
│           └── tree.js
```
