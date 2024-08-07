import React, { useEffect, useState, useCallback } from 'react';
import Circle from './Circle/Circle';

const getRandomPosition = (i) => {
    const x = Math.floor(Math.random() * 90) + 5;
    const y = Math.floor(Math.random() * 90) + 5;
    return { i, x, y };
};

function Gamepage() {
    const [number, setNumber] = useState(0);
    const [circles, setCircles] = useState([]);
    const [currentNumber, setCurrentNumber] = useState(1);
    const [buttonData, setButtonData] = useState('Start');
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(null);
    const [lose, setLose] = useState(false);
    const [result, setResult] = useState('Lets Play')

    const handleInput = (e) => {
        const value = e.target.value;
        setNumber(value);
        setButtonData('Start');
        setCircles([]);
        setResult('Lets Play')
        if (timer) clearInterval(timer);
        setTime(0);
    };

    const handleStart = () => {
        const newCircles = Array.from({ length: number }, (_, i) => getRandomPosition(i + 1));
        setCircles(newCircles);
        setResult('Lets Play')
        setButtonData('Restart');
        setCurrentNumber(1);
        setTime(0);
        setLose(false);

        if (timer) clearInterval(timer);

        const newTimer = setInterval(() => {
            setTime((prevTime) => prevTime + 0.01);
        }, 10);
        setTimer(newTimer);
    };

    const gameOver = () => {
        if (timer) clearInterval(timer);
        setLose(true);
        setResult('Game Over')
        setTimeout(() => {
            setResult('Lets Play')
            setButtonData('Restart');
            setCurrentNumber(1);
            setTime(0);
            setLose(false);
            setCircles([])
        }, 2000);
    }

    useEffect(() => {
        if (currentNumber - number === 1 && timer) {
            setResult('All Cleaned')
            clearInterval(timer);
        }
    }, [currentNumber, number, timer]);

    useEffect(() => {
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timer]);

    return (
        <div className='w-9/12 bg-white rounded-2xl overflow-hidden shadow-md'>
            <div className='px-8 py-4 flex flex-col gap-y-4 items-start border'>
                <h1 className={`text-2xl font-semibold uppercase ${result === 'All Cleaned' ? 'text-green-700' : ''} ${result === 'Game Over' ? 'text-red-200' : ''}`}>{result}</h1>
                <div className='flex justify-start items-center gap-x-4'>
                    <span className='text-lg'>Points:</span>
                    <input
                        className='p-2 ml-4 rounded-md border'
                        type='number'
                        min={0}
                        pattern='/^\d+$/'
                        value={number}
                        placeholder='Input number'
                        onChange={handleInput}
                    />
                </div>
                <div className='flex justify-start items-center gap-x-4'>
                    <span className='text-lg'>Time:</span>
                    <p className='p-2 ml-4 rounded-full bg-white text-lg font-semibold italic'>
                        {time.toFixed(2)}s
                    </p>
                </div>
                <button
                    className='p-2 border text-lg font-semibold rounded-md bg-white shadow hover:bg-gray-50 cursor-pointer w-[200px]'
                    onClick={handleStart}
                >
                    {buttonData}
                </button  >


                <div className='relative mt-4 border rounded-md w-full h-[700px] border-gray-600 shadow-md overflow-hidden'>
                    {circles.map((pos, index) => (
                        <Circle
                            key={index}
                            i={pos.i}
                            x={pos.x}
                            y={pos.y}
                            currentNumber={currentNumber}
                            setCurrentNumber={setCurrentNumber}
                            gameOver={gameOver}
                            lose={lose}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gamepage;
