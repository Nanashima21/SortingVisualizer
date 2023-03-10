export const getBubbleSortAnimations = (array) => {
    const animations = [];
    const array_ = [...array];
    if (array_.length <= 1) return array_;
    for(let i = 0; i < array_.length; i++) {
        for(let j = 0; j < array_.length-i-1; j++) {
            if(array_[j] > array_[j+1]) {
                let tmp = 0;
                tmp = array_[j];
                array_[j] = array_[j+1];
                array_[j+1] = tmp;
            } 
            animations.push([j, j]);
            animations.push([j, j]);
            animations.push([j, array_[j]]);
            animations.push([j+1, array_[j+1]]);
        }
    }
    return animations;
}
