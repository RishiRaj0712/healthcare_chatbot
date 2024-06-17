const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

// Use CORS middleware to allow requests from any domain
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Load Reverselabel mapping from file
const reverseLabelMapping = JSON.parse(
  fs.readFileSync("reverse_label_mapping.json", "utf8")
);

app.post("/predict", async (req, res) => {
  const symptoms = req.body.symptoms;
  const payload = {
    inputs: symptoms,
    options: {
      wait_for_model: true,
    },
  };

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/utkarshiitr/medicalchatbot3",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}`,
        },
      }
    );

    if (
      response.data &&
      response.data.length > 0 &&
      Array.isArray(response.data[0])
    ) {
      const predictions = response.data[0];
      const top3Predictions = predictions.slice(0, 3); // Get the top 3 predictions

      const results = top3Predictions.map((prediction) => {
        const conditionRecommendation = reverseLabelMapping[prediction.label];
        const [condition, recommendation] = conditionRecommendation.split(": ");
        return { condition, recommendation };
      });
      res.json({ results });
    } else {
      throw new Error("Unexpected response format from Hugging Face API");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
