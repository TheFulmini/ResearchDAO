import { useEffect, useState } from "react";
import "./Proposal.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Url } from "../config/constants";


const Proposal = () => {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { url } = useParams();

  const fetchProposalContent = async () => {
    const res = await axios.get(`${Url}/${url}`);
    setTitle(res.data.title);
    const text = res.data.text.toString();
    setText(text);
  };
  
  useEffect(() => {
    if (!title || !text) {
      fetchProposalContent();
    }
  }, [text, title]);
 
  return (
    <div className="singleProposal">
      <div className="singleProposalWrapper">
        <div className="singleProposalContent">
          <h1 className="singleProposalTitle">{title}</h1>
          <p className="singleProposalText">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
