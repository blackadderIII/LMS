import React from 'react'
import './ImageSlider.css'
import { Carousel } from 'react-bootstrap'

function ImageSlider() {
    return (
        <div className='slider'>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={`assets/images/image5.jpg`}
                        alt="First slide"
                    />
                    {/* <Carousel.Caption>
                        <h3>READING OASIS</h3>
                        <p>Escape into Books and Enter a Realm of Endless Stories and Learning.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://discovermonadnock.com/wp-content/uploads/2023/03/generic-library-900x511.jpg"
                        alt="Second slide"
                    />
                    {/* <Carousel.Caption>
                        <h3>JOURNEY THROUGH PAGES</h3>
                        <p>Emabark on Adventures and Discoveries with Every Turn of a Page.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.princeton.edu/sites/default/files/styles/half_16_9_1440/public/images/2019/03/SMS_9732%20copy_d.jpg?itok=TwfzgmsA"
                        alt="Third slide"
                    />
                    {/* <Carousel.Caption>
                        <h3>LIBRARY TRANQUILITY</h3>
                        <p>Find Serenity and Inspiration in Every Corner of Our Library.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default ImageSlider
