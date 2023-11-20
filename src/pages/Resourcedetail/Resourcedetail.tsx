import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  arrowBackOutline,
  heartOutline,
  notificationsOutline,
} from "ionicons/icons";

import "./Resourcedetail.scss";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import NotificationBell from "../../components/NotificationBell";
import ReactPlayer from "react-player";
import { Player } from "./../../components/videoPlayer/Player";
import React, { useRef, useEffect } from "react";
import { Browser } from "@capacitor/browser";
import { useParams } from "react-router-dom";

const Resourcedetail: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const params: any = useParams();

  const data = location.state;

  let num: any = 0;

  console.log("params", params);
  // const dataParam = new URLSearchParams(location.search).get('data');
  // const data = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;

  // console.log(data);
  const [resourseData, setResourceData] = useState(null);

  const getResourceDetailsByID = () => {
    try {
      axios
        .get(
          `https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${[
            params.id,
          ]}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        )

        .then((response) => {
          console.log(response.data);
          // history.push("/tabs/tab4/resourcedetail", {
          //   data: response.data,
          // });
          setResourceData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResourceDetailsByID();
  }, []);

  const handleUpvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (is_upvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false`;
    } else {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=true`;
    }
    // else if (!is_upvoted && is_downvoted) {
    //   URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
    // }

    try {
      const response = await axios.post(
        URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      console.log(response.data);
      if (
        response.data.message === "Upvote handled successfully" ||
        response.data.message === "Downvote removed successfully" ||
        response.data.message === "Upvote removed successfully"
      ) {
        // getResourceDetailsByID(resourseData.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (is_downvoted) {
      // <-
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=true`;
    } else {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false`;
    }
    // else if (is_downvoted) {
    //   URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
    // }

    try {
      const response = await axios.post(
        URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      if (
        response.data.message === "Downvote removed successfully" ||
        response.data.message === "Downvote added successfully" ||
        response.data.message === "Upvote removed successfully"
      ) {
        // getResourceDetailsByID(resourseData.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (favourite, id) => {
    console.log(favourite);
    console.log(id);

    let URL;
    if (favourite) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=false`;
    } else {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=true`;
    }

    try {
      const response = await axios.post(
        URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      console.log(response);
      if ((response.data.message = "Post added to favourites successfully")) {
        // getResourceDetailsByID(resourseData.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const getResourceDetailsByID = (id) => {
  //   try {
  //     axios
  //       .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         setResourceData(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const contentRef = useRef<HTMLIonContentElement>(null);

  const openLink = async (url: string) => {
    await Browser.open({ url: url });
  };

  useEffect(() => {
    const content = contentRef.current;

    const clickListener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "A" && target instanceof HTMLAnchorElement) {
        const href = target.href;
        if (
          href &&
          (href.startsWith("https://") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:"))
        ) {
          event.preventDefault(); // Prevent the default link behavior
          openLink(href); // Open the link with the Browser plugin
        }
      }
    };

    // Use getScrollElement() to get the correct scrollable element to attach the event
    content?.getScrollElement().then((scrollElement) => {
      scrollElement.addEventListener("click", clickListener);
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      content?.getScrollElement().then((scrollElement) => {
        scrollElement.removeEventListener("click", clickListener);
      });
    };
  }, []);

  const backHandler = () => {
    window.history.back();
    if (num === 0) {
      num = 1;
      backHandler();
    }
  };

  return (
    <IonPage className="Resourcedetail">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton fill="clear" color="dark" onClick={backHandler}>
            <IonIcon icon={arrowBackOutline}></IonIcon>
          </IonButton>
          <IonTitle>{resourseData?.data.title}</IonTitle>
          {/*<IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon icon={heartOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton slot="end" fill="clear">
              <NotificationBell />
            </IonButton>
          </IonButtons>*/}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen ref={contentRef}>
        <div className="top-img-holder ion-text-center">
          {resourseData?.data?.featured_video ? (
            <div className="player-wrapper">
              <ReactPlayer
                url={resourseData?.data?.featured_video}
                width="100%"
                height="100%"
                className="react-player"
                controls={true}
                playsinline={true}
              />
            </div>
          ) : resourseData?.data?.image_url ? (
            <img src={resourseData?.data?.image_url} />
          ) : null}
        </div>
        <div className="content ion-padding">
          {resourseData?.data?.parent_category[0]?.svg_url ? (
            <div className="category-tag">
              <IonItem lines="none">
                <div
                  slot="start"
                  dangerouslySetInnerHTML={{
                    __html: resourseData?.data?.parent_category[0]?.svg_url,
                  }}
                />
                <IonLabel>
                  {resourseData?.data?.parent_category[0]?.name}
                </IonLabel>
                <IonRadio value="Movies"></IonRadio>
              </IonItem>
            </div>
          ) : null}

          <div className="rec">
            <div className="details">
              {resourseData?.data?.authority?.title ? (
                <h2>{resourseData?.data?.authority?.title}</h2>
              ) : null}

              <IonItem lines="none">
                {resourseData?.data?.authority?.title ? (
                  <div className="start-slot flex al-start " slot="start">
                    <IonAvatar>
                      <img src={resourseData?.data?.authority?.image} alt="" />
                    </IonAvatar>

                    <IonIcon
                      className="verify"
                      src="assets/imgs/icn-verify.svg"
                    />
                  </div>
                ) : null}
                <IonLabel>
                  {resourseData?.data.authority?.title && (
                    <>
                      <p>Recommended by</p>
                      <h6 className="ion-text-wrap">
                        <span>{resourseData?.data.authority?.title}</span>
                        {resourseData?.data?.authority?.description}
                      </h6>
                    </>
                  )}
                  <div className="btns-holder flex al-center">
                    <div
                      onClick={() =>
                        handleUpvote(
                          resourseData?.data.is_upvoted,
                          resourseData?.data.id,
                          resourseData?.data.is_downvoted
                        )
                      }
                      className="btn ion-activatable ripple-parent flex al-center"
                    >
                      {resourseData?.data.is_upvoted ? (
                        <IonIcon src="assets/imgs/like-filled.svg" />
                      ) : (
                        <IonIcon src="assets/imgs/like-unfilled.svg" />
                      )}
                      &ensp;
                      {resourseData?.data.upvotes_number > 0 && (
                        <h6>{resourseData?.data.upvotes_number}</h6>
                      )}
                    </div>
                    <div
                      onClick={() =>
                        handleDownvote(
                          resourseData?.data.is_upvoted,
                          resourseData?.data.id,
                          resourseData?.data.is_downvoted
                        )
                      }
                      className="btn ion-activatable ripple-parent flex al-center"
                      style={{ marginLeft: "29px" }}
                    >
                      {resourseData?.data.is_downvoted ? (
                        <IonIcon src="assets/imgs/dislike-filled.svg" />
                      ) : (
                        <IonIcon src="assets/imgs/dislike-unfilled.svg"></IonIcon>
                      )}
                    </div>
                    <div
                      onClick={() =>
                        handleSave(
                          resourseData?.data.favourite,
                          resourseData?.data.id
                        )
                      }
                      className="btn ion-activatable ripple-parent flex al-center"
                      style={{ marginLeft: "29px" }}
                    >
                      {resourseData?.data.favourite ? (
                        <IonIcon src="assets/imgs/heart-filled.svg" />
                      ) : (
                        <IonIcon src="assets/imgs/heart-unfilled.svg"></IonIcon>
                      )}
                      <h6 style={{ marginLeft: "5px", color: "#636363" }}></h6>
                    </div>
                  </div>
                </IonLabel>
              </IonItem>

              <div className="desc">
                <h3>{resourseData?.data.title}</h3>
                <p
                  className="ion-text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: resourseData?.data.content,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Resourcedetail;
