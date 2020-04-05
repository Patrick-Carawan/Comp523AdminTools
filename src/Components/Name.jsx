import React from 'react';

function Name(props) {
    const dragStart = e => {
        const target = e.target;
        let data = {
            id: target.id,
            onyen: props.onyen
        };
        data = JSON.stringify(data);
        e.dataTransfer.setData('data', data);
        // e.dataTransfer.setData('name_id', target.id);
    };

    const dragOver = e => {
        e.stopPropagation();
    };

    return (
        <div id={props.id}
             className={props.className}
             draggable={props.draggable}
             onDragStart={dragStart}
             onDragOver={dragOver}>
            {props.children}
        </div>
    );
}

export default Name;
