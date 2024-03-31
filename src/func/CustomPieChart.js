import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

function CustomPieChart({memoryUsage }) {
    // 퍼센테이지 값을 숫자로 변환합니다.
    const memoryValue = parseFloat(memoryUsage.replace('%', ''));

    // 데이터는 파이 차트가 이해할 수 있는 형식이어야 합니다.
    const data = [
        { name: 'Memory', value: memoryValue },
        { name: 'Unused Memory', value: 100 - memoryValue },
    ];

    // 색상은 원하는 대로 설정할 수 있습니다.
    const COLORS = ['#FF0000', '#646464', '#CCCCCC', '#FFBB28'];

    return (
        <PieChart width={200} height={200}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
            >
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
            <Tooltip />
        </PieChart>
    );
}

export default CustomPieChart;