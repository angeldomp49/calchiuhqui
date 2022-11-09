import React, {useContext, useRef, useState} from 'react';
import { Card } from '../Card';
import { ContextMenuContext } from './global';

import './index.scss';

export const ContextMenuParentListener = ({children, contextMenu}: any) => {

    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
    const elementListener = useRef(document.createElement("div"));
    

    const handleContextMenu = (e: any) => {
        e.preventDefault();
        setIsContextMenuOpen(false);
        setIsContextMenuOpen(true);
        setContextMenuPosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        setIsContextMenuOpen(false);
    };

    return(
        <ContextMenuContext.Provider value={handleContextMenu} >
            <div className='context-menu-listener' 
                onClick={handleClick}
                onContextMenu={ (e: any) => { e.preventDefault(); }}
                ref={elementListener}
            >
                {children}
                
                {isContextMenuOpen &&
                <ContextMenuContainer
                    position={contextMenuPosition}
                    elementListener={elementListener.current}
                    handleContextMenu={handleContextMenu}
                >
                    {contextMenu}
                </ContextMenuContainer>}
            </div>
        </ContextMenuContext.Provider>
    );
};

export const ContextMenuChildListener = ({children}: any) => {

    const handleContextMenu = useContext(ContextMenuContext);

    return(
        <div 
            className='context-child-listener' 
            onContextMenu={handleContextMenu}
        >
            {children}
        </div>
    );
};
const ContextMenuContainer = ({children, position, elementListener, handleContextMenu}: any) => {

    const relativePosition = calcRelativePosition(position, elementListener);

    return(
        <div  
            className='context-menu-container'
            onClick={ e => {e.stopPropagation()} }
            style={{
                left: relativePosition.x + 'px',
                top: relativePosition.y + 'px'
            }} 
        >
            <Card className="context-menu-card" >
                {children}
            </Card>
        </div>
    );
};

const calcRelativePosition = (position: Position, parentElement: HTMLElement): Position => {
    let rectangle = parentElement.getBoundingClientRect();
    let relativeX = position.x - rectangle.left;
    let relativeY = position.y - rectangle.top;

    return {
        x: relativeX,
        y: relativeY
    }
};

export type Position = {
    x: number;
    y: number;
};