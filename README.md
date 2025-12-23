# Koganecho Artist in Residence 2026 Questionnaire

This is a modern, responsive frontend for the Koganecho AIR 2026 Questionnaire, built with React and Vite. It features a premium design with smooth animations and bilingual support.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run locally:**
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```

## 1. Connecting to Google Sheets (Backend)

To save the form data to Google Sheets, you need to set up a Google Apps Script.

1.  Create a new Google Sheet.
2.  Go to **Extensions** > **Apps Script**.
3.  Paste the following code into `Code.gs`:

    ```javascript
    function doPost(e) {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var data = JSON.parse(e.postData.contents);
      
      // Add timestamp
      data.timestamp = new Date();
      
      // Helper to append row safely
      var row = [
        data.timestamp,
        data.name,
        data.studioName,
        data.activityReport,
        data.nokisakiCount,
        data.artistMtgCount,
        data.onAirCount,      // Added
        data.patrolCount,
        data.cleanupCount,
        data.otherInteraction,
        data.supportSatisfaction, // Added Q3
        data.supportGoodPoints,   // Added Q3
        data.supportImprovements, // Added Q3
        data.wishToContinue,
        data.wishToMove,
        data.desiredStudio,
        data.requests,
        data.goals
      ];
      
      sheet.appendRow(row);
      
      return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    ```

4.  Click **Deploy** > **New deployment**.
5.  Select type: **Web app**.
6.  Description: "Form Backend".
7.  Execute as: **Me**.
8.  Who has access: **Anyone** (Important for the form to work without login).
9.  Copy the **Web App URL**.
10. Open `src/App.jsx` in this project and find the `handleSubmit` function.
11. Replace the simulation code with a `fetch` call to your Web App URL.

    Example:
    ```javascript
    // Replace with your actual URL
    const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
    
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(formData),
      mode: 'no-cors' // Important for GAS
    });
    ```

## 2. Publishing to GitHub Pages

1.  Initialize Git and push to your repository (if not done).
2.  Install `gh-pages` (optional but recommended):
    ```bash
    npm install gh-pages --save-dev
    ```
3.  Add `homepage` to `package.json`:
    ```json
    "homepage": "https://<your-username>.github.io/<repo-name>",
    ```
4.  Add deploy scripts to `package.json`:
    ```json
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
    ```
5.  Run `npm run deploy`.

Alternatively, you can just upload the contents of the `dist` folder to any static hosting or enable GitHub Pages on the `main` branch if you configure the build action.

## 3. Embedding in WordPress

Since WordPress can be tricky with React mounting, the most reliable method is to use an **iFrame**.

1.  Publish this app to GitHub Pages (or Vercel/Netlify).
2.  In your WordPress Page Editor (Gutenberg or Classic), insert a **Custom HTML** block.
3.  Add the following code:

    ```html
    <iframe 
      src="https://<your-username>.github.io/<repo-name>/" 
      style="width: 100%; height: 1200px; border: none; overflow: hidden;" 
      title="Koganecho AIR Questionnaire"
    ></iframe>
    ```
    *Adjust the `height` as needed or use a script to auto-resize.*

---
Built for Koganecho Area Management Center.
