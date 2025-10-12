import { randomBytes } from "crypto";
import { commentsDB } from "../database/index.js";
import axios from "axios";

export const createComment = async (req, res) => {
  if (!req.body || !req.body.text) {
    return res
      .status(400)
      .json({ message: "Missing title in request body", success: false });
  }

  const commentId = randomBytes(4).toString("hex");

  const { text } = req.body;
  const snippetID = req.params.id;

  const comments = commentsDB[snippetID] || [];
  comments.push({ commentId, text });

  commentsDB[snippetID] = comments;

  // best place to publish an event to the message broker
  await axios.post("http://localhost:8005/events", {
    type: "CommentCreated",
    data: { id: commentId, content: text, snippetID },
  });

  return res
    .status(201)
    .json({ message: "Comment created", comment: { commentId, text } });
};

export const getCommentByID = (req, res) => {
  const snippetID = req.params.id;
  return res.status(200).json(commentsDB[snippetID] || []);
};
