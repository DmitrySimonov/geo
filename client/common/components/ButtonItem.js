import React from 'react';

const ButtonItem = (props) => {
	return(
		<div className="filter-button-item">{props.children}</div>
    );
};

export default ButtonItem;