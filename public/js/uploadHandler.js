document.addEventListener("DOMContentLoaded", () => {
  const uploadArea = document.getElementById("upload-area");
  const fileInput = document.getElementById("file-input");
  const browseBtn = document.getElementById("browse-btn");
  const removeBtn = document.getElementById("remove-btn");
  const uploadBtn = document.getElementById("upload-btn");
  const fileMsg = document.getElementById("file-msg");

  // Browse button -> opens hidden file input
  browseBtn.addEventListener("click", () => fileInput.click());

  // When a file is chosen
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      fileMsg.textContent = `Selected file: ${file.name}`;
      uploadArea.style.border = "2px solid #34d399";
    }
  });

  // Remove button
  removeBtn.addEventListener("click", () => {
    fileInput.value = "";
    fileMsg.textContent = "Drop your video file here";
    uploadArea.style.border = "1px dashed #ccc";
  });

  // Drag and drop
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.style.background = "#f0fdf4";
  });

  uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    uploadArea.style.background = "#fff";
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInput.files = e.dataTransfer.files; // sync with input
      fileMsg.textContent = `Selected file: ${file.name}`;
      uploadArea.style.border = "2px solid #34d399";
    }
  });

  // Upload button
  uploadBtn.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    uploadFile(file);
  });

  // Upload logic
  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/assembly/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to generate summary");

      const html = await res.text();
      document.open();
      document.write(html);
      document.close();
    } catch (err) {
      console.error(err);
      alert("Failed to generate summary");
    }
  }
});
