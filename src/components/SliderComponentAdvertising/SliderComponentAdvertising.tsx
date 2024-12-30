import { FC } from "react"
import { Carousel } from "antd";

const SliderComponentAdvertising: FC = () => {
    const contentStyle: React.CSSProperties = {
        textAlign:"center",
        width: '100%',
        maxHeight:"50px",
        lineHeight: '160px',
        color: "purple",
        marginBottom:"50px"
    };
    return <Carousel style={contentStyle} autoplay>
         <h1 style={{height:"10px"}}>کالای جدید</h1>
        <h1 style={{height:"10px"}}>کالای جدید</h1>
        <h1 style={{height:"10px"}}>کالای جدید</h1>
    </Carousel>
}

export default SliderComponentAdvertising