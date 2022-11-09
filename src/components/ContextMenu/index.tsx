import React, {useContext, useRef, useState} from 'react';
import { Card } from '../Card';

import './index.scss';

export const ContextMenuParentListener = ({children, createMenu= () => {}}: any) => {

    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
    const elementListener = useRef(document.createElement("div"));
    const [contextMenuElement, setContextMenuElement] = useState(<div></div>);

    const handleContextMenu = (e: any, bagInfo: any) => {
        e.preventDefault();
        setIsContextMenuOpen(false);
        setIsContextMenuOpen(true);
        setContextMenuPosition({
            x: e.clientX,
            y: e.clientY
        });

        const menu = createMenu(bagInfo);
        setContextMenuElement(menu);
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        setIsContextMenuOpen(false);
        setContextMenuElement(<div></div>);
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
                    {contextMenuElement}
                </ContextMenuContainer>}
            </div>
        </ContextMenuContext.Provider>
    );
};

export const ContextMenuChildListener = ({children, bagInfo={}}: any) => {

    const handleContextMenu = useContext(ContextMenuContext);

    return(
        <div 
            className='context-child-listener' 
            onContextMenu={ (e: any) => handleContextMenu(e, bagInfo) }
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

export const ContextMenuContext = React.createContext( (e: any, bagInfo: any) => {});