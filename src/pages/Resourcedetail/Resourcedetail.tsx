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
  IonSpinner,
  isPlatform,
} from "@ionic/react";
import {
  arrowBackOutline,
  heartOutline,
  notificationsOutline,
} from "ionicons/icons";

import "./Resourcedetail.scss";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { useState } from "react";
import NotificationBell from "../../components/NotificationBell";
import ReactPlayer from "react-player";
import { Player } from "./../../components/videoPlayer/Player";
import React, { useRef, useEffect } from "react";
import { Browser } from "@capacitor/browser";
import { useParams } from "react-router-dom";

const Resourcedetail: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const getResourceDetailsByID = async () => {
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };
  
    try {
      let responseData;
      if (isPlatform("ios")) {
        const cordovaResponse = await HTTP.get(
          `https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${params.id}`,
          {},
          headers
        );
        responseData = JSON.parse(cordovaResponse.data); // Assuming the Cordova plugin returns the response directly
      } else {
        const axiosResponse = await axios.get(
          `https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${params.id}`,
          { headers }
        );
        responseData = axiosResponse.data; // Axios encapsulates response in a .data property
      }
      console.log(responseData);
      setResourceData({ data: responseData }); // Normalize the structure
    } catch (error) {
      console.error("Error fetching resource details:", error);
    } finally {
      setIsLoading(false);
    }
  };  

  useEffect(() => {
    getResourceDetailsByID();
  }, []);

  const handleUpvote = async (is_upvoted, id, is_downvoted) => {
    let URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=${!is_upvoted}`;
  
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };
  
    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.post(URL, {}, headers);
        response = JSON.parse(response.data);
      } else {
        response = await axios.post(URL, {}, { headers });
        response = response.data;
      }
      console.log(response);
      getResourceDetailsByID();
    } catch (error) {
      console.error("Error handling upvote:", error);
    }
  };  

  const handleDownvote = async (is_upvoted, id, is_downvoted) => {
    let URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=${!is_downvoted}`;
  
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };
  
    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.post(URL, {}, headers);
        response = JSON.parse(response.data);
      } else {
        response = await axios.post(URL, {}, { headers });
        response = response.data;
      }
      console.log(response);
      getResourceDetailsByID();
    } catch (error) {
      console.error("Error handling downvote:", error);
    }
  };  

  const handleSave = async (favourite, id) => {
    let URL = `https://app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=${!favourite}`;
  
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };
  
    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.post(URL, {}, headers);
        response = JSON.parse(response.data);
      } else {
        response = await axios.post(URL, {}, { headers });
        response = response.data;
      }
      console.log(response);
      getResourceDetailsByID();
    } catch (error) {
      console.error("Error handling save:", error);
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
    if (num === 0) {
      num = 1;

      const currentURL = window.location.pathname;
  
      if (currentURL === "/tabs/tab4/resourcedetail/6999") {
        window.history.go(-2);
      } else {
        window.history.back();
      }
    }
  };

  return (
    <IonPage className="Resourcedetail">
      {isLoading || !resourseData ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#F8F5F2",
          }}
        >
          <IonSpinner name="crescent" />
        </div>
      ) : (
          <>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButton slot="start" fill="clear" color="dark" onClick={backHandler}>
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
          </>
        )}
    </IonPage>
  );
};

export default Resourcedetail;
