import { React, useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { useWindowSize } from '../hooks/useWindowSize';

//Sort
import { getMergeSortAnimations } from '../SortingAlgorithms/Mergesort';
import { getBubbleSortAnimations } from '../SortingAlgorithms/Bubblesort';

export const SortingVisualizer = () => {
    const [width, height] = useWindowSize();

    const [array, setStateArray] = useState([]);
    const [array1, setStateArray1] = useState([]);
    const [array2, setStateArray2] = useState([]);
    const [blindarray, setStateBlindArray] = useState([]);

    const [isClicked, setIsClicked] = useState(true);
    const onClickSwitch = () => setIsClicked(!isClicked);
    const [isGenerated, setIsGenerated] = useState(false);
    const generate = () => setIsGenerated(true);
    const [isSorting, setIsSorting] = useState(false);
    const startSort = () => setIsSorting(true);
    
    const items = ["Bubble Sort", "Merge Sort"];
    const [selectSort, setSelectSort] = useState("Bubble Sort");
    const handleChange = (e) => setSelectSort(e.target.value);
    const [selectSort1, setSelectSort1] = useState("Bubble Sort");
    const handleChange1 = (e) => setSelectSort1(e.target.value);
    const [selectSort2, setSelectSort2] = useState("Bubble Sort");
    const handleChange2 = (e) => setSelectSort2(e.target.value);

    const determineheight = () => {
        const blindarray_ = [];
        blindarray_.push(9*height/10);
        setStateBlindArray(blindarray_);
    }

    //Array
    const generateRandomArray = () => {
        generate();
        determineheight();
        const array_ = [];
        const array1_ = [];
        const array2_ = [];
        for (let i = 0; i < width/10 ; i++) 
            array_.push(randomIntFromInterval(5, 8*height/10));
        
        for (let i = 0; i < width/20 ; i++) 
            array1_.push(randomIntFromInterval(5, 8*height/10));
        
        for (let i = 0; i < width/20 ; i++) 
            array2_.push(array1_[i]);

        setStateArray(array_);
        setStateArray1(array1_);
        setStateArray2(array2_); 
    }

    //Sort
    const mergeSort = (array_,array_bar_) => {
        let animations = getMergeSortAnimations(array_);
        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName(array_bar_);
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

    const bubbleSort = (array_, array_bar_) => {
        let animations = getBubbleSortAnimations(array_);
        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName(array_bar_);
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

    

    const doSortSingle = () => {
        startSort();
        if (selectSort === "Bubble Sort") bubbleSort(array,"array-bar");
        if (selectSort === "Merge Sort") mergeSort(array,"array-bar");
    } 

    const doSortCompare = () => {
        startSort();
        if (selectSort1 === "Bubble Sort") bubbleSort(array1,"array-bar1");
        if (selectSort2 === "Bubble Sort") bubbleSort(array2,"array-bar2");
        if (selectSort1 === "Merge Sort") mergeSort(array1,"array-bar1");
        if (selectSort2 === "Merge Sort") mergeSort(array2,"array-bar2");
    } 

    //Output
    return (
        <>
            { isClicked ? (
                <>
                    <div className="container">
                        <button onClick={generateRandomArray} disabled={isSorting}>Generate Random Array</button>
                        <button onClick={onClickSwitch} disabled={isSorting}>Compare Sort</button>
                        <select value={selectSort} onChange={handleChange}>
                            {items.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <button onClick={doSortSingle} disabled={isSorting} disabled={!isGenerated}>Sort</button>
                        <button onClick={() => window.location.reload()}>Reset</button>
                    </div>
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
                    <div className="container">
                        <button onClick={generateRandomArray} disabled={isSorting}>Generate Random Array</button>
                        <button onClick={onClickSwitch} disabled={isSorting}>Single Sort</button>
                        <select value={selectSort1} onChange={handleChange1}>
                            {items.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <select value={selectSort2} onChange={handleChange2}>
                            {items.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <button onClick={doSortCompare} disabled={isSorting} disabled={!isGenerated}>Compare</button>
                        <button onClick={() => window.location.reload()}>Reset</button>
                    </div>
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
                                    width: `${width/10}px`
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