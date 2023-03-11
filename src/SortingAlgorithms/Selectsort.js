export const getSelectSortAnimations = (array) => {
    const animations = [];
    const array_ = [...array];
    if (array_.length <= 1) return array_;
    for (let i = 0; i < array_.length; i++) {
        let midx = i;
        for (let j = i+1; j < array_.length; j++) {
            animations.push([midx, j, "color", "even"]);
            animations.push([midx, j, "color", "odd"]);
            if(array_[j] < array_[midx]) midx = j;
        }
        let tmp = array_[i];
        array_[i] = array_[midx];
        array_[midx] = tmp;

        animations.push([i, array_[i], "swap", "null"]);
        animations.push([midx, array_[midx], "swap", "null"]);
    }
    return animations;
}
