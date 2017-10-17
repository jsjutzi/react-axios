import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';
import {getCustomerList, postCustomer, getCustomer, deleteCustomer, updateCustomer} from './customers';



class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }

      this.startNewCustomer = this.startNewCustomer.bind(this);
      this.removeCustomer = this.removeCustomer.bind(this);
  }

  componentDidMount() {
    getCustomerList().then(list => {
      this.setState({customerList: list});
    })
  }

  startNewCustomer() {
    this.setState({creating: true, initialLoad: false, currentCustomer: null});
    }

  createCustomer(customer){
    postCustomer(customer).then(response => {
      getCustomerList.then(list =>{
        this.setState({initialLoad: true, creating: false, customerList: list});
      })
    })
  }
    selectCustomer(id){
      getCustomer(id).then(response => {
        this.setState({currentCustomer: response, initialLoad: false});
      })
    }
    saveEdit(id, Obj){
      updateCustomer(id,Obj).then(updatedCustomer => {
        getCustomerList().then(list => {
          this.setState({customerList: list, currentCustomer: updatedCustomer});
        })
      })
    }
    removeCustomer(id){
      deleteCustomer(id);
    }

  



  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List
              customerList={this.state.customerList || []}
              startNewCustomer={this.startNewCustomer}/>
            : null
          }
          <Workspace createCustomer={this.state.createCustomer}
                     initialLoad={this.state.initialLoad}
                     currentCustomer={this.state.currentCustomer}
                     creating={this.state.creating}
                     saveEdit={this.saveEdit}
                  />
        </div>
      </div>
    )
  }
}


export default App;
