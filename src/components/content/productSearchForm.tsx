import React, { FC } from "react";
import { Button, Divider, Grid, InputAdornment, Select, TextField } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Fonts } from "../../enums/fonts";
import {  Form, Formik } from "formik";
import { searchAssets } from "../../actions/api";
import { Brands } from "../../enums/brands";
import { ImageTransformations } from "../../enums/imageTransformations";
import { Search } from "@mui/icons-material";
import DarkLabel from "./labels/darkLabel";
import Separator from "./separator";
import MenuItem from "@mui/material/MenuItem";
import {Colors} from "../../enums/colors";

const useStyles = makeStyles(() =>
    createStyles({
        searchForm: {
            backgroundColor: 'white',
            border: "1px rounded",
            padding: "7%"
        },
        formField: {
          width: "100%",
          float: 'left',
          backgroundColor: '#FAFAFA',
        },
        formRow: {
            width: "100%",
            marginBottom: "30px !important"
        },
        submitButton: {
            marginTop: "40px !important",
            backgroundColor: "grey !important"
        },
        select: {
            height: "30px",
            width: "100%",
            backgroundColor: '#FAFAFA',
            fontSize: "larger",
            float: 'left'
        }
    })
);

type Props = {
    imageTransformation: ImageTransformations;
    setImageTransformation: (imageTransformation: ImageTransformations) => void;
    backgroundColor: Colors;
    setBackgroundColor: (color: Colors) => void;
    setDeliveryAPISearchResult: () => void;
    imsToken: string;
}

const ProductSearchForm: FC<Props> = (props) => {
    const classes = useStyles();
    const { imageTransformation, imsToken, setDeliveryAPISearchResult, setImageTransformation, backgroundColor, setBackgroundColor } = props;

    return (
        <div className={classes.searchForm}>
            <DarkLabel variant={Fonts.H5}>Search</DarkLabel>
            <Separator/>
            <Formik
                initialValues={{
                    brand: Brands.BOLIA
                }}
                onSubmit={async (values) => {
                    await searchAssets(setDeliveryAPISearchResult, values, imsToken)
                }}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} className={classes.formRow}>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        )
                                    }}
                                    label="Search"
                                    variant="outlined"
                                    className={classes.formField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.formRow}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.formRow}>
                                <DarkLabel variant={Fonts.H5}>Brands</DarkLabel>
                                <Separator/>
                                <Select
                                    value={values.brand}
                                    className={classes.select}
                                    onChange={(event: any) => setFieldValue("brand", event.target.value)}>
                                    <MenuItem value={Brands.BOLIA}>BOLIA</MenuItem>
                                    <MenuItem value={Brands.COALESSE}>COALESSE</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.formRow}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.formRow}>
                                <DarkLabel variant={Fonts.H5}>Image Transformations</DarkLabel>
                                <Separator/>
                                <Select
                                    value={imageTransformation}
                                    className={classes.select}
                                    onChange={(event: any) => setImageTransformation(event.target.value)}>
                                    <MenuItem value={ImageTransformations.UP}>UP</MenuItem>
                                    <MenuItem value={ImageTransformations.DOWN}>DOWN</MenuItem>
                                    <MenuItem value={ImageTransformations.CENTER}>CENTER</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.formRow}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.formRow}>
                                <DarkLabel variant={Fonts.H5}>Debug</DarkLabel>
                                <Separator/>
                                <Select
                                    value={backgroundColor}
                                    className={classes.select}
                                    onChange={(event: any) => setBackgroundColor(event.target.value)}>
                                    <MenuItem value={Colors.STEELCASE_GREY}>STEELCASE GREY</MenuItem>
                                    <MenuItem value={Colors.WHITE}>WHITE</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" className={classes.submitButton}>
                            Search
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProductSearchForm;
