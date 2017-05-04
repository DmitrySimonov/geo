import React from 'react';
import {connect} from 'react-redux';

import Table from './Table';

import _ from 'lodash';

class TableContainer extends React.Component {
    /**
     * This checks if we have to apply any transformations
     * on the rows that we have passed into the component
     *
     * @param rows
     * @returns {*}
     */
    rowTransform(rows) {
        //-- initialize the result as the rows passed in
        let result = rows;
        //-- check if the property is defined and is a function
        if (typeof this.props.rowTransform !== 'undefined' && _.isFunction(this.props.rowTransform)) {
            //-- apply the function to the rows
            result = this.props.rowTransform(rows);
        }

        //-- return the result
        return result;
    }
    /**
     * This checks if we have to apply any transformations
     * on the headers that we are going to display in the table based on the row names
     *
     * @param rows
     * @returns {*}
     */
    headerTransform(rows) {
        //-- initialize the result as the rows passed in
        let result = rows;
        //-- check if the property is defined and is a function
        if (typeof this.props.headerTransform !== 'undefined' && _.isFunction(this.props.headerTransform)) {
            //-- apply the function to the rows
            result = this.props.headerTransform(rows);
        }

        //-- return the result
        return result;
    }

    /**
     * Get the table header based on the fact that we have to deal with an object or an array
     * @param headers
     * @returns {Array}
     */
    getTableHeaders(headers) {
        return (Array.isArray(headers)) ? headers : Object.values(headers);
    }

    render() {
        return (
            <Table
                className={this.props.className}
                rows={this.rowTransform(this.props.rows)}
                headers={this.getTableHeaders(this.headerTransform(this.props.headers))}
            />
        );
    }
}
const stateMap = (state, props, ownProps) => {
    return {
        className: props.className ? props.className : '',
        headers: props.headers ? props.headers : [],
        rows: props.rows ? props.rows : [[]],
    };
};

export default connect(stateMap, null)(TableContainer);