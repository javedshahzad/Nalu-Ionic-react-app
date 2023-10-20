// import {
//   IonAvatar,
//   IonBackButton,
//   IonButton,
//   IonButtons,
//   IonCol,
//   IonContent,
//   IonFooter,
//   IonHeader,
//   IonIcon,
//   IonInput,
//   IonItem,
//   IonLabel,
//   IonPage,
//   IonRow,
//   IonTitle,
//   IonToolbar,
// } from "@ionic/react";
// import { notificationsOutline } from "ionicons/icons";
// import NotificationBell from "../../components/NotificationBell";

// import "./Chat.scss";

// const Chat: React.FC = () => {
//   return (
//     <IonPage className="Chat">
//       <IonHeader className="ion-no-border">
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonBackButton color="dark" text={""} defaultHref="/tabs/tab3" />
//           </IonButtons>
//           <IonButtons slot="start">
//             <IonAvatar className="flex al-center jc-center" slot="start">
//               <h3>A</h3>
//             </IonAvatar>
//           </IonButtons>
//           <IonTitle className="flex al-center jc-center">
//             Nalu Endo Flow - English
//           </IonTitle>
//           <IonButtons slot="end">
//             <IonButton slot="end" fill="clear">
//               <NotificationBell />
//             </IonButton>
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent className="ion-padding-horizontal" fullscreen>
//         <div className="chat-area">
//           <div className="reciver">
//             <IonRow>
//               <IonCol size="2">
//                 <IonAvatar>
//                   <img src="assets/imgs/user.png" alt="" />
//                 </IonAvatar>
//               </IonCol>
//               <IonCol size="8" className="ion-text-left" offset=".5">
//                 <div className="chat-bubble">
//                   <h3 className="ion-text-wrap">Angelina Jolie</h3>
//                   <p className="ion-text-wrap">
//                     Ipsum reprehenderit ea nulla velit dolore laborum in id sint
//                     tempor et magna tempor vaniam.
//                   </p>
//                 </div>
//               </IonCol>
//             </IonRow>
//             <div className="time-stamp">
//               <h6></h6>
//             </div>
//           </div>
//           <div className="reciver">
//             <IonRow>
//               <IonCol size="2"></IonCol>
//               <IonCol size="8" className="ion-text-left" offset=".5">
//                 <div className="chat-bubble">
//                   <p className="ion-text-wrap">Cupidatat exercitation</p>
//                 </div>
//               </IonCol>
//             </IonRow>

//             <div className="time-stamp ion-text-right">
//               <h6>2 min ago</h6>
//             </div>
//           </div>
//           <div className="sender">
//             <IonRow className="ion-justify-content-end">
//               <IonCol size="8" className="ion-text-left">
//                 <div className="chat-bubble">
//                   <p className="ion-text-wrap">
//                     Ipsum reprehenderit ea nulla velit dolore laborum in id sint
//                     tempor et magna tempor vaniam.
//                   </p>
//                 </div>
//               </IonCol>
//             </IonRow>
//             <div className="time-stamp">
//               <h6></h6>
//             </div>
//           </div>
//           <div className="sender">
//             <IonRow className="ion-justify-content-end">
//               <IonCol size="8" className="ion-text-left" offset=".5">
//                 <div className="chat-bubble">
//                   <p className="ion-text-wrap">Exercitation ea id</p>
//                 </div>
//               </IonCol>
//             </IonRow>

//             <div className="time-stamp ion-text-right">
//               <h6>just now</h6>
//             </div>
//           </div>
//         </div>
//       </IonContent>
//       <IonFooter className="ion-no-border">
//         <IonToolbar>
//           <IonItem lines="none">
//             <IonInput placeholder="Type Massage" />
//             <IonButton fill="clear" className="emoji" slot="end">
//               <IonIcon slot="icon-only" src="assets/imgs/icnsmile.svg" />
//             </IonButton>
//             <IonButton fill="clear" className="emoji" slot="end">
//               <IonIcon slot="icon-only" src="assets/imgs/icnattachment.svg" />
//             </IonButton>
//           </IonItem>
//         </IonToolbar>
//       </IonFooter>
//     </IonPage>
//   );
// };

// export default Chat;
