import React from 'react';
// import AuthNotification from '../partials/AuthNotification';

class AuthWrapper extends React.Component {
    render() {
        return(
            <div>
                {/*<AuthNotification />*/}
                {this.props.children}
            </div>
        );
    };
}

export default AuthWrapper;

