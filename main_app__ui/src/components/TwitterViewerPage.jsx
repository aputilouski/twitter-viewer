import Header from "./Header/Header"
import Container from "@material-ui/core/Container";
import Content from "./Content";
import React from "react";
import AuthChecker from "../hoc/AuthChecker";


const TwitterViewerPage = () => {
    return(
        <>
            <Header />
            <Container maxWidth="lg">
                <Content />
            </Container>
        </>
    )
}

export default AuthChecker(TwitterViewerPage)
