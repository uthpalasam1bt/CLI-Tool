import React, { useState, useRef } from 'react';
import { Modal } from 'antd';
import config from 'appConfig';
import banner from '../../../assets/images/landing/landingpage-banner.png';

const {
    videos: { learnMore },
    publicBucket
} = config;

const Landing = ({ loggedUser }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const videoRef = useRef(null);

    const handleCancel = () => {
        setModalVisible(false);
        videoRef.current.pause();
    };

    return (
        <section className="about-us-section lgim-bridge-wrap">
            <div className="container-fluid border-blue">
                <div className="about-wrap">
                    <div className="container">
                        <div className="about-row">
                            <div className="left-wrap">
                                <div className="about-container">
                                    <div className="logo-container">
                                        <div className="content">
                                            <h2 className="title">LGIM Bridge</h2>
                                        </div>
                                    </div>
                                    <p className="sub-title">
                                        Understand your challenges, set specific objectives, formulate a bespoke
                                        solution, manage all your risks, monitors your investments… all easily
                                        accessible in one place.
                                    </p>
                                    <div className="button-wrap">
                                        <span className="btn-learn">Learn more</span>
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
                    <source src={`https://${publicBucket}.s3.eu-west-2.amazonaws.com/${learnMore}`} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
            </Modal>
        </section>
    );
};
export default Landing;
