import React from 'react';
import Button from './Button';
import ButtonItem from './ButtonItem';

const ButtonList = (props) => {
    return(
        <div>
            {
                props.list ? props.list.map((data, i)=> 
                                <ButtonItem key={i} {...data}>
                                    <Button onClick={() => props.onApply([data])} className="btn-7">
                                        {data.name}
                                    </Button>
                                </ButtonItem>
                            ) : null
            }
            {props.children}
        </div>
    );
};

export default ButtonList;