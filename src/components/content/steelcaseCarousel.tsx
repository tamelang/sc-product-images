import React, { FC } from "react";
import Carousel from "react-material-ui-carousel";
import {Box, Grid} from "@mui/material";
import ProductCard from "./product-card";
import {DeliveryAPIImageData} from "../../models/deliveryAPIImageData";
import {ImageTransformations} from "../../enums/imageTransformations";
import PreviewImage from "./previewImage";

type Props = {
    images: DeliveryAPIImageData[];
}

const SteelcaseCarousel: FC<Props> = (props) => {
    const { images} = props;

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Carousel
                autoPlay={true}            // Enable auto sliding
                interval={3000}            // Set interval to 3000ms (3 seconds)
                fullHeightHover={false}    // We want the nav buttons wrapper to only be as big as the button element is
                navButtonsProps={{         // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                    style: {
                        backgroundColor: 'cornflowerblue',
                        borderRadius: 0
                    }
                }}
                navButtonsWrapperProps={{  // Move the buttons to the bottom. Unsetting top here to override default style.
                    style: {
                        bottom: '0',
                        top: 'unset'
                    }
                }}
                NextIcon="next"            // Change the "inside" of the next button to "next"
                PrevIcon="prev"            // Change the "inside" of the prev button to "prev"
                indicators={false}         // Hide the indicators (dots) if not needed
                sx={{ width: '100%', height: '100%' }} // Stretch the carousel to fill the parent container
            >
                {images && images.length > 0 &&
                    images.map((image, index) => (
                        <Box key={index} sx={{ width: '100%', height: '100%' }}>
                            <Grid container justifyContent="center" sx={{ width: '100%', height: '100%' }}>
                                <Grid item sx={{ width: '100%', height: '100%' }}>
                                    <PreviewImage src={image.src ? image.src : ""} height={"400px"} width={"100%"}/>
                                </Grid>
                            </Grid>
                        </Box>
                    ))
                }
            </Carousel>
        </Box>
    )
}

export default SteelcaseCarousel;
