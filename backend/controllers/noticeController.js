const Notice = require('../models/Notice');

const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({}).populate('author', 'name email').sort({ date: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    const notice = new Notice({
      title,
      content,
      author: req.user._id,
    });
    const createdNotice = await notice.save();
    res.status(201).json(createdNotice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    await notice.deleteOne();
    res.json({ message: 'Notice removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    notice.title = title || notice.title;
    notice.content = content || notice.content;
    const updatedNotice = await notice.save();
    res.json(updatedNotice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getNotices, createNotice, updateNotice, deleteNotice };
