const Document = require("../models/documentSchema");

exports.uploadDocument = async ({ name, userId }) => {
  const document = new Document({ name, uploadedBy: userId });
  return await document.save();
};

exports.approveDocument = async ({ documentId, userId }) => {
  const document = await Document.findByIdAndUpdate(
    documentId,
    { approvedBy: userId },
    { new: true }
  );
  return document;
};

exports.getDocuments = async () => {
  return await Document.find()
    .populate("uploadedBy", "username")
    .populate("appovedBy", "username");
};
