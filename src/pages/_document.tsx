// pages/_document.js

import { Html, Head, Main, NextScript } from "next/document"
import theme from "../utils/theme"
import { ColorModeScript } from "@chakra-ui/react"

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                {/* 👇 Here's the script */}
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
