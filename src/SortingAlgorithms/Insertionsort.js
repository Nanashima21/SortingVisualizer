export const getInsertionSortAnimations = (array) => {
    const animations = [];
    const array_ = [...array];
    if (array_.length <= 1) return array_;
    for (let i = 0; i < array_.length; i++) {
        let j = i;
        while ((j > 0) && (array_[j-1] > array_[j])) {
            animations.push([j-1, j, "color", "even"]);
            animations.push([j-1, j, "color", "odd"]);

            let tmp = array_[j];
            array_[j] = array_[j-1];
            array_[j-1] = tmp;

            animations.push([j-1, array_[j-1], "swap", "null"]);
            animations.push([j, array_[j], "swap", "null"]);
            j--;
        } 
    }
    return animations;
}
