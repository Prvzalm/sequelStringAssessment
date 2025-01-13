const express = require("express");
const {
  uploadDocument,
  approveDocument,
  getDocuments,
} = require("../services/documentService");
const { authenticate } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post(
  "/upload",
  authenticate,
  authorizeRoles("RoleA"),
  async (req, res) => {
    try {
      const document = await uploadDocument({
        name: req.body.name,
        userId: req.user._id,
      });
      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.post(
  "/approve/:id",
  authenticate,
  authorizeRoles("RoleB"),
  async (req, res) => {
    try {
      const document = await approveDocument({
        documentId: req.params.id,
        userId: req.user._id,
      });
      res.status(200).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/", authenticate, async (req, res) => {
  try {
    const documents = await getDocuments();
    res.status(200).json(documents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
