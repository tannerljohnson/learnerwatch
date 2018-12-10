import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { API } from "aws-amplify";

export default class Dashboard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      records: []
    };
  }

  async componentDidMount() {
    // verify authenticated
    try {
      await this.getRecords();
    } catch (e) {
      alert(e);
    }
    // stop loading
  }

  getRecords() {
    let apiName = 'store';
    let path = '/grade-events';
    let myInit = {
        headers: {
          'Content-Type' : 'application/json',
        }
    }
    API.get(apiName, path, myInit).then(response => {
        console.log(response.body.records);
        this.setState({
          records: response.body.records
        });
    }).catch(error => {
        console.log(error.response)
    });
  }

  renderRecords() {
    return this.state.name;
  }

  render () {
    return (
      <Card>
          <CardHeader title={"Welcome to Learner Watch"} />
          <CardContent>Your centralized home for analyzing caliper-generated learner data.</CardContent>
      </Card>
    );
  }
}
