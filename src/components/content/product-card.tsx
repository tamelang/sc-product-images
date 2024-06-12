import React, { FC } from "react";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Fonts } from "../../enums/fonts";
import { Link } from "react-router-dom";
import DarkLabel from "./labels/dark-label";
import PreviewImage from "./preview-image";
import ProductCardOptions from "./product-card-options";


const useStyles = makeStyles(() =>
    createStyles({
        cardHeaderButtonFirst: {
            float: "left"
        },
        cardHeaderButtonSecond: {
            float: "right"
        }
    })
);

type Props = {
    assetId: string;
    assetMetadata: any;
    src: string;
    imageTransformation: string;
    backgroundColor: string;
}

// @ts-ignore
const ProductCard: FC<Props> = (props) => {
    const classes = useStyles();
    const { assetId, assetMetadata, src , imageTransformation, backgroundColor } = props;

    return (
        <Grid container xs={12} direction="column">
            <Button component={Link} to={`/product-details/${assetId}`} state={{ assetId: assetId, src: src, assetMetadata: assetMetadata }}>
                <Card variant="outlined">
                    <CardContent>
                        <Grid container xs={12} direction="row">
                            <Grid item xs={6} sm={6}>
                                <Button
                                    style={{
                                        backgroundColor: "#f5f5f5",
                                        color: "black",
                                        borderColor: "#d3d3d3"
                                    }}
                                    className={classes.cardHeaderButtonFirst}
                                    variant="outlined">
                                    BUY ONLINE
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <ProductCardOptions />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <PreviewImage src={src ? src : ""} imageTransformation={imageTransformation} backgroundColor={backgroundColor}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DarkLabel variant={Fonts.H5}>
                                {assetMetadata["dc:description"]}
                            </DarkLabel>
                        </Grid>
                    </CardContent>
                </Card>
            </Button>
        </Grid>
    )
}

export default ProductCard;

