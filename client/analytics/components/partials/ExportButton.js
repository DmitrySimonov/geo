import React from 'react';
import Button from 'konux/common/components/Button';
import Image from 'konux/common/components/Image';

class ExportButton extends React.Component{
    render(){
        return(
            <Button className="export">
                <Image src="assets/img/export.svg" />
                <span>EXPORT</span>
            </Button>
        );
    }
}

export default ExportButton;