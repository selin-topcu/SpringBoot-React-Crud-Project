import { Button,Avatar } from "antd";
import React from "react";
import Container from "./Container";
import './Footer.css'
const Footer = (props) => (
    <div className='footer'>
        <Container>
            {props.numberOfStudents !== undefined ? 
            <Avatar style={{background:'#f56a00', marginRight:'6px'}} size='large'>
                {props.numberOfStudents}
            </Avatar>:null}
            <Button onClick={()=> props.addStudentClickEvent()} type='primary'>Add</Button>
        </Container>
    </div>
);

export default Footer;