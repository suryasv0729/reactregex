import React, { useRef } from "react";
import "./Component.css";
import CodeEditor from "./Codeeditor";
import { GoogleGenerativeAI } from "@google/generative-ai";
const Component = () => {
  const patternDescription = useRef("");
  const patternMatch = useRef("");
  const patternNonMatch = useRef("");
  const patternLogic = useRef("");
  const genAI = new GoogleGenerativeAI(
    "AIzaSyA8_UWevH2MuXOnpaNSqR_s10D4-nQja-8"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function sample() {
    const prompt = `Generate a regex pattern for: ${patternDescription} for test string kljvgcjvhbklnjbhgcvuhucvus surya@gmail.com . It should match strings like ${patternMatch} and should not match strings like ${patternNonMatch} with logic ${patternLogic}`;

    const result = await model.generateContent(prompt);
    console.log(result);
    const responseText = await result.response.text();
    console.log(responseText);
  }

  return (
    <>
      <h2 className="tool-name">Regexei</h2>
      <div className="container main">
        <div className="user-input-container">
          <h1>Ask your regexei</h1>
          <label htmlFor="pattern">
            I want to generate regex for (e.g., "select all emails"):
          </label>
          <textarea
            ref={patternDescription}
            required
            type="text"
            id="pattern"
            placeholder="Enter pattern description"
          ></textarea>

          <label htmlFor="pattern-match">It should match string like</label>
          <textarea
            ref={patternMatch}
            type="text"
            id="pattern-match"
            placeholder="Enter match string"
          ></textarea>

          <label htmlFor="pattern-non-match">
            It should not match string like
          </label>
          <textarea
            ref={patternNonMatch}
            type="text"
            id="pattern-non-match"
            placeholder="Enter non match string"
          ></textarea>

          <label htmlFor="pattern-logic">Your Logic (Optional):</label>
          <textarea
            ref={patternLogic}
            type="text"
            id="pattern-logic"
            placeholder="Enter your logic here"
          ></textarea>

          <button id="clearBtn">Clear All</button>
          <button id="generateBtn" onClick={sample}>
            Generate Regex
          </button>
        </div>

        <div className="regex-editor-container">
          <h1>Regex Editor</h1>
          <div id="regexInputContainer">
            <label htmlFor="regexInput">Enter/Generated Regex:</label>
            <input
              type="text"
              id="regexInput"
              placeholder="Type your regex here"
            />
          </div>

          <label htmlFor="sampleText">Test String:</label>
          <>
            <CodeEditor />
          </>

          <div className="output">
            <h3>Generated Regex</h3>
            <p id="regexOutput"></p>
            <button id="copyRegexBtn">Copy Regex</button>
          </div>
        </div>

        <div className="ai-explanation-container">
          <h3>Matched Texts</h3>
          <p id="matchesOutput"></p>
          <h3>Explanation for AI response</h3>
          <textarea
            id="aiExplanation"
            rows="5"
            readOnly
            placeholder="AI explanation for generated regex will be displayed here"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Component;
