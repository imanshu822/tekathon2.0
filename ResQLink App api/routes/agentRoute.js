const express = require("express");
const router = express.Router();

const {
  getaAgent,
  createAgent,
  getallAgents,
  agentLogin,
  assignAgentToIncident,
} = require("../controllers/agentCtrl");
// const { authMiddleware } = require("../middlewares/authMiddleware");
const { sendEmail } = require("../controllers/emailCtrl");

// router.post("/create-a-agent", createAgent);
router.get("/get-a-agent/:id", getaAgent);
router.get("/get-all-agents", getallAgents);
// router.post("/send-mail/:id", sendEmail);
router.post("/agent-login", agentLogin);

// router.post(
//   "/assign-agent-to-incident/:agentId/:incidentId",
//   assignAgentToIncident
// );
module.exports = router;
