import React from 'react';
import {GridList, GridListTile, Card, CardHeader, Avatar, CardContent, Typography, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Skeleton from '@material-ui/lab/Skeleton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const TweetImageGalleryStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        cursor: "pointer"
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    videoIconWrapper: {
        position: "absolute",
        zIndex: 10,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        '&:hover': {
            '& $videoIcon': {
                color: theme.palette.secondary.light
            },
        }
    },
    videoIcon: {
        display: "flex",
        margin: "0 auto",
        color: theme.palette.grey[100]
    }
}));
const TweetImageGallery = (props) => {
    const classes = TweetImageGalleryStyles();
    let size = 2.5;
    if (props.media.length < 3) {
        size = props.media.length;
    }

    const showTweetMedia = () => {
        props.setMediaAreaData(props.media);
    }
    return(
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={size} onClick={showTweetMedia}>
                {props.media.map((tile, i) => (
                    <GridListTile key={tile.id}>
                        {tile.type === 'video' && <Box className={classes.videoIconWrapper}>
                            <PlayCircleOutlineIcon className={classes.videoIcon} style={{ fontSize: 60}}/>
                        </Box>}
                        <img src={tile.media_url_https}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

const TweetStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    avatar: {
        backgroundColor: red[500],
    },
    headerTitle: {
        color: theme.palette.primary.light
    },
    controls: {
        display: "flex",
        justifyContent: "space-between",
        margin: "auto 0 0"
    },
    control: {
        display: "flex",
        padding: "16px 12px",
        "& a":{
            color: theme.palette.secondary.light,
            display: "contents"
        },
        "& svg":{
            margin: "0 4px"
        }
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }

}));
const Tweet = (props) => {
    const classes = TweetStyles();
    return (
        <>
            {props.isLoading ? (
                <>
                    <Card className={classes.root}>
                        <CardHeader avatar={<Skeleton variant="circle" width={40} height={40} />}
                                    title={<Skeleton variant="text" width={300} />}
                                    subheader={<Skeleton variant="text" width={300} />}
                        />
                        <CardContent>
                            <Skeleton variant="rect" width={360} height={118} />
                        </CardContent>
                    </Card>
                </>
            ) : (
                <Card className={classes.root}>
                    <CardHeader avatar={<Avatar aria-label="recipe" className={classes.avatar} src={props.user.profile_image_url_https}>R</Avatar>}
                        title={<a className={classes.headerTitle} href={props.user.url} target="_blank">{props.user.name}</a>}
                        subheader={props.created_at}
                    />
                    <CardContent className={classes.content}>
                        {props.media?.length &&
                        <TweetImageGallery media={props.media} setMediaAreaData={props.setMediaAreaData} />
                        }
                        <Typography className={classes.control} variant="body2" component="p"
                                    dangerouslySetInnerHTML={{__html:props.full_text}}>
                        </Typography>
                        <Box className={classes.controls}>
                            <Typography className={classes.control}>
                                <FavoriteIcon color="action"/>
                                {props.favorite_count}
                            </Typography>
                            <Typography className={classes.control}>Retweets: {props.retweet_count}</Typography>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </>
    );
}

export default Tweet;
