import styled from "styled-components";
import * as React from "react";
import { ReactComponent as CloseModalButton } from "@/assets/svg/close-modal-button.svg";
import { Text } from "@/components/Text/index";

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
    z-index: 998;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    height: 100lvh;

    display: flex;
    justify-content: center;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        background: #888;
        border-radius: 15px;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        background: #555;
        border-radius: 15px;
        width: 20px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

export const TodoModalContent = styled.div`
    position: relative;
    margin-top: 30px;
    width: 60vw;
    height: 60vh;
    overflow-y: auto;
    overflow-x: hidden;
    background: ${({ theme }) => theme.colors.gray};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    padding: 10px 10px 20px;

    @media (min-width: 1200px) {
        width: 40vw;
        height: 60vh;
    }

    @media (max-width: 1200px) {
        width: 60vw;
        height: 60vh;
    }

    @media (max-width: 768px) {
        width: 80vw;
    }
`;

export const TodoFormContainer = styled.div`
    display: flex;
    column-gap: 20px;
    align-items: center;
    margin-bottom: 20px;
`;

export const TextInput = styled.input`
    height: 32px;
    width: 80%;
    outline: none;
    font-size: ${({ theme }) => theme.sizes.s15};
    padding: 5px 10px;
    border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
    border-radius: 6px;
    cursor: pointer;
`;

export const TodoAddButton = styled.button`
    width: 100px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-size: ${({ theme }) => theme.sizes.s14};
    font-weight: ${({ theme }) => theme.fonts.fontWeight.m};
    padding: 7px 9px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
        opacity: 0.6;
    }
`;

export const TodoRemoveButton = styled(TodoAddButton)`
    background-color: ${({ theme }) => theme.colors.darkBlue};
    width: 55px;
    font-size: ${({ theme }) => theme.sizes.s12};
`;

export const TodoItemContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const TodoItemTitleContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
    width: 80%;
`;

export const TodoItemTextContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const ToggleTodoInput = styled.input``;

export const TodoListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 15px;
`;

export const TodoText = styled(Text)`
    display: flex;
    word-break: break-word;
    font-size: ${({ theme }) => theme.sizes.s15};
`;
