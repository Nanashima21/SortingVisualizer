export const getHeapSortAnimations = (array) => {
    const animations = [];
    const array_ = [...array];
    if (array.length <= 1) return array;
    for (let i = array_.length / 2 - 1; i >= 0; i--) 
        heapSortHelper(array_, i, array_.length, animations);
    
    for (let i = array_.length - 1; i > 0; i--) {
        let tmp = array_[0];
        array_[0] = array_[i];
        array_[i] = tmp;

        animations.push([0, array_[0], "swap", "null"]);
        animations.push([i, array_[i], "swap", "null"]);

        heapSortHelper(array_, 0, i, animations);
    }

    return animations;
}
  
const heapSortHelper = (
    array,
    rootIdx,
    endIdx,
    animations,
) => {
    let leftIdx = 2 * rootIdx + 1;
    let rightIdx = 2 * rootIdx + 2;
    let maxChildIdx = rootIdx;
    
    
    if (leftIdx < endIdx ) {
        animations.push([rootIdx, leftIdx, "color", "even"]);
        animations.push([rootIdx, leftIdx, "color", "odd"]);
        if( array[leftIdx] > array[rootIdx]) maxChildIdx = leftIdx;
    }
    
    if (rightIdx < endIdx ) {
        animations.push([maxChildIdx, rightIdx, "color", "even"]);
        animations.push([maxChildIdx, rightIdx, "color", "odd"]);
        if( array[rightIdx] > array[maxChildIdx]) maxChildIdx = rightIdx;
    }

    if (maxChildIdx !== rootIdx) {
        let tmp = array[rootIdx];
        array[rootIdx] = array[maxChildIdx];
        array[maxChildIdx] = tmp;

        animations.push([rootIdx, array[rootIdx], "swap", "null"]);
        animations.push([maxChildIdx, array[maxChildIdx], "swap", "null"]);

        heapSortHelper(array, maxChildIdx, endIdx, animations);
    }
}