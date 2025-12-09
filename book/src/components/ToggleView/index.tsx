import React, { useState } from 'react';

export default function ToggleView({ originalText, translatedText }) {
  const [showTranslated, setShowTranslated] = useState(true);

  return (
    <div>
      <div>
        <button onClick={() => setShowTranslated(false)}>English</button>
        <button onClick={() => setShowTranslated(true)}>اردو</button>
      </div>
      <div>
        {showTranslated ? translatedText : originalText}
      </div>
    </div>
  );
}
