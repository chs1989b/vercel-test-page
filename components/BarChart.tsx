"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ scores }: { scores: { labels: string[]; values: number[] } }) {
  const data = {
    labels: scores.labels,
    datasets: [
      {
        label: '점수',
        data: scores.values,
        backgroundColor: ['#06b6d4', '#60a5fa', '#34d399', '#f97316'],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        max: 100,
        ticks: {
          color: '#cbd5e1',
        },
        grid: { color: '#0b1220' },
      },
      y: {
        ticks: { color: '#cbd5e1' },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ height: 220 }}>
      <Bar data={data} options={options as any} />
    </div>
  );
}
