import React, { Component } from 'react';
import PreloaderButton from 'konux/common/components/PreloaderButton';
import { StatusType } from './../../../constants';
import ComponentWrapper from 'konux/common/components/ComponentWrapper';
import Image from 'konux/common/components/Image';
import { browserHistory } from 'react-router';

class MissingPage extends Component {
    onClick(){
        browserHistory.push('overview');
    }
    render() {
        return (
            <ComponentWrapper className="missing-page">
                <section>
                    <Image src="./assets/img/missing-page.svg"/>
                    <span>
                        Ooops! The page you were looking for doesn’t exist
                    </span>
                    <PreloaderButton onClick={this.onClick}>Back to overview</PreloaderButton>
                </section>
                <footer>
                    <span>Copytight ©Konux 2016</span>
                </footer>
            </ComponentWrapper>
        );
    }
}

export default MissingPage;