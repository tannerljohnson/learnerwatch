import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { API } from "aws-amplify";

export default class Dashboard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  async componentDidMount() {
    // verify authenticated
    try {
      await this.name();
      // console.log("name is: " + name);
      // this.setState({ name: name });
    } catch (e) {
      alert(e);
    }
    // stop loading
  }

  name() {
    let apiName = 'store';
    let path = '/grade-events';
    let myInit = {
        headers: {
          'Content-Type' : 'application/json',
        }
    }
    API.get(apiName, path, myInit).then(response => {
        console.log(response.body);
        this.setState({name: response.body});
        return response.body;
    }).catch(error => {
        console.log(error.response)
        return "ERROR";
    });
  }

  renderName() {
    return this.state.name;
  }

  render () {
    return (
      <Card>
          <CardHeader title={"Welcome to Learner Watch " + this.renderName()} />
          <CardContent>Your centralized home for analyzing caliper-generated learner data.</CardContent>
      </Card>
    );
  }
}
