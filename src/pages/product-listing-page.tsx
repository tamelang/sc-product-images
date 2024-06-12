import React, {FC, useState} from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { DeliveryApiImageData } from "../models/delivery-api-Image-data";
import { ImageTransformations } from "../enums/image-transformations";
import ProductCard from "../components/content/product-card";
import Separator from "../components/content/separator";
import ProductSearchForm from "../components/content/product-search-form";
import {Colors} from "../enums/colors";

const useStyles = makeStyles(() =>
    createStyles({
        mainContent: {
            backgroundColor: '#f5f5f5',
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            padding: "2%"
        },

        label: {
            textAlign: "right",
            paddingRight: "10px",
        },
        title: {
            marginBottom: "30px"
        },
        previewImage: {
            marginBottom: "30px",
            maxWidth: "100%",
            height: "auto",
            width: "auto"
        }
    })
);

type Props = {
    assets: DeliveryApiImageData[];
    imsToken: string;
    setDeliveryAPISearchResult: () => void;
}

const ProductListingPage: FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { assets, imsToken, setDeliveryAPISearchResult } = props;
    const [imageTransformation, setImageTransformation] = useState(ImageTransformations.CENTER);
    const [backgroundColor, setBackgroundColor] = useState(Colors.STEELCASE_GREY);

    return (
        <div className={classes.mainContent}>
            <Separator />
            <Grid container xs={12} rowSpacing={2} direction="row">
                <Grid item xs={2} sm={2}>
                    <ProductSearchForm imsToken={imsToken} setDeliveryAPISearchResult={setDeliveryAPISearchResult} imageTransformation={imageTransformation} setImageTransformation={setImageTransformation} backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor} />
                </Grid>
                <Grid item xs={1} sm={1}/>
                <Grid item xs={9} sm={9}>
                    {assets && assets.length > 0 &&
                        <Grid container xs={12} spacing={2} direction="row">
                            {assets.map((asset) =>
                                <Grid item xs={3} sm={3}>
                                    <ProductCard assetId={asset.assetId} assetMetadata={asset.assetMetadata} src={asset.src} imageTransformation={imageTransformation} backgroundColor={backgroundColor} />
                                </Grid>
                            )}
                        </Grid>
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default ProductListingPage;
