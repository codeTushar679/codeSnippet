import { snippets } from "../database/index.js";
import { randomBytes } from "crypto";
import axios from "axios";

export const createSnippet = async (req, res) => {
  if (!req.body || !req.body.title || !req.body.code) {
    return res
      .status(400)
      .json({
        message: "Missing title or code in request body",
        success: false,
      });
  }

  const id = randomBytes(4).toString("hex");
  const { title, code } = req.body;

  // creating a new snippet
  snippets[id] = { id, title, code };

  // best place to publish an event to the message broker
  await axios.post("http://localhost:8005/events", {
    type: "SnippetCreated",
    data: { id, title, code },
  });

  return res
    .status(201)
    .json({
      snippet: snippets[id],
      message: "Snippet created successfully",
      success: true,
    });
};

export const getSnippet = (req, res) => {
  return res.status(200).json(snippets);
};
