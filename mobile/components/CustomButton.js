import React from "react";
import { FONTS } from "../constants";
import styled from "styled-components/native";

const CustomButton = ({ ...props }) => {
    // console.log(props)
    const ButtonContainer = styled.TouchableOpacity`
        width: 90%;
        height: 60px;
        padding: 10px;
        margin-top: 10px;
        border-radius: 10px;
        justify-content: center;
        align-self: center;
        background-color: #83ACDC;
        `;

    const ButtonText = styled.Text`
        font-family: ${FONTS.semiBold};
        font-size: 20px;
        color: white;
        text-align: center;
        justify-content: center;
        `;

    return (
        <ButtonContainer
            onPress={props.onPress}
            backgroundColor={props.backgroundColor}
        >
            <ButtonText textColor={props.textColor}>{props.text}</ButtonText>
        </ButtonContainer>
    )
};

export default CustomButton

