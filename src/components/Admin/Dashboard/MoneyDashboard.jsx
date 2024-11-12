import * as React from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Typography } from '@mui/material';

const MoneyDashboard = () => {
  return (

    <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Tổng tiền thu
        </Typography>
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <ResponsiveChartContainer
        xAxis={[
          {
            scaleType: 'band',
            data: ['Q1', 'Q2', 'Q3', 'Q4'],
            id: 'quarters',
            label: 'Quarters',
          },
        ]}
        yAxis={[{ id: 'money' }, { id: 'quantities' }]}
        series={[
          {
            type: 'line',
            id: 'revenue',
            yAxisId: 'money',
            data: [5645, 7542, 9135, 12221],
          },
          {
            type: 'bar',
            id: 'bonsai',
            yAxisId: 'quantities',
            data: [1200, 1500, 1700, 2100],
            label: 'Bonsai',
          },
          {
            type: 'bar',
            id: 'cactus',
            yAxisId: 'quantities',
            data: [900, 1100, 1250, 1350],
            label: 'Cactus',
          },
          {
            type: 'bar',
            id: 'succulents',
            yAxisId: 'quantities',
            data: [1400, 1600, 1800, 2000],
            label: 'Succulents',
          },
          {
            type: 'bar',
            id: 'creepers',
            yAxisId: 'quantities',
            data: [700, 850, 950, 1150],
            label: 'Creepers',
          },
          {
            type: 'bar',
            id: 'seeds',
            yAxisId: 'quantities',
            data: [500, 600, 700, 800],
            label: 'Seeds',
          },
          {
            type: 'bar',
            id: 'decorateItems',
            yAxisId: 'quantities',
            data: [650, 800, 900, 1000],
            label: 'Decorate Items',
          },
        ]}
        height={400}
        margin={{ left: 70, right: 70 }}
        sx={{
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-25px, 0)',
          },
          [`.${axisClasses.right} .${axisClasses.label}`]: {
            transform: 'translate(30px, 0)',
          },
        }}
      >
        <BarPlot />
        <LinePlot />
        <ChartsXAxis axisId="quarters" label="2021 quarters" labelFontSize={18} />
        <ChartsYAxis axisId="quantities" label="# units sold" />
        <ChartsYAxis axisId="money" position="right" label="revenue" />
      </ResponsiveChartContainer>
    </Box>
    </Box>
  );
};

export default MoneyDashboard;
