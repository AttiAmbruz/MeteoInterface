import React from 'react';
import * as Highcharts from 'highcharts/highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
import * as HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import PropTypes from 'prop-types';

class MeteoGraf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initializeChart();
  }

  initializeChart = () => {
    HighchartsMore(Highcharts);
    HighchartsSolidGauge(Highcharts);
    Highcharts.chart('container', {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },

      title: {
        text: this.props.label || '',
      },

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [
          {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [[0, '#FFF'], [1, '#333']],
            },
            borderWidth: 0,
            outerRadius: '109%',
          },
          {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [[0, '#333'], [1, '#FFF']],
            },
            borderWidth: 1,
            outerRadius: '107%',
          },
          {
            // default background
          },
          {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%',
          },
        ],
      },

      // the value axis
      yAxis: {
        min: this.props.minValue,
        max: this.props.maxValue,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto',
        },
        title: {
          text: '°C',
        },
        plotBands: this.props.ranges,
      },

      series: [
        {
          name: this.props.label || '',
          data: [this.props.value],
          tooltip: {
            valueSuffix: ' °C',
          },
        },
      ],
    });
  };

  render() {
    return (
      <figure className="highcharts-figure">
        <div id="container" className="container" />
        <p className="highcharts-description" />
      </figure>
    );
  }
}

export default MeteoGraf;

MeteoGraf.propTypes = {
  label: PropTypes.string,
  ranges: PropTypes.array,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  value: PropTypes.number,
};
