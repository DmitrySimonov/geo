import React from 'react';
import Title from 'konux/common/components/Title';
import Label from 'konux/common/components/Label';
import TableContainer from './../../partials/tables/TableContainer';

class TableWithTitle extends React.Component {
    render() {
        return(
            <div className="block table-block">
                <Title>
                    <Label className="lbl-4 uppercase">{this.props.title.toUpperCase()}:</Label>
                </Title>
                <TableContainer
                    rows={this.props.rows}
                    headers={this.props.rows}
                    rowTransform={this.props.rowTransform}
                    headerTransform={this.props.headerTransform} />
            </div>
        );
    }
}

export default TableWithTitle;
