import { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useTheme, Box, Typography } from '@mui/material';
import { tokens } from '../../../../theme/themeSettings';
import { width, height, margin, rangeStep } from './const';
import { groupByAgeRange, createScales } from './helpers';
import { TooltipWithBounds, useTooltip } from '@visx/tooltip';

const AgeChart = ({ users, dimensions }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {
        tooltipOpen,
        tooltipData,
        tooltipTop = 0,
        tooltipLeft = 0,
        showTooltip,
        hideTooltip,
    } = useTooltip();

    const ageData = useMemo(() => groupByAgeRange(users, rangeStep), [users]);
    const { xScale, yScale } = useMemo(
        () => createScales(ageData, dimensions),
        [ageData, dimensions]
    );

    xScale.rangeRound([margin.left, width - margin.right]);
    yScale.range([height - margin.bottom, margin.top]);

    const handleMouseOver = (e, d) => {
        const { top, left } = e.currentTarget.getBoundingClientRect();
        showTooltip({
            tooltipData: d,
            tooltipTop: top - e.currentTarget.clientTop,
            tooltipLeft: left + e.currentTarget.clientWidth / 2,
        });
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
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
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
                                onMouseOver={(e) => handleMouseOver(e, d)}
                                onMouseLeave={hideTooltip}
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
                        tickFormat={(value) => `${value} years`}
                    />
                </Group>
            </svg>
            {tooltipOpen && (
                <TooltipWithBounds top={tooltipTop} left={tooltipLeft}>
                    <Typography fontWeight="bold">
                        Age Group: {tooltipData?.age}
                    </Typography>
                    <Box>Number of Users: {tooltipData?.count}</Box>
                </TooltipWithBounds>
            )}
        </Box>
    );
};

export default AgeChart;
