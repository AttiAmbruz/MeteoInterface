import React from 'react';
import request from 'superagent';
import MeteoGraf from '../MeteoGraf';
import { tempUrl } from '../../configs/main';

class WatterTemp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  formatDate = currentdate =>
    `Last Sync: ${currentdate.getDate()}/${currentdate.getMonth() +
      1}/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

  getData = () => {
    request
      .get(tempUrl)
      .then(data => {
        if (data) {
          const json = JSON.parse(data);
          this.setState({
            value: json.temp_ds2 || 0,
            message: `Last sync: ${this.formatDate(new Date())}`,
          });
        }
      })
      .catch(() => {
        this.setState({ message: 'Offline' });
      });
  };

  render() {
    const ranges = [
      {
        from: 0,
        to: 20,
        color: '#55BF3B', // green
      },
      {
        from: 20,
        to: 30,
        color: '#DDDF0D', // yellow
      },
      {
        from: 30,
        to: 50,
        color: '#DF5353', // red
      },
    ];
    return (
      <>
        <MeteoGraf
          label="Bazén"
          minValue={0}
          maxValue={50}
          ranges={ranges}
          value={this.state.value}
        />
        <p>{this.state.message}</p>
      </>
    );
  }
}

export default WatterTemp;
