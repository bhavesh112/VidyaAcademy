const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    unique: true,
  },
  Content: [
    {
      topic: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("subject", SubjectSchema);
