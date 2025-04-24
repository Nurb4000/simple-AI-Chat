<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenAI Chat Client</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div class="container">
        <h1>OpenAI Chat Client</h1>
        <form id="chat-form">
            <input type="text" id="user-input" placeholder="Type your message here..." required>
            <button type="submit">Send</button>
        </form>
        <div id="chat-box"></div>
        <form id="settings-form">
            <label for="endpoint">Endpoint:</label>
            <input type="text" id="endpoint" value="https://api.openai.com/v1/chat/completions">
            <label for="api-key">API Key:</label>
            <input type="password" id="api-key" required>
        </form>
    </div>
    <script src="/static/js/script.js"></script>
</body>
</html>