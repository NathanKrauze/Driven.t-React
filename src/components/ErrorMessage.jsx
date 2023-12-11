import styled from "styled-components";

export default function ErrorMessage ({error}) {
    return (
        <ContainerError>
            <Message>{error}</Message>
        </ContainerError>
    )
}

const ContainerError = styled.div `
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin-top: 250px;

`

const Message = styled.div `
   height: 48px;
   width: 450px;
   color: #8e8e8e;
   text-align: center;
   font-size: 22px;
   font-weight: 400;

`