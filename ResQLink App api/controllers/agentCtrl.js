const Agents = require("../models/agentModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const Incident = require("../models/incidentReport");

// Create a new agent
const createAgent = asyncHandler(async (req, res) => {
  const { agentID } = req.body;

  try {
    // Check if the agent already exists
    const findAgent = await Agents.findOne({ agentID });
    if (!findAgent) {
      // Create a new agent
      // Randomly generate the password
      const password = Math.random().toString(36).slice(-8);
      req.body.password = password;

      const newAgent = await Agents.create(req.body);
      res.json(newAgent);
    } else {
      res.status(400).json({ error: "Agent already exists" });
    }
  } catch (error) {
    console.error("Error creating agent:", error);
    res.status(500).json({ error: "Error creating agent" });
  }
});

// Get an agent by ID
const getaAgent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    validateMongoDbId(id); // Validate the MongoDB ID
    const getaAgent = await Agents.findById(id);
    if (!getaAgent) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(getaAgent);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Error getting user" });
  }
});

// Get all agents
const getallAgents = asyncHandler(async (req, res) => {
  try {
    const agents = await Agents.find().sort({ distance: 1 });
    res.json(agents);
  } catch (error) {
    console.error("Error getting all agents:", error);
    res.status(500).json({ error: "Error getting all agents" });
  }
});

// Agent login
const agentLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the agent by email
    const agent = await Agents.findOne({ email });

    if (!agent) {
      return res.status(401).json({ error: "Invalid credentials" });
    } else if (agent.password === password) {
      res.json({ message: "Login Successfully" });
    } else {
      res.json({ message: "Login Unsuccessfully" });
    }
  } catch (error) {
    console.error("Error with agent login:", error);
    res.status(500).json({ error: "Error with agent login" });
  }
});

// Assign an agent to an incident
const assignAgentToIncident = asyncHandler(async (req, res) => {
  const { agentId, incidentId } = req.params;

  try {
    // Validate MongoDB IDs
    validateMongoDbId(agentId);
    validateMongoDbId(incidentId);

    // Find the agent and incident by their respective IDs
    const agent = await Agents.findById(agentId);
    const incident = await Incident.findById(incidentId);

    if (!agent || !incident) {
      return res.status(404).json({ error: "Agent or Incident not found" });
    }

    // Assign the agent to the incident
    incident.assignedAgent = agentId;

    // Save the updated incident
    await incident.save();

    res.json(incident);
  } catch (error) {
    console.error("Error assigning agent to incident:", error);
    res.status(500).json({ error: "Error assigning agent to incident" });
  }
});

// Get an agent who has the same incident ID as the logged-in agent
const getAgentWithSameIncident = asyncHandler(async (req, res) => {
  const { id } = req.params; // ID of the logged-in agent

  try {
    validateMongoDbId(id); // Validate the MongoDB ID

    // Find the logged-in agent by ID
    const loggedInAgent = await Agents.findById(id);
    if (!loggedInAgent) {
      return res.status(404).json({ error: "Logged-in agent not found" });
    }

    // Get the incident ID assigned to the logged-in agent
    const assignedIncidentId = loggedInAgent.currentAssigned;

    if (!assignedIncidentId) {
      return res
        .status(404)
        .json({ error: "No incident assigned to the logged-in agent" });
    }

    // Find the agent who has the same assigned incident ID
    const agentWithSameIncident = await Agents.findOne({
      currentAssigned: assignedIncidentId,
    });

    if (!agentWithSameIncident) {
      return res
        .status(404)
        .json({ error: "No agent found with the same incident assignment" });
    }

    res.json(agentWithSameIncident);
  } catch (error) {
    console.error(
      "Error getting agent with the same incident assignment:",
      error
    );
    res
      .status(500)
      .json({ error: "Error getting agent with the same incident assignment" });
  }
});

module.exports = {
  createAgent,
  getaAgent,
  getallAgents,
  agentLogin,
  assignAgentToIncident,
  getAgentWithSameIncident,
};
