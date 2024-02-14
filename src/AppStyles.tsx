import styled from "styled-components";

export const GREY = "#00000030";
export const DARK_GREY = "#0000009e";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  color: ${DARK_GREY};
`;

export const Header = styled.div`
  border-bottom: 1px solid ${GREY};
  text-align: right;
  padding: 1rem 12rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const H2 = styled.h2`
  margin: 0;
  font-weight: 600;
`;
export const H3 = styled.h3`
  margin: 0;
  font-weight: 500;
`;

export const Data = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-template-rows: 1fr 4fr;
  padding: 0 12rem;
`;

export const Ids = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Card = styled.div`
  border: 1px solid ${GREY};
  width: 35rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2rem;
`;

export const GraphCard = styled(Card)`
  width: 100%;
  height: 100%;
  display: block;
  padding: 0;
`;
