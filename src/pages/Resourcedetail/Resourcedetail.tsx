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
  
  heartOutline,
  

  
  
  notificationsOutline,
  
} from "ionicons/icons";

import "./Resourcedetail.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';
import NotificationBell from "../../components/NotificationBell";

const Resourcedetail: React.FC = () => {
  const location = useLocation();
  const data: any = location.state;
  const [resourseData, setResourceData] = useState(data);

  const handleUpvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (is_upvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false}`;
    } else if (!is_upvoted && !is_downvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=true`;
    } else if (!is_upvoted && is_downvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
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
      console.log(response.data);
      if (
        response.data.message === "Upvote added successfully" ||
        response.data.message === "Downvote removed successfully"
      ) {
        getResourceDetailsByID(resourseData.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDownvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (!is_downvoted && !is_upvoted) {
      // <-
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=true}`;
    } else if (!is_downvoted && is_upvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false`;
    } else if (is_downvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
    }

    try {
      const response = await axios.post(URL, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      if ((response.data.message = "Downvote removed successfully")) {
          getResourceDetailsByID(resourseData.data.id)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (favourite,id) => {
    console.log(favourite);
    console.log(id);


    let URL;
    if (favourite) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=false}`;
    } else {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/favourites?id=${id}&status=true`;
    } 

    try {
      const response = await axios.post(URL, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      console.log(response);
      if ((response.data.message = "Post added to favourites successfully")) {
          getResourceDetailsByID(resourseData.data.id)
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getResourceDetailsByID =(id)=>{
    try {
      axios
          .get(
            `https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            setResourceData(response)
           
          })
          .catch((error) => {
            console.log(error);
          });
      
    } catch (error) {
      console.log(error);
    }
  }
  const getFavouriteColor = (fav) => {
    if (fav) {
      return "filled";
    } else {
      return "not-filled";
    }
  };
  return (
    <IonPage className="Resourcedetail">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="dark" text={""} defaultHref="/tabs/tab4" />
          </IonButtons>
          <IonTitle>{resourseData?.data.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon icon={heartOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton slot="end" fill="clear">
              <NotificationBell />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="top-img-holder ion-text-center">
          {!resourseData?.data.image_url ? (
            <div>
              <div dangerouslySetInnerHTML={{ __html: resourseData.data.featured_video }}></div>
            </div>

            ) : (
        <img src={resourseData?.data.image_url} alt="No image" />
          )}
        </div>

        <div className="content ion-padding">
          <div className="category-tag">
            <IonItem lines="none">
              <IonIcon slot="start" src="assets/imgs/f2.svg" />
              <IonLabel>Movies</IonLabel>
              <IonRadio value="Movies"></IonRadio>
            </IonItem>
          </div>

          <div className="rec">
            <div className="details">
              <h2>{resourseData?.data.authority.title}</h2>

              <IonItem lines="none">
                <div className="start-slot flex al-start " slot="start">
                  <IonAvatar>
                    <img src={resourseData?.data?.authority?.image} alt="" />
                  </IonAvatar>

                  <IonIcon
                    className="verify"
                    src="assets/imgs/icn-verify.svg"
                  />
                </div>
                <IonLabel>
                  <p>Recommended by</p>
                  <h6 className="ion-text-wrap">
                    <span>{resourseData?.data.authority.title}</span> Specialist for
                    gynecology and obstetrics
                  </h6>
                  <div className="btns-holder flex al-center">
                    <div 
                    onClick={()=>handleUpvote(resourseData?.data.is_upvoted,
                      resourseData?.data.id,
                      resourseData?.data.is_downvoted)}
                    className="btn ion-activatable ripple-parent flex al-center">
                      {resourseData?.data.is_upvoted ? (
                                    <IonIcon src="assets/imgs/like-unfilled.svg"/>

                                  ) : (
                                    <IonIcon src="assets/imgs/like-filled.svg"/>

                                  )}

                      <h6>{resourseData?.data.upvotes_number}</h6>
                    </div>
                    <div 
                    onClick={() =>
                      handleDownvote(
                        resourseData?.data.is_upvoted,
                        resourseData?.data.id,
                        resourseData?.data.is_downvoted
                      )
                    }
                    className="btn ion-activatable ripple-parent flex al-center" style={{"marginLeft": "29px"}}>
                          {resourseData?.data.is_downvoted ? (
                                    <IonIcon src="assets/imgs/dislike-unfilled.svg"/>

                                  ) : (
                                    <IonIcon
                                    src="assets/imgs/dislike-filled.svg"
                                    ></IonIcon>
                                  )}
                    </div>
                    <div 
                    onClick={() =>
                      handleSave(
                        resourseData?.data.favourite,
                        resourseData?.data.id
                      )
                    }
                    className="btn ion-activatable ripple-parent flex al-center" style={{"marginLeft": "29px"}}>
                          {resourseData?.data.favourite ? (
                                    <IonIcon src="assets/imgs/heart-filled.svg"/>
                                  ) : (
                                    <IonIcon src="assets/imgs/heart-unfilled.svg" ></IonIcon>
                                  )}
                      <h6 style={{"marginLeft":"5px","color":"#636363"}}> Save</h6> 
                    </div>
                  </div>
                </IonLabel>
              </IonItem>

              <div className="desc">
              <p className="ion-text-wrap" dangerouslySetInnerHTML={{ __html: resourseData?.data.content }}></p>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Resourcedetail;
