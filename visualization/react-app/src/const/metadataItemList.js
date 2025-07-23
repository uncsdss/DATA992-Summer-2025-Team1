export const metadataItems = [
    {
      id: 1,
      proposedMetadata: "file_name (url)",
      logic: "File structure & relationship between files - this can be really valuable for creating graphs to help models establish relationships between directories & files.",
      processingMethod: "Standard python methods/libraries",
      category: "file-structure"
    },
    {
      id: 2,
      proposedMetadata: "file_ext (json, adoc, etc.)",
      logic: "Syntax & Pre-Processing requirements - it is important to ensure that data types and structures are taken into account when writing pre-processing logic.",
      processingMethod: "Standard python methods/libraries",
      category: "file-structure"
    },
    {
      id: 3,
      proposedMetadata: "uuid",
      logic: "Tags files with unique identifers that can be potentially used to associate file relationship; one main benefit of using a UUID vs file name is to reduce risk of possible file duplication.\n\nStandard UUID Format:\nExample: {\n  \"uuid\": \"550e8400-e29b-41d4-a716-446655440000\"\n}\n\nCustom UUID Format:\nRRRR-LL-CCCC-TT-XXXXXXXXXXXXXXXXXXXXXXXX\n\nWhere:\nRRRR = Repository Code\nLL = Language\nCCCC = Concept\nTT = File Type (ad, ym, js, md)\nXXXXXXXXXXXXXXXXXXXXXXXX = Random Unique ID (hex)",
      processingMethod: "Standard python methods/libraries",
      category: "file-structure"
    },
    {
      id: 4,
      proposedMetadata: "repo_name",
      logic: "Identifies the specific repo name. This can further strengthen relationship identification for things like graphs and classification.",
      processingMethod: "Standard python methods/libraries",
      category: "file-structure"
    },
    {
      id: 5,
      proposedMetadata: "last_modified",
      logic: "Provides a definitive timestamp of when the last modification was made to the file. This can be an indicator of how active/high-visibility a file or directory is.",
      processingMethod: "Git Repository History; Standard python methods/libraries",
      category: "file-structure"
    },
    {
      id: 6,
      proposedMetadata: "file_purpose_use (\"task, concept\")",
      logic: "Categorize files into concepts or tags used for classificiation.",
      processingMethod: "facebook/bart-large-mnli - \"zero-shot-classification\" method - based on the summary (purpose)",
      category: "ai-processing"
    },
    {
      id: 7,
      proposedMetadata: "summary (purpose)",
      logic: "Summary of the the file, produced by facebook bart. Potentionally provide more robust descriptions that the .adoc summary might not provide. Facebook BART does not produce strong results for .yaml, .yml.",
      processingMethod: "facebook/bart-large-cnn - \"summarization\" method",
      category: "ai-processing"
    },
    {
      id: 8,
      proposedMetadata: "chapter",
      logic: "Provides a numerical value that can be used to develop a sequential flow of files; we felt this be valuable in connecting files to creat holistic flows & relationships outside of an existing file structure.",
      processingMethod: "TBD",
      category: "file-structure"
    },
    {
      id: 9,
      proposedMetadata: "named_entities",
      logic: "Capture proper nouns (organizations, products, places) to support semantic search, filtering, clustering, and summarization of document content.",
      processingMethod: "Named entity recognition using spaCy's transformer model en_core_web_trf, applied to the full raw text of each document.",
      category: "ai-processing"
    },
    {
      id: 10,
      proposedMetadata: "keywords",
      logic: "Keywords can be valuable for helping conduct similarity matching, classification, and summarization",
      processingMethod: "",
      category: "text-analysis"
    },
    {
      id: 11,
      proposedMetadata: "TF-IDF top unigrams",
      logic: "Include terms with high TF-IDF scores, indicating they are important within a document and not too common across others. Highlights terms that best represent the document's core content in single words.",
      processingMethod: "The TF-IDF and discriminative TF-IDF keywords were extracted using TfidfVectorizer from scikit-learn on the raw_text of each document. Filtered out any terms with TF-IDF scores below 0.15 based on observed results",
      category: "text-analysis"
    },
    {
      id: 12,
      proposedMetadata: "TF-IDF top Bigrams",
      logic: "Same as above, but for two-word phrases (bigrams). Captures more specific concepts or technical expressions that unigrams may miss.",
      processingMethod: "Similar to above but with n gram range 2",
      category: "text-analysis"
    },
    {
      id: 13,
      proposedMetadata: "Discriminative TF-IDF Unigrams",
      logic: "Include unigrams where the TF-IDF score in the document is much higher than the average across all other documents. Surfaces words that make the document stand out from others — uniquely identifying terms.",
      processingMethod: "diff_vector = doc_vector - mean_others used difference > .05",
      category: "text-analysis"
    },
    {
      id: 14,
      proposedMetadata: "Discriminative TF-IDF Bigrams",
      logic: "Same as above, but for bigrams. measures how discriminative a term is — high values mean that term is unusually important in that doc compared to the rest.",
      processingMethod: "as above",
      category: "text-analysis"
    },
    {
      id: 15,
      proposedMetadata: "persona (business,developer,system admin, overweight)",
      logic: "Include new tags to classify potential document field.",
      processingMethod: "facebook/bart-large-mnli - \"zero-shot-classification\" method - based on the summary (purpose)",
      category: "ai-processing"
    },
    {
      id: 16,
      proposedMetadata: "synonyms",
      logic: "Finding synonyms for unique terms from adoc files using title, keywords, and section headings as the base terms to reinforce and diversify search terms",
      processingMethod: "Standard python methods/libraries (using NLTK WordNet a lexical database for the English language)",
      category: "text-analysis"
    },
    {
      id: 17,
      proposedMetadata: "section_heading",
      logic: "Identifying the subsection-levels of adoc files; this will provide a better overview of adoc files than just the summary to help understand the flow and relationships.",
      processingMethod: "Standard python methods/libraries",
      category: "text-analysis"
    }
  ]