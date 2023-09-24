import React, { useEffect, useState, useContext } from "react";

import {
  Container,
  SurveyGrid,
  Title,
  EmptyWarning,
  EmptyWarningText,
  AddSurveyBtn,
} from "./styles";
import SurveyCard from "../../components/SurveyCard";
import Header from "../../components/Header";
import SizedBox from "../../components/SizedBox";
import axiosInstace from "../../services/api";
import { useAuth } from "../../contexts/auth";
import VectorContainer from "../../components/VectorContainer";
import empty_list from "../../assets/img/mirage-list-is-empty.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SurveyListing() {
  const [loading, setLoading] = useState(true);
  const [closedSurveys, setClosedSurveys] = useState();
  const [openSurveys, setOpenSurveys] = useState();
  const [surveyData, setSurveyData] = useState([]);

  const fetchData = () => {
    axiosInstace
      .get("api/survey-list")
      .then((response) => {
        console.log("Response fetching survey ", response.data);
        toast.success("☑ Survey loaded successfuly!");
        setSurveyData(response.data);
        setOpenSurveys(response.data);
      })
      .catch(({ response }) => {
        setLoading(false);
        toast.error("Error Fetching Survey");
        console.log("Error fetching survey ", response);
      });
  };

  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const handleAddSurvey = (e) => {
    e.preventDefault();
    if (isAdmin) {
      navigate("/create");
    } else {
      toast.error("Only Admin is allowed to do this.");
      return;
    }
  };

  useEffect(fetchData, []);
  return (
    <Container>
      <Header />
      <>
        <SizedBox height="50px"></SizedBox>
        <Title>Active Surveys</Title>
        <SizedBox height="20px"></SizedBox>
        {!openSurveys && (
          <EmptyWarning>
            <VectorContainer src={empty_list} />
            <EmptyWarningText> No Active Surveys Available</EmptyWarningText>
            <AddSurveyBtn>
              <Link to="/create" onClick={handleAddSurvey}>
                Add A Survey
              </Link>
            </AddSurveyBtn>
          </EmptyWarning>
        )}
        <SurveyGrid>
          {openSurveys &&
            openSurveys.map((survey) => (
              <SurveyCard
                key={survey.survey_id}
                title={survey.survey_title}
                surveyId={survey.survey_id}
                details={survey.detail}
                numQuestions={survey.time_created}
                status={survey.isActive}
                refetchData={fetchData}
              />
            ))}
        </SurveyGrid>
      </>

      <>
        <SizedBox height="50px"></SizedBox>
        <Title>Closed Surveys</Title>
        <SizedBox height="20px"></SizedBox>
        {!closedSurveys && (
          <EmptyWarning>
            <VectorContainer src={empty_list} />
            <EmptyWarningText> No Closed Surveys Available</EmptyWarningText>
            <AddSurveyBtn>
              <Link to="/create">Add A Survey</Link>
            </AddSurveyBtn>
          </EmptyWarning>
        )}
        <SurveyGrid>
          {!loading &&
            closedSurveys &&
            closedSurveys?.map((survey) => (
              <SurveyCard
                key={survey.id}
                title={survey.title}
                surveyId={survey.id}
                numQuestions={1}
                details={survey.detail}
                status={survey.status}
                refetchData={fetchData}
              />
            ))}
        </SurveyGrid>
      </>
    </Container>
  );
}
