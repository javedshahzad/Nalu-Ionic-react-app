import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRippleEffect,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillLeave,
  isPlatform,
} from "@ionic/react";
import {
  add,
  informationCircleOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./Resources.scss";
import { useEffect, useState } from "react";
import Addrecmodal from "../modals/Addrec/Addrecmodal";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image_not_found from '../../Images/image-not-found.png'

const Resources: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [categoriesOverview, setCategoriesOverview] = useState([]);
  const [categoriesFavourites, setCategoriesFavourites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryID, setCategoryID] = useState("");

  const history = useHistory();
  const router = useIonRouter();

  let axiosCancelToken_1;
  let axiosCancelToken_2;
  let axiosCancelToken_3;

  useEffect(() => {
    Data();
    return () => {
      if (axiosCancelToken_1) {
        axiosCancelToken_1?.cancel("Component unmounted");
        axiosCancelToken_2?.cancel("Component unmounted");
        axiosCancelToken_3?.cancel("Component unmounted");
      } else if (axiosCancelToken_3) {
        axiosCancelToken_3.cancel("Component unmounted");
      }
    };
  }, [0]);

  const Data = () => {
    getCategoriesOverview();
    getRecommendations();
    setActiveSegment("overview");
  };

  const segmentChanged = (e: any) => {
    setActiveSegment(e.detail.value);
    if (e.detail.value === "overview") {
      getCategoriesOverview();
      getRecommendations();
      localStorage.removeItem("DATA");
    } else {

      setIsLoading(true);
      getCategoriesFavourites();
      setIsFilterSelected(false);
      setCategoryID("");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const getCategoriesOverview = async () => {
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };
  
    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.get(
          `https://app.mynalu.com/wp-json/nalu-app/v1/parent-categories`, 
          {}, 
          headers
        );
        response = JSON.parse(response.data);
      } else {
        const source = axios.CancelToken.source();
        axiosCancelToken_1 = source;
        response = await axios.get(
          `https://app.mynalu.com/wp-json/nalu-app/v1/parent-categories`, 
          { headers, cancelToken: source.token }
        );
        response = response.data;
      }
      setCategoriesOverview(response);
    } catch (error) {
      console.error("Error fetching categories overview:", error);
    } finally {
      setIsLoading(false);
    }
  };  
  const getCategoriesFavourites = async () => {
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };
  
    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.get(
          `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`, 
          {}, 
          headers
        );
        response = JSON.parse(response.data);
      } else {
        const source = axios.CancelToken.source();
        axiosCancelToken_3 = source;
        response = await axios.get(
          `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`, 
          { headers, cancelToken: source.token }
        );
        response = response.data;
      }
      setCategoriesFavourites(response.ressources);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    } finally {
      setIsLoading(false);
    }
  };  
  const getRecommendations = async () => {
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    };
  
    try {
      let response;
      if (isPlatform("ios")) {
        response = await HTTP.get(
          `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?featured=true&per_page=4`, 
          {}, 
          headers
        );
        response = JSON.parse(response.data);
      } else {
        const source = axios.CancelToken.source();
        axiosCancelToken_2 = source;
        response = await axios.get(
          `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?featured=true&per_page=4`, 
          { headers, cancelToken: source.token }
        );
        response = response.data;
      }
      setRecommendations(response.ressources);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };  
  const getParentCategoryByID = (resource_sub_id) => {

         history.push(`/tabs/tab3/resourcesubcateggory/${resource_sub_id}`);

    // setIsLoading(true);
    // setCategoryID(id);

    // axios
    //   .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    //     },
    //     params: {
    //       category_id: id,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);

    //     history.push(`/tabs/tab3/resourcesubcateggory/${id}`, {
    //       filteredData: response.data.ressources,
    //       subCategory: response.data.sub_categories,
    //       parent_id: id,
    //     });
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setIsLoading(false);
    //   });
  };
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
      if (response.message === "Upvote handled successfully" ||
          response.message === "Downvote removed successfully" ||
          response.message === "Upvote removed successfully") {
        getCategoriesFavourites();
      }
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
      if (response.message === "Downvote removed successfully" ||
          response.message === "Downvote added successfully" ||
          response.message === "Upvote removed successfully" ||
          response.message === "Upvote handled successfully") {
        getCategoriesFavourites();
      }
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
      if (response.message === "Post removed from favourites successfully" ||
          response.message === "Post added to favourites successfully") {
        getCategoriesFavourites();
      }
    } catch (error) {
      console.error("Error handling save:", error);
    }
  };  

  const setToastAndClose = (val) => {
    toast.success(val);
    setModalOpen(false);
  };
  const getResourceDetailsByID = (id) => {
    setIsLoading(true);

    try {
      axios
        .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`)
        .then((response) => {
          console.log(response.data);

          history.push("/tabs/tab3/resourcedetail", {
            data: response.data,
          });
    setIsLoading(false);
        
          // router.push('/tabs/tab3/resourcedetail', 'root', 'replace');
          // const dataParam = encodeURIComponent(JSON.stringify(response.data));
          // router.push(`/resourcedetail?data=${dataParam}`, 'root', 'replace');

          

        })
        .catch((error) => {
          console.log(error);
    setIsLoading(false);

        });
    } catch (error) {
      console.log(error);
    setIsLoading(false);

    }
  };
  return (
    <>
      <ToastContainer autoClose={19000} />
      
          <IonPage className="Resources">
            {
              isLoading?(
<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#F8F5F2",
        }}
      >
        <IonSpinner name="crescent"></IonSpinner>
      </div>
              ):
              (
<>
<IonHeader className="ion-no-border">
              <IonToolbar>
              <IonButtons slot="end">
                  <IonButton color="dark" onClick={() => history.push('/menu')}>
                      <IonIcon icon={menuOutline} />
                  </IonButton>
              </IonButtons>
              {/*<IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={searchOutline} />
                  </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={notificationsOutline} />
                  </IonButton>
              </IonButtons>*/}
              </IonToolbar>
              <IonToolbar>
                <IonSegment
                  mode="md"
                  onIonChange={(e) => segmentChanged(e)}
                  value={activeSegment as any}
                >
                  <IonSegmentButton value={"overview"}>
                    <IonLabel>Übersicht</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value={"favourites"}>
                    <IonLabel>Favoriten</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
              <IonModal
                isOpen={modalOpen}
                className="modaaal"
                onDidDismiss={handleModalClose}
              >
                <Addrecmodal onClose={(val) => setToastAndClose(val)} />
              </IonModal>
              {activeSegment === "overview" ? (
                <>
                  <div className="overview">
                    <div className="selector mtype">
                      <IonRadioGroup>
                        {categoriesOverview.map((item, index) => (
                          <IonItem
                            key={index}
                            lines="none"
                            onClick={() => getParentCategoryByID(item.id)}
                          >
                            <div className="red_circle">

                            <div className="icon_img">
                              {item?.icon_url ? (
                                <div
                                  className="red_icon"
                                  dangerouslySetInnerHTML={{
                                    __html: item?.svg_url,
                                  }}
                                />
                              ) : null}
                            </div>
                            </div>

                            <IonLabel style={{ color: "#636363" }}>
                              {item.name}
                            </IonLabel>
                          </IonItem>
                        ))}
                      </IonRadioGroup>
                    </div>

                    <div className="recommended">
                      <div className="title-holder">
                        <h3>Für dich empfohlen</h3>
                      </div>
                      <IonRow>
                        {recommendations.map((item, index) => (
                          <IonCol size="6" key={index}>
                            <div
                              className="rc-card ion-activatable ripple-parent"
                              onClick={() => history.push(`/tabs/tab3/resourcedetail/${item.id}`)}
                            >
                              <IonRippleEffect />
                              <div className="img-holder">
                                {item?.thumbnail_url ? (
                                   <img src={item?.thumbnail_url} />
                                ) : (
                                  <span style={{'width':'100%'}} />
                                  )}

                                {/*<div className="btn ion-activatable ripple-parent flex al-center jc-center">
                                  {item.parent_category.map((value, index) =>
                                    value.icon_url ? (
                                    
                                <div
                                  className="brown_icon"
                                  key={index}
                                  dangerouslySetInnerHTML={{
                                    __html: value?.svg_url,
                                  }}
                                />
                                    ) : (
                                      <span/>
                                    )
                                  )}
                                    </div>*/}
                              </div>

                              <h4 style={{ fontFamily: 'GBold', fontSize: '16px', margin: '10px 0', width: '-webkit-fill-available', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h4>
                            </div>
                          </IonCol>
                        ))}
                      </IonRow>
                    </div>

                    <div className="add-recommendation ion-text-center">
                      <IonButton onClick={() => setModalOpen(true)}>
                        <IonIcon icon={add} />
                      </IonButton>
                      <h4>Empfehlung hinzufügen</h4>
                    </div>
                  </div>
                </>
              ) : (
                <div className="Resources">
                  <IonContent className="ion-padding" fullscreen>
                    <div className="the-list">
                      {categoriesFavourites.map((card, index) => (
                        <div className="resource-card" key={index}>
                          <IonItem
                            lines="none"
                            onClick={() => getResourceDetailsByID(card.id)}
                          >
                            <div className="thumb" slot="start">
                              {card?.thumbnail_url ? (
                                <img src={card.thumbnail_url} alt="" />
                              ) : (
                                <img style={{'width':'100%'}} src={''} alt="Image not found" />
                                )}
                            </div>

                            <IonLabel>
                              <div className="first flex al-center">
                                <h3>{card?.title}</h3>
                                {card.category && card.category.length > 0 && card.category[0].svg_url ? (
                                  <div
                                    className={`icon__ ${categoryID === card.category[0].id ? "blackIcon" : "blackIcon"}`}
                                    dangerouslySetInnerHTML={{
                                      __html: card.category[0].svg_url,
                                    }}
                                  />
                                ) : null}
                              </div>
                              <div className="second flex al-center">
                                {card?.sponsored && (
                                  <>
                                    <IonIcon icon={informationCircleOutline} /> <p className="ion-text-wrap">Gesponsert</p>
                                  </>
                                )}
                                {!card?.sponsored && card.authority && card.authority[0]?.title && (
                                  <>
                                    <IonIcon icon={informationCircleOutline} /> <p className="ion-text-wrap">Empfohlen von {card.authority[0].title}</p>
                                  </>
                                )}
                              </div>
                              <h5 className="ion-text-wrap">{card.description}</h5>
                              <div className="btns-holder flex al-center jc-between">
                                <div
                                  className="btn ion-activatable ripple-parent flex al-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    );
                                  }}
                                >
                                  {card.is_upvoted ? (
                                    <IonIcon src="assets/imgs/like-filled.svg" />
                                  ) : (
                                    <IonIcon src="assets/imgs/like-unfilled.svg" />
                                  )}
                                  <h6>{card.upvotes_number}</h6>
                                </div>
                                <div
                                  className="btn ion-activatable ripple-parent flex al-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    );
                                  }}
                                >
                                  {card.is_downvoted ? (
                                    <IonIcon src="assets/imgs/dislike-filled.svg" />
                                  ) : (
                                    <IonIcon src="assets/imgs/dislike-unfilled.svg"></IonIcon>
                                  )}
                                </div>
                                <div
                                  className="btn ion-activatable ripple-parent flex al-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSave(card.favourite, card.id);
                                  }}
                                >
                                  {!card.favourite ? (
                                    <IonIcon src="assets/imgs/heart-unfilled.svg"></IonIcon>
                                  ) : (
                                    <IonIcon src="assets/imgs/heart-filled.svg" />
                                  )}
                                  <h6>Save</h6>
                                </div>
                              </div>
                            </IonLabel>
                          </IonItem>
                        </div>
                      ))}
                    </div>
                  </IonContent>
                </div>
              )}
            </IonContent>
</>
              )
            }
            
          </IonPage>
       
    </>
  );
};

export default Resources;
