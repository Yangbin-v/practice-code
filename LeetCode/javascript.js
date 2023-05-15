/**
 * @description JavaScript 编程题目
 */

/**
 * 生成指定范围内，指定长度的不重复随机数组
 * @param {number} length 数组长度
 * @param {number} start 开启
 * @param {number} end 结束
 * @returns {number[]} 结果数组
 */
function noRepeatRandomArray(length, start, end) {
    // 类型判断
    if (typeof length !== 'number' && typeof start !== 'number' && typeof end !== 'number' ) {
        console.error('参数必须是 number 类型');
        return;
    }

    if (!(start < end)) {
        console.error('start 必须小于 end');
        return;
    }

    // 计数，用来统计已随机出的数字
    let count = length;
    let result = [];

    while(count > 0) {
        // 返回 start 到 end 间的随机整数
        let random = Math.floor(Math.random() * (end - start) + start);

        if(!result.includes(random)) {
            result.push(random);
            count--;
        }
    }

    return result;
}

function main() {
    let result = noRepeatRandomArray(5, -5, 23);
    console.log(result);
}

main();
