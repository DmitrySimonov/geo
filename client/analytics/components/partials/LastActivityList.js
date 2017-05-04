import React from 'react';

import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Label from 'konux/common/components/Label';
import FormWrap from 'konux/common/components/FormWrap';
import Image from 'konux/common/components/Image';
import { translate } from 'react-i18next';

const data=[{
        activityMessage: "Broken details has been fixed five days ago",
        date: " Jul 1, at 2:54pm"
    },
    {
        activityMessage: "Broken details has been fixed five days ago",
        date: " Jul 1, at 2:54pm"
    },
    {
        activityMessage: "Broken details has been fixed five days ago",
        date: " Jul 1, at 2:54pm"
    }
];

class SideBarLastActivityList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: data
        };
    }
    render(){
        let {t} = this.props;
        return(
            <FormWrap className="activity-list">
                <Label className="lbl-17">{t('last activity')}</Label>
                <ListGroup>
                    {this.state.data.map((data, index) => <ListGroupItem key={index}>
                            <Label className="lbl-8">{data.activityMessage}</Label>
                            <Label className="lbl-15" pullLeft>{data.date}</Label>
                        </ListGroupItem>)}
                </ListGroup>
            </FormWrap>
        );
    }
}

export default translate(['common'])(SideBarLastActivityList);