import { useEffect, useState } from "react";

export const Avatar = () => {
    const [matrix, setIndeces] = useState([] as number[][]);
    const [squareColor, setColor] = useState('');

    useEffect(() => {
        setIndeces(generateAvatarSquareSequence());
        setColor(generateRandomColor());
    }, [])

    function generateAvatarSquareSequence(): number[][] {
        const squareNumber = 8;
        const squareIndeces: number[][] = new Array<number[]>(squareNumber);
        for (let i = 0; i < squareNumber; i++) {
            squareIndeces[i] = new Array<number>(squareNumber);
        }
        for (let i = 0; i < squareNumber; i++) {
            for (let j = 0; j < squareNumber/2; j++) {
                const value = Math.round(Math.random());
                squareIndeces[i][j] = value;
                squareIndeces[i][squareNumber - j - 1] = value;
            }
        }
        return squareIndeces;
    }

    function generateRandomColor(): string {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    return (
        <div className='friends__avatar'>
            {matrix.map((row, i) => {
                return <span key={i} className='friends__avatar-row'>
                    {row.map((el, j) => {
                        return <span className='friends__avatar-square' key = {j} style={{ backgroundColor: el === 1 ? squareColor : '#eee'}}>&nbsp;</span>
                    })}
                </span>
            })}
        </div>
    );
}