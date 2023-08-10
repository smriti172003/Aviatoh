import React from 'react';
import { primaryBlueColour, primaryGreenColour, primarySilverColour } from '../App';

function Testimonial(props) {
    const {img, text, designation, name} = props;
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            // backgroundColor: 'rgb(255, 255, 255, 0.1)',
            padding: '30px',
            // boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 7px",
            alignItems: 'center',
            borderRadius: '13px',
            color: 'rgb(130, 130, 130)',
            maxWidth:'60vw',
            fontSize: '17px',
            marginTop: '80px',
            fontWeight: '300'
        }}>
            <div style={{width: '85%'}} align="right">
                <div align="left"  style={{color: primaryGreenColour(1)}}>We are glad to know, thanks {name}!<hr style={{ border: '0px', borderBottom: '1px solid '+ 'silver', backgroundColor: 'transparent'}}/></div>
                {text}
                <br/>
                <br/>
                
                - {name}
                <br/>
                {designation}
            </div> 
            &nbsp;
            &nbsp;
            &nbsp;
                <img style={{width: '125px', height: '125px', borderRadius: '50%', backgroundColor: primarySilverColour}} src={img} />
 
        </div>
    );
}

export default Testimonial;