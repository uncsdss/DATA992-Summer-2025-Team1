# Detailed Literature Review – NetApp Documentation Metadata Project

This literature review supports our project goal of enhancing document retrieval and classification within NetApp BlueXP documentation. We review key methods in taxonomy design, hybrid retrieval systems, metadata extraction, topic modeling, and code search enhancement.

---

## 1. Taxonomy and Metadata Design

- **Taxonomy and Its Role in Intelligent Search** – Bothra & Gautam  
  Highlights the importance of controlled vocabularies and taxonomies in search filtering. Key for hierarchical metadata tagging in our system.  
  [Read more](https://www.searchunify.com/blog/taxonomy-and-its-role-in-intelligent-search)

- **Automated Metadata Annotation** – Gao et al.  
  Reviews current limitations of ML in metadata extraction; supports hybrid human-in-the-loop approaches for domain-specific tagging.  
  [Read more](http://direct.mit.edu/dint/article/5/3/786/114954/...)

- **Graph Metadata Filtering for RAG** – Neo4j Blog  
  Discusses the value of knowledge graphs to constrain semantic search. Potentially useful to mitigate NetApp's overlapping documents.  
  [Read more](https://neo4j.com/blog/developer/graph-metadata-filtering-vector-search-rag/)

*→ For our project:*  
These sources reinforce the need for structured tagging and taxonomy-based filters in our metadata schema. A controlled vocabulary for NetApp service names and document types can improve result relevance, while a graph-based system may help distinguish similar documents during retrieval.

---

## 2. Retrieval Models and Document Embeddings

- **BEIR Benchmark** – Thakur et al.  
  Dense retrieval models excel in zero-shot generalization. Useful context for choosing between sparse/dense/hybrid search.  
  [Read more](https://arxiv.org/pdf/2104.08663)

- **Hybrid Retrieval with BM25 + BERT** – Bormotov  
  Simple combination of sparse and dense scores greatly improves performance. Feasible for BlueXP-scale deployments.  
  [Read more](https://medium.com/@bormotovk/hybrid-retrieval...)

- **Meta Knowledge for RAG LLMs** – Mombaerts et al.  
  Synthetic Q&A generation and document clustering helps interpret user intent and group similar documents for retrieval.  
  [Read more](https://arxiv.org/html/2408.09017v1)

- **UDEG: Document Expansion via Text Generation** – Jeong et al.  
  Uses language models to generate synthetic content to reduce vocabulary mismatch. Potentially useful but risky for disambiguation.  
  [Read more](https://aclanthology.org/2021.sdp-1.2)

*→ For our project:*  
These papers support the use of hybrid retrieval strategies (BM25 + dense embeddings) in our pipeline. While dense models offer semantic strength, they may blur distinctions between highly similar NetApp documents. Query expansion or synthetic metadata could help, but must be applied cautiously to avoid making similar documents harder to differentiate.

---

## 3. Topic Modeling and Semantic Tagging

- **BERTopic** – Grootendorst  
  Topic modeling with class-based TF-IDF + BERT. Fits our task well, especially for producing metadata tags.  
  [Read more](https://arxiv.org/abs/2203.05794)

- **Enhancing API Documentation with BERTopic** – Naghshzan & Ratté  
  Demonstrates BERTopic applied to GitHub API docs. Closely matches our use case.  
  [Read more](https://arxiv.org/abs/2308.09070)

- **Topic Modeling of Public Repos at Scale** – Markovtsev & Kant  
  Identifies duplicate GitHub repos using LSH. Relevant to NetApp’s issue of high overlap.  
  [Read more](https://arxiv.org/abs/1704.00135)

*→ For our project:*  
Topic modeling methods like BERTopic can help extract meaningful clusters and themes from NetApp documentation, especially for generating metadata tags. Additionally, duplicate detection methods like Locality Sensitive Hashing (LSH) may assist in filtering near-duplicate pages or files from affecting retrieval performance.

---

## 4. Code Search and Developer Tools

- **Self-Supervised Query Reformulation (SSQR)** – Mao et al.  
  Uses T5 to expand and rewrite queries for improved search. Shows promise for augmenting developer-facing documentation.  
  [Read more](https://dl.acm.org/doi/10.1145/3611643.3616306)

- **RACK: Reformulation via API Class Knowledge** – Rahman et al.  
  Uses Stack Overflow to suggest API terms for search. Helps bridge natural language and technical queries.  
  [Read more](https://dl.acm.org/doi/abs/10.1007/s10664-018-9671-0)

- **CODEnn and SAN-CS**  
  Transformer-based code search models that better map user queries to relevant code.  
  [CODEnn](https://dl.acm.org/doi/abs/10.1145/3180155.3180167)  
  [SAN-CS](https://www.sciencedirect.com/science/article/abs/pii/S0950584921000288)

- **Augmenting API Docs with Stack Overflow** – Treude & Robillard  
  Combines Stack Overflow insights with API docs to improve clarity and discoverability.  
  [Read more](https://dl.acm.org/doi/10.1145/2884781.2884800)

*→ For our project:*  
These tools and methods offer inspiration for improving developer documentation discoverability. Although they focus on code search, the principles of reformulating queries and integrating external discussion sources (e.g., Stack Overflow) could enhance BlueXP documentation by supporting context-aware tagging or QA generation.

---

## 5. Metadata Extraction and Knowledge Graphs

- **Explore-Construct-Filter: API Knowledge Graphs** – Sun et al.  
  Presents a low-overhead schema construction method. May help connect NetApp files via inferred semantic relationships.  
  [Read more](https://arxiv.org/abs/2502.13412)

- **Multimodal Metadata Extraction from German Scientific Papers** – Bouabdallah et al.  
  Applies BiLSTM to irregular PDFs. Offers insight into extracting metadata from semi-structured formats.  
  [Read more](https://arxiv.org/abs/2111.05736)

- **OpenTag** – Zheng et al.  
  BiLSTM+CRF model for attribute extraction from unstructured text. May support future automation of tag generation.  
  [Read more](https://dl.acm.org/doi/10.1145/3219819.3219839)

- **Rule-Based Extraction from PDFs**  
  Uses regex and Apache PDFBox to extract metadata from raw documents. Shows value of rule-based + ML hybrids.  
  [Read more](https://doi.org/10.24507/icicelb.12.02.121)

*→ For our project:*  
These studies inform how we might extract structured metadata from .adoc and related files. We may combine rule-based systems (e.g., regex or YAML parsing) with ML models to generate robust metadata fields such as service name, doc type, and topic.

---
