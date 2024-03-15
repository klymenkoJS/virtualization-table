import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import PieChart from './PieChart';
import chroma from 'chroma-js';

const PieChartSection = ({ users }) => {
    const cityDistribution = useMemo(() => {
        return users.reduce((acc, user) => {
            acc[user.city] = (acc[user.city] || 0) + 1;
            return acc;
        }, {});
    }, [users]);

    const totalCount = users.length;

    const pieData = useMemo(() => {
        const cities = Object.keys(cityDistribution);
        const colors = chroma
            .scale(['#fafa6e', '#2A4858'])
            .mode('lch')
            .colors(cities.length);

        return Object.entries(cityDistribution).map(([city, count], i) => ({
            city,
            count,
            color: colors[i],
            percentage: ((count / totalCount) * 100).toFixed(1),
        }));
    }, [cityDistribution, totalCount]);

    return (
        <Box
            sx={{
                maxWidth: '400px',
                margin: 'auto',
            }}
        >
            <PieChart pieData={pieData} />
        </Box>
    );
};

export default PieChartSection;
