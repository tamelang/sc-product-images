import React, { FC } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Grid, TextField, Button } from "@mui/material";
import { Fonts } from "../enums/fonts";
import { fetchAsset } from "../actions/api";
import { DeliveryAPIImageData } from "../models/deliveryAPIImageData";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DarkLabel from "../components/content/labels/darkLabel";
import Image from "../components/content/image";
import * as Yup from 'yup';

const useStyles = makeStyles(() =>
    createStyles({
        mainContent: {
            backgroundColor: '#fff',
            minHeight: "100vh",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        formContainer: {
            width: "100%",
            marginTop: "20px"
        },
        formRow: {
            marginBottom: "20px",
        },
        label: {
            textAlign: "right",
            paddingRight: "10px",
        },
        submitButton: {
            marginTop: "40px !important",
            backgroundColor: "grey !important"
        },
        title: {
            marginBottom: "30px"
        },
        previewImage: {
            marginBottom: "30px",
            maxWidth: "100%",
            height: "auto",
            width: "auto"
        },
        error: {
            color: "red",
            fontWeight: "600"
        }
    })
);

type Props = {
    deliveryAPIImage: DeliveryAPIImageData;
    setDeliveryAPIImage: () => void;
}

const RequestAssetForm: FC<Props> = (props) => {
    const classes = useStyles();
    const { deliveryAPIImage, setDeliveryAPIImage } = props;

    return (
        <div className={classes.mainContent}>
            <div className={classes.title}>
                <DarkLabel variant={Fonts.H4}>
                    Request Asset
                </DarkLabel>
            </div>
            <div className={classes.previewImage}>
                <Image src={deliveryAPIImage.src} />
            </div>
            <Formik
                initialValues={{
                    assetId: '',
                    seoFileName: '',
                    crop: '',
                    width: '',
                    quality: ''
                }}
                validationSchema={
                    Yup.object({
                        assetId: Yup.string().required('Required field'),
                        seoFileName: Yup.string().required('Required field')
                    })
                }
                onSubmit={async (values) => {
                    await fetchAsset(setDeliveryAPIImage, values);
                }}
            >
                <Form className={classes.formContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} className={classes.formRow}>
                            <Field id="assetId" name="assetId" as={TextField} variant="outlined" placeholder="Asset ID" fullWidth />
                            <ErrorMessage name="assetId" component="div" className={classes.error} />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.formRow}>
                            <Field id="seoFileName" name="seoFileName" as={TextField} variant="outlined" placeholder="SEO File Name" fullWidth />
                            <ErrorMessage name="seoFileName" component="div" className={classes.error} />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.formRow}>
                            <Field id="crop" name="crop" as={TextField} variant="outlined" placeholder="Smart Crop (X:Y) or Absolute Crop (Xp,Yp,Zp,Qp)" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.formRow}>
                            <Field id="width" name="width" as={TextField} variant="outlined" placeholder="Width" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.formRow}>
                            <Field id="quality" name="quality" as={TextField} variant="outlined" placeholder="Quality" fullWidth />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" className={classes.submitButton}>
                        Get Asset
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}

export default RequestAssetForm;
