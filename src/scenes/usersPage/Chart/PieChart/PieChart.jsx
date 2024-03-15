import { Box, Typography, useTheme } from '@mui/material';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { TooltipWithBounds, useTooltip } from '@visx/tooltip';
import { width, height, centerX, centerY, radius } from './const';
import { tokens } from '../../../../theme/themeSettings';

const PieChart = ({ pieData, totalCount }) => {
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

    const handleOnMouseOver = (e, arc) => {
        const { top, left } = e.currentTarget.getBoundingClientRect();
        showTooltip({
            tooltipData: arc.data,
            tooltipTop: top,
            tooltipLeft: left,
        });
    };

    return (
        <div>
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
                <Group top={centerY} left={centerX}>
                    <Pie
                        data={pieData}
                        pieValue={(data) => data.count}
                        outerRadius={radius}
                        innerRadius={radius - 70}
                        padAngle={0.01}
                    >
                        {(pie) =>
                            pie.arcs.map((arc, i) => {
                                const [centroidX, centroidY] =
                                    pie.path.centroid(arc);
                                return (
                                    <g
                                        key={`arc-${i}`}
                                        onMouseOver={(e) =>
                                            handleOnMouseOver(e, arc)
                                        }
                                        onMouseLeave={hideTooltip}
                                    >
                                        <path
                                            d={pie.path(arc)}
                                            fill={arc.data.color}
                                        />
                                        {Number(arc.data.percentage) > 3 && (
                                            <text
                                                x={centroidX}
                                                y={centroidY}
                                                dy=".33em"
                                                fontSize={15}
                                                textAnchor="middle"
                                                fill="white"
                                            >
                                                {`${arc.data.percentage} %`}
                                            </text>
                                        )}
                                    </g>
                                );
                            })
                        }
                    </Pie>
                    {totalCount > 0 && (
                        <text
                            x={0}
                            y={0}
                            fontSize={30}
                            textAnchor="middle"
                            fill={colors.grey[100]}
                        >
                            Total users
                            <tspan x={0} dy={30} style={{ fontWeight: 800 }}>
                                {totalCount}
                            </tspan>
                        </text>
                    )}
                </Group>
            </svg>
            {tooltipOpen && (
                <TooltipWithBounds top={tooltipTop} left={tooltipLeft}>
                    <Typography fontWeight="bold">
                        {tooltipData.city}
                    </Typography>
                    <Box>People: {tooltipData.count}</Box>
                    <Box>Percentage: {tooltipData.percentage}</Box>
                </TooltipWithBounds>
            )}
        </div>
    );
};

export default PieChart;
