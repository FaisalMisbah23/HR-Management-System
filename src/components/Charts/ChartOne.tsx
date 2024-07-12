import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC<{ dates: string[] }> = ({ dates }) => {
  const [state, setState] = useState<ChartOneState>({
    series: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      // Assuming dates is an array of strings in the format 'YYYY-MM-DD'
      const data = dates.map((date) => 1); // each date represents 1 project completed
      setState({
        series: [
          {
            name: 'Projects Completed',
            data,
          },
        ],
      });
    };
    fetchData();
  }, [dates]);

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
    },
    xaxis: {
      type: 'category',
      categories: dates.map((date) => new Date(date).toLocaleDateString()), // display dates on x-axis
    },
    yaxis: {
      title: {
        text: 'Projects Completed',
      },
    },
    legend: {
      show: false,
    },
    toolbar: {
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 250,
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="xl:w-full col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <p className="font-semibold">Projects Completed</p>
            <p className="text-sm font-medium ml-1">in Day</p>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="xl:w-full">
          <ReactApexChart options={options} series={state.series} type="area" />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;