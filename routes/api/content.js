const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Content = require("../../model/Content");
const Subject = require("../../model/Subject");

//@route POST api/content
//@access PRIVATE
//@desc Add new content
router.post(
  "/",
  [
    auth,
    [
      check("subject", " Subject is required").not().isEmpty(),
      check("topic", " Topic is required").not().isEmpty(),
      check("type", "Type is required").not().isEmpty(),
      check("name","Name is required").not().isEmpty(),
      check("link", " Topic is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { subject, topic,name, type, link } = req.body;
    const subjectList = await Subject.findOne({ subject: subject });
    if (subjectList) {
      if (!subjectList.Content.some((name) => name.topic === topic))
        subjectList.Content.unshift({ topic: topic });
      await subjectList.save();
      //res.json(subjectList);
    } else {
      const newList = new Subject({
        subject: subject,
      });
      newList.Content.unshift({ topic: topic });
      await newList.save();
      //res.json(newList);
    }
    const newContent = new Content({
      admin: req.admin.id,
      subject,
      topic,
      name,
      type,
      link,
    });
    const content = await newContent.save();

    res.json(content);
  }
);

//@route GET api/content
//@access PUBLIC
//@desc To get all the contents based on subject and topic.
router.get(
  "/subject/:subject/topic/:topic",
  [
    check("subject", "subject is required"),
    check("topic", "topic is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const content = await Content.find({ subject: req.params.subject, topic: req.params.topic });
      if (!content) {
        return res.status(400).json({ msg: "No content found" });
      }
      res.json(content);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

//@route GET Subject name and Topics
router.get("/subject", async (req, res) => {
  const subjects = await Subject.find();
  const list = subjects.map((sub) => sub.subject);
  res.json(list);
});
router.get(
  "/topic/:subject",
  async (req, res) => {
   
    try{ 
      const topics = await Subject.findOne({subject : req.params.subject});
      res.json(topics.Content.map((item)=>item.topic));
    }catch(error){
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
);
//@route DELETE api/content
//access PRIVATE

module.exports = router;
