# DATA992-Summer-2025-Team1

# _Capstone Project_
</br>

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

## Data Plan
Data Needed and Purpose

We intend to focus on the .adoc (AsciiDoc) files from the NetAppDocs/bluexp-automation GitHub repository. Additional files json, yml, and yaml will be explored. 
Specific data of interest includes section titles, headers, code snippets, and descriptive text from documentation; Explore raw and cleaned text content for model training.

### Goal:
- Create enriched or new metadata for improved search and classification.
- Support semantic tag generation and topic modeling.


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

*Taxonomy and Its Role in Intelligent Search*
<br>
Deepika Bothra and Ayushi Gautam
<br>
https://www.searchunify.com/blog/taxonomy-and-its-role-in-intelligent-search/#:~:text=To%20save%20you%20from%20this,more%20relevant%20to%20the%20user

*BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models*
<br>
Nandan Thakur, Nils Reimers, Andreas Rücklé , Abhishek Srivastava, Iryna Gurevych
<br>
https://arxiv.org/pdf/2104.08663#:~:text=,12%5D%20have

*Hybrid Retrieval: Combining BERT and BM25 for Enhanced Performance*
<br>
Konstantin Bormotov
<br>
https://medium.com/@bormotovk/hybrid-retrieval-combining-bert-and-bm25-for-enhanced-performance-4f6f80881c13

*Unsupervised Document Expansion for Information Retrieval with Stochastic Text Generation*
<br>
Soyeong Jeong, Jinheon Baek, ChaeHun Park, Jong C. Park
<br>
https://aclanthology.org/2021.sdp-1.2/#:~:text=One%20of%20the%20challenges%20in,document%20pairs



*Meta Knowledge for Retrieval Augmented Large Language Models*
<br>
Laurent Mombaerts, Terry Ding, Florian Felice, Jonathan Taws, Adi Banerjee, Tarik Borogovac
<br>
https://arxiv.org/html/2408.09017v1#:~:text=and%20diverse%20set%20of%20documents,query%20augmentation


*Self-Supervised Query Reformulation for Code Search*
<br>
Yuetian Mao, Chengcheng Wan, Yuze Jiang, Xiaodong Gu
<br>
https://dl.acm.org/doi/10.1145/3611643.3616306

*Automatic query reformulation for code search using crowdsourced knowledge*
<br>
Mohammad Masudur Rahman, Chanchal Kumar Roy, David Lo
<br>
https://dl.acm.org/doi/abs/10.1007/s10664-018-9671-0#:~:text=,41%5D.%20Ponzanelli%20L

*Automated metadata annotation: What is and is not possible with machine learning.*
<br>
Yi Gao, Jianxia Chen , Liang Xiao, Hongyang Wang, Liwei Pan, Xuan Wen, Zhiwei Ye, Xinyun Wu
<br>
http://direct.mit.edu/dint/article/5/3/786/114954/Adversarial-Neural-Collaborative-Filtering-with

*BERTopic: Neural topic modeling with a class-based TF-IDF procedure*
<br>
Maarten Grootendorst
<br>
https://arxiv.org/abs/2203.05794

*Explore-Construct-Filter: An Automated Framework for Rich and Reliable API Knowledge Graphs*
<br>
Yanbang Sun, Qing Huang, Xiaoxue Ren, Zhenchang Xing, Xiaohong Li, Junjie Wang
<br>
https://arxiv.org/abs/2502.13412

*Enhancing API Documentation through BERTopic Modeling and Summarization*
<br>
AmirHossein Naghshzan, Sylvie Ratt´
<br>
https://arxiv.org/abs/2308.09070

*Multimodal approach for metadata extraction from German scientific publications.*
<br>
Azeddine Bouabdallah, Jorge Gavilan, Jennifer Gerbl, Prayuth Patumcharoenpol
<br>
https://arxiv.org/abs/2111.05736


*OpenTag: Open attribute value extraction from product profiles.*
<br>
Guineng Zheng, Subhabrata Mukherjee, Xin Luna Dong, Feifei Li
<br>
https://dl.acm.org/doi/10.1145/3219819.3219839





