const Notice = require('../models/Notice');
const { bucket } = require('../utils/firebaseAdmin');

const uploadToFirebase = async (file) => {
  if (!file) return null;
  const originalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
  const filename = `notices/${Date.now()}_${Math.round(Math.random() * 1E9)}_${originalName}`;
  const fileRef = bucket.file(filename);

  await fileRef.save(file.buffer, {
    metadata: { contentType: file.mimetype }
  });
  
  await fileRef.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
};

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
    let attachmentUrl = null;
    let attachmentName = null;

    if (req.file) {
      attachmentUrl = await uploadToFirebase(req.file);
      attachmentName = req.file.originalname;
    }

    const notice = new Notice({
      title,
      content,
      author: req.user._id,
      attachmentUrl,
      attachmentName
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
    const { title, content, clearAttachment } = req.body;
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    
    notice.title = title || notice.title;
    notice.content = content || notice.content;

    if (req.file) {
      notice.attachmentUrl = await uploadToFirebase(req.file);
      notice.attachmentName = req.file.originalname;
    } else if (clearAttachment === 'true') {
      notice.attachmentUrl = null;
      notice.attachmentName = null;
    }

    const updatedNotice = await notice.save();
    res.json(updatedNotice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getNotices, createNotice, updateNotice, deleteNotice };
