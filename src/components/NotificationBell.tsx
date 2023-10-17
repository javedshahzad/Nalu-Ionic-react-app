import { useRef, useState, useEffect } from "react";
import {
  createAnimation,
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonImg,
  IonIcon,
} from "@ionic/react";
import {
  notificationsOutline,
  closeOutline,
  checkmarkDoneOutline,
} from "ionicons/icons";
import { useSelector } from "react-redux";
import "./NotificationBell.scss";
import { RootState } from "../store/store";

function NotificationBell() {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector("ion-backdrop")!)
      .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector(".modal-wrapper")!)
      .keyframes([
        { offset: 0, opacity: "0", transform: "translateX(100%)" },
        { offset: 1, opacity: "0.99", transform: "translateX(0)" },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing("ease-out")
      .duration(300)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction("reverse");
  };

  const notificationsArr = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const [notificationArray, setNotificationArray] = useState([]);

  useEffect(() => {
    const sortedNotifications = notificationArray
      .slice()
      .sort((a: any, b: any) => b.timestamp - a.timestamp);
    setNotificationArray(sortedNotifications);
  }, []);

  const markRead = (isActive: any) => {
    const updatedNotifications = notificationsArr.map(
      (notif: any, index: any) => {
        if (notif.id === isActive.id) {
          notif.isActive = false;
        }
        return notif;
      }
    );

    setNotificationArray(updatedNotifications);
  };

  useEffect(() => {
    setNotificationArray(notificationsArr);
  }, [notificationsArr]);

  return (
    <>
      <IonButton fill="clear" color="dark" id="open-modal">
        <IonIcon icon={notificationsOutline} />
        {notificationsArr.some(
          (notification: any) => notification.isActive
        ) && (
          <span className="notification-number">
            {
              notificationsArr.filter(
                (notification: any) => notification.isActive
              ).length
            }
          </span>
        )}
      </IonButton>

      <IonModal
        id="notification-model"
        ref={modal}
        trigger="open-modal"
        enterAnimation={enterAnimation}
        leaveAnimation={leaveAnimation}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Notifications</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => dismiss()} color="dark">
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonList>
            {notificationArray.map((notification: any, index: any) => (
              <IonItem
                key={index}
                className={notification.isActive ? "unread" : "read"}
              >
                <IonAvatar slot="start">
                  <IonImg src="https://i.pravatar.cc/300?u=b" />
                </IonAvatar>
                <IonButton
                  color="dark"
                  onClick={() => markRead(notification)}
                  slot="end"
                  fill="clear"
                >
                  <IonIcon icon={checkmarkDoneOutline} />
                </IonButton>
                <IonLabel>{notification.title}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
}

export default NotificationBell;
