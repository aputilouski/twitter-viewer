import React from "react";
import {
    Avatar, Box,
    Grid,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import reactIcon from './_accets/reactjs.png'
import reduxIcon from './_accets/reduxjs.png'
import materialuiIcon from './_accets/material-ui.png'
import djangoIcon from './_accets/django.png'
import drfIcon from './_accets/drf.png'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';


const AboutPage = () => {
    return (
        <Box>
            <Box mb={6}>
                <Box mt={6} mb={4}>
                    <Typography variant="h4" component="h2">About</Typography>
                    <br/>
                    <Typography variant="body1" component="p">Twitter Viewer is a project that demonstrates React interaction with Django.</Typography>
                    <Typography variant="body1" component="p">This application does not contain any business solutions.</Typography>
                </Box>
                <Typography variant="subtitle1" component="h4">Application capabilities:</Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><BookmarkBorderIcon /></ListItemIcon>
                        <Typography variant="body1" component="p">On the main page you can see the username input field, where you can enter the name of the interested Twitter user and see his timeline.</Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><BookmarkBorderIcon /></ListItemIcon>
                        <Typography variant="body1" component="p">Timeline is displayed as pages that show 12 tweets per page. Using the paginator, you can switch between pages.</Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><BookmarkBorderIcon /></ListItemIcon>
                        <Typography variant="body1" component="p">Click on the picture for a more detailed view.</Typography>
                    </ListItem>
                </List>
            </Box>
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h4" component="h2">Backend</Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar><Avatar src={djangoIcon} /></ListItemAvatar>
                                <Link href="https://www.djangoproject.com/" target="_blank">Django</Link>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar><Avatar src={drfIcon} /></ListItemAvatar>
                                <Link href="https://www.django-rest-framework.org/" target="_blank">Django Rest Framework</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://python-twitter.readthedocs.io/en/latest/" target="_blank">
                                    <ListItemText inset primary="python-twitter" />
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://developer.twitter.com/en/docs/authentication/oauth-1-0a" target="_blank">
                                    <ListItemText inset primary="OAuth 1.0a" />
                                </Link>
                            </ListItem>
                            <ListItem>
                                <ListItemText inset primary="JWT(JSON Web Tokens)" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" component="h2">Frontend</Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar><Avatar src={reactIcon} /></ListItemAvatar>
                                <Link href="https://reactjs.org/" target="_blank">React JS</Link>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar><Avatar src={reduxIcon} /></ListItemAvatar>
                                <Link href="https://redux.js.org/" target="_blank">Redux JS</Link>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar><Avatar src={materialuiIcon} /></ListItemAvatar>
                                <Link href="https://material-ui.com/" target="_blank">Material-UI</Link>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
};


export default AboutPage;