import React from "react";
import "../App.css";

const Resources = () => {
  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="resources-container">
        
      <div className="section">
        
        <div className="section-title">
          <u>Important Notes for Suicide Prevention:</u>
        </div>
        <div className="section-text">
          <p>
            - Recognize the warning signs of suicide.
            <br />
            - Listen actively and non-judgmentally to individuals who may be struggling.
            <br />
            - Encourage individuals to seek professional help.
            <br />
            - Provide support and reassurance to those in need.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-title">
            <u>Mental Health Prevention Guidelines:</u>
            </div>
        <div className="section-text">
          
          <p>
            - Practice self-care and prioritize your well-being.
            <br />
            - Stay connected with supportive friends and family members.
            <br />
            - Engage in regular physical activity and maintain a healthy lifestyle.
            <br />
            - Seek professional help if you experience persistent symptoms of mental illness.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-title">External Resources for further Information:</div>
        <div className="section-text">
         
          <ul className="external-links">
            <li>
              <a
                href="https://www.mentalhealth.gov/"
                onClick={(e) => {
                  e.preventDefault();
                  handleExternalLinkClick("https://www.mentalhealth.gov/");
                }}
              >
                MentalHealth.gov
              </a>
            </li>
            <li>
              <a
                href="https://www.nami.org/"
                onClick={(e) => {
                  e.preventDefault();
                  handleExternalLinkClick("https://www.nami.org/");
                }}
              >
                National Alliance on Mental Illness (NAMI)
              </a>
            </li>
            <li>
              <a
                href="https://suicidepreventionlifeline.org/"
                onClick={(e) => {
                  e.preventDefault();
                  handleExternalLinkClick("https://suicidepreventionlifeline.org/");
                }}
              >
                National Suicide Prevention Lifeline
              </a>
            </li>
            <li>
              <a
                href="https://www.who.int/mental_health/en/"
                onClick={(e) => {
                  e.preventDefault();
                  handleExternalLinkClick("https://www.who.int/mental_health/en/");
                }}
              >
                World Health Organization - Mental Health
              </a>
            </li>
            <li>
              <a
                href="https://www.samhsa.gov/find-help/national-helpline"
                onClick={(e) => {
                  e.preventDefault();
                  handleExternalLinkClick("https://www.samhsa.gov/find-help/national-helpline");
                }}
              >
                SAMHSA National Helpline
              </a>
            </li>
            <li>
              <a
                href="https://afsp.org/"
                onClick={(e) => {
                  e.preventDefault();
                  handleExternalLinkClick("https://afsp.org/");
                }}
              >
                American Foundation for Suicide Prevention (AFSP)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resources;
