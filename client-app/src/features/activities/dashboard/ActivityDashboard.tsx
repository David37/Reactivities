import { observer } from 'mobx-react-lite'
import { Grid} from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'
import ActivityDetails from '../Details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props{
    activities:Activity[];
}
const ActivityDashboard = ({activities}:Props) => {
    const {activityStore} = useStore();
    const {selectedActivity, editMode}= activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width ='6'>
                {selectedActivity && !editMode && 
                <ActivityDetails />}
                {editMode &&
                <ActivityForm/>}
                
            </Grid.Column>
            
        </Grid>
    )
}

export default observer(ActivityDashboard)
