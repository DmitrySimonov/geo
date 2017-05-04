import React from 'react';
import {connect} from 'react-redux';

import TableWithTitle from './TableWithTitle';

class TableWithTitleContainer extends React.Component {
    render() {
        return (
            <TableWithTitle
                title={this.props.title}
                headers={this.props.headers}
                rows={this.props.rows}
                rowTransform={this.props.rowTransform}
                headerTransform={this.props.headerTransform}
            />
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        title: props.title? props.title: '',
        headers: props.headers ? props.headers : [],
        rows: props.rows ? props.rows : [[]],
        rowTransform: props.rowTransform ? props.rowTransform : null,
        headerTransform: props.headerTransform ? props.headerTransform : null,
    };
};

export default connect(stateMap, null)(TableWithTitleContainer);