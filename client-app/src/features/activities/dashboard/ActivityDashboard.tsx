import { Grid} from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityDetails from '../Details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props{
    activities:Activity[];
    selectedActivity:Activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    handleActivitySubmission: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}
const ActivityDashboard = ({activities, selectedActivity, selectActivity, cancelActivity, editMode, openForm, closeForm, handleActivitySubmission, deleteActivity, submitting}:Props) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                selectActivity={selectActivity} 
                deleteActivity={deleteActivity} 
                submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width ='6'>
                {selectedActivity && !editMode && 
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelActivity={cancelActivity} 
                    openForm={openForm}/>
                }
                {editMode &&<ActivityForm 
                closeForm={closeForm} 
                activity={selectedActivity} 
                handleActivitySubmission={handleActivitySubmission}
                submitting={submitting}/>}
                
            </Grid.Column>
            
        </Grid>
    )
}

export default ActivityDashboard
