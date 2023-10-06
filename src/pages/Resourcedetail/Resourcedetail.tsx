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
  checkmarkCircle,
  heartOutline,
  informationCircleOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./Resourcedetail.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';
import thumbs_up from "../.././Images/thumbs-up.svg";
import thumbs_up_outline from "../.././Images/thumbs-up-outline.svg";
import thumbs_down from "../.././Images/thumbs-down.svg";
import thumbs_down_outline from "../.././Images/thumbs-down-outline.svg";



const Resourcedetail: React.FC = () => {
  const location = useLocation();
  const data: any = location.state;
  const [resourseData, setResourceData] = useState(data);
console.log(resourseData);

  const handleUpvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (is_upvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false}`;
    } else if (!is_upvoted && !is_downvoted) {
      // <-
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=true`;
    } else if (!is_upvoted && is_downvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
    }

    try {
      const response = await axios.post(URL);
      console.log(response.data);
      if ((response.data.message = "Upvote added successfully") || (response.data.message = "Downvote removed successfully")) {
          getResourceDetailsByID(resourseData.data.id)
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
      const response = await axios.post(URL);
      if ((response.data.message = "Downvote removed successfully")) {
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
            `https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`
          )
          .then((response) => {
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
const vide0 ="https://www.youtube.com/watch?v=zk8M00rjMfQ"
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
            <IonButton color="dark">
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="top-img-holder ion-text-center">
          {!resourseData?.data.image_url ? (
            <video src={vide0} autoPlay loop muted />
            ) : (
            <img src={resourseData?.data.image_url} alt="No image" />
//  <video src={`https://www.youtube.com/watch?v=zk8M00rjMfQ`} width="750" height="500" controls>
//  </video>

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
                                    <IonIcon src={thumbs_up}></IonIcon>
                                  ) : (
                                    <IonIcon src={thumbs_up_outline}></IonIcon>
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
                                    <IonIcon src={thumbs_down}></IonIcon>
                                  ) : (
                                    <IonIcon
                                   
                                    className={`vote-icon ${getFavouriteColor(
                                      resourseData?.data.is_downvoted
                                    )}`}
                                    src={thumbs_down_outline}
                                    ></IonIcon>
                                  )}
                      <h6>{resourseData?.data.downvotes_number}</h6>
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
