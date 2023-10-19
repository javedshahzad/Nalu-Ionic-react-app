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

  const { filteredData, subCategory } = (location?.state || {}) as {
    filteredData: any;
    subCategory: any;
  };
  const [filtered, setFiltered] = useState(filteredData);
  const [subCategories, setSubCategories] = useState(subCategory);

 

  useEffect(()=>{
console.log('useEffect of resourcesubcateggory',subCategory);
    setFiltered(filteredData)
    setSubCategories(subCategory)
  },[subCategory,filteredData])







 



 

  

  
  
  
 
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
    } else if (!is_upvoted && !is_downvoted) {
      // <-
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
        (response.data.message = "Upvote added successfully") &&
        !isFilterSelected
      ) {
        axios
          .get(
            `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setCategoriesFavourites(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (response.data.message = "Upvote added successfully") &&
        isFilterSelected
      ) {
        getCategoryByID(id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDownvote = async (is_upvoted, id, is_downvoted) => {
    let URL;
    if (!is_downvoted && !is_upvoted) {
      // <-
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/downvote?id=${id}&status=true`;
    } else if (!is_downvoted && is_upvoted) {
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false`;
    } else if (is_downvoted) {
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
      if (
        (response.data.message = "Downvote removed successfully") &&
        !isFilterSelected
      ) {
        axios
          .get(
            `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              },
            }
          )
          .then((response) => {
            setCategoriesFavourites(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (response.data.message = "Downvote removed successfully") &&
        isFilterSelected
      ) {
        getCategoryByID(categoryID);
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
          history.push("/resourcedetail", {
            data: response.data,
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
      {isLoading ? (
        <>
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
        </>
      ) : (
        <>
          <IonPage className="Overview">
            <IonHeader className="ion-no-border">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton color={"dark"}>
                    <IonIcon icon={menuOutline} />
                  </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                  <IonButton color="dark">
                    <IonIcon icon={searchOutline} />
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
              <div className="Resources">
                <IonContent className="ion-padding" fullscreen>
                  <div className="selector mtype">
                    <IonRadioGroup>
                      <IonItem
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
                      </IonItem>

                      {subCategories?.map((item, index) => (
                        <IonItem
                          key={index}
                          lines="none"
                          className={`img_div ${categoryID === item.id ? "selected" : "non_selected"}`}
                          onClick={() => getCategoryByID(item.id)}
                        >
                          <div>
                            {item.icon_url && (
                              <img
                                src={item.icon_url}
                                alt={item.name}
                                className="icon-img custom-icon"
                              />
                            )}
                          </div>
                          <IonLabel>{item.name}</IonLabel>
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
                              <img src="Not found" alt="Image not found" />
                            )}
                          </div>

                          <IonLabel>
                            <div className="first flex al-center">
                              <h3>{card.title}</h3>
                              <IonIcon src="assets/imgs/moviesm.svg" />
                            </div>
                            <div className="second flex al-center">
                              <IonIcon icon={informationCircleOutline} />
                              <p className="ion-text-wrap">
                                {card?.authority?.title}
                              </p>
                            </div>
                            <h5 className="ion-text-wrap">{card.title}</h5>
                            <div className="btns-holder flex al-center jc-between">
                              {/* <div
                                  onClick={() =>
                                    handleUpvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    )
                                  } */}
                              <div className="btn ion-activatable ripple-parent flex al-center">
                                {card.is_upvoted ? (
                                  <IonIcon src="assets/imgs/like-unfilled.svg" />
                                ) : (
                                  <IonIcon src="assets/imgs/like-filled.svg" />
                                )}
                                <h6>{card.upvotes_number}</h6>
                              </div>
                              {/* <div
                                  onClick={() =>
                                    handleDownvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    )
                                  } */}
                              <div className="btn ion-activatable ripple-parent flex al-center">
                                {card.is_downvoted ? (
                                  <IonIcon src="assets/imgs/dislike-unfilled.svg" />
                                ) : (
                                  <IonIcon src="assets/imgs/dislike-filled.svg"></IonIcon>
                                )}
                                {/* <h6>{card.downvotes_number}</h6> */}
                              </div>
                              {/* <div
                                  onClick={() =>
                                    handleSave(card.favourite, card.id)
                                  } */}
                              <div className="btn ion-activatable ripple-parent flex al-center">
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
            </IonContent>
          </IonPage>
        </>
      )}
    </>
  );
};

export default ResourceSubCategory;
