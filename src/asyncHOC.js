import React, {Component} from "react";

const asyncHOC = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }

    componentDidMount() {
      importComponent()
        .then(cmpt => {
          this.setState({component: cmpt.default});
        });
    }
    
    render() {
      const C = this.state.component;
      
      return C ? <C {...this.props} /> : null;
    }
  }
}

export default asyncHOC;