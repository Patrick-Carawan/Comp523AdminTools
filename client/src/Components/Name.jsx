import React from 'react';

function Name(props) {
    //this function gets the info for the student whose name is being dragged
    const dragStart = e => {
        const target = e.target;
        let data = {
            id: target.id,
            onyen: props.onyen,
            teamId: props.teamId,
            studentIndex: props.studentIndex
        };
        data = JSON.stringify(data);
        e.dataTransfer.setData('data', data);
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
