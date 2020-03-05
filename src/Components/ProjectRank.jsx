import React from 'react';
import Backend from "react-dnd-html5-backend";
import Example from "./example";
import {DndProvider} from "react-dnd";

function ProjectRank(props) {
    return (
        <DndProvider backend={Backend}>
            <Example />
        </DndProvider>
    );
}

export default ProjectRank;
