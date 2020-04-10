import React from 'react';

function TeamBox(props) {
    const drop = e => {
        e.preventDefault();
        let data = e.dataTransfer.getData('data');
        data = JSON.parse(data);
        console.log(data);
        const name_id = data['id'];
        const onyen = data['onyen'];
        const name = document.getElementById(name_id);
        name.style.display = 'block';
        e.target.appendChild(name);
        // const boxID = parseInt(props.id.match(/[0-9]+/)[0]);
        const boxID = props.id;
        props.setTeam(name_id, boxID, onyen);
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
