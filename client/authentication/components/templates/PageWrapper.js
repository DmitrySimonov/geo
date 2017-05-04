import React from 'react';

import FooterHelper from '../../utils/FooterHelper';

import Logo from 'konux/common/components/Logo';
import Image from 'konux/common/components/Image';
import Label from 'konux/common/components/Label';
import FormWrap from 'konux/common/components/FormWrap';
import FormGroup from 'konux/common/components/FormGroup';
import BlockWrapper from 'konux/common/components/BlockWrapper';
import ComponentWrapper from 'konux/common/components/ComponentWrapper';

class PageWrapper extends React.Component {
    renderFooter(footer) {
        return FooterHelper.getFooter(footer);
    }

    render() {
        return(
            <ComponentWrapper>
                <BlockWrapper>
                    <FormWrap>
                        <Logo>
                            <Image src="assets/img/logo.svg" alt="logo"/>
                        </Logo>
                        <FormGroup center>
                            <Label center className="lbl-1">{this.props.title}</Label>
                        </FormGroup>
                        {
                            (this.props.description) ?
                            <FormGroup center>
                                <Label center className="lbl-3">{this.props.description}</Label>
                            </FormGroup>:
                            null
                        }

                        {this.props.children}

                        {this.renderFooter(this.props.pageName)}
                    </FormWrap>
                </BlockWrapper>
            </ComponentWrapper>
        );
    };
}

export default PageWrapper;

