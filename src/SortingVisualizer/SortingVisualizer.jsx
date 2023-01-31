import React from 'react';
import './SortingVisualizer.css';

//Sort
import {getMergeSortAnimations} from '../SortingAlgorithms/Mergesort';
import {getBubbleSortAnimations} from '../SortingAlgorithms/Bubblesort';

//200,250
const NUMBER_OF_ARRAY = 250;
const NUMBER_OF_ARRAY2 = 100;

//700,950
const height = 965;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            array1: [],
            array2: [],
            blindarray: [],
        };
    }

    componentDidMount() {
        this.generateRandomArray();
        this.determineheight();
    }

    determineheight() {
        const blindarray = [];
        blindarray.push(height);
        this.setState({blindarray});
    }

    //Array
    generateRandomArray() {
        const array = [];
        const array1 = [];
        const array2 = [];
        for (let i = 0; i < NUMBER_OF_ARRAY ; i++) {
            array.push(randomIntFromInterval(5, height-50));
        }
        this.setState({array : array});
        for (let i = 0; i < NUMBER_OF_ARRAY2 ; i++) {
            array1.push(randomIntFromInterval(5, height-50));
        }
        for (let i = 0; i < NUMBER_OF_ARRAY2 ; i++) array2.push(array1[i]);
        this.setState({array1 : array1});
        this.setState({array2 : array2}); 
    }

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

    //Sort
    mergeSort(array, arraybar) {
        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName(arraybar);
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

    bubbleSort(array, arraybar) {
        const animations = getBubbleSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName(arraybar);
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
    compare() {
        this.mergeSort(this.state.array1,'array-bar1');
        this.bubbleSort(this.state.array2,'array-bar2');
    }

    //Output
    render() {
        // eslint-disable-next-line
        const {array, array1, array2, blindarray} = this.state;

        return (
            <>
                <button onClick={() => this.generateRandomArray()}>Random Array</button>
                <button onClick={() => this.generateMonotonicallyIncreasingArray()}>Monotonically increasing Array</button>
                <button onClick={() => this.generateMonotonicallyDecreasingArray()}>Monotonically decreasing Array</button>
                <button onClick={() => this.mergeSort(array,"array-bar")}>Merge Sort</button>
                <button onClick={() => this.bubbleSort(array,"array-bar")}>Bubble Sort</button>
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
                <button className="compare" onClick={() => this.compare()}>Compare</button>
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
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
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
                            style={{height: `${value}px`}}
                        ></div>
                    ))}
*/

/*
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
                            style={{height: `${value}px`}}
                        ></div>
                    ))}
                    {array2.map((value, idx) => (
                        <div 
                            className="array-bar2" 
                            key={idx}
                            style={{height: `${value}px`}}
                        ></div>
                    ))}
*/