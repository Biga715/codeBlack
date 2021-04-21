import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Discussion from './Discussion';
import Home from './Home';
import Profile from './Profile';
import Resources from './Resources';
import EditProfile from './EditProfile';

import AuthApi from './AuthApi';

function Routes(props) {
    console.log(props.socket);
    return(
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/discussion" component={Discussion}></Route>
            <RouteRegistration path="/signUp" component={SignUp}></RouteRegistration>
            <RouteRegistration path="/logIn" component={() => <LogIn socket={props.socket} />}></RouteRegistration>
            <RouteProtected path="/profile" component={Profile}></RouteProtected>
            <Route path="/resources" component ={Resources}></Route>
            <RouteProtected path="/editProfile" component={EditProfile}></RouteProtected>
        </Switch>
    );
}

const RouteRegistration = ({ component:Component, ...rest }) =>{
    const authApi = React.useContext(AuthApi);
    return(<Route {...rest} render={props => !authApi.auth ? <Component {...props} /> : <Redirect to="/profile"/> } />
    );
};

const RouteProtected = ({ component:Component, ...rest }) =>{
    const authApi = React.useContext(AuthApi);
    return(<Route {...rest} render={props => authApi.auth ? <Component {...props} /> : <Redirect to="/logIn" />} />
    );
};

export default Routes;