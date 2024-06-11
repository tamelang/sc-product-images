import React, { FC } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
    Grid,
    TextField,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    TableBody
} from "@mui/material";
import { Fonts } from "../enums/fonts";
import { fetchAssetMetadata } from "../actions/api";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DarkLabel from "../components/content/labels/darkLabel";

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
            padding: "20 20 20 20 !important",
            marginBottom: "10px",
        },
        resultRow: {
            padding: "0 0 0 0 !important",
            borderTop: "solid 1px",
            width: "100%"
        },
        result: {
            marginTop: "50px !important"
        },
        label: {
            textAlign: "right",
            paddingRight: "10px",
        },
        submitButton: {
            marginTop: "30px !important",
            marginBottom: "80px !important",
            backgroundColor: "grey !important"
        },
        title: {
            marginTop: "50px",
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
    deliveryAPIImageMetadata: any;
    setDeliveryAPIImageMetadata: () => void;
    imsToken: string;
}

const RequestAssetMetadataForm: FC<Props> = (props) => {
    const classes = useStyles();
    const { deliveryAPIImageMetadata, setDeliveryAPIImageMetadata, imsToken } = props;
    const isEmptyObject = (obj: Object) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    const renderMetadataFields = (metadata: any, type: string) => {
        const object = JSON.parse(JSON.stringify(metadata));

        if (object["metadata"] !== undefined) {
            const values = JSON.parse(object["metadata"]);

            if (values === undefined) {
                return null;
            }

            const renderTableRows = (list: any) => {
                return list.map((item: any, index: any) => (
                    <TableRow key={index}>
                        {Object.entries(item).map(([propKey, propValue]) => (
                            <TableCell key={propKey}>{propValue as any}</TableCell>
                        ))}
                    </TableRow>
                ));
            };

            if (Object.entries(values[type]) === undefined) {
                return null;
            }

            return Object.entries(values[type]).map(([key, value]) => (
                <Grid container spacing={0} className={classes.resultRow} key={key}>
                    <Grid item xs={6} sm={6}>
                        <DarkLabel variant={Fonts.H6}>{key}</DarkLabel>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        {Array.isArray(value) && (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {/* Assuming all objects have the same keys, using the keys of the first object */}
                                            {Object.keys(value[0]).map((header) => (
                                                <TableCell key={header}>{header}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>{renderTableRows(value)}</TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {typeof value === 'object' ?
                        (<TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Size</TableCell>
                                        <TableCell>Height</TableCell>
                                        <TableCell>Left</TableCell>
                                        <TableCell>Manual Crop</TableCell>
                                        <TableCell>Normalized Height</TableCell>
                                        <TableCell>Normalized Width</TableCell>
                                        <TableCell>Width</TableCell>
                                        <TableCell>Top</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(value as any).map(([size, cropData]: any) => (
                                        <TableRow key={size}>
                                            <TableCell>{size}</TableCell>
                                            {Object.values(cropData).map((cell: any, cellIndex: number) => (
                                                <TableCell key={cellIndex}>{cell}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (<p>{JSON.stringify(value)}</p>)}
                    </Grid>
                </Grid>
            ));
        }

        return null;
    };

    return (
        <div className={classes.mainContent}>
            <div className={classes.title}>
                <DarkLabel variant={Fonts.H4}>
                    Request Asset Metadata
                </DarkLabel>
            </div>
            <Formik
                initialValues={{
                    assetId: ''
                }}
                validationSchema={
                    Yup.object({
                        assetId: Yup.string().required('Required field')

                    })
                }
                onSubmit={async (values) => {
                    await fetchAssetMetadata(setDeliveryAPIImageMetadata, values, imsToken);
                }}
            >
                <Form className={classes.formContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} className={classes.formRow}>
                            <Field id="assetId" name="assetId" as={TextField} variant="outlined" placeholder="Asset ID" fullWidth />
                            <ErrorMessage name="assetId" component="div" className={classes.error} />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" className={classes.submitButton}>
                        Get Asset Metadata
                    </Button>
                </Form>
            </Formik>
            {deliveryAPIImageMetadata && !isEmptyObject(deliveryAPIImageMetadata) &&
                <>
                    <div className={classes.title}>
                        <DarkLabel variant={Fonts.H4}>
                            Asset Metadata
                        </DarkLabel>
                    </div>
                    <Grid container spacing={12} className={classes.result}>
                        {renderMetadataFields(deliveryAPIImageMetadata, "assetMetadata")}
                    </Grid>
                    <div className={classes.title}>
                        <DarkLabel variant={Fonts.H4}>
                            Repository Metadata
                        </DarkLabel>
                    </div>
                    <Grid container spacing={12} className={classes.result}>
                        {renderMetadataFields(deliveryAPIImageMetadata, "repositoryMetadata")}
                    </Grid>
                </>
            }
        </div>
    );
}

export default RequestAssetMetadataForm;
