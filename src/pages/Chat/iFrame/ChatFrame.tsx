import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./ChatFrame.scss";

const ChatFrame: React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const back = () => {
    history.goBack();
  };

  const sendMessageToIframe = () => {
    const chatToken = localStorage.getItem("chatToken");
    const chatWsToken = localStorage.getItem("chatWsToken");
    const chatUser = localStorage.getItem("chatUser");

    const authData = {
      chatToken,
      chatWsToken,
      chatUser,
    };

    const iframe = document.querySelector(
      "iframe.fullscreen-iframe"
    ) as HTMLIFrameElement;

    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(authData, "*"); // Use '*' for development only
    }
  };

  return (
    <IonPage className="ChatFrame">
      <IonContent fullscreen>
        {isLoading && (
          <div className="chatLoad">
            <IonSpinner
              color={"primary"}
              name="crescent"
              className="h-20px w-20px"
            />
          </div>
        )}
        <div className="fullscreen-iframe-container">
          <iframe
            src="https://chat.mynalu.com/"
            className={`fullscreen-iframe ${isLoading ? "hidden" : ""}`} // Hide the iframe while loading
            title="Embedded Chat"
            onLoad={() => {
              setIsLoading(false); // Hide spinner and show iframe
              sendMessageToIframe(); // Send the message once iframe is loaded
            }}
          ></iframe>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChatFrame;
