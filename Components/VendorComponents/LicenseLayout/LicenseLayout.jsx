'use client';
import React, { useState } from "react";
import SecHeading from "@/components/SecHeading/SecHeading";
import "./LicenseLayout.scss";

function LicenseLayout() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFilePreview(URL.createObjectURL(uploadedFile)); // Generate a preview URL
    }
  };

  const handleDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file before submitting.");
      return;
    }
    if (!expiryDate) {
      alert("Please select a license expiry date.");
      return;
    }

    console.log("File to be saved:", file);
    console.log("Selected Expiry Date:", expiryDate);
    // Add logic to save the file and expiry date (e.g., upload to server)
  };

  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <SecHeading heading="Trade License" />
      <section className="tradeLicense">
        <form className="formContainer" onSubmit={handleSubmit}>
          <div className="uploadSection">
            <label htmlFor="tradeLicenseInput">Upload Trade License:</label>
            <div className="uploadLicenseDiv">
              <label htmlFor="dropzone-file" className="dropzoneLabel">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <i className="fad fa-cloud-upload uploadIcon"></i>
                  <p className="uploadText">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="fileSizeText">
                    SVG, PNG, JPG, PDF, or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* License Expiry Date Field */}
            <div className="mt-4">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                License Expiry Date:
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                className="expiryDateInput"
                value={expiryDate}
                onChange={handleDateChange}
                min={today} // Prevent selection of past dates
                required
              />
            </div>

            <button type="submit" className="themeBtn mt-4">
              Submit
            </button>
          </div>

          <div className="previewSection">
            <h3 className="previewHeading">Preview:</h3>
            <div className="filePreview">
              {file ? (
                file.type.startsWith("image/") ? (
                  <img
                    src={filePreview}
                    alt="Uploaded File"
                    className="previewImage"
                  />
                ) : file.type === "application/pdf" ? (
                  <iframe
                    src={filePreview}
                    className="pdfPreview"
                    title="PDF Preview"
                  />
                ) : (
                  <a
                    href={filePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fileLink"
                  >
                    View Uploaded File
                  </a>
                )
              ) : (
                <p className="noFileText">No file uploaded yet.</p>
              )}
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default LicenseLayout;
