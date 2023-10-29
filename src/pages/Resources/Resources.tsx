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
  useIonViewDidLeave,
  useIonViewWillLeave,
} from "@ionic/react";
import {
  add,
  informationCircleOutline,
  menuOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";

import "./Resources.scss";
import { useEffect,  useState } from "react";
import Addrecmodal from "../modals/Addrec/Addrecmodal";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        }
        else if(axiosCancelToken_3){
          axiosCancelToken_3.cancel("Component unmounted");
        }
      };
  },[]);
  


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
  const getCategoriesOverview = () => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    axiosCancelToken_1 = source;

    axios
      .get(`https://app.mynalu.com/wp-json/nalu-app/v1/parent-categories`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        cancelToken: source.token,

      })
      .then((response) => {
        console.log(response.data);
        setCategoriesOverview(response.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const getCategoriesFavourites = () => {
    // setIsLoading(true);
    const source = axios.CancelToken.source();
    axiosCancelToken_3 = source;

    axios
      .get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?favourite=true`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        cancelToken: source.token,

        }
      )
      .then((response) => {
        console.log(response.data);
        setCategoriesFavourites(response.data.ressources);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const getRecommendations = () => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    console.log(source);
    axiosCancelToken_2 = source;

    axios
      .get(
        `https://app.mynalu.com/wp-json/nalu-app/v1/ressources?featured=true&per_page=4`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        cancelToken: source.token,

        }
      )
      .then((response) => {
        console.log(response.data);
        setRecommendations(response.data.ressources);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const getParentCategoryByID = (id) => {
    console.log(id);
    setCategoryID(id);
  

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
        history.push('/tabs/tab4/resourcesubcateggory',{
          filteredData: response.data.ressources,
          subCategory: response.data.sub_categories,
          parent_id: id
        })
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
      URL = `https://app.mynalu.com/wp-json/nalu-app/v1/upvote?id=${id}&status=false`;
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
      if ((response.data.message = "Upvote added successfully")) {
        
        getCategoriesFavourites()
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
        (response.data.message = "Downvote removed successfully")) {
        getCategoriesFavourites()
        
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
      const response = await axios.post(URL,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const setToastAndClose = (val) => {
    toast.success(val);
    setModalOpen(false);
  };
  const getResourceDetailsByID = (id) => {
    try {
      axios
        .get(`https://app.mynalu.com/wp-json/nalu-app/v1/ressources/${id}`)
        .then((response) => {
          console.log(response.data);
          history.push("/tabs/tab4/resourcedetail", {
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
      <ToastContainer autoClose={19000} />
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
          <div className="Overview">
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
              <IonToolbar>
                <IonSegment
                  mode="md"
                  onIonChange={(e) => segmentChanged(e)}
                  value={activeSegment as any}
                >
                  <IonSegmentButton value={"overview"}>
                    <IonLabel>Overview</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value={"favourites"}>
                    <IonLabel>Favourites</IonLabel>
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
                                <div className="icon-img">
                                  {item?.icon_url ? (
                                    // <img src={item.icon_url} alt={item.name} />
                                    <object 
data={item?.icon_url} 
type="image/svg+xml"
style={{"width": "20px","height": "20px", "fill": "red"}}>
 </object>


                                    
                                    ) : (
                                    "null"
                                  )}
                                </div>
                                <IonLabel>{item.name}</IonLabel>
                              </IonItem>
                            ))}
                          </IonRadioGroup>
                        </div>
                   

                  
                        <div className="recommended">
                          <div className="title-holder">
                            <h3>Recommended</h3>
                          </div>
                          <IonRow>
                            {recommendations.map((item, index) => (
                              <IonCol size="6" key={index}>
                                <div
                                  className="rc-card ion-activatable ripple-parent"
                                  onClick={() =>
                                    getResourceDetailsByID(item.id)
                                  }
                                >
                                  <IonRippleEffect />
                                  <div className="img-holder">
                                    {item.icon_url ? (
                                      <svg width="16" height="16">
                                        <image
                                          href={item.icon_url}
                                          x="0"
                                          y="0"
                                          height="16"
                                          width="16"
                                        />
                                      </svg>
                                    ) : (
                                      <img src={item?.thumbnail_url} alt="" />
                                    )}

                                    <div className="btn ion-activatable ripple-parent flex al-center jc-center">
                                      {item.parent_category.map(
                                        (value, index) =>
                                          value.icon_url ? (
                                            <img
                                              key={index}
                                              src={value.icon_url}
                                              alt=""
                                            />
                                          ) : (
                                            <p key={index}>null</p>
                                          )
                                      )}
                                    </div>
                                  </div>

                                  <h4>{item.title}</h4>
                                </div>
                              </IonCol>
                            ))}
                          </IonRow>
                        </div>
                     
                    <div className="add-recommendation ion-text-center">
                      <IonButton onClick={() => setModalOpen(true)}>
                        <IonIcon icon={add} />
                      </IonButton>
                      <h4>Add Recommendation</h4>
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
                                <div
                                className="btn ion-activatable ripple-parent flex al-center"
                                  onClick={(e) =>{
                                    e.stopPropagation()
                                    handleUpvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    )
                                  }
                                  }
                                  >
                                  {card.is_upvoted ? (
                                    <IonIcon src="assets/imgs/like-unfilled.svg" />
                                  ) : (
                                    <IonIcon src="assets/imgs/like-filled.svg" />
                                  )}
                                  <h6>{card.upvotes_number}</h6>
                                </div>
                                <div
                                className="btn ion-activatable ripple-parent flex al-center"
                                  onClick={(e) =>{
                                    e.stopPropagation()
                                    handleDownvote(
                                      card.is_upvoted,
                                      card.id,
                                      card.is_downvoted
                                    )
                                  }
                                  }
                                  >
                                  {card.is_downvoted ? (
                                    <IonIcon src="assets/imgs/dislike-unfilled.svg" />
                                  ) : (
                                    <IonIcon src="assets/imgs/dislike-filled.svg"></IonIcon>
                                  )}
                                </div>
                                <div
                                className="btn ion-activatable ripple-parent flex al-center"
                                  onClick={(e) =>{
                                    e.stopPropagation()
                                    handleSave(card.favourite, card.id)
                                  }
                                  }
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
          </div>
        </>
       )} 
    </>
  );
};

export default Resources;


