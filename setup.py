from setuptools import setup, find_packages

setup(
    name="mads-capstone-team-1-nlp-metadata",
    version="0.1.0",
    description="NLP Metadata for Team 1's MADS Capstone Project",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/your-org/DATA992-Summer-2025-Team1",
    packages=find_packages(),
    install_requires=[
        # Core data science and ML libraries
        "pandas>=2.0.0",
        "numpy>=1.24.0", 
        "scikit-learn>=1.3.0",
        "scipy>=1.10.0",
        
        # Deep learning and NLP
        "transformers>=4.30.0",
        "sentence-transformers>=2.2.0",
        "keybert>=0.7.0",
        "spacy>=3.6.0",
        "nltk>=3.8.0",
        
        # Vector databases and similarity search
        "faiss-cpu>=1.7.0",
        "chromadb>=0.4.0",
        
        # Document processing
        "unstructured>=0.17.0",
        "unstructured-client>=0.37.0",
        "python-pptx>=1.0.0",
        "PyYAML>=6.0.0",
        
        # Graph and knowledge representation
        "networkx>=3.0.0",
        "llama-index>=0.9.0",
        
        # Visualization
        "matplotlib>=3.7.0",
        "seaborn>=0.12.0",
        "plotly>=5.15.0",
        
        # Jupyter and development
        "jupyter>=1.0.0",
        "ipywidgets>=8.0.0",
        "ipython>=8.0.0",
        
        # Utilities
        "tqdm>=4.65.0",
        "requests>=2.31.0",
        
        # Environment and configuration
        "python-dotenv>=1.0.0",
        
        # Optional: OpenAI integration
        "openai>=1.0.0",
    ],
    include_package_data=True,
    zip_safe=False,
)