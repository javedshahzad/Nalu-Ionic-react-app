import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonModal,
  IonPage,
  IonSpinner,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";

import {
  notificationsOutline,
  attachOutline,
  chevronForwardOutline,
  closeOutline,
  arrowBackOutline,
  happyOutline,
} from "ionicons/icons";
import "./GroupChat.scss";

import Picker from "@emoji-mart/react";
import { useHistory, useParams } from "react-router";

import { useDispatch } from "react-redux";
import apiService from "../../../Services";
import { io } from "socket.io-client";

import tokenService from "../../../token";
import DOMPurify from "dompurify";
import moment from "moment";
import NotificationBell from "../../../components/NotificationBell";

const GroupChat: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();

  const [grpMessage, setgrpMessage] = useState([]);
  const [sendMsgObject, setSendMsgObject] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [GroupImage, setGroupImage] = useState("");
  const [sendloading, setSendLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [page, setPage] = useState(1);
  const user = tokenService.getUserId();

  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({
    left: 0,
    top: 0,
  });

  const history = useHistory();

  const [filesArray, setFilesArray] = useState([]);
  const inputRef = useRef(null);
  const refFiles: any = useRef();
  const chatContentRef = useRef(null);
  const [presentToast] = useIonToast();

  useEffect(() => {
    getGroupInfo();
  }, []);

  const getGroupInfo = () => {
    apiService
      .get(`https://apidev.mynalu.com/v1/conversation/get/${groupId}`, token)
      .then((data) => {
        setGroupName(data.data.groupName);
        setGroupImage(data.data.groupImage);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSendMessage = () => {
    if (filesArray.length > 0) {
      const nameArray = [];
      for (var i = 0; i < filesArray.length; i++) {
        const fileName = filesArray[i]?.name;
        var idxDotElse = fileName.lastIndexOf(".") + 1;
        var extFileElse = fileName
          .substr(idxDotElse, fileName.length)
          .toLowerCase();
        nameArray.push({
          file: filesArray[i],
          extension: extFileElse,
        });
      }
      socket.emit("unread-message-count", {
        user: user,
        conversation: groupId,
      });
      socket.emit("send-message", {
        user: user,
        conversation: groupId,
        message: nameArray,
        type: "file",
      });
    } else {
      if (newMessage !== "") {
        socket.emit("send-message", {
          user: user,
          conversation: groupId,
          message: `<p>${newMessage}</p>`,
          type: "message-",
        });

        setSendLoading(true);

        setTimeout(() => {
          setSendLoading(false);
        }, 500);

        setNewMessage("");
      }
    }
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const toggleEmojiPicker = (event: any) => {
    event.stopPropagation();

    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji: any) => {
    if (inputRef.current) {
      const startPos = inputRef.current.selectionStart;
      const endPos = inputRef.current.selectionEnd;
      const newText =
        newMessage.substring(0, startPos) +
        emoji.emoji +
        newMessage.substring(endPos);
      setNewMessage(newText);
    }
    // const quill = quillChatRef.current.getEditor();
    // const range = quill.getSelection();
    // const position = range ? range.index : 0;
    // quill.insertText(position, emoji.native);

    const message = newMessage;

    const newmsg = message + emoji.native;
    setNewMessage(newmsg);
  };

  const openGroupInfo = () => {
    history.push("/group-info/" + groupId);
  };

  const back = () => {
    history.goBack();
  };

  const token = tokenService.getToken();

  const socket = io("https://apidev.mynalu.com/", {
    query: {
      token,
    },
  });

  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.emit("join", {
      user: "65194710d160530510955d7d",
      conversation: groupId,
    });

    socket.on("join", (data) => {
      // console.log("joined", data);
    });

    socket.emit("message-list", {
      page: 1,
      limit: limit,
      user: "65194710d160530510955d7d",
      conversation: groupId,
    });

    socket.on("message-list", (data) => {
      // console.log("data", data);

      if (data.results.length > 0) {
        // setgrpMessage(data.results);
        const invertedArray = data.results.reverse();
        // console.log("invertedArray", invertedArray);
        setgrpMessage(
          invertedArray.map((msg: any) => {
            const timestamp = moment(msg.createdAt);
            const now = moment();
            const diffInSeconds = now.diff(timestamp, "seconds");

            if (diffInSeconds < 60) {
              return {
                ...msg,
                relativeTimestamp: "Just Now",
              };
            } else if (diffInSeconds < 60 * 60) {
              const diffInMinutes = Math.floor(diffInSeconds / 60);
              return {
                ...msg,
                relativeTimestamp: `${diffInMinutes} min ago`,
              };
            } else if (diffInSeconds < 2 * 60 * 60) {
              return {
                ...msg,
                relativeTimestamp: "1 hour ago",
              };
            } else if (diffInSeconds < 24 * 60 * 60) {
              const diffInHours = Math.floor(diffInSeconds / (60 * 60));
              return {
                ...msg,
                relativeTimestamp: `${diffInHours} hours ago`,
              };
            } else if (diffInSeconds < 2 * 24 * 60 * 60) {
              return {
                ...msg,
                relativeTimestamp: "yesterday",
              };
            } else if (diffInSeconds < 7 * 24 * 60 * 60) {
              const diffInDays = Math.floor(diffInSeconds / (24 * 60 * 60));
              return {
                ...msg,
                relativeTimestamp: `${diffInDays} days ago`,
              };
            } else {
              return {
                ...msg,
                relativeTimestamp: timestamp.format("YYYY-MM-DD"),
              };
            }
          })
        );
      }
    });

    socket.on("send-message", (data) => {
      setSendMsgObject(data);
      if (chatContentRef && chatContentRef.current) {
        setTimeout(() => {
          chatContentRef.current.scrollToBottom();
        }, 1000);
      }
    });

    return () => {
      socket.off("group-list");
      socket.off("send-message");
      socket.off("join");
      socket.off("message-list");
      socket.off("join-group");
    };
  }, []);

  useEffect(() => {
    if (sendMsgObject) {
      const aa = [...grpMessage];
      aa.push(sendMsgObject);
      setgrpMessage(aa);
      setSendMsgObject(null);
    }
  }, [sendMsgObject]);

  const sanitizeHTML = (html: any) => {
    const clean = DOMPurify.sanitize(html);
    return { __html: clean };
  };

  useIonViewWillEnter(() => {
    setLimit(10);
    // Check if the chatContentRef has been initialized
    if (chatContentRef.current) {
      console.log("chatContentRef", chatContentRef.current);
      // Scroll to the bottom of the chat content
      setTimeout(() => {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
      }, 3000);
    }
  });

  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
    console.log("limit", limit);
    socket.emit("message-list", {
      page: 1,
      limit: limit,
      user: "65194710d160530510955d7d",
      conversation: groupId,
    });

    socket.on("message-list", (data) => {
      console.log("data", data);
      if (data.results.length > 0) {
        // setgrpMessage(data.results);
        const invertedArray = data.results.reverse();
        console.log("invertedArray", invertedArray);
        setgrpMessage(
          invertedArray.map((msg: any) => {
            const timestamp = moment(msg.createdAt);
            const now = moment();
            const diffInSeconds = now.diff(timestamp, "seconds");

            if (diffInSeconds < 60) {
              return {
                ...msg,
                relativeTimestamp: "Just Now",
              };
            } else if (diffInSeconds < 60 * 60) {
              const diffInMinutes = Math.floor(diffInSeconds / 60);
              return {
                ...msg,
                relativeTimestamp: `${diffInMinutes} min ago`,
              };
            } else if (diffInSeconds < 2 * 60 * 60) {
              return {
                ...msg,
                relativeTimestamp: "1 hour ago",
              };
            } else if (diffInSeconds < 24 * 60 * 60) {
              const diffInHours = Math.floor(diffInSeconds / (60 * 60));
              return {
                ...msg,
                relativeTimestamp: `${diffInHours} hours ago`,
              };
            } else if (diffInSeconds < 2 * 24 * 60 * 60) {
              return {
                ...msg,
                relativeTimestamp: "yesterday",
              };
            } else if (diffInSeconds < 7 * 24 * 60 * 60) {
              const diffInDays = Math.floor(diffInSeconds / (24 * 60 * 60));
              return {
                ...msg,
                relativeTimestamp: `${diffInDays} days ago`,
              };
            } else {
              return {
                ...msg,
                relativeTimestamp: timestamp.format("YYYY-MM-DD"),
              };
            }
          })
        );
      }
      setLoading(false);
    });
  };

  const handleScroll = (event) => {
    console.log("event scroll", event.currentTarget.scrollTop);
    const scrollTop = event.currentTarget.scrollTop;
    if (scrollTop === 0) {
      setLoading(true);
      setTimeout(() => {
        loadMore();
      }, 500);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="ion-no-border">
          <IonButton slot="start" fill="clear" onClick={back}>
            <IonIcon icon={arrowBackOutline} className="backBtn" />
          </IonButton>
          <div className="top-row" onClick={openGroupInfo}>
            <img src={GroupImage} className="group-icon" />
            <h1 className="group-title">{groupName}</h1>
          </div>

          <IonButton slot="end" fill="clear">
            <IonIcon icon={notificationsOutline} className="bell-icon" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      {loading ? (
        <div className="chatLoad">
          <IonSpinner
            color={"primary"}
            name="crescent"
            className="h-20px w-20px"
          />
        </div>
      ) : null}
      <div
        ref={chatContentRef}
        onScroll={handleScroll}
        className="groupChatContent"
      >
        {grpMessage.map((message: any, index: any) => (
          <div key={index}>
            {message.sender._id === user ? (
              <>
                <div className="msg right-msg">
                  <div className="msg-bubble">
                    {message.files.length > 0 && (
                      <img
                        src={message.files[0]}
                        className="h-auto w-20 max-w-md rounded-sm"
                        alt="Message Image"
                        onClick={() => handleImageClick(message.files[0])}
                      />
                    )}
                    <IonModal isOpen={showModal}>
                      <img src={selectedImage} />
                      <IonButton
                        onClick={() => setShowModal(false)}
                        className="closeBtn"
                      >
                        Close
                      </IonButton>
                    </IonModal>
                    <div className="msg-text">
                      {message.message && (
                        <div
                          dangerouslySetInnerHTML={sanitizeHTML(
                            message.message
                          )}
                        />
                      )}
                    </div>
                  </div>
                  <p className="message-time">{message.relativeTimestamp}</p>
                </div>
              </>
            ) : (
              <div style={{ display: "flex", marginLeft: "10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={message.sender.userImage}
                    alt="User"
                    className="profile-image"
                  />
                </div>
                <div className="msg left-msg">
                  <div>
                    <div className="msg-bubble">
                      <div className="msg-info">
                        <div className="msg-info-name">
                          {message.sender.name}
                        </div>
                      </div>
                      <div
                        className="other-msg-text"
                        dangerouslySetInnerHTML={sanitizeHTML(message.message)}
                      />
                    </div>
                    <p className="message-time2">{message.relativeTimestamp}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <IonFooter className="footer relative">
        {(filesArray || []).length > 0 && (
          <div className="w-screen overflow-x-auto flex gap-4 py-4 px-4 bg-[#fefcfa]">
            {(filesArray || []).map((element, index) => {
              return (
                <div className="relative" key={index}>
                  <button
                    className="bg-black absolute right-0 top-0 -translate-y-1/2  translate-x-1/2"
                    onClick={(e) => {
                      e.preventDefault();
                      const fileListArr = Array.from(refFiles.current.files);
                      fileListArr.splice(index, 1); // here u remove the file
                      const data = [...filesArray];
                      data.splice(index, 1);
                      setFilesArray(data);
                    }}
                  >
                    <IonIcon
                      icon={closeOutline}
                      className="text-white"
                    ></IonIcon>
                  </button>
                  <img
                    className="h-auto w-20 max-w-md  rounded-sm"
                    src={URL.createObjectURL(element)}
                    alt="messageImage"
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="footer-wrapper">
          <IonIcon
            icon={happyOutline}
            className="message-emoji"
            onClick={(e) => {
              e.preventDefault();
              toggleEmojiPicker(e);
            }}
          />

          {showEmojiPicker && (
            <div className="emojiPicker">
              <Picker
                previewPosition={"none"}
                onClickOutside={() => setShowEmojiPicker(false)}
                onEmojiSelect={handleEmojiSelect}
                navPosition="bottom"
                perLine={8}
              />
            </div>
          )}

          <input
            type="text"
            ref={inputRef}
            className="enter-msg"
            placeholder="Type Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          <div className="send-wrapper">
            {sendloading ? (
              <IonSpinner name="circular" className="send-spinner" />
            ) : (
              <IonIcon
                icon={chevronForwardOutline}
                onClick={handleSendMessage}
                className="send-icon"
              />
            )}
          </div>
          <label htmlFor="upload-image" className="attach-btn">
            <IonIcon icon={attachOutline}></IonIcon>
            <input
              hidden
              // multiple
              type="file"
              id="upload-image"
              ref={refFiles}
              value={""}
              accept="image/png,image/jpeg,image/jpg,image/webp,image/heic"
              onChange={(e) => {
                e.preventDefault();
                const selectedFile = e.target.files;
                const maxSizeFile = 5 * 1024 * 1024;
                const fileName = selectedFile[0]?.name;
                const idxDotElse = fileName.lastIndexOf(".") + 1;
                const extFileElse = fileName
                  .substr(idxDotElse, fileName.length)
                  .toLowerCase();
                const isOnlyImage =
                  extFileElse === "jpg" ||
                  extFileElse === "jpeg" ||
                  extFileElse === "png" ||
                  extFileElse === "webp" ||
                  extFileElse === "heic";
                const isFileSize = selectedFile[0].size <= maxSizeFile;
                if (isOnlyImage && isFileSize) {
                  const fileArrays = [];
                  fileArrays.push(selectedFile[0]);
                  setFilesArray(fileArrays);
                } else if (!isOnlyImage) {
                  presentToast(
                    "you can upload only png, jpg, jpeg, webp and heic"
                  );
                } else if (!isFileSize) {
                  presentToast("file maximum size limit is 5 MB");
                }

                e.target.files = null;
                e.target.value = null;
              }}
            />
          </label>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default GroupChat;