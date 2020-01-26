import styled from 'styled-components';

export const Container = styled.div`
  height: 400px;
  width: 350px;
  overflow-y: scroll;
  background: #FCFCFC;
  font-family: Arial, Helvetica, sans-serif;
`;

export const Header = styled.header`
  background: #fff;
  box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
  height: 100px;

  > div {
    display: flex;
    align-items: center;
    width: 90%;
    margin: auto;

    > img {
      height: 60px;
      width: 60px;
    }
  
    > p {
      margin-left: 10px;
      color: #023C48;
      font-size: 22px; 
      font-weight: bold;
      word-wrap: break-word;
      flex: 1;
      font-family: Helvetica, sans-serif;
    }
  }
`;

export const Section = styled.div`
  height: 100px;
  > div {
    width: 90%;
    margin: auto;
  }
`;

export const FlexSection = styled.div`
  > div {
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;

    > div {
      flex: 1;
    }

    > div.round {
      flex: 0;
      width: 30px;
    }
  }
`;

export const Title = styled.h3`
  color: #808080;
  margin-bottom: 5px;
  font-size: 20px;
`;

export const Subtitle = styled.p`
  color: #bdbdbd;
`;

export const ShowMoreSection = styled.div<{ showMore: boolean; }>`
  background: #fff;
  box-shadow: 0 -3px 3px -2px rgba(0,0,0,.2), 0 -3px 4px 0 rgba(0,0,0,.14), 0 -1px 8px 0 rgba(0,0,0,.12);
  transition: all 0.5;
  min-height: 50px;
  overflow: hidden;

  > div.content {
    display: ${({ showMore }) => showMore ? 'block' : 'none'};
  }

  > div.link {
    display: flex;
    flex-direction: center;
    justify-content: center;
    height: 100%;

    > a {
      margin: 20px;
      font-size: 14px;
      text-align: center;
      margin: auto;
      width: auto;
      cursor: pointer;
      color: #35b9e6;
    }
  }
`;