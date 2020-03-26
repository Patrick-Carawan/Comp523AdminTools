import React, {useImperativeHandle, useRef} from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from './ItemTypes'
import Proposal from "./Proposal";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
   card :{
       marginLeft: '3em',
       marginRight: '3em',
       marginTop: '1em',
       marginBottom: '1em'
   }
}));

const DraggableProposal = React.forwardRef(
    ({title, index, firstName, lastName, url, description, hardwareReq, softwareReq, isDragging, connectDragSource, connectDropTarget}, ref) => {
        const elementRef = useRef(null);
        connectDragSource(elementRef);
        connectDropTarget(elementRef);
        //modify styling here with css objects
        const opacity = isDragging ? 0 : 1;
        useImperativeHandle(ref, () => ({
            getNode: () => elementRef.current,
        }));
        const classes = useStyles();
        return (
            <div ref={elementRef} style={{opacity}}>
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <Proposal title={title}
                                  firstName={firstName}
                                  lastName={lastName}
                                  url={url}
                                  description={description}
                                  hardwareReq={hardwareReq}
                                  softwareReq={hardwareReq}
                                  index={index}
                        />
                    </CardContent>
                </Card>
            </div>
        )
    },
)
export default DropTarget(
    ItemTypes.NAME,
    {
        hover(props, monitor, component) {
            if (!component) {
                return null
            }
            // node = HTML Div element from imperative API
            const node = component.getNode()
            if (!node) {
                return null
            }
            const dragIndex = monitor.getItem().index
            const hoverIndex = props.index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = node.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            props.moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex
        },
    },
    connect => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(
    DragSource(
        ItemTypes.NAME,
        {
            beginDrag: props => ({
                id: props.id,
                index: props.index,
            }),
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        }),
    )(DraggableProposal),
)
