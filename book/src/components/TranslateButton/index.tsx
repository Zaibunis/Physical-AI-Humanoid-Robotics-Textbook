// TranslateButton.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ToggleView from '../ToggleView';

export default function TranslateButton({ chapterId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    // Get all text nodes inside <article>
    const article = document.querySelector('article');
    if (!article) {
      setError("Article not found");
      setIsLoading(false);
      return;
    }

    // Extract text only, keep line breaks for paragraphs
    const textContent = Array.from(article.childNodes)
      .map(node => (node as HTMLElement).innerText || node.textContent)
      .join('\n\n');

    try {
      const response = await fetch('http://127.0.0.1:8000/translate/chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter_id: chapterId,
          content: textContent
        }),
      });

      if (!response.ok) throw new Error('Translation failed');

      const data = await response.json();

      // Render ToggleView
      const container = document.getElementById('translation-container');
      if (container) {
        // Use React 18+ root API
        import('react-dom/client').then(ReactDOMClient => {
          const root = ReactDOMClient.createRoot(container);
          root.render(
            <ToggleView originalText={textContent} translatedText={data.translated_text} />
          );
        });
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Translating...' : 'Translate to Urdu'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
