import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';


const NavBar = () => {
    const {activityStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'12px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activites'/>
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar
