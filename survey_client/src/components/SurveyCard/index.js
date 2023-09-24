import React, { useContext } from "react";

import {
  SurveyContainer,
  Title,
  TitleContainer,
  Category,
  Heading,
  Body,
  Description,
  Footer,
} from "./styles";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../../services/api";
import SizedBox from "../../components/SizedBox";
import {
  ACTIVE,
  URL_SURVEY,
  CLOSED,
  URL_SURVEYS,
  URL_RESULTS,
} from "../../utils/constants";
import { toast } from "react-toastify";

const SurveyCard = ({
  title = "",
  details = "Details",
  numQuestions,
  status,
  refetchData = () => {},
  surveyId = "",
}) => {
  const navigate = useNavigate();
  // const { user } = useContext(AuthContext);

  const isActive = status.isActive === true;
  const isAdmin = "master";
  const changeSurveyStatus = (status) => {
    return axiosInstace
      .put(`${URL_SURVEYS}/edit/` + surveyId, { status })
      .then(refetchData);
  };

  const handleChangeStatusToActive = () => {
    changeSurveyStatus(ACTIVE)
      .then(() => toast.success("Survey moved to active succesfully."))
      .catch(() => toast.error("Error moving survey to active."));
  };
  const handleChangeStatusToClosed = () => {
    changeSurveyStatus(CLOSED)
      .then(() => toast.success("Survey moved to closed."))
      .catch(() => toast.error("Error moving survey to closed."));
  };

  return (
    <SurveyContainer>
      <Heading>
        <TitleContainer>
          <Category>
            <i className="material-icons left">event_note</i>Survey
          </Category>

          <Title>{title}</Title>
          <Description>{details}</Description>
        </TitleContainer>
      </Heading>
      <Body>
        <Description>
          {numQuestions} question{numQuestions !== 1 ? "s" : ""} (
          {0.25 * numQuestions} minute{numQuestions !== 4 ? "s" : ""})
        </Description>
      </Body>
      <Footer>
        <Button
          color={isActive ? "purple" : "green"}
          rounded
          onClick={() =>
            isActive
              ? navigate(`${URL_SURVEY}/${surveyId}`)
              : navigate(`${URL_RESULTS}/${surveyId}`)
          }
        >
          {isActive ? "Take Survey" : "See Results"}
        </Button>

        {isAdmin && isActive && (
          <>
            <SizedBox height="15px" />
            <Button color={"red"} rounded onClick={handleChangeStatusToClosed}>
              {"Close Survey"}
            </Button>
          </>
        )}
      </Footer>
    </SurveyContainer>
  );
};

export default SurveyCard;
