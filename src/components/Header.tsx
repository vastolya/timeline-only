import { styled } from "styled-components";

const Title = styled.h1`
  font-size: 3.625rem;
  line-height: 4.25rem;
  font-family: "PT Sans", serif, bold;
   font-weight: bold;
  color: #42567a;
  width: 23rem;
  height 7.5rem: 
`;

const TitleWrapper = styled.div`
  position: relative;
  font-size: 3.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-left: 4.875rem;

  &::before {
    content: "";
    position: absolute;
    left: -4.875rem;
    top: 50%;
    height: 7.5rem;
    width: 0.5rem;
    background: linear-gradient(
      to top,
      rgba(56, 119, 238, 1),
      rgba(239, 93, 168, 1)
    );
    transform: translateY(-50%);
  }
`;

export default function Header() {
  return (
    <TitleWrapper>
      <Title>Исторические даты</Title>
    </TitleWrapper>
  );
}
