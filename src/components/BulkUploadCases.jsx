import React, { useState } from "react";
import Papa from "papaparse";

const BulkUploadCases = () => {
  const [csvData, setCsvData] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log("Parsed CSV data:", results.data);
          setCsvData(results.data);
        },
      });
    }
  };

  const handleUpload = async () => {
    if (csvData.length === 0) {
      alert("No data to upload.");
      return;
    }

    try {
      setUploading(true);

      const token = await getIdToken(); // Get Firebase token
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/cases/bulk-upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cases: csvData }),
      });

      if (response.ok) {
        alert("✅ Bulk upload successful!");
        setCsvData([]);
      } else {
        const errorText = await response.text();
        console.error("Bulk upload failed:", errorText);
        alert("❌ Bulk upload failed.");
      }
    } catch (err) {
      console.error("Error uploading cases:", err);
      alert("❌ Error uploading cases.");
    } finally {
      setUploading(false);
    }
  };

  const getIdToken = async () => {
    const user = window.firebase.auth().currentUser;
    if (!user) throw new Error("User not logged in.");
    return user.getIdToken();
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-2">Bulk Upload Cases</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        disabled={uploading || csvData.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Cases"}
      </button>
      {csvData.length > 0 && (
        <p className="text-sm text-gray-600 mt-2">{csvData.length} cases ready to upload.</p>
      )}
    </div>
  );
};

export default BulkUploadCases;