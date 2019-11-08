import React, { useRef } from 'react';
import { MdDelete } from 'react-icons/md';
import dragIcon from '../../drag.icon.png';
import { IParticipantProps } from './participant.props';
import { XYCoord } from 'dnd-core';
import usFlag from '../../assets/us-flag.png';
import seFlag from '../../assets/se-flag.png';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

interface DragItem {
  index: number;
  type: string;
}

const Participant: React.FC<IParticipantProps> = (props: IParticipantProps) => {
  const { person, index, moveParticipant, isCurrentDriver, onDelete } = props;
  const currentDriverGradient = '-webkit-linear-gradient(top, #ffffff 0%, #f9e9d6 100%)';

  const dropRef = useRef<HTMLDivElement>(null);
  const ItemTypes = { PARTICIPANT: 'participant' };

  const [, drop] = useDrop({
    accept: ItemTypes.PARTICIPANT,
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dropRef.current!.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveParticipant(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.PARTICIPANT, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const personCardStyle = {
    fontStyle: 'italic',
    background: isCurrentDriver ? currentDriverGradient : '#fff',
  };

  const opacity = isDragging ? 0 : 1;

  drop(dropRef);

  return (
    <div ref={dropRef}>
      <div className="person" style={{ ...personCardStyle, opacity }} ref={preview}>
        <div className="arrange" style={{ cursor: 'move' }} ref={drag}>
          <img alt="" src={dragIcon} style={{ height: '.6em', marginBottom: '1px' }} />
        </div>
        <div className="name" style={{ fontSize: '.8em', marginLeft: '1em' }}>
          <img
            alt={person.language}
            src={person.language === 'US' ? usFlag : seFlag}
            style={{ height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
          />
          {person.name}
        </div>
        <div className="actions">
          <button type="button" onClick={() => onDelete(person)}>
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Participant;
