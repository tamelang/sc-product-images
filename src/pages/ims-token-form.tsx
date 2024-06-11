import React, { FC } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Grid, TextField, Button } from "@mui/material";
import { Fonts } from "../enums/fonts";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DarkLabel from "../components/content/labels/darkLabel";
import * as Yup from 'yup';

const useStyles = makeStyles(() =>
    createStyles({
        mainContent: {
            backgroundColor: '#f5f5f5',
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
    imsToken: string;
    setImsToken: (imsToken: string) => void;
}

const ImsTokenForm: FC<Props> = (props) => {
    const classes = useStyles();
    const { imsToken, setImsToken } = props;

    return (
        <div className={classes.mainContent}>
            <div className={classes.title}>
                <DarkLabel variant={Fonts.H4}>
                    IMS Token
                </DarkLabel>
            </div>
            <Formik
                initialValues={{
                    imsToken: imsToken,
                }}
                validationSchema={
                    Yup.object({
                        imsToken: Yup.string().required('Required field')
                    })
                }
                onSubmit={async (values) => {
                    setImsToken(values.imsToken);
                }}
            >
                <Form className={classes.formContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} className={classes.formRow}>
                            <Field id="imsToken" name="imsToken" as={TextField} variant="outlined" placeholder="IMS Token" fullWidth />
                            <ErrorMessage name="imsToken" component="div" className={classes.error} />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" className={classes.submitButton}>
                        Submit IMS Token
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}

export default ImsTokenForm;
