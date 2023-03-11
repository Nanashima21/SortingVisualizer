import { useLayoutEffect, useState } from 'react';

export const useArrayGenerator = () => {
    const [size, setSize] = useState([0, [], [], [], []]);

    let array = [];
    let array1 = [];
    let array2 = [];
    let blindarray = [];

    const generateRandomArray = (width, height) => {
        const array_ = [];
        const array1_ = [];
        const array2_ = [];
        const blindarray_ = [];
        
        for (let i = 0; i < width/10 ; i++) 
            array_.push(randomIntFromInterval(5, 7*height/10));
        
        for (let i = 0; i < width/20 ; i++) 
            array1_.push(randomIntFromInterval(5, 7*height/10));
        
        for (let i = 0; i < width/20 ; i++) 
            array2_.push(array1_[i]);
    
        blindarray_.push(8*height/10);
    
        array = array_;
        array1 = array1_;
        array2 = array2_;
        blindarray = blindarray_;
    }

    useLayoutEffect(() => {
        const updateSize = () => {
            generateRandomArray(window.innerWidth, window.innerHeight);
            setSize([window.innerWidth, array, array1, array2, blindarray]); 
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        
        return () => window.addEventListener('resize', updateSize);
    }, []);
    return size;
}

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}