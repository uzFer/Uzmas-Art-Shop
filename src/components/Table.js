import { styled } from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    th {
        text-align: center;
        text-transform: uppercase;
        color: #878787;
        font-weight: normal;
        font-size: 0.8rem;
    }
    td {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    tr {
        font-weight: bold;
    }
`;

export default function Table(props) {
    return (
        <StyledTable {...props} />
    );
}