import React from "react";

class AlertRowsButton extends React.Component {
    render() {
        return (
            <div >
                <button className="btn-default btn-8"><Image src="assets/img/chart.svg" /></button> 
                <button className="btn-default btn-8"><Image src="assets/img/mail.svg" /></button>
            </div>
        );
    }
}

export default AlertRowsButton;