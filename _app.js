import { Container, createTheme, NextUIProvider, Text, Grid, Button } from "@nextui-org/react";
import { useSSR } from "@nextui-org/react";

import FileUploadButton from "./FileUploadButton";

import App from "./App";

const theme = createTheme({
    type: "dark", // it could be "light" or "dark"
    theme: {
        colors: {
            primary: "#4ADE7B",
            secondary: "#F9CB80",
            error: "#FCC5D8",
        },
    },
});

function MyApp({ Component, pageProps }) {
    const { isBrowser } = useSSR();
    return (
        // isBrowser && (
        //     <NextUIProvider>
        //         <Container>
        //             <Text h1> Листы согласования </Text>
        //             <Grid.Container gap={2}>
        //                 <Grid>
        //                     <FileUploadButton />
        //                 </Grid>
        //                 {/* <Grid>
        //                     <Button>Удалить лист согласования</Button>
        //                 </Grid> */}
        //             </Grid.Container>
        //         </Container>
        //         <Container lg gap={0} css={{ mt: "$0" }}>
        //             <App {...pageProps} />
        //         </Container>
        //     </NextUIProvider>
        // )
        // <NextUIProvider theme={theme}>
        //     <h1> Активные листы согласования </h1>
        //     <App />
        // </NextUIProvider>

        <div> ACCESS DENIED</div>
    );
}

export default MyApp;
