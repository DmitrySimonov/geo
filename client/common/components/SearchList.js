import React from 'react';

import SearchItem from  './SearchItem';

const SearchList = (props) =>{
    return(
        <div>
            { 
                props.list ? props.list.map((item, i) => 
                        <SearchItem key={i} item={item}  switchClick={props.switchClick}
                                                         routeClick={props.routeClick}
                                                         regionClick={props.regionClick}
                                                         onClear={props.onClear}
                                                         hideSearch={props.hideSearch}/>
                )
                : null
            }
        </div>
    );
};

export default SearchList;