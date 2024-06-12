import React, { FC } from "react";
import {ImageTransformations} from "../../enums/image-transformations";

type Props = {
    src: string;
    height?: string;
    width?: string;
    imageTransformation?: string;
    backgroundColor?: string;
}

const PreviewImage: FC<Props> = (props) => {
    const { backgroundColor, imageTransformation, src, width, height } = props;
    const BackgroundFill = (imageUrl: string, position: string, backgroundColor: string ) => {
        const divStyle = {
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: position,
            backgroundRepeat: 'no-repeat',
            backgroundColor: backgroundColor,
            width: (width || "400px"),
            height: (height || "400px"),
            color: 'black'
        };

        return <div style={divStyle}/>;
    }

    return BackgroundFill(src, (imageTransformation || ImageTransformations.CENTER), (backgroundColor || "white"));
}

export default PreviewImage;
