/**
 * @file util
 * @describe 一些工具函数
 */

/**
 * 原数组随机抽取排序
 * @param {array} 数组
 */
function randomArray(array) {
    let length = array.length;

    for (let i = length - 1; i >= 0; i--) {
        let num = Math.floor(Math.random(Date.now()) * i);

        let tmp = array[num];
        array[num] = array[i];
        array[i] = tmp;
    }

    console.log(array);

    return array;
}

export {
    randomArray
}
