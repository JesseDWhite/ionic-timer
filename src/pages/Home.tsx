import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import StopWatch from '../components/StopWatch';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <StopWatch />
      </IonContent>
    </IonPage>
  );
};

export default Home;
