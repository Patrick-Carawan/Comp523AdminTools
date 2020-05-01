import React from 'react';

function TeamBox(props) {
    //handles behvaior when dragging name into team box
    const drop = e => {
        e.preventDefault();
        let data = e.dataTransfer.getData('data');
        data = JSON.parse(data);
        const onyen = data['onyen'];
        const oldBoxId = data['teamId'];
        const newBoxId = props.id;
        const studentIndex = data['studentIndex'];
        props.setTeam(oldBoxId, newBoxId, onyen, studentIndex);
    };

    const dragOver = e => {
        e.preventDefault();
    };
    return (
        <div id={props.id}
             onDrop={drop}
             onDragOver={dragOver}
             className={props.className}
        >
            {props.children}
        </div>
    );
}

export default TeamBox;
