export const getBubbleSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array.length-i-1; j++) {
            if(array[j] > array[j+1]) {
                let tmp = 0;
                tmp = array[j];
                array[j] = array[j+1];
                array[j+1] = tmp;
            } 
            animations.push([j, j]);
            animations.push([j, j]);
            animations.push([j, array[j]]);
            animations.push([j+1, array[j+1]]);
        }
    }
    return animations;
}
