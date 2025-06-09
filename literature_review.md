# Detailed Literature Review – NetApp Documentation Metadata Augmentation

This literature review supports our project goal of enhancing document retrieval and classification within the NetAp documentation. We review methods in taxonomy design, metadata extraction, query reformulation, topic modeling, and retrieval evaluation to inform our metadata generation and search improvement strategies.

---

## 1. Taxonomy and Metadata Design

- **Taxonomy and Its Role in Intelligent Search** – Bothra & Gautam  
  Advocates the use of taxonomies and controlled vocabularies for improved content filtering and discoverability. Requires understanding the content of the documents well and probably human input. 
  [Link](https://www.searchunify.com/blog/taxonomy-and-its-role-in-intelligent-search)

- **Automated Metadata Annotation** – Gao et al.  
  Explores the limitations of ML-only metadata tagging and proposes hybrid human-machine solutions.  
  [Link](http://direct.mit.edu/dint/article/5/3/786/114954)

- **Graph Metadata Filtering for RAG** – Neo4j Developer Blog  
  Introduces metadata filtering using structured graph representations to support guided, disambiguatemd search.  
  [Link](https://neo4j.com/blog/developer/graph-metadata-filtering-vector-search-rag/)

→ *For our project:* These sources emphasize building a structured metadata layer for NetApp docs. Incorporating taxonomies (ervice name, feature type) and graph metadata will help mitigate confusion from similar document titles or overlapping content. Right now there is not structure like this in the existing documentation metadata. Would only become applicable moving beyond just the Bluexp documents.

---

## 2. Retrieval Models and Document Expansion

- **BEIR Benchmark** – Thakur et al.  
  Provides a diverse benchmark for evaluating dense, sparse, and hybrid retrieval in zero-shot settings.  
  [Link](https://arxiv.org/pdf/2104.08663)

- **Hybrid Retrieval: Combining BM25 and BERT** – Bormotov  
  Smple score mixing can improve performance across retrieval tasks. Some optimized linear combination of the two methods produces better results than one or the other. 
  [Link](https://medium.com/@bormotovk/hybrid-retrieval...)

- **Meta Knowledge for RAG** – Mombaerts et al.  
  Describes using LLMs to build summaries and Q&A clusters for improved retrieval and user intent understanding. Adding 'query space' to each document.
  [Link](https://arxiv.org/html/2408.09017v1)

- **UDEG: Unsupervised Document Expansion** – Jeong et al.  
  Explores supplementing documents with LLM-generated sentences to improve coverage of relevant terms. 
  [Link](https://aclanthology.org/2021.sdp-1.2)

→ *For our project:* These can help us explore the use of hybrid retrieval models and potential use of LLM-generated summaries or Q&A as enriched metadata to improve document ranking and recall in vague or variable user queries.

---

## 3. Topic Modeling and Semantic Tagging

- **BERTopic** – Grootendorst  
  A BERT-based topic model using class-based TF-IDF for clean interpretable topics.  
  [Link](https://arxiv.org/abs/2203.05794)

- **BERTopic for API Docs** – Naghshzan & Ratté  
  Applies BERTopic to API docs for improved summarization and developer comprehension.  
  [Link](https://arxiv.org/abs/2308.09070)

- **Topic Modeling Public Repos** – Markovtsev & Kant  
  Applies large-scale topic modeling across GitHub and addresses duplicate detection using LSH.  
  [Link](https://arxiv.org/abs/1704.00135)

→ *For our project:* BERTopic is central to our metadata generation pipeline. We may also explore duplicate mitigation strategies like LSH to help distinguish highly similar documentation in BlueXP.

---

## 4. Query Reformulation and Code Search

- **SSQR (Self-Supervised Query Reformulation)** – Mao et al.  
  Trains T5 to expand and rephrase queries without labeled data.  
  [Link](https://dl.acm.org/doi/10.1145/3611643.3616306)

- **RACK: API Class Suggestion for Query Reformulation** – Rahman et al.  
  Uses Stack Overflow-derived knowledge to improve code search term matching.  
  [Link](https://dl.acm.org/doi/abs/10.1007/s10664-018-9671-0)

- **CODEnn: Neural Code Search** – Gu et al.  
  Uses embeddings to match queries and code via semantic proximity.  
  [Link](https://dl.acm.org/doi/abs/10.1145/3180155.3180167)

- **SAN-CS: Transformer-based Code Search** – Liu et al.  
  Improves on DeepCS using self-attention for more efficient and accurate code search.  
  [Link](https://www.sciencedirect.com/science/article/abs/pii/S0950584921000288)

- **Augmenting API Docs with Stack Overflow** – Treude & Robillard  
  Demonstrates augmenting documentation with external Q&A to improve discoverability.  
  [Link](https://dl.acm.org/doi/10.1145/2884781.2884800)

→ *For our project:* These methods support ideas for query evaluation and rewriting, which we may simulate via synthetic user queries. They also highlight the role of combining internal docs with external discussions or reformulated phrasing to improve access to relevant documentation.

---

## 5. Metadata Extraction and Knowledge Graphs

- **Explore-Construct-Filter Framework** – Sun et al.  
  Efficient API knowledge graph creation using semantic relationships and schema guidance.  
  [Link](https://arxiv.org/abs/2502.13412)

- **Multimodal Metadata Extraction** – Bouabdallah et al.  
  Applies BiLSTM to scientific papers with irregular layouts.  
  [Link](https://arxiv.org/abs/2111.05736)

- **OpenTag** – Zheng et al.  
  A BiLSTM + CRF model for extracting attribute values from unstructured product data.  
  [Link](https://dl.acm.org/doi/10.1145/3219819.3219839)

- **Rule-Based Extraction from PDFs**  
  Uses Apache PDFBox and regex for structured metadata generation from PDF books.  
  [Link](https://doi.org/10.24507/icicelb.12.02.121)

→ *For our project:* These approaches support our plan to combine rule-based extraction (e.g., regex for `.adoc`, `.yaml`) with learned models (KeyBERT, OpenTag-style tagging) to build metadata fields like service name, topics, and document type.

---
