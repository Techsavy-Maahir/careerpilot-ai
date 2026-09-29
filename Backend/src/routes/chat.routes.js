const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const chatController = require("../controllers/chat.controller")

const chatRouter = express.Router()

/**
 * @route POST /api/chat/
 * @description Send prompt/message to AI Interview Assistant and get reply.
 * @access private
 */
chatRouter.post("/", authMiddleware.authUser, chatController.generateChatController)

module.exports = chatRouter
