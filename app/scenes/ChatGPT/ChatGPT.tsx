import * as React from "react";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import Flex from "~/components/Flex";
import Scene from "~/components/Scene";
import MessageInput from "./components/MessageInput";
import MessageItem, { MessageProps } from "./components/MessageItem";

export default function ChatGPT() {
  const [prompt, setPrompt] = React.useState("");

  const [messages, setMessages] = React.useState<Array<MessageProps> | null>(
    null
  );

  const handlePromptChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(ev.target.value);
  };

  const processPrompt = (pr: string) => {
    fetch("http://localhost:5000/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        messages
          ? [
              ...messages
                .map((item) => {
                  const roleString: string =
                    item.isUser === true ? "user" : "assistant";
                  return { role: roleString, message: item.message };
                })
                .reverse(),
              { role: "user", message: pr },
            ]
          : [{ role: "user", message: pr }]
      ),
    })
      .then((resp) => resp.json())
      .then((data) => {
        addMessage(false, data.answer);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addMessage = (from: boolean, msg: string) => {
    setMessages((prev) =>
      prev !== null
        ? [{ isUser: from, message: msg }, ...prev]
        : [{ isUser: from, message: msg }]
    );
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      addMessage(true, prompt);
      processPrompt(prompt);
      setPrompt("");
      return;
    }
  };

  return (
    <Scene>
      <h1>ChatGPT</h1>
      <ResultsWrapper column auto>
        <ResultList column>
          {messages !== null
            ? messages.map((elem) => (
                // eslint-disable-next-line react/jsx-key
                <MessageItem {...elem} />
              ))
            : null}
        </ResultList>
        <MessageInput
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyDown}
        />
      </ResultsWrapper>
    </Scene>
  );
}

const ResultsWrapper = styled(Flex)`
  ${breakpoint("tablet")`
    width: 100%;
    height: 100%;
    margin-top: 40px;
  `};
`;

const ResultList = styled(Flex)`
  margin-bottom: 20px;
  overflow: scroll;
  height: 60vh;
`;

// export default observer(ChatGPT);
