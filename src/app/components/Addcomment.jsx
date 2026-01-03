import React, { useEffect, useState } from "react";
import axios from "axios";

function Addcomment({ snippet }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const addComment = async (e) => {
    e.preventDefault();
    console.log("Comment added:", text);
    try {
      const API_URL = process.env.NEXT_PUBLIC_COMMENT_API || "http://localhost:8001";
      const res = await axios.post(
        `${API_URL}/api/v1/snippet/${snippet.id}/comment`,
        { text }
      );
      console.log(res.data);
      setComments([...comments, res.data.comment]);
      setText("");
    } catch (error) {
      console.log(error, "Error while adding comment");
    }
  };

  return (
    <div>
        <h1 className="font-semibold text-center mt-5">Comments</h1>
      {snippet.comments.map((com, index) => (
        <li key={index}>{com.content}</li>
      ))}
      <form onSubmit={addComment}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-amber-950 border-2 h-8 mb-2 w-70 mt-1 p-1 rounded-sm"
          type="text"
          placeholder="Write Your Comment..."
        />
        <button className="bg-green-950 text-white h-8 w-12 rounded-md cursor-pointer">
          Add
        </button>
      </form>
    </div>
  );
}

export default Addcomment;
