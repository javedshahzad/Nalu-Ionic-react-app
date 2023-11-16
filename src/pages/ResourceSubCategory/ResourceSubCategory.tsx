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
  useIonViewDidEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import {
  add,
  informationCircleOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./ResourceSubCategory.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import axios from "axios";
import filter from "../../Images/filter.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image_not_found from '../../Images/image-not-found.png'

const ResourceSubCategory: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [categoriesOverview, setCategoriesOverview] = useState([]);
  const [categoriesFavourites, setCategoriesFavourites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
 
  const [categoryID, setCategoryID] = useState(null);

  const history = useHistory();
  const location = useLocation();

  const { filteredData, subCategory,parent_id } = (location?.state || {}) as {
    filteredData: any;
    subCategory: any;
    parent_id: any
  };
  const [filtered, setFiltered] = useState(filteredData);
  const [subCategories, setSubCategories] = useState(subCategory);
  const [parentId, setParentId] = useState(parent_id);

 

  useEffect(()=>{
    setFiltered(filteredData)
    setSubCategories(subCategory)
    setParentId(parent_id)

  },[subCategory,filteredData,parent_id])

 
  const getCategoryByID = (id) => {
    console.log(id);
    setCategoryID(id);
 
    setIsFilterSelected(true);

    axios
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        params: {
          category_id: id,
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.ressources);

        setFiltered(response.data.ressources);
        setSubCategories(response.data.sub_categories)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const handleUpvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (is_upvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false}`;
    } else {
      // <-
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
       if(
        response.data.message === "Upvote handled successfully" ||
        response.data.message === "Downvote removed successfully" ||
        response.data.message === "Upvote removed successfully"

      ) {
        getCategoryByID(parentId);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDownvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (is_downvoted) {
      // <-
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=false`;
    } else{
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=true`;
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
       if ((response.data.message === "Downvote removed successfully" || 
       response.data.message === "Downvote added successfully" ||
       response.data.message === "Upvote removed successfully"
       )){
        getCategoryByID(parentId);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSave = async (fav, id) => {
    let URL;
    if (fav) {
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
      console.log(response.data);
      if(response.data.message = "Post added to favourites successfully"){
        console.log(parent_id);
        getCategoryByID(parentId)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigateFilter = () => {
    setCategoryID(null)
    history.push("/filter");
  };
 
  const getResourceDetailsByID = (id) => {
    try {
      axios
        .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`)
        .then((response) => {
          console.log(response.data);
          history.push("/tabs/tab4/resourcedetail", {
            data: response.data,
            // resource_id: id
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
     
          <IonPage className="ResourceSubCategory">
            {
              isLoading? (
                <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <IonSpinner name="crescent"></IonSpinner>
          </div>
              ):(
                <>
                <IonHeader className="ion-no-border">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton color={"dark"} onClick={() => history.push('/menu')}>
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
            </IonHeader>

            <IonContent className="ion-padding" fullscreen>
              <div className="Resources">
                  <div className="selector mtype">
                    <IonRadioGroup>
                      {/*<IonItem
                        lines="none"
                        onClick={navigateFilter}
                      >
                        <div>
                          <img
                            src={filter}
                            alt=""
                            style={{ marginRight: "5px" }}
                          />
                        </div>
                        <IonLabel>Filter</IonLabel>
                      </IonItem>*/}

                      {subCategories?.map((item, index) => (
                        <IonItem
                          key={index}
                          lines="none"
                          className={`img_div ${categoryID === item.id ? "selected" : "non_selected"}`}
                          onClick={() => getCategoryByID(item.id)}
                        >
                          <div className="icon_img">
                            {item?.icon_url ? (
                                <div
                                  className={`icon__ ${categoryID === item.id ? "blackIcon" : "blackIcon"}`}
                                  dangerouslySetInnerHTML={{
                                    __html: item.svg_url,
                                  }}
                                />
                              ) : null}
                          </div>
                          <IonLabel style={{marginLeft:"10px"}}>{item.name}</IonLabel>
                        </IonItem>
                      ))}
                    </IonRadioGroup>
                  </div>

                  <div className="the-list">
                    {filtered?.map((card, index) => (
                      <div className="resource-card" key={index}>
                        <IonItem
                          lines="none"
                          onClick={() => getResourceDetailsByID(card.id)}
                        >
                          <div className="thumb" slot="start">
                            {card?.thumbnail_url ? (
                              <img src={card.thumbnail_url} alt="" />
                            ) : (
                              // <img src={image_not_found} alt="Image not found" />
                              <span/>

                            )}
                          </div>

                          <IonLabel>
                            <div className="first flex al-center">
                              <h3>{card?.title}</h3>
                              {/*{card.category && card.category.length > 0 && card.category[0].svg_url ? (
                                <div
                                  className={`icon__ ${categoryID === card.category[0].id ? "blackIcon" : "blackIcon"}`}
                                  dangerouslySetInnerHTML={{
                                    __html: card.category[0].svg_url,
                                  }}
                                />
                                ) : null}*/}
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
                            <h5 className="ion-text-wrap">{card?.description}</h5>
                            {/*<div className="btns-holder flex al-center jc-between">
                              <div
                                  onClick={(e) =>{
                                    e.stopPropagation();
                                    handleUpvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    )
                                  }
                                  }
                                  className="btn ion-activatable ripple-parent flex al-center">
                                {card.is_upvoted ? (
                                  <IonIcon src="assets/imgs/like-filled.svg" />
                                ) : (
                                  <IonIcon src="assets/imgs/like-unfilled.svg" />
                                )}&ensp;
                                {card?.upvotes_number > 0 && (
                                  <h6>{card.upvotes_number}</h6>
                                )}
                              </div>
                              <div
                                  onClick={(e) =>{
                                    e.stopPropagation();
                                    handleDownvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    )
                                  }
                                  }
                                  className="btn ion-activatable ripple-parent flex al-center">
                                {card.is_downvoted ? (
                                  <IonIcon src="assets/imgs/dislike-filled.svg" />
                                ) : (
                                  <IonIcon src="assets/imgs/dislike-unfilled.svg"></IonIcon>
                                )}
                              </div>
                              <div
                                  onClick={(e) =>
                                    {
                                      e.stopPropagation()
                                      handleSave(card.favourite, card.id)
                                    }
                                  }
                                  className="btn ion-activatable ripple-parent flex al-center">
                                {!card.favourite ? (
                                  <IonIcon src="assets/imgs/heart-unfilled.svg"></IonIcon>
                                ) : (
                                  <IonIcon src="assets/imgs/heart-filled.svg" />
                                )}
                              </div>
                                </div>*/}
                          </IonLabel>
                        </IonItem>
                      </div>
                    ))}
                  </div>
              </div>
            </IonContent>
                </>
              )
            }
            
          </IonPage>
       
    </>
  );
};

export default ResourceSubCategory;
