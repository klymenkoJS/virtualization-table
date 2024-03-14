import React, { useState, useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { TooltipWithBounds } from '@visx/tooltip';
import { useTheme, Box } from '@mui/material';
import { tokens } from '../../../theme/themeSettings';
import { width, height, margin, rangeStep } from './const';
import { groupByAgeRange, createScales } from './helpers';

const AgeChart = ({ users, dimensions }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // notification states
    const [tooltipData, setTooltipData] = useState(null);
    const [tooltipTop, setTooltipTop] = useState(0);
    const [tooltipLeft, setTooltipLeft] = useState(0);

    const ageData = useMemo(() => groupByAgeRange(users, rangeStep), [users]);
    const { xScale, yScale } = useMemo(
        () => createScales(ageData, dimensions),
        [ageData, dimensions]
    );

    xScale.rangeRound([margin.left, width - margin.right]);
    yScale.range([height - margin.bottom, margin.top]);

    const handleMouseOver = (event, d) => {
        const { top, left } = event.currentTarget.getBoundingClientRect();
        setTooltipTop(top - event.currentTarget.clientTop);
        setTooltipLeft(left + event.currentTarget.clientWidth / 2);
        setTooltipData(d);
    };

    const tickLabelProps = () => ({
        fill: colors.grey[100],
        fontSize: 12,
        textAnchor: 'end',
    });

    return (
        <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            color={colors.grey[100]}
        >
            <svg width={width} height={height}>
                <Group>
                    {ageData.map((d, i) => {
                        return (
                            <Bar
                                key={i}
                                x={xScale(d.age)}
                                y={yScale(d.count)}
                                height={
                                    height - margin.bottom - yScale(d.count)
                                }
                                width={xScale.bandwidth()}
                                fill={
                                    tooltipData?.age === d.age
                                        ? '#ff930f'
                                        : 'rebeccapurple'
                                }
                                onMouseOver={(event) =>
                                    handleMouseOver(event, d)
                                }
                                onMouseOut={() => setTooltipData(null)}
                            />
                        );
                    })}
                    <AxisLeft
                        scale={yScale}
                        left={margin.left}
                        stroke={colors.grey[100]}
                        tickStroke={colors.grey[100]}
                        tickLabelProps={tickLabelProps}
                    />
                    <AxisBottom
                        scale={xScale}
                        top={height - margin.bottom}
                        stroke={colors.grey[100]}
                        tickStroke={colors.grey[100]}
                        tickLabelProps={tickLabelProps}
                    />
                </Group>
            </svg>
            {tooltipData && (
                <TooltipWithBounds top={tooltipTop} left={tooltipLeft}>
                    <div>
                        <strong>Age Group: {tooltipData.age}</strong>
                        <div>Number of Users: {tooltipData.count}</div>
                    </div>
                </TooltipWithBounds>
            )}
        </Box>
    );
};

export default AgeChart;
