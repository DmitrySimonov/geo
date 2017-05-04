import React from 'react';
import Buttons from './Buttons';
import TextSection from './Text';
import FormSection from './forms';
import CheckBoxSection from './checkbox';
import SwitchTile from './../../../analytics/components/partials/SwitchTile.js';
import FormGroup from './../FormGroup';

class ComponentsApp extends React.Component {
    render() {
        return(
            <div className="guide-container-fluid">
                <div className="guide-container">
                    <TextSection/>
                    <Buttons/>
                    <CheckBoxSection/>
                    <FormSection/>
                    <FormGroup>
                        <SwitchTile className="guide-tile"/>
                    </FormGroup >
                </div>
            </div>
        );
    };
}

export default ComponentsApp;