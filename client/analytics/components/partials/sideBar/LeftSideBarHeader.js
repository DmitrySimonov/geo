import React from 'react';
import BlockWrapper from 'konux/common/components/BlockWrapper';
import SideBarHeader from 'konux/common/components/sideBar/SideBarHeader';
import Label from 'konux/common/components/Label';
import SwitchConter from './SwitchConter';
import ResetFilterButton from './../ResetFilterButton';
import SearchField from './SearchField';
import { translate } from 'react-i18next';

class SideBarPullLeft extends React.Component {
    render(){
        let {t} = this.props;
        return(
            <SideBarHeader>
                    <div>
                        <Label className="lbl-18">{t('filters')}</Label>
                            <div className="inner-wrap">
                                <SwitchConter />
                                <ResetFilterButton />
                            </div>
                        <SearchField />
                    </div>
            </SideBarHeader>
        );
    }
}

export default translate(['common'])(SideBarPullLeft);
