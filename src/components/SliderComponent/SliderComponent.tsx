import { FC } from "react"
import image6 from './../../assets/images/pages/images6.png';
import image7 from './../../assets/images/pages/images7.png';
import { Carousel } from "antd";

const SliderComponent: FC = () => {

    return <Carousel autoplay>
        <h3><img src={image6} width="1750px" height="300px" /></h3>
        <h3><img src={image7} width="1750px" height="300px" /></h3>
    </Carousel>
}

export default SliderComponent