import React, { useState, useRef } from 'react';
import { Modal } from 'antd';
import config from 'appConfig';
import { history } from '../../redux/store';
import banner from '../../assets/images/landing/landingpage-banner.png';
import logo from '../../assets/images/logo-nav.svg';

const {
    videos: { learnMore },
    publicBucket
} = config;

const AboutUsComponent = ({ loggedUser }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const videoRef = useRef(null);

    const openVideoModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
        videoRef.current.pause();
    };

    return (
        <section className="about-us-section">
            <div className="container-fluid border-blue">
                <div className="about-wrap">
                    <div className="container">
                        <div className="about-row">
                            <div className="left-wrap">
                                <div className="about-container">
                                    <div className="logo-container">
                                        <img src={logo} alt="logo" className="img" />
                                        <div className="content">
                                            <h2 className="title">NavGuide</h2>
                                            <h2 className="sub-text">Manage your DB pension scheme</h2>
                                        </div>
                                    </div>
                                    <p className="sub-title">
                                        Understand your challenges, set specific objectives, formulate a bespoke
                                        solution, manage all your risks, monitor your investments… all easily accessible
                                        in one place.
                                    </p>
                                    <div className="button-wrap">
                                        <span
                                            className="btn-learn"
                                            onClick={() => {
                                                // history.push('/coming-soon');
                                                //window.open('https://vimeo.com/402480167/8c7c2b95ae', '_blank'); //tp2-1822
                                                openVideoModal();
                                            }}
                                        >
                                            Learn more
                                        </span>
                                        {!loggedUser && (
                                            <span
                                                className="btn-register"
                                                onClick={() => {
                                                    history.push('/register');
                                                }}
                                            >
                                                Register Now
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="right-wrap">
                                <img alt="about-img" className="image img-fluid" src={banner} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Learn more" visible={modalVisible} onCancel={handleCancel} footer={null} width="700px">
                <video ref={videoRef} width="640" height="360" controls autoPlay>
                    {/* {tp2-1822} */}
                    <source src={`https://${publicBucket}.s3.eu-west-2.amazonaws.com/${learnMore}`} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
            </Modal>
        </section>
    );
};

export default AboutUsComponent;
