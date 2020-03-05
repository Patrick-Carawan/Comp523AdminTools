import React from 'react';
import Backend from "react-dnd-html5-backend";
import ProjectRanking from "./ProjectRanking";
import {DndProvider} from "react-dnd";

function RankContainer(props) {
    return (
        <DndProvider backend={Backend}>
            <ProjectRanking />
        </DndProvider>
    );
}

export default RankContainer;
