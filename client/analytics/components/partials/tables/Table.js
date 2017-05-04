import React from 'react';
import { Table } from 'react-bootstrap';
import SortButton from '../../../../common/components/SortButton';

class TableWrapper extends React.Component {
    render() {
        return (
            <Table responsive className={this.props.className}>
                <thead>
                    <tr key={1}>
                        {
                            this.props.headers.map((header, i) => (
                                <th key={"table-wrapper-h" + i}>
                                    {/*onClick={() => this.props.onClick(item)}>*/}
                                    <span>{header} <SortButton className={this.props.sortClassName ? this.props.sortClassName : '' } /></span>
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.rows.map((item, i) => (
                        <tr key={"table-wrapper-r" + i}>
                            {
                                Object.keys(item).map((key, j) => (
                                    <td key={"table-wrapper-d" + j}>{item[key]}</td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        );
    }
}

export default TableWrapper;