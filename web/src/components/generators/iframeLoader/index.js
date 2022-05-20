import React, { Component } from 'react';
import Iframe from 'react-iframe';
class IframeLoader extends Component {
    render() {
        return (
            <Iframe
                url={this.props.src}
                width="100%"
                height="570px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
            />
        );
    }
}
export default IframeLoader;
