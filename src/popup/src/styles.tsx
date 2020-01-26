import styled from 'styled-components';

export const Container = styled.div`
  height: auto;
  width: 377px;
  overflow-y: scroll;
  background: transparent;
  transition: all 1s;
  font-family: Helvetica, sans-serif;
`;

export const Header = styled.header`
  background: #fff;
  border-bottom: 1px solid #CCEFFF;
  height: 95px;

  > div {
    display: flex;
    align-items: center;
    height: 100%;
    width: calc(100% - 46px);
    margin: auto;
    
    > img {
      height: 38px;
      width: 38px;
    }
  
    > p {
      margin-left: 10px;
      color: #023C48;
      flex: 1;
      font-size: 16px;
      font-weight: bold;
      word-wrap: break-word;

      > h4 {
        margin: 0;
      }
    }
  }
`;

export const Section = styled.div`
  height: 69px;
  background: #ebf9ff;
  > div {
    width: calc(100% - 46px);
    margin: auto;
    display: flex;
    align-items: center;

    > div {
      flex: 1;
    }

    > div:nth-child(2) {
      padding-right: 5px;
      padding-left: 30px;
    }
  }
`;

export const FlexSection = styled.div`
  height: 50px;
  > div {
    width: calc(100% - 46px);
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

export const Title = styled.h3<{ options?: boolean }>`
  color: #35b9e6;
  margin-bottom: 2px;
  font-size: 16px;
  line-height: 16px;
  font-weight: ${({ options }) => options ? '400' : '700'};
`;

export const Subtitle = styled.p<{ options?: boolean }>`
  color: ${({ options }) => options ? '#acacac' : '#35b9e6'};
  margin-top: 0px;
  font-size: 13px;
`;

export const ShowMoreSection = styled.div<{ showMore: boolean; }>`
  background: #fff;
  border-top: 1px solid #CCEFFF;
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
      width: auto;
      cursor: pointer;
      color: #35b9e6;
    }
  }
`;