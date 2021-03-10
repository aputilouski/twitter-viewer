import React from "react";
import {connect} from "react-redux";
import Modal from "@material-ui/core/Modal";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Box from "@material-ui/core/Box";
import {createStyles, withStyles} from "@material-ui/styles";
import Fade from "@material-ui/core/Fade";
import {compose} from "redux";


const styles = (theme) => {
    return createStyles({
        root: {
            display: 'flex',
            justifyContent: "space-between",
            height: "100%",
            alignItems: "center",
        },
        container: {
            height: "100%",
            "&:focus": {
                outline: "none",
            }
        },
        arrow: {
            fontSize: 120,
            color: "white",
            opacity: 0.5,
            "&:hover": {
                opacity: 0.95,
                cursor: "pointer"
            }
        },
        slider: {
            display: "flex",
            width: "100%",
            height: "100%",
            position: "relative"

        },
        slide: {
            position: "absolute",
            height: "100%",

        },
        slideContent: {
            position: "relative",
            transform: "translateY(-50%)",
            top: "50%",
            "& img": {
                width: "100%",
            }
        }
    })
}

class MediaArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideStatus: 0
        };
    }
    handleClose = () => {
        this.props.setMediaAreaData(null);
        this.setState({slideStatus: 0});
    }
    next = () => {
        if (this.state.slideStatus < this.props.mediaArea?.media.length)
            this.setState({slideStatus: this.state.slideStatus + 1});
    }
    prev = () => {
        if (this.state.slideStatus > 0)
            this.setState({slideStatus: this.state.slideStatus - 1});
    }
    render() {
        const { classes } = this.props;
        const isOpen = !!this.props.mediaArea?.media;
        return (
            <>
                <Modal open={isOpen} onClose={this.handleClose.bind(this)}>
                    <Container maxWidth="lg" className={classes.container}>
                        <Box className={classes.root}>
                            <Fade in={this.state.slideStatus > 0}>
                                <Box><ArrowLeftIcon className={classes.arrow} onClick={this.prev.bind(this)}/></Box>
                            </Fade>
                            <Box className={classes.slider}>
                                {this.props.mediaArea.media?.map((item, i) => {
                                    return (
                                        <Slide direction={this.state.slideStatus === i ? "left" : "right"}
                                               in={this.state.slideStatus === i}
                                               className={classes.slide}
                                               key={i}
                                        >
                                            <Box>
                                                <div className={classes.slideContent}>
                                                    {item.type === "photo" && <img src={item.media_url_https}/>}
                                                    {item.type === "video" && <video autoPlay controls src={item.video_info.url}></video>}
                                                </div>
                                            </Box>
                                        </Slide>
                                    )
                                })
                                }
                            </Box>
                            <Fade in={(this.props.mediaArea?.media?.length - 1) > this.state.slideStatus}>
                                <Box><ArrowRightIcon className={classes.arrow} onClick={this.next.bind(this)}/></Box>
                            </Fade>
                        </Box>
                    </Container>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
        mediaArea: state.twitterPage.mediaArea
    })

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
)(MediaArea);