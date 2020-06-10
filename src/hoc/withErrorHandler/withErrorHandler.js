import React from 'react'
import Aux from '../AuxComponent/Aux'
import Modal from '../../components/Ui/Modal/Modal'


const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
      active: false
    }

    // componentWillMount () {
    //     this.reqInterceptor = axios.interceptors.request.use( req => {
    //         this.setState( { error: null } );
    //         return req;
    //     } );
    //     this.resInterceptor = axios.interceptors.response.use( res => res, error => {
    //         this.setState( { error: error } );
    //     } );
    // }

    componentDidMount() {
      this.setState({ active: true })
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        this.state.active
          ? <Aux>
            <Modal
              show={this.state.error}
              modalClosed={this.errorConfirmedHandler}>
              {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Aux>
          : null
      );
    }
  }
}

export default withErrorHandler;
