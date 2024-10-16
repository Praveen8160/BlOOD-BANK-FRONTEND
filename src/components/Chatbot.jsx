import React from "react";

function Chatbot() {
  return (
    <div className="flex bg-slate-600 flex-col items-center justify-center">
      <iframe
        allow="microphone;"
        className="w-[350px] h-[430px] sm:w-screen sm:min-h-[40rem] border-none"
        src="https://console.dialogflow.com/api-client/demo/embedded/dff4e184-954f-470f-8126-992451bbbf91"
        title="Chatbot"
      ></iframe>
    </div>
  );
}

export default Chatbot;
