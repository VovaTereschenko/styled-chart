import * as React from 'react';

const FLOORS = Array.from(Array(10).keys()).reverse();
const DEFAULT_FLOOR = 0;

const Elevator = () => {
  const [direction, setDirection] = React.useState<'up' | 'down'>('up');
  const [curretFloor, setCurrentFloor] = React.useState<number>(DEFAULT_FLOOR);
  const [upMovements, registerUpMovement] = React.useState<number[]>([]);
  const [downMovements, registerDownMovement] = React.useState<number[]>([]);
  const [inputFloor, onFloorInputChange] =
    React.useState<number>(DEFAULT_FLOOR);

  const handleFloorInputChange = (floor: number) => {
    if (floor >= 0 && floor <= 9) onFloorInputChange(floor);
    else throw new Error("Can't go here!");
  };

  const handleMovement = (floor: number) => {
    if (floor > curretFloor) {
      registerUpMovement([...upMovements, ...[floor]]);
    } else if (floor < curretFloor) {
      registerDownMovement([...downMovements, ...[floor]]);
    }
    setCurrentFloor(floor);
  };

  const handleArbitraryFloor = () => {
    handleMovement(inputFloor);
  };

  const moveElevatorUp = () => {
    setDirection('up');
    if (curretFloor === FLOORS.length - 1) {
      throw new Error("Can't go up anymore!");
    } else {
      handleMovement(curretFloor + 1);
    }
  };

  const moveElevatorDown = () => {
    setDirection('down');
    if (curretFloor === 0) {
      throw new Error("Can/'t go down anymore!");
    } else {
      handleMovement(curretFloor - 1);
    }
  };

  const elevatorStyle = {
    position: 'absolute',
    bottom: 0,
    transform: `translateX(100%) translateY(-${curretFloor * 24}px)`,
  } as React.CSSProperties;

  const floorStyle = {
    height: '24px',
  } as React.CSSProperties;

  const listStyle = {
    position: 'relative',
    margin: 0,
    padding: 0,
  } as React.CSSProperties;

  return (
    <section>
      <ul style={listStyle}>
        {FLOORS.map((item) => (
          <li style={floorStyle} key={item}>
            {item}
          </li>
        ))}
        <aside style={elevatorStyle}>🚟</aside>
      </ul>
      <p>Elevator on the {curretFloor ? curretFloor : 'ground'} floor</p>
      <p>Direction is {direction}</p>
      <div>
        <button
          disabled={curretFloor === FLOORS.length - 1}
          onClick={moveElevatorUp}
        >
          Go up!
        </button>
        <button disabled={curretFloor === 0} onClick={moveElevatorDown}>
          Go down!
        </button>
      </div>
      <div>
        <input
          placeholder="Enter floor num"
          type="number"
          onChange={(e) =>
            handleFloorInputChange(Number(e.currentTarget.value))
          }
        />
        <button
          disabled={
            inputFloor === curretFloor ||
            inputFloor > FLOORS.length ||
            inputFloor < 0
          }
          onClick={handleArbitraryFloor}
        >
          Go to {inputFloor}
        </button>
      </div>
      <div>
        <p>Statistics:</p>
        <p>Up movements: {upMovements.length}</p>
        <p>Down movements: {downMovements.length}</p>
      </div>
    </section>
  );
};

export default Elevator;
