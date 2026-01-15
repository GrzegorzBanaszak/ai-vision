# 🤖 AI Image Vision Analyzer

Fullstackowa aplikacja webowa wykorzystująca sztuczną inteligencję do analizy i opisywania zawartości obrazów w czasie rzeczywistym.

## 🚀 Technologię

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Język:** [TypeScript](https://www.typescriptlang.org/)
- **Cloud AI:** [Azure AI Vision Services](https://azure.microsoft.com/en-us/products/ai-services/ai-vision)
- **Stylizacja:** [Tailwind CSS](https://tailwindcss.com/)
- **Hosting/Infrastruktura:** [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/static-web-apps)

## ✨ Funkcje

- **Analiza Obrazu:** Automatyczne generowanie opisów tekstowych (captions) przy użyciu modeli Deep Learning.
- **Bezpieczeństwo:** Komunikacja z API Azure odbywa się wyłącznie po stronie serwera (Next.js API Routes), co chroni klucze dostępu.
- **User Experience:** Podgląd wybranego zdjęcia przed wysyłką oraz wskaźnik pewności modelu (confidence score).
- **Obsługa błędów:** System wykrywania nieobsługiwanych formatów plików oraz błędów komunikacji z chmurą.

## 🛠️ Architektura

Projekt demonstruje podejście hybrydowe:

1.  **Frontend:** Reaguje na interakcje użytkownika, zarządza stanem ładowania i wyświetla podgląd lokalny.
2.  **Backend (API Routes):** Działa jako bezpieczny proxy między klientem a chmurą Azure.
3.  **Cloud AI:** Przetwarza dane binarne obrazu i zwraca ustrukturyzowany obiekt JSON z wynikami analizy.

## ⚙️ Uruchomienie lokalne

1. Sklonuj repozytorium.
2. Zainstaluj zależności: `npm install`.
3. Stwórz plik `.env.local` i dodaj swoje klucze Azure:
   ```env
   AZURE_VISION_KEY=twoj_klucz
   AZURE_VISION_ENDPOINT=twoj_endpoint
   ```
