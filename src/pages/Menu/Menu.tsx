import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
  useIonRouter,
  isPlatform,
  IonAlert,
  IonSpinner,
  useIonToast,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  arrowBackOutline,
  trashBinOutline,
  logOutOutline,
  arrowBack,
  camera,
  pencil,
  checkmark,
  close,
  closeOutline,
} from "ionicons/icons";
import "./Menu.scss";
import { Browser } from "@capacitor/browser";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { HTTP } from "@awesome-cordova-plugins/http";
import { ArrowLeftIcon } from "@vidstack/react/icons";
import apiService from "../../Services";
import menuReducer from "../../reducers/menuReducer";
import { useSelector } from "react-redux";
import { fetchAvatar, getAvatar } from "../../actions/menuActions";

async function openExternalLink(url: string) {
  await Browser.open({ url: url });
}

const BASE_URL = process.env.BASE_URL;

const openLink = async (url: string) => {
  if (url.startsWith(`${BASE_URL}`) || url.startsWith(`${BASE_URL}`)) {
    await Browser.open({ url: url });
  } else {
    window.open(url, "_system");
  }
};

interface AppPage {
  url: string;
  Icon: string;
  title: string;
  onClick?: () => void;
}

const Menu: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const getMenuData = useSelector((state: any) => state.menuReducer.getAvatar);

  useEffect(() => {
    getMenuData.then((result: any) => {
      setEmail(result?.email);
      setNickname(result?.nickname);
      setAvatar(result?.avatar_urls["96"]);
    });
  }, [getAvatar]);

  let isPremium = false; // Default to false
  try {
    const roles = JSON.parse(localStorage.getItem("roles") || "{}"); // Parse the roles or default to an empty object
    isPremium = Object.values(roles).includes("premium"); // Check if 'premium' is one of the roles
  } catch (e) {
    console.error("Error parsing roles from localStorage:", e);
  }

  const handleLogout = () => {
    localStorage.clear();
    history.push("/onboarding");
  };

  const handleAccountDeletion = async () => {
    setShowDeleteConfirm(false);

    const token = localStorage.getItem("jwtToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        if (isPlatform("ios")) {
          await HTTP.post(
            `${BASE_URL}/wp-json/nalu-app/v1/account-deletion`,
            {},
            headers
          );
        } else {
          await axios.post(
            `${BASE_URL}/wp-json/nalu-app/v1/account-deletion`,
            {},
            { headers }
          );
        }
        setShowDeleteSuccess(true);
        handleLogout();
      } catch (error) {
        console.error("Error deleting account:", error);
        handleLogout();
      }
    }
  };
  const location = useLocation();

  const backHandler = () => {
    window.history.back();
  };

  const appPages: AppPage[] = [
    // {
    //   title: "Edit Profile",
    //   url: "/profile",
    //   Icon: 'assets/imgs/menu1.svg',

    // },
    // {
    //   title: "Preferences",
    //   url: "/page/Outbox",
    //   Icon: 'assets/imgs/menu2.svg',

    // },
    // {
    //   title: "Notifications",
    //   url: "/page/Favorites",
    //   Icon: 'assets/imgs/menu3.svg',

    // },
    // {
    //   title: "NALU beitreten",
    //   url: "",
    //   Icon: 'assets/imgs/menu4.svg',
    //   onClick: () => history.push("/membership"),
    // },
    {
      title: "Notfallplan",
      url: "/tabs/tab3/resourcedetail/6999",
      Icon: "assets/imgs/menu5.svg",
      // onClick: () => getResourceDetailsByID(6999),
      onClick: () => history.push("/tabs/tab3/resourcedetail/6999"),
    },
    {
      title: "Quellen",
      url: `${BASE_URL}/quellen/`,
      Icon: "assets/imgs/menu6.svg",
    },

    {
      title: "Datenschutzerklärung",
      url: `${BASE_URL}/datenschutzerklaerung/`,
      Icon: "assets/imgs/menu7.svg",
    },
    {
      title: "Impressum",
      url: `${BASE_URL}/impressum/`,
      Icon: "assets/imgs/menu8.svg",
    },
    {
      title: "support@mynalu.com",
      url: "mailto:support@mynalu.com",
      Icon: "assets/imgs/menu9.svg",
    },
    {
      title: "nalu_health",
      url: "https://www.mynalu.com/instagram",
      Icon: "assets/imgs/menu10.svg",
    },
    {
      title: "nalu.health",
      url: "https://www.mynalu.com/facebook",
      Icon: "assets/imgs/menu11.svg",
    },
  ];

  // Function to close the menu
  const closeMenu = () => {
    const menu = document.querySelector("ion-menu");
    menu?.close();
  };

  const [avatar, setAvatar] = useState(null);
  const [nickname, setNickname] = useState("");
  const [nickname_, setNickname_] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [editname, SetEditNickName] = useState(false);

  const [present] = useIonToast();

  // const getName = async () => {
  //   let URL = `${BASE_URL}/wp-json/wp/v2/users/me?_fields=nickname`;
  //   const headers = {
  //     Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //   };

  //   try {
  //     let response;
  //     if (isPlatform("ios")) {
  //       const cordovaResponse = await HTTP.get(URL, {}, headers);
  //       response = JSON.parse(cordovaResponse.data);
  //     } else {
  //       const axiosResponse = await axios.get(URL, { headers });
  //       response = axiosResponse.data;
  //     }
  //     setNickname(response.nickname);
  //   } catch (error) {
  //     console.error("Error fetching course data:", error);
  //   } finally {
  //   }
  // };

  const changeName = (event) => {
    setNickname_(event.target.value);
  };

  const edit_name = () => {
    SetEditNickName(true);
    setNickname_(nickname);
    present({
      message: `Wenn du ein NALU-Mitglied bist, wird der Name, den du hier definierst, den anderen Mitgliedern angezeigt, wenn du in Gruppenchats interagierst.`,
      color: "danger",
      duration: 5000,
      position: "top",
    });
  };

  const save_name = async () => {
    setIsLoading(true);
    let URL = `${BASE_URL}/wp-json/wp/v2/users/me?nickname=${nickname_}`;

    try {
      let response: any;
      if (isPlatform("ios")) {
        const cordovaResponse = await apiService.put(URL, {});
        response = JSON.parse(cordovaResponse.data);
      } else {
        const axiosResponse = await apiService.put(URL, {});
        response = axiosResponse.data;
      }

      setNickname(nickname_);
      SetEditNickName(false);
      present({
        message: `Name erfolgreich aktualisiert!`,
        color: "success",
        duration: 2000,
        position: "top",
      });
      setIsLoading(false);
    } catch (error) {
      present({
        message: `Ein Fehler ist aufgetreten ${error}. Bitte wende dich an support@mynalu.com.`,
        color: "danger",
        duration: 2000,
        position: "top",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // const getAvatar = async () => {
  //   const userId = localStorage.getItem("userId");

  //   let URL = `${BASE_URL}/wp-json/wp/v2/users/${userId}`;
  //   const headers = {
  //     Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //   };

  //   try {
  //     let response: any;
  //     if (isPlatform("ios")) {
  //       const cordovaResponse = await HTTP.get(URL, {}, headers);
  //       response = JSON.parse(cordovaResponse.data);
  //     } else {
  //       const axiosResponse = await axios.get(URL, { headers });
  //       response = axiosResponse.data;
  //     }
  //     setAvatar(response.avatar_urls["96"]);
  //   } catch (error) {
  //     console.error("Error fetching course data:", error);
  //   } finally {
  //   }
  // };

  const edit_avatar = () => {
    present({
      message: `Wenn du NALU-Mitglied bist, wird dein Profilbild anderen Mitgliedern angezeigt, wenn du in Gruppenchats interagierst.`,
      color: "secondary",
      duration: 3000,
      position: "top",
    });
    document.getElementById("avatar").click();
  };

  const uploadAvatar = async (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        present({
          message: `Fehler: Die Dateigrösse muss weniger als 10MB betragen.`,
          color: "danger",
          duration: 2000,
          position: "top",
        });
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        present({
          message: `Fehler: Es sind nur JPG-, JPEG-, PNG- oder WebP-Dateien zulässig.`,
          color: "danger",
          duration: 2000,
          position: "top",
        });
        return;
      }

      setIsLoading(true);
      try {
        const uploadURL = `${BASE_URL}/wp-json/wp/v2/media`;
        const reader = new FormData();

        reader.append("Content-Type", "image/*");
        reader.append(
          "content-disposition",
          `attachment; filename=${file.name}`
        );
        reader.append("file", file);
        reader.append("Content-Type", "image/*");

        try {
          const uploadResponse = await apiService.post(uploadURL, reader);
          const mediaId = uploadResponse.id;

          const updateAvatarURL = `${BASE_URL}/wp-json/wp/v2/users/${uploadResponse.author}`;
          const updateAvatarData = {
            simple_local_avatar: {
              media_id: mediaId,
            },
          };

          const jwtToken = localStorage.getItem("jwtToken");

          if (isPlatform("ios")) {
            const customCordovaHeaders = {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
              // Cookie:
              //   "woocommerce_multicurrency_forced_currency=INR; woocommerce_multicurrency_language=en",
            };
            const updateAvatarResponse = await apiService.postUrl(
              updateAvatarURL,
              updateAvatarData,
              customCordovaHeaders
            );
            // setAvatar(updateAvatarResponse.link);
          } else {
            const customAxiosHeaders: any = {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
                Cookie:
                  "woocommerce_multicurrency_forced_currency=INR; woocommerce_multicurrency_language=en",
              },
            };

            const updateAvatarResponse = await apiService.postUrl(
              updateAvatarURL,
              updateAvatarData,
              customAxiosHeaders
            );
            setAvatar(updateAvatarResponse.avatar_urls["96"]);
          }

          const mediaURL = uploadResponse.guid.rendered;

          present({
            message: `Profilbild erfolgreich aktualisiert!`,
            color: "success",
            duration: 2000,
            position: "top",
          });

          setIsLoading(false);
        } catch (error) {
          console.error("Error updating user avatar:", error);
          present({
            message: `Fehler: Das Profilbild konnte nicht aktualisiert werden. Bitte wende dich an support@mynalu.com.`,
            color: "danger",
            duration: 2000,
            position: "top",
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error reading file:", error);
        setIsLoading(false);
      }
    }
  };

  // const getEmail = async () => {
  //   let URL = `${BASE_URL}/wp-json/wp/v2/users/me?_fields=email`;
  //   const headers = {
  //     Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //   };

  //   try {
  //     let response;
  //     if (isPlatform("ios")) {
  //       const cordovaResponse = await HTTP.get(URL, {}, headers);
  //       response = JSON.parse(cordovaResponse.data);
  //     } else {
  //       const axiosResponse = await axios.get(URL, { headers });
  //       response = axiosResponse.data;
  //     }

  //     setEmail(response.email);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching course data:", error);
  //     setIsLoading(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <IonPage className="Menu">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="dark" onClick={backHandler}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Menü</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className={`slide-menu ${isPlatform("ios") ? "safe-padding" : ""}`}
      >
        {/* {isLoading ? (
          <div className="skeleton">
            <div className="profileDiv"></div>
            <div className="div1"></div>
            <div className="div2"></div>
          </div>
        ) : ( */}
        <div className="profile-holder ion-text-center">
          {isPremium ? (
            <>
              <IonAvatar>
                {avatar ? (
                  <img src={avatar} alt="" />
                ) : (
                  <img src="/assets/imgs/avatar.png" alt="" />
                )}
              </IonAvatar>
              <div className="btnn ion-activatable ripple-parent flex al-center jc-center">
                <IonRippleEffect />
                <IonIcon icon={camera} onClick={edit_avatar} />
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  id="avatar"
                  onChange={uploadAvatar}
                  hidden
                />
              </div>
              {editname ? (
                <div className="nick_name_field">
                  <input
                    className="w-70 ion-text-center bg-transparent border-05"
                    type="text"
                    value={nickname_}
                    onChange={changeName}
                  />
                  <div className="w-30">
                    <button
                      type="button"
                      className="bg-transparent text-black text-20px mr-2"
                      onClick={save_name}
                    >
                      <IonIcon icon={checkmark} />
                    </button>

                    <button
                      type="button"
                      className="bg-transparent text-black text-20px"
                      onClick={() => SetEditNickName(false)}
                    >
                      <IonIcon icon={close} />
                    </button>
                  </div>
                </div>
              ) : (
                <h1 className="menu-name">
                  {nickname ? <>{nickname}</> : <>User Nickname</>}
                  <IonIcon
                    icon={pencil}
                    className="edit_icon"
                    onClick={edit_name}
                  />
                </h1>
              )}
            </>
          ) : (
            <></>
          )}
          <h6 className="menu-email">
            {email ? <>{email}</> : <>User Email</>}
          </h6>
        </div>
        {/* )} */}

        {!isPremium && (
          <IonMenuToggle autoHide={false} className="join-nalu">
            <IonItem button onClick={() => history.push("/membership")}>
              <IonIcon
                aria-hidden="true"
                slot="start"
                src="assets/imgs/menu4.svg"
              />
              <IonLabel>NALU beitreten</IonLabel>
            </IonItem>
          </IonMenuToggle>
        )}
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  onClick={() => {
                    if (appPage.onClick) {
                      appPage.onClick();
                    } else {
                      openLink(appPage.url);
                    }
                  }}
                  routerLink={
                    !appPage.url.startsWith("https://")
                      ? appPage.url
                      : undefined
                  }
                  routerDirection="none"
                  lines="none"
                  detail={true}
                >
                  <IonIcon aria-hidden="true" slot="start" src={appPage.Icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        {isPlatform("ios") && (
          <IonMenuToggle autoHide={false} className="delete-account">
            <IonItem button onClick={() => setShowDeleteConfirm(true)}>
              <IonIcon aria-hidden="true" slot="start" src={trashBinOutline} />
              <IonLabel>NALU Konto löschen</IonLabel>
            </IonItem>
          </IonMenuToggle>
        )}

        <div className="btnnn-holder ion-text-center ion-padding-top">
          <IonButton onClick={handleLogout}>
            <IonIcon src={logOutOutline} slot="start" />
            Abmelden
          </IonButton>
        </div>
        <IonAlert
          isOpen={showDeleteConfirm}
          onDidDismiss={() => setShowDeleteConfirm(false)}
          header={"Konto löschen"}
          message={
            "Bist du dir sicher, dass du dein Konto löschen willst? Alle deine Daten werden dauerhaft gelöscht und können nicht wiederhergestellt werden."
          }
          buttons={[
            {
              text: "Nein",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "Ja, löschen",
              handler: handleAccountDeletion,
            },
          ]}
        />
        <IonAlert
          isOpen={showDeleteSuccess}
          onDidDismiss={() => history.push("/onboarding")}
          header={"Kontolöschung eingeleitet"}
          message={
            "Der Kontolöschungsprozess wurde erfolgreich eingeleitet und wird in den nächsten 2 Wochen abgeschlossen."
          }
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Menu;
