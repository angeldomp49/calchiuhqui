import React from 'react';

import './index.scss';

export const Grid = ({ children, cols=3, gap=1 }: any) => {

    return(
        <div className='grid_wrapper' style={{
            gap: gap + "rem",
            gridTemplateColumns: "repeat(" + cols + ", 1fr)"
        }}>
            {children}
        </div>
    );
};