import React, { useState } from "react";

export default function NavbarTranslateButton() {
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/translate/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      // store translations
      localStorage.setItem("urdu_book", JSON.stringify(data.translations));

      alert("Entire book translated successfully!");
    } catch (err) {
      alert("Translation failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleTranslate}
      className="button button--primary button--sm"
      style={{ marginLeft: "10px" }}
    >
      {loading ? "Translating..." : "اردو ترجمہ"}
    </button>
  );
}
