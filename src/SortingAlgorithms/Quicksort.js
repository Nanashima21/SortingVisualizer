export const getQuickSortAnimations = (array) => {
    const animations = [];
    const array_ = [...array];
    if (array.length <= 1) return array;
    quickSortHelper(array_, 0, array_.length - 1, animations);
    return animations;
}
  
const quickSortHelper = (
    array,
    startIdx,
    endIdx,
    animations,
) => {
    if (startIdx === endIdx) return;
    let leftIdx = startIdx;
    let rightIdx = endIdx;
    let pivot = array[leftIdx];
    while (leftIdx < rightIdx) {
        while ((array[rightIdx] >= pivot) && (leftIdx < rightIdx)) {
            animations.push([rightIdx, leftIdx, "color", "even"]);
            animations.push([rightIdx, leftIdx, "color", "odd"]);
            rightIdx--;
        }
        if (leftIdx != rightIdx) {
            array[leftIdx] = array[rightIdx];
            animations.push([leftIdx, array[leftIdx], "swap", "null"]);
            leftIdx++;
        }

        while ((array[leftIdx] <= pivot) && (leftIdx < rightIdx)) {
            animations.push([leftIdx, leftIdx, "color", "even"]);
            animations.push([leftIdx, leftIdx, "color", "odd"]);
            leftIdx++;
        }
        if (leftIdx != rightIdx) {
            array[rightIdx] = array[leftIdx];
            animations.push([rightIdx, array[rightIdx], "swap", "null"]);
            rightIdx--; 
        }  
    }

    array[leftIdx] = pivot;
    animations.push([leftIdx, array[leftIdx], "swap", "null"]);
    pivot = leftIdx

    if (startIdx < pivot) quickSortHelper(array, startIdx, pivot - 1, animations);
    if (endIdx > pivot) quickSortHelper(array, pivot + 1, endIdx, animations);
}