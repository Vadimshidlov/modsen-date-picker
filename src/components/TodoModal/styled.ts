import styled from "styled-components";
import { ReactComponent as CloseModalButton } from "@/assets/svg/close-modal-button.svg";

export const StyledClearDateIcon = styled(CloseModalButton)`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    transition: all 1s;

    &:hover {
        opacity: 0.5;
    }
`;

export const TodoModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(85, 85, 85, 0.15);
    z-index: 998;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    height: 100lvh;

    display: flex;
    justify-content: center;
`;

export const TodoModalContent = styled.div`
    position: relative;
    margin-top: 30px;
    width: 60vw;
    height: 60vh;
    overflow-y: auto;
    background: #d3d2d0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
`;

export const TodoFormContainer = styled.div`
    display: flex;
    column-gap: 20px;
    align-items: center;
    margin-bottom: 20px;
`;

export const TextInput = styled.input`
    outline: none;
    font-size: 15px;
    padding: 5px 10px;
    width: 80%;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
`;

export const TodoAddButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-family: "Open Sans";
    font-weight: 600;
    padding: 7px 9px;
    font-size: 13px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    width: 100px;
    background-color: #2f80ed;
    color: #edf2f4;

    &:hover {
        opacity: 0.6;
    }
`;

export const TodoRemoveButton = styled(TodoAddButton)`
    background-color: #2f80ed;
    width: 70px;
`;

export const TodoItemContainer = styled.li`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const TodoItemTitleContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;

export const ToggleTodoInput = styled.input``;

export const TodoListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 10px;
`;
