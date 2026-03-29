const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Notice = mongoose.model('Notice', noticeSchema);
module.exports = Notice;
