# 🔥 Firecrawl Studio

> Convert ANY website into structured API data — with Multi-URL scraping, Advanced Schema Builder, and Query History.

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![Streamlit](https://img.shields.io/badge/Streamlit-1.x-red?style=flat-square&logo=streamlit)
![Firecrawl](https://img.shields.io/badge/Firecrawl-Latest-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

### ⚡ Feature 1 — Multi-URL Scraper
- Extract data from **up to 5 URLs simultaneously** in one run
- Natural language prompt-based extraction
- Per-source result display as clean tables
- **Query History** — track and reuse past extractions with one click

### 🧬 Feature 2 — Advanced Schema Builder
- Define **typed, described, validated** schemas for structured extraction
- Supported types: `str` · `bool` · `int` · `float` · `list[str]` · `list[int]`
- Add **field descriptions** to guide the AI on what to extract
- Mark fields as **required or optional**
- 3 view modes: **Summary** · **JSON Schema** · **Live Data Preview**

### 🔁 Combined Studio
- Use Multi-URL Scraper + Advanced Schema together via `FirecrawlStudio`
- Full session history with schema name tracking

---

## 📁 Project Structure

```
firecrawl-studio/
│
├── app.py                   # Streamlit web app (updated UI)
├── firecrawl_studio.ipynb   # Jupyter notebook (all features)
├── .env                     # API key (create this yourself)
├── requirements.txt         # Dependencies
└── assets/
    └── firecrawl.png        # Logo image
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Safik7866/WebEventManagement.git
cd WebEventManagement
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

Or manually:
```bash
pip install firecrawl-py streamlit python-dotenv pydantic pandas tabulate
```

### 3. Set Your API Key

Create a `.env` file in the project root:
```
FIRECRAWL_API_KEY=your_api_key_here
```

Get your free API key at 👉 [firecrawl.dev](https://firecrawl.dev)

### 4. Run the App

**Streamlit Web App:**
```bash
streamlit run app.py
```

**Jupyter Notebook:**
```bash
jupyter notebook firecrawl_studio.ipynb
```

---

## 🧪 Usage Examples

### Multi-URL Scraper
```python
from firecrawl import FirecrawlApp
# See firecrawl_studio.ipynb for full class

scraper = MultiURLScraper(app)

results = scraper.extract(
    urls=[
        "https://blog.dailydoseofds.com/*",
        "https://towardsdatascience.com"
    ],
    prompt="Extract article title, publish date, and link for all LLM articles"
)
scraper.display_results(results)
scraper.show_history()
```

### Advanced Schema Builder
```python
schema = (
    AdvancedSchemaBuilder("ArticleSchema")
    .add_field("article_title",  "str",       "Title of the article",          required=True)
    .add_field("publish_date",   "str",       "Date the article was published", required=True)
    .add_field("tags",           "list[str]", "Topic tags",                     required=False)
    .add_field("is_premium",     "bool",      "Whether behind a paywall",       required=False)
)

schema.preview()   # human-readable table
schema.print_json() # raw JSON Schema
```

### Combined Studio
```python
studio = FirecrawlStudio(app)

results = studio.extract(
    urls=["https://example.com/products"],
    prompt="Extract all product listings",
    schema_builder=schema
)
studio.display(results)
studio.show_history()
```

---

## 📦 Requirements

```
firecrawl-py
streamlit
python-dotenv
pydantic
pandas
tabulate
```

---

## 🗺️ Roadmap

- [ ] Export results as CSV / JSON file
- [ ] Schedule recurring extractions
- [ ] Support for authenticated pages
- [ ] Result comparison across runs

---

## 👤 Author

**Safik7866**
- GitHub: [@Safik7866](https://github.com/Safik7866)

---

## 📜 License

This project is open source under the [MIT License](LICENSE).

---

> Built with 🔥 [Firecrawl](https://firecrawl.dev) + [Streamlit](https://streamlit.io)
