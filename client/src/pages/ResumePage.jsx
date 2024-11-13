import { useState } from "react";

function ResumePage() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data.paragraphs.join("\n")); // Join paragraphs for display
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h1>Upload PDF</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload</button>
      </form>
      {response && (
        <div>
          <h2>Extracted Text:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default ResumePage;
