import React from 'react';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {makeStyles} from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";


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
    controls: {
        display: "flex",
        justifyContent: "space-between",
        margin: "auto 0 0"
    },
    control: {
        padding: 12,
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
                        title={<a href={props.user.url} target="_blank">{props.user.name}</a>}
                        subheader={props.created_at}
                    />
                    <CardContent className={classes.content}>
                        {props.media?.length &&
                        <TweetImageGallery media={props.media} setMediaAreaData={props.setMediaAreaData} />
                        }
                        <Typography className={classes.control} variant="body2" color="textSecondary" component="p">
                            {props.full_text}
                        </Typography>
                        <Box className={classes.controls}>
                            <Typography>
                                <IconButton color='secondary' disabled aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                {props.favorite_count}
                            </Typography>
                            <Typography className={classes.control}>Retweets: {props.retweet_count}</Typography>
                            <Typography className={classes.control}><Link href={`https://twitter.com/${props.user.screen_name}/status/${props.id}/`} target="_blank">Link</Link></Typography>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </>
    );
}

export default Tweet;
