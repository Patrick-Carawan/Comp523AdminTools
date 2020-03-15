import React, { useState } from 'react'
import DraggableProposal from './DraggableProposal'
import update from 'immutability-helper'
const style = {
};

const staticProposals = [{
    title: 'iPhone App',
    firstName: 'Jane',
    lastName: 'Doe',
    description: 'This is the description of the first project. Hopefully some students would like to work on this project because it is really cool',
    url: 'www.project1url.com',
    hardwareReq: 'These are the hardware restrictions for the first project. You have to use Apple, sheeple.',
    softwareReq: 'You can only code in fortran because I am a progressive professor.'
}, {
    title: 'Website',
    firstName: 'John',
    lastName: 'Smith',
    description: 'This is the description of the second project. Hopefully some students would like to work on this project because it is really cool',
    url: 'www.project2url.com',
    hardwareReq: 'These are the hardware restrictions for the second project. You have to use Windows, #PCMasterRace.',
    softwareReq: 'You can use whatever language you want.'
}, {
    title: 'Android App',
    firstName: 'Sam',
    lastName: 'Sung',
    description: 'This is the description of the third project. Hopefully some students would like to work on this project because it is really cool',
    url: 'www.project3url.com',
    hardwareReq: 'These are the hardware restrictions for the third project. Android dev, Oreo or newer.',
    softwareReq: 'Let\'s use Kotlin.'
}];
const ProjectRanking = () => {
    {
        const [proposals, setProposals] = useState(staticProposals);
        const moveCard = (dragIndex, hoverIndex) => {
            const dragCard = proposals[dragIndex];
            setProposals(
                update(proposals, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }),
            )
        }
        return (
            <div style={style}>
                {proposals.map((proposal, i) => (
                    <DraggableProposal
                        key={i}
                        index={i}
                        id={i}
                        title={proposal.title}
                        firstName={proposal.firstName}
                        lastName={proposal.lastName}
                        url={proposal.url}
                        description={proposal.description}
                        hardwareReq={proposal.hardwareReq}
                        softwareReq={proposal.hardwareReq}
                        moveCard={moveCard}
                    />
                ))}
            </div>
        )
    }
};
export default ProjectRanking
