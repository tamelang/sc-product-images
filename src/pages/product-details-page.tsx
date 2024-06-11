import React, { FC, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Fonts } from "../enums/fonts";
import {
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    ListItemText,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    MenuItem
} from "@mui/material";
import DarkLabel from "../components/content/labels/darkLabel";
import PreviewImage from "../components/content/previewImage";
import { Colors } from "../enums/colors";
import { useLocation } from "react-router-dom";
import { ImageTransformations } from "../enums/imageTransformations";
import { Image as ImageIcon, PanTool, SecurityOutlined } from "@mui/icons-material";

const useStyles = makeStyles(() =>
    createStyles({
        mainContent: {
            backgroundColor: Colors.STEELCASE_GREY,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "none"
        },
        productCard: {
            marginTop: "80px",
            marginBottom: "80px",
            width: "100%",
        },
        productContent: {
            padding: "0% !important"
        },
        productDescription: {
            padding: "10% !important",
            backgroundColor: "white"
        },
        productDescriptionButton: {
            width: "100%"
        },
        productImage: {
            backgroundColor: "white"
        },
        productButtons: {
            paddingTop: "0.3%",
            paddingBottom: "0.3%",
            backgroundColor: Colors.STEELCASE_GREY,
        },
        formRow: {
            padding: "3%",
            marginBottom: "10px",
        },
        label: {
            textAlign: "right",
            paddingRight: "10px",
        },
        title: {
            marginTop: "50px",
            marginBottom: "30px"
        },
        previewImage: {
            marginBottom: "30px",
            width: "100%",
            height: "100%"
        },
        select: {
            width: "100%",
            border: 0,
            float: 'left'
        },
        menuIcon: {
            color: Colors.IBM_IX_BLACK,
            marginRight: '10px',
            down: "15px",
        },
        menuLink: {
            color: Colors.IBM_IX_BLACK,
            fontWeight: "700"
        },
        table: {
            minWidth: 650,
            backgroundColor: "white",
            marginTop: "20px"
        },
        tableHead: {
            backgroundColor: "lightblue",
        },
        tableHeadCell: {
            color: "white",
            fontWeight: "bold",
            fontSize: "16px", // Increased font size
        },
        tableCell: {
            color: Colors.IBM_IX_BLACK,
            fontWeight: "500",
            fontSize: "14px", // Increased font size
        }
    })
);

type Props = {
    deliveryAPIImageMetadata: any;
    setDeliveryAPIImageMetadata: () => void;
    imsToken: string;
    props: any;
}

const ProductDetailsPage: FC<Props> = (props) => {
    const classes = useStyles();
    const { assetMetadata, src } = useLocation().state;
    const [imageTransformation, setImageTransformation] = useState(ImageTransformations.CENTER);

    const renderTableData = () => {
        const rows = [
            { key: "Title", value: assetMetadata["dc:title"] },
            { key: "Description", value: assetMetadata["dc:description"] },
            { key: "Category", value: assetMetadata["assetCategory"] },
            { key: "Type", value: assetMetadata["assetType"] },
            { key: "Status", value: assetMetadata["dam:assetStatus"] },
            { key: "Brand", value: assetMetadata["brand"]?.join(", ") },
            { key: "Creation Date", value: assetMetadata["originalCreationDate"] },
            { key: "Resolution", value: assetMetadata["resolution"] },
            { key: "Color Mode", value: assetMetadata["photoshop:ColorMode"] },
            { key: "Orientation", value: assetMetadata["orientation"]?.join(", ") },
            { key: "Image Width", value: assetMetadata["tiff:ImageWidth"] },
            { key: "Image Length", value: assetMetadata["tiff:ImageLength"] },
            { key: "Bits Per Sample", value: assetMetadata["tiff:BitsPerSample"]?.join(", ") },
        ];

        return rows.map((row, index) => (
            <TableRow key={index}>
                <TableCell className={classes.tableCell} style={{ width: '50%' }}>{row.key}</TableCell>
                <TableCell className={classes.tableCell} style={{ width: '50%' }}>{row.value}</TableCell>
            </TableRow>
        ));
    };

    return (
        <div className={classes.mainContent}>
            <Card variant="outlined" className={classes.productCard}>
                <CardContent className={classes.productContent}>
                    <Grid container xs={12} sm={12}>
                        <Grid item xs={5} sm={5} className={classes.productDescription}>
                            <DarkLabel variant={Fonts.H4}>
                                {assetMetadata["dc:title"]}
                            </DarkLabel>
                            <DarkLabel variant={Fonts.H4}>
                                {assetMetadata["dc:description"]}
                            </DarkLabel>
                            <Grid container direction="row" justifyContent="flex-start">
                                <Grid item xs={6} sm={6} className={classes.formRow}>
                                    <Button variant="contained" className={classes.productDescriptionButton}>
                                        BUY ONLINE
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={6} className={classes.formRow}>
                                    <Button variant="outlined" className={classes.productDescriptionButton}>
                                        CONTACT DEALER
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={7} sm={7} className={classes.productImage}>
                            <PreviewImage src={src} width={"100%"} height={"100%"} imageTransformation={imageTransformation} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container xs={12} sm={12} className={classes.productButtons}>
                        <Grid item xs={4} sm={4} className={classes.productButtons}/>
                        <Grid item xs={1} sm={1} className={classes.productButtons}>
                            <Button>
                                <ImageIcon className={classes.menuIcon}/>
                                <ListItemText primary="Images" className={classes.menuLink}/>
                            </Button>
                        </Grid>
                        <Grid item xs={1} sm={1} className={classes.productButtons}>
                            <Button>
                                <PanTool className={classes.menuIcon}/>
                                <ListItemText primary="Specs" className={classes.menuLink}/>
                            </Button>
                        </Grid>
                        <Grid item xs={1} sm={1} className={classes.productButtons}>
                            <Button>
                                <SecurityOutlined className={classes.menuIcon}/>
                                <ListItemText primary="Materials" className={classes.menuLink}/>
                            </Button>
                        </Grid>
                        <Grid item xs={4} sm={4} className={classes.productButtons}/>
                        <Grid item xs={1} sm={1} className={classes.productButtons}>
                            <Select
                                sx={{
                                    boxShadow: "none",
                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                        {
                                            border: 0,
                                        },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            border: 0,
                                        },
                                }}
                                value={imageTransformation}
                                className={classes.select}
                                onChange={(event: any) => setImageTransformation(event.target.value)}>
                                <MenuItem value={ImageTransformations.UP}>UP</MenuItem>
                                <MenuItem value={ImageTransformations.DOWN}>DOWN</MenuItem>
                                <MenuItem value={ImageTransformations.CENTER}>CENTER</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Divider />
                </CardContent>
            </Card>
            <TableContainer component={Paper} className={classes.table}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell className={classes.tableHeadCell}>Property</TableCell>
                            <TableCell className={classes.tableHeadCell}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTableData()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ProductDetailsPage;
