import React, { FC } from "react";
import { Box } from "@mui/material";

type Props = {
    src: string;
}

const Image: FC<Props> = (props) => {
    const { src } = props;

    return (
        <>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "auto",
                    maxHeight: { xs: 800, md: 800 },
                    maxWidth: { xs: 800, md: 800 },
                    border: "dashed 2px"
                }}
                alt="Alt Image Text"
                src={src}
            />
        </>
    )
}

export default Image;
