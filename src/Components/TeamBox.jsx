import React from 'react';

function TeamBox(props) {
    const drop = e => {
        e.preventDefault();
        const name_id = e.dataTransfer.getData('name_id');
        const name = document.getElementById(name_id);
        name.style.display = 'block';
        e.target.appendChild(name);
        props.setTeam(name_id, props.id);
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
