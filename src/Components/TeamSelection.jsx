import React from 'react';
import TeamBox from './TeamBox';
import Name from './Name';

function TeamSelection(props) {
    return (
        <div className="flexbox">
            <TeamBox id="box-1" className="board">
                <Name id="name-1" className="card" draggable="true">
                        <p>Card One</p>
                </Name>
            </TeamBox>
            <TeamBox id="box-2" className="board">
            <Name id="name-2" className = "card" draggable="true">
                <p>Card Two</p>
            </Name>
        </TeamBox>
        </div>
    );
}

export default TeamSelection;
