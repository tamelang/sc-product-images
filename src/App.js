import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Divider, Grid } from "@mui/material";
import { createStyles, makeStyles, ThemeProvider } from "@mui/styles";
import { Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { AssetData } from "./models/deliveryAPISearchResultData";
import { fetchAssets } from "./actions/api";
import { useAppDispatch, useAppSelector } from "./redux/redux-hooks";
import { imsActions } from "./store/ims-actions";
import TopNav from "./components/structure/topNav";
import RequestAssetMetadataForm from "./pages/requestAssetMetadataForm";
import ImsTokenForm from "./pages/ims-token-form";
import ProductDetailsPage from "./pages/product-details-page";
import ProductListingPage from "./pages/product-listing-page";
import HeaderImage from './static/header.png'
import './App.css';

const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                fontFamily: 'arial',
            }
        }
    }
});

const useStyles = makeStyles(() =>
    createStyles({
        mainContent: {
            textAlign: "-webkit-center",
            height: "100%",
            backgroundColor: '#f5f5f5'
        },
        divider: {
            marginTop: '3%'
        }
    })
);

function App() {
    const classes = useStyles();
    const imsToken = useAppSelector(state => state.imsToken).imsToken;
    const dispatch = useAppDispatch();
    const [deliveryAPIImageMetadata, setDeliveryAPIImageMetadata] = useState({});
    const [deliveryAPISearchResult, setDeliveryAPISearchResult] = useState([]);
    const [deliveryAPISearchImages, setDeliveryAPISearchImages] = useState([]);

    useEffect(() => {
        setDeliveryAPISearchImages([]);

        if (deliveryAPISearchResult.hits && deliveryAPISearchResult.hits.results.length > 0) {
            Promise.all(
                deliveryAPISearchResult.hits.results.map((asset: AssetData) => {
                    const assetId = replacePrefix(asset.assetId);

                    return fetchAssets({ assetId: replacePrefix(assetId), seoFileName: "preview.png" })
                        .then(url => {
                            if (url !== undefined) {
                                return ({ assetId: assetId, assetMetadata: asset.assetMetadata, src: url });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                })
            )
            .then(images => {
                setDeliveryAPISearchImages(images.filter(image => image !== undefined));
            })
        }
    }, [deliveryAPISearchResult]);

    function replacePrefix(assetId: string): string {
        return assetId.replaceAll("urn:aaid:aem:", "");
    }

    const setImsToken = (imsToken: string): void => {
        dispatch(imsActions.setImsToken({ imsToken: imsToken }));
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Grid container>
                <Grid item xs={12}>
                    <TopNav/>
                </Grid>
                <Grid item xs={12} direction="column" className={classes.mainContent}>
                    <Grid container xs={12} sm={12}>
                        <Grid item xs={12} sm={12}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '500px', // Adjust height as needed
                                    backgroundImage: `url(${HeaderImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundColor: "black"
                                }}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.divider}>
                        <Divider />
                    </div>
                    <Grid item>
                        <Routes>
                            <Route path="/" element={<ProductListingPage assets={deliveryAPISearchImages} imsToken={imsToken} setDeliveryAPISearchResult={setDeliveryAPISearchResult} />} />
                            <Route path="/product-details/:assetId" element={<ProductDetailsPage />} />
                            <Route path="/asset-metadata" element={<RequestAssetMetadataForm deliveryAPIImageMetadata={deliveryAPIImageMetadata} setDeliveryAPIImageMetadata={setDeliveryAPIImageMetadata} imsToken={imsToken} />} />
                            <Route path="/ims-token" element={<ImsTokenForm imsToken={imsToken} setImsToken={setImsToken} />} />
                        </Routes>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
