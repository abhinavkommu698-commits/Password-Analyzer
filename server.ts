import express from "express";
import {
  analyzePassword,
  analyzeStrength,
  categorizePassword,
  checkPasswordReuse,
  suggestStrongerPassword,
  prisma,
} from "./index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Password Analyzer</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
    .input-group { position: relative; display: flex; align-items: center; }
    .input-group input { flex: 1; padding: 10px; font-size: 16px; padding-right: 40px; }
    .input-group button { position: absolute; right: 5px; background: none; border: none; cursor: pointer; font-size: 18px; }
    button.analyze { padding: 10px 20px; font-size: 16px; cursor: pointer; background: #007bff; color: white; border: none; margin-left: 10px; }
    #result { margin-top: 20px; padding: 15px; border-radius: 5px; }
    .weak { background: #f8d7da; color: #721c24; }
    .moderate { background: #fff3cd; color: #856404; }
    .strong { background: #d4edda; color: #155724; }
    .suggestions { margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Password Analyzer</h1>
  <div class="input-group">
    <input type="password" id="password" placeholder="Enter password" />
    <button type="button" id="togglePassword">👁️</button>
  </div>
  <button class="analyze" onclick="analyze()">Check</button>
  <div id="result"></div>
  <script>
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("togglePassword");

    toggleButton.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      toggleButton.textContent = type === "password" ? "👁️" : "🔒";
    });

    async function analyze() {
      const password = passwordInput.value;
      const result = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      }).then(r => r.json());
      const div = document.getElementById("result");
      div.className = result.category.toLowerCase();
      div.innerHTML = "<strong>" + result.category + "</strong> (Strength: " + result.strength + "/5)<br>" +
        (result.reuse ? "<em>Warning: This password was used before!</em><br>" : "") +
        "<div class='suggestions'>Suggestions:<ul>" + result.suggestions.map(s => "<li>" + s + "</li>").join("") + "</ul></div>";
    }
  </script>
</body>
</html>
  `);
});

app.post("/api/analyze", async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Password required" });

  const strength = analyzeStrength(password);
  const category = categorizePassword(strength);
  const suggestions = suggestStrongerPassword(password);

  const entry = await analyzePassword(password);

  const result = {
    password,
    strength,
    category,
    reuse: false,
    suggestions,
  };

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});