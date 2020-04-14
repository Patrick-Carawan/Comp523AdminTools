import React from 'react';

function TeamBox(props) {
    const drop = e => {
        e.preventDefault();
        let data = e.dataTransfer.getData('data');
        data = JSON.parse(data);
        // console.log(data);
        const name_id = data['id'];
        const onyen = data['onyen'];
        const oldBoxId = data['teamId'];
        const newBoxId = props.id;
        const studentIndex = data['studentIndex'];

        const name = document.getElementById(name_id);
        name.style.display = 'block';

        //this line puts places the student in the new team's box
        // e.target.appendChild(name);


        // const boxID = parseInt(props.id.match(/[0-9]+/)[0]);
        console.log('onyen', onyen);
        console.log('old teamId', oldBoxId);
        console.log('new teamId', newBoxId);
        console.log('studentIndex', studentIndex);
        console.log('boxIndex', name_id);
        props.setTeam(oldBoxId, newBoxId, onyen, studentIndex, name_id);
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
