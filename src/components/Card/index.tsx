import React from 'react';

import "./index.scss";

export const Card = ({children, className, ...props}: any) => {

    return(
        <div className={'card ' + className } {...props} >
            {children}
        </div>
    );
}