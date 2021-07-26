import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../utils/AxiosApi"


const Card = ({ priority = 0, date, description, reporter }) => {
  const [complaintData, setComplaintData] = useState([])

  const prioList = [
    {
      title: "low",
      color: `green`,
    },
    {
      title: "medium",
      color: `orange`,
    },
    {
      title: "high",
      color: `tomato`,
    },
  ];

  useEffect(() => {
    // trigger once (when component is done)
    const fetchData = async () => {
      try{
        const response = await AxiosApi("users");
        const complaintData = await response.data
        setComplaintData([...complaintData])
      }
      catch(error) {console.log(error)}
    };
   
    fetchData();
  }, []);

  console.log(complaintData)

  return (
    <>
    {complaintData.map((complaint) => (
    <CardContainer key={complaint._id}>
      <Top>
        <Prio prioType={prioList[priority].color}>
          {complaint.prio}
        </Prio>
        <span>{complaint.createdAt}</span>
      </Top>
      
        <div>
          <Reporter>report: {complaint.user}</Reporter>
          <Description>{complaint.description}</Description>
        </div>
    </CardContainer>
    ) )}
    </>
  );
};

const CardContainer = styled.article`
  border-radius: 5px;
  padding: 0.8rem;
  background-color: #f90;
  border: 1px solid black;
  width: 100%;
  box-shadow: 0px 2px 3px 1px #5149496e;
  transition: transform 0.15s ease-in-out;
  cursor: pointer;
  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const Prio = styled.span`
  position: relative;
  padding-left: 25px;
  &::before {
    content: "";
    border: 1px solid black;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background-color: green;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    box-shadow: 0px 2px 3px 1px #5149496e;
  }
`;

const Top = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  span {
    font-weight: bold;
  }
`;

const Reporter = styled.span`
  display: block;
`;

const Description = styled.p`
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
`;

export default Card;