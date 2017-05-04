import React from 'react';

import moment from 'moment';

import TableWithTitleContainer from '../../../partials/tables/TableWithTitleContainer';
import { translate } from 'react-i18next';

class LastMeasurementsTable extends React.Component {
    headerTransform(rows) {
        let result = {};
        if (Array.isArray(rows) && rows.length > 0) {
            Object.keys(rows[0]).map((key) => {
                switch (key) {
                    case 'timestamp':
                    case 'axles':
                    case 'wshMax':
                    case 'wshStd':
                    case 'rms':
                    case 'speed':
                        result[key] = key.toUpperCase();
                        break;
                    case 'sensor_name':
                        result[key] = 'Sensor Name'.toUpperCase();
                        break;
                }
            });
        }
        return result;
    }

    rowTransform(rows) {
        let result = [];
        rows.map((row) => {
            let rowTransformation = [];
            Object.keys(row).map((key) => {
                switch (key) {
                    case 'timestamp':
                        rowTransformation[key] = moment(row[key]).format('d MMM YYYY h:mm');
                        break;
                    case 'sensor_name':
                    case 'axles':
                        rowTransformation[key] = row[key];
                        break;
                    case 'wshMax':
                    case 'wshStd':
                    case 'rms':
                        rowTransformation[key] = row[key].toFixed(2);
                        break;
                    case 'speed':
                        rowTransformation[key] = row[key].toFixed(2) + ' Km/h';
                        break;
                }
            });
            result.push(rowTransformation);
        });
        return result;
    }

    render() {
        let {t} = this.props;
        return (
            <TableWithTitleContainer
                title={t('last measurements')}
                rows={this.props.rows}
                rowTransform={this.rowTransform}
                headerTransform={this.headerTransform} />
        );

    }
}

export default translate(['common'])(LastMeasurementsTable);