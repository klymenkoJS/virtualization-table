import { scaleBand, scaleLinear } from '@visx/scale';

export const createScales = (ageData, dimensions) => {
    const { width, height, margin } = dimensions;

    const xScale = scaleBand({
        domain: ageData.map(d => d.age),
        padding: 0.2,
    }).rangeRound([margin.left, width - margin.right]);

    const yScale = scaleLinear({
        domain: [0, Math.max(...ageData.map(d => d.count))],
    }).range([height - margin.bottom, margin.top]);

    return { xScale, yScale };
}

export const groupByAgeRange = (data, range) => {
    const groups = {};
    data.forEach(item => {
        const group = Math.floor(item.age / range) * range;
        groups[group] = (groups[group] || 0) + 1;
    });

    return Object.entries(groups).map(([age, count]) => ({
        age: +age,
        count,
    }));
};
