import {useEffect, useState} from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, SetActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity]= useState<Activity | undefined>(undefined);
  const [editMode, setEditMode]= useState(false);

  useEffect(()=> {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      SetActivities(response.data);
    })
  },[])

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleActivitySubmission(activity:Activity){
    activity.id 
    ? SetActivities([...activities.filter(x => x.id !== activity.id)])
    : SetActivities([...activities,{...activity,id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    SetActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity} 
          selectActivity={handleSelectActivity} 
          cancelActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          handleActivitySubmission={handleActivitySubmission}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
