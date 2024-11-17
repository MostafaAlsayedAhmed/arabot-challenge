export function downloadJSON(data, fileName = "data.json") {
    // Convert the object to a JSON string
    const jsonData = JSON.stringify(data, null, 2);

    // Create a Blob and generate a URL
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create and click a download link
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName; // Default filename or custom one
    link.click();

    URL.revokeObjectURL(url); // Clean up
}