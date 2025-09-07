const analyticsService = require("../services/analytics.service.js");

const getDashboardAnalytics = async (req, res) => {
  try {
    const analytics = await analyticsService.getDashboardAnalytics();
    return res.status(200).json(analytics);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboardAnalytics
};
