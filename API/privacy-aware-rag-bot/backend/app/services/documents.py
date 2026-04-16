from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
DOCS_DIR = BASE_DIR.parent / "docs"

DOCUMENTS = [
    {
        "id": "employee_handbook",
        "title": "Employee Handbook",
        "filename": "employee_handbook.md",
        "tags": ["public"],
    },
    {
        "id": "holiday_policy",
        "title": "Holiday Policy",
        "filename": "holiday_policy.md",
        "tags": ["public"],
    },
    {
        "id": "salary_policy",
        "title": "Salary Policy",
        "filename": "salary_policy.md",
        "tags": ["manager_only"],
    },
    {
        "id": "budget_q4",
        "title": "Q4 Budget",
        "filename": "budget_q4.md",
        "tags": ["manager_only"],
    },
]


def load_document_content(filename: str) -> str:
    path = DOCS_DIR / filename
    return path.read_text(encoding="utf-8")


def get_all_documents():
    docs = []
    for doc in DOCUMENTS:
        docs.append(
            {
                **doc,
                "content": load_document_content(doc["filename"]),
            }
        )
    return docs