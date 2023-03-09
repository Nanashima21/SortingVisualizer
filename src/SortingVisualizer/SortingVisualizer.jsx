import { React, useState, useEffect } from 'react';
import './SortingVisualizer.css';

//Sort
import {getMergeSortAnimations} from '../SortingAlgorithms/Mergesort';
import {getBubbleSortAnimations} from '../SortingAlgorithms/Bubblesort';

//200,250
const NUMBER_OF_ARRAY = 250;
const NUMBER_OF_ARRAY2 = 100;

//700,950
const height = 965;

export const SortingVisualizer = () => {
    const [array, setStateArray] = useState([]);
    const [array1, setStateArray1] = useState([]);
    const [array2, setStateArray2] = useState([]);
    const [blindarray, setStateBlindArray] = useState([]);

    const [isClicked, setIsClicked] = useState(true);
	const onClickSwitch = () => setIsClicked(!isClicked);

    useEffect (() => {
        generateRandomArray();
        determineheight();
    }, [])

    const determineheight = () => {
        const blindarray_ = [];
        blindarray_.push(height);
        setStateBlindArray(blindarray_);
    }

    //Array
    const generateRandomArray = () => {
        const array_ = [];
        const array1_ = [];
        const array2_ = [];
        for (let i = 0; i < NUMBER_OF_ARRAY ; i++) 
            array_.push(randomIntFromInterval(5, height-50));
        
        for (let i = 0; i < NUMBER_OF_ARRAY2 ; i++) 
            array1_.push(randomIntFromInterval(5, height-50));
        
        for (let i = 0; i < NUMBER_OF_ARRAY2 ; i++) 
            array2_.push(array1_[i]);

        setStateArray(array_);
        setStateArray1(array1_);
        setStateArray2(array2_); 
    }
    
    /*
    generateMonotonicallyIncreasingArray() {
        const incarray = this.state.array;
        const incarray1 = this.state.array1;
        const incarray2 = this.state.array2;
        incarray.sort((a, b) => a - b);
        incarray1.sort((a, b) => a - b);
        incarray2.sort((a, b) => a - b);
        this.setState({array : incarray}); 
        this.setState({array1 : incarray1}); 
        this.setState({array2 : incarray2}); 
    }

    generateMonotonicallyDecreasingArray() {
        this.generateMonotonicallyIncreasingArray();
        const decarray = this.state.array;
        const decarray1 = this.state.array1;
        const decarray2 = this.state.array2;
        decarray.reverse();
        decarray1.reverse();
        decarray2.reverse();
        this.setState({array : decarray});
        this.setState({array1 : decarray1});
        this.setState({array2 : decarray2}); 
    }
    */

    //Sort
    const mergeSort = () => {
        let animations = getMergeSortAnimations(array);
        if (!isClicked) animations = getMergeSortAnimations(array1);
        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName("array-bar");
            if (!isClicked) arrayBars = document.getElementsByClassName("array-bar1");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'orange';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 3);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 3);
            }
        }
    }

    const bubbleSort = () => {
        let animations = getBubbleSortAnimations(array);
        if (!isClicked) animations = getBubbleSortAnimations(array2);
        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName("array-bar");
            if (!isClicked) arrayBars = document.getElementsByClassName("array-bar2");
            if (i % 4 < 2) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 2 === 0 ? 'red' : 'orange';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 1);
            } else {
                if(i % 4 === 2) {
                    setTimeout(() => {
                        const [barOneIdx, newHeight] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;

                    }, i * 1);
                } else {
                    setTimeout(() => {
                        const [barOneIdx, newHeight] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, i * 1);
                }
            }
        }
    }

    //Compare
    const compare = () => {
        mergeSort();
        bubbleSort();
    }

    //Output
    return (
        <>
            <button onClick={generateRandomArray}>Random Array</button>
            {/*<button onClick={() => this.generateMonotonicallyIncreasingArray()}>Monotonically increasing Array</button>*/}
            {/*<button onClick={() => this.generateMonotonicallyDecreasingArray()}>Monotonically decreasing Array</button>*/}
            { isClicked ? (
                <>
                    <button onClick={onClickSwitch}>Compare Sort</button>
                    <button onClick={mergeSort}>Merge Sort</button>
                    <button onClick={bubbleSort}>Bubble Sort</button>
                    <div className="array-container">
                        {array.map((value, idx) => (
                            <div 
                                className="array-bar" 
                                key={idx}
                                style={{height: `${value}px`}}
                            ></div>
                        ))}
                        {blindarray.map((value, idx) => (
                            <div
                                className="blind-array-bar" 
                                key={idx}
                                style={{
                                    height: `${value}px`,
                                    width: `1px`
                                }}
                            ></div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <button onClick={onClickSwitch}>Single Sort</button>
                    <button onClick={compare}>Compare</button>
                    <div className="array-container">
                        {array1.map((value, idx) => (
                            <div 
                                className="array-bar1" 
                                key={idx}
                                style={{height: `${value}px`}}
                            ></div>
                        ))}
                        {blindarray.map((value, idx) => (
                            <div
                                className="blind-array-bar" 
                                key={idx}
                                style={{
                                    height: `${value}px`,
                                    width: `100px`
                                }}
                            ></div>
                        ))}
                        {array2.map((value, idx) => (
                            <div 
                                className="array-bar2" 
                                key={idx}
                                style={{height: `${value}px`}}
                            ></div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}