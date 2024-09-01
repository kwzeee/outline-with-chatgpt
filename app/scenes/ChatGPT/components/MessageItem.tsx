import * as React from "react";

export type MessageProps = {
  isUser: boolean;
  message: string;
};

export default function MessageItem(props: MessageProps) {
  const { isUser, message } = props;

  return (
    <div>
      {isUser === true ? <h3>User</h3> : <h3>ChatGPT</h3>}
      <p>{message}</p>
    </div>
  );
}
