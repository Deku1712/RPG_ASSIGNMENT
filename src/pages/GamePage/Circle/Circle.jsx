import React, { useEffect, useState } from 'react';

function Circle({ i, x, y, currentNumber, setCurrentNumber, gameOver, lose }) {
    const [show, setShow] = useState(true);

    const handleCheck = () => {
        if(!lose) {

            if (currentNumber === i) {
                setShow(false);
                setCurrentNumber(i + 1);
            } else {
                gameOver();
            }
        }
    };

    useEffect(() => {
        setShow(true);
    }, [x, y]);

    return (
        <div
            className={`absolute size-16 text-lg font-semibold rounded-full items-center justify-center
                        shadow-md  hover:font-bold 
                        transition-all ease-linear ${lose ? ' bg-red-200' : 'bg-opacity-100 hover:bg-green-200  cursor-pointer'} 
                        ${show ? 'flex' : 'hidden'}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={handleCheck}
        >
            {i}
        </div>
    );
}

export default Circle;
