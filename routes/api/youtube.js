const express = require("express");
const router = express.Router();
const config = require("config");
const axios = require("axios");
router.get("/", async (req, res) => {
  const BaseUrl = "https://www.googleapis.com/youtube/v3";
  const Key = config.get("apiKeyYoutube");
  const response = await axios.get(
    `${BaseUrl}/search?part=snippet&channelId=UCus08_QeQyuItXAUN597NjA&maxResults=1&order=date&type=video&key=${Key}`
  );
  const items = response.data.items;
  res.json(items[0].id.videoId);
});

module.exports = router;
