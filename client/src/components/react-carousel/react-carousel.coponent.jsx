import React from 'react'
import {Carousel} from 'react-responsive-carousel'

const ReactCarousel = ({img1 , img2}) => {
    return (
        <Carousel autoPlay>
            <div className="img-div">
                <img src={img1} alt="" />
            </div>
            <div className="img-div">
                <img src={img2} alt="" />
            </div>
        </Carousel>
    )
}

export default ReactCarousel
