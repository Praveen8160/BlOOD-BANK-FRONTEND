import React from "react";

function Chatbot() {
  return (
    <div className="flex bg-slate-600 flex-col items-center justify-center">
      <iframe
        allow="microphone;"
        width="350"
        height="430"
        className="w-screen min-h-[40rem] border-none"
        src="https://console.dialogflow.com/api-client/demo/embedded/dff4e184-954f-470f-8126-992451bbbf91"
      ></iframe>
    </div>
  );
}

export default Chatbot;
