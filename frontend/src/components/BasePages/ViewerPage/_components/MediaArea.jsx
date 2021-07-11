import React from "react";
import {connect} from "react-redux";
import {Modal, Container, Slide, Box, Fade, Backdrop} from "@material-ui/core";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {createStyles, withStyles} from "@material-ui/styles";
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
            margin: 10,
            [theme.breakpoints.down('xs')]: {
                margin: 0,
                fontSize: 80,
                opacity: 0.9,
            },

        },
        arrowWrapper:{
            height: "100%",
            display: "flex",
            alignItems: "center",
            margin: 10,
            "&:hover": {
                cursor: "pointer",
                "& $arrow": {
                    opacity: 0.95,
                }
            },
            [theme.breakpoints.down('xs')]: {
                height: "50%",
                margin: 0,
                position: 'absolute',
                zIndex: 100,
            },
        },
        slider: {
            display: "flex",
            width: "100%",
            height: "100%",
            position: "relative",

        },
        slide: {
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
        },
        slideContent: {
            position: "relative",
            transform: "translateY(-50%)",
            top: "50%",
            "& img": {
                width: "100%",
            }
        },
        modalBackdrop: {
            [theme.breakpoints.down('xs')]: {
                zIndex: 10,
                backgroundColor: "rgba(0, 0, 0, 0)",
            },
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
        }
    })
}


const CustomBackdrop = withStyles(styles)(class extends React.Component {
    render() {
        const { classes } = this.props;
        return <Backdrop {...this.props} classes={{root: classes.modalBackdrop}} />
    }
})


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
                <Modal open={isOpen}
                       onClose={this.handleClose.bind(this)}
                       BackdropComponent={CustomBackdrop}
                >
                    <Container maxWidth="lg" className={classes.container}>
                        <Box className={classes.root}>
                            <Fade in={this.state.slideStatus > 0}>
                                <Box onClick={this.prev.bind(this)}
                                     className={classes.arrowWrapper}
                                     style={{left: 0}}>
                                    <ArrowLeftIcon className={classes.arrow}/>
                                </Box>
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
                                <Box onClick={this.next.bind(this)}
                                     className={classes.arrowWrapper}
                                     style={{right: 0}}>
                                    <ArrowRightIcon className={classes.arrow}/>
                                </Box>
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