'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Addcomment from "./Addcomment";

function Formsnippet() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippet] = useState({});

  const createSnippet = async (e) => {
    e.preventDefault();
    console.log("Snippet created");
    try {
      const res = await axios.post("http://localhost:8000/api/v1/snippet", {
        title,
        code,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error, "Error while creating snippet");
    }
  };

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get("http://localhost:8002/snippets");
        console.log(res.data);
        setSnippet(res.data);
      } catch (error) {
        console.log(error, "Error while fetching snippets");
      }
    }
    fetchSnippets();
  }, []);

  return (
    <div>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={createSnippet}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-amber-950 border-2 h-10 w-70 mt-7 p-1 rounded-sm"
          type="text"
          name="title"
          id="title"
          placeholder="Title"
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-amber-950 border-2 h-40 w-70 p-1 rounded`-sm"
          placeholder="Type your code snippets..."
          name="code"
          id="code"
        ></textarea>
        <button className="bg-black text-white h-10 w-20 rounded-md cursor-pointer">
          Add
        </button>
        <p className="text-red-800">Refresh the page to see your snippets!</p>

      </form>
      
        <h1 className="text-center mt-10 font-medium text-4xl text-purple-900">List of Codes!</h1>
      <div className="grid grid-cols-3 mt-1 pl-12">
      {
        Object.values(snippets).map((snippet) => (
          <div key={snippet.id} className="border-2 border-black m-5 p-3 rounded-md w-80">
            <h1 className="font-bold text-xl">{snippet.title}</h1>
            <p>{snippet.code}</p>
            <Addcomment snippet={snippet}/>
          </div>
        ))
      }
      </div>

    </div>
  );
}

export default Formsnippet;
