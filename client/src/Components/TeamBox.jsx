import React from 'react';

function TeamBox(props) {
    const drop = e => {
        e.preventDefault();
        let data = e.dataTransfer.getData('data');
        data = JSON.parse(data);
        // console.log(data);
        const onyen = data['onyen'];
        const oldBoxId = data['teamId'];
        const newBoxId = props.id;
        const studentIndex = data['studentIndex'];
        // console.log('onyen', onyen);
        // console.log('old teamId', oldBoxId);
        // console.log('new teamId', newBoxId);
        // console.log('studentIndex', studentIndex);
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
