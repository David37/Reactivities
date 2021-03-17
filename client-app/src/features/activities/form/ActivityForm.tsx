import { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props{
    closeForm: () => void;
    activity:Activity | undefined;
    handleActivitySubmission: (activity: Activity) => void;
    submitting: boolean;
}
const ActivityForm = ({closeForm, activity: selectedActivity, handleActivitySubmission, submitting}:Props) => {
    
    const InitialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity]= useState(InitialState);

    function handleSubmit(){
        handleActivitySubmission(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value}= event.target;
        setActivity({...activity,[name]:value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder= 'title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder= 'description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder= 'category' value={activity.category} name= 'category' onChange={handleInputChange}/>
                <Form.Input type= 'date' placeholder= 'date' value={activity.date} name= 'date' onChange={handleInputChange}/>
                <Form.Input placeholder= 'city' value={activity.city} name= 'city' onChange={handleInputChange}/>
                <Form.Input placeholder= 'venue' value={activity.venue} name= 'venue' onChange={handleInputChange}/>
                <Button loading= {submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated= 'right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}

export default ActivityForm
