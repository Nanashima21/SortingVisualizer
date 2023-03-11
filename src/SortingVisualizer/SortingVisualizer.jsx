import { React, useState } from 'react';
import './SortingVisualizer.css';

// Array
import { useArrayGenerator } from '../hooks/useArrayGenerator';

// Sort
import { getBubbleSortAnimations } from '../SortingAlgorithms/Bubblesort';
import { getSelectSortAnimations } from '../SortingAlgorithms/Selectsort';
import { getInsertionSortAnimations } from '../SortingAlgorithms/Insertionsort';
import { getQuickSortAnimations } from '../SortingAlgorithms/Quicksort';
import { getMergeSortAnimations } from '../SortingAlgorithms/Mergesort';
import { getHeapSortAnimations } from '../SortingAlgorithms/Heapsort';

export const SortingVisualizer = () => {
    const [isClicked, setIsClicked] = useState(true);
    const onClickSwitch = () => setIsClicked(!isClicked);
    const [isSorting, setIsSorting] = useState(false);
    const startSort = () => setIsSorting(true);

    const [width, array, array1, array2, blindarray] = useArrayGenerator();
    
    const items = ["Bubble Sort", "Select Sort", "Insertion Sort", "Quick Sort", "Merge Sort", "Heap Sort"];
    const [chosenSort, setSelectSort] = useState("Bubble Sort");
    const handleChange = (e) => setSelectSort(e.target.value);
    const [chosenSort1, setSelectSort1] = useState("Bubble Sort");
    const handleChange1 = (e) => setSelectSort1(e.target.value);
    const [chosenSort2, setSelectSort2] = useState("Bubble Sort");
    const handleChange2 = (e) => setSelectSort2(e.target.value);

    const doSortSingle = () => {
        startSort();
        sortVisualize(chosenSort, array, "array-bar");
    } 

    const doSortCompare = () => {
        startSort();
        sortVisualize(chosenSort1, array1, "array-bar1");
        sortVisualize(chosenSort2, array2, "array-bar2");
    } 

    // Output
    return (
        <>
            <p className="text">How to simulate : Choose Sorttype -> Sort (-> Reset)</p>
            { isClicked ? (
                <>
                    <div className="container">
                        <button className="button" onClick={onClickSwitch} disabled={isSorting}>Compare Sort</button>
                        <select className="button" value={chosenSort} onChange={handleChange}>
                            {items.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <button className="button" onClick={doSortSingle} disabled={isSorting}>Sort</button>
                        <button className="button" onClick={() => window.location.reload()}>Reset</button>
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
                        <button className="button" onClick={onClickSwitch} disabled={isSorting}>Single Sort</button>
                        <select className="button" value={chosenSort1} onChange={handleChange1}>
                            {items.map((item) => (
                                <option key={item} value={item}>
                                    Left : {item}
                                </option>
                            ))}
                        </select>
                        <select className="button" value={chosenSort2} onChange={handleChange2}>
                            {items.map((item) => (
                                <option key={item} value={item}>
                                    Right : {item}
                                </option>
                            ))}
                        </select>
                        <button className="button" onClick={doSortCompare} disabled={isSorting}>Compare</button>
                        <button className="button" onClick={() => window.location.reload()}>Reset</button>
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

// Sort
const sortVisualize = (sortType, array_, array_bar_) => {
    let animations;
    if (sortType === "Bubble Sort") animations = getBubbleSortAnimations(array_);
    if (sortType === "Select Sort") animations = getSelectSortAnimations(array_);
    if (sortType === "Insertion Sort") animations = getInsertionSortAnimations(array_);
    if (sortType === "Quick Sort") animations = getQuickSortAnimations(array_);
    if (sortType === "Merge Sort") animations = getMergeSortAnimations(array_);
    if (sortType === "Heap Sort") animations = getHeapSortAnimations(array_);
    let arrayBars = document.getElementsByClassName(array_bar_);
    for (let i = 0; i < animations.length; i++) {
        const [barOneIdx, barTwoIdxOrNewHeight, type, colorType] = animations[i];
        if (type === 'color') {
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdxOrNewHeight].style;
            const color = colorType === 'even' ? 'red' : 'orange';
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * 3);
        } else {
            const barOneStyle = arrayBars[barOneIdx].style;
            setTimeout(() => {
                barOneStyle.height = `${barTwoIdxOrNewHeight}px`;
            }, i * 3);
        }
    }
}