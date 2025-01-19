import { useState } from "react";

import "./App.css";

function App() {
  const [text, setText] = useState(""); // Input text state
  const [imageURL, setImageURL] = useState(null); // Generated image URL state
  const [loading, setLoading] = useState(false); // Loading state

  // Function to call the API and generate the image
  const generateImage = async () => {
    if (!text) return alert("Please enter some text to generate an image!");
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: text }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate image. Please try again.");
      }

      const result = await response.blob();
      const imageObjectURL = URL.createObjectURL(result); // Convert Blob to Object URL
      setImageURL(imageObjectURL); // Set the image URL in state
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="main">
      <h1>TEXT TO IMAGE GENERATOR</h1>
      <div className="wrapper">
        <input
          type="text"
          className="textarea"
          placeholder="Enter the text to generate image"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn" onClick={generateImage} disabled={loading}>
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>
      <div className="output">
        {imageURL ? (
          <img src={imageURL} alt="Generated" className="generated-image" />
        ) : (
          <p>No image generated yet.</p>
        )}
      </div>
      
    </div>
    
    </>
  );
}

export default app