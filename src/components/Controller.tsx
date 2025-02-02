import styled from "styled-components";
import { useTimeline } from "./TimelineContext";

const Container = styled.div`
  display: grid;
  gap: 1rem;
  margin: 0 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Text = styled.span`
  font-family: PT Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.12px;
  text-align: left;
  color: rgba(66, 86, 122, 1);
`;

const Button = styled.button`
  width: 3.125rem;
  height: 3.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid rgba(66, 86, 122, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.375rem;
    height: 0.625rem;
  }
`;

const Icon = styled.svg<{ $mirrored?: boolean }>`
  ${({ $mirrored }) => $mirrored && "transform: scaleX(-1);"}
`;

function Controller() {
  const { activeIndex, setActiveIndex, timelinePoints } = useTimeline();

  const handlePrev = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      Math.min(prevIndex + 1, timelinePoints.length - 1)
    );
  };

  return (
    <Container>
      <Text>
        0{activeIndex + 1}/0{timelinePoints.length}
      </Text>
      <ButtonContainer>
        <Button onClick={handlePrev} disabled={activeIndex === 0}>
          <Icon
            $mirrored
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 6L1 11"
              stroke="rgba(66, 86, 122, 1)"
              strokeWidth="2"
              transform="translate(1,0)"
            />
          </Icon>
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeIndex === timelinePoints.length - 1}
        >
          <Icon
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 6L1 11"
              stroke="rgba(66, 86, 122, 1)"
              strokeWidth="2"
              transform="translate(1,0)"
            />
          </Icon>
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default Controller;
