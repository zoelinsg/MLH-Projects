from app.services.documents import get_all_documents


def retrieve_documents(query: str, top_k: int = 3):
    query_lower = query.lower()
    scored_docs = []

    for doc in get_all_documents():
        score = 0
        content_lower = doc["content"].lower()
        title_lower = doc["title"].lower()

        for keyword in query_lower.split():
            if keyword in content_lower:
                score += 2
            if keyword in title_lower:
                score += 3

        scored_docs.append((score, doc))

    scored_docs.sort(key=lambda x: x[0], reverse=True)

    results = [doc for score, doc in scored_docs if score > 0]
    return results[:top_k]