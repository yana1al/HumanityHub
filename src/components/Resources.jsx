import React from "react";

const Resources = () => {
  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <h1>Resources:</h1>
      <div>
        <h2><u>Here are some important notes for suicide prevention:</u></h2>
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
      <div>
        <h2>Mental Health Prevention Guidelines</h2>
        <p>
          <u>Here are some guidelines for maintaining mental health:</u>
          <p>
            - Practice self-care and prioritize your well-being.
          </p>
          <p>
            - Stay connected with supportive friends and family members.
          </p>
          <p>
            - Engage in regular physical activity and maintain a healthy lifestyle.
          </p>
          <p>
            - Seek professional help if you experience persistent symptoms of mental illness.
          </p>
        </p>
      </div>
      <div>
        <h2>External Resources</h2>
        <p>
          <h3>Here are some external links to resources for further information:</h3>
          <br />
          <a
            href="https://www.mentalhealth.gov/"
            onClick={(e) => {
              e.preventDefault();
              handleExternalLinkClick("https://www.mentalhealth.gov/");
            }}
          >
            MentalHealth.gov
          </a>
          <br />
          <a
            href="https://www.nami.org/"
            onClick={(e) => {
              e.preventDefault();
              handleExternalLinkClick("https://www.nami.org/");
            }}
          >
            National Alliance on Mental Illness (NAMI)
          </a>
          <br />
          <a
            href="https://suicidepreventionlifeline.org/"
            onClick={(e) => {
              e.preventDefault();
              handleExternalLinkClick("https://suicidepreventionlifeline.org/");
            }}
          >
            National Suicide Prevention Lifeline
          </a>
          <br />
          <a
            href="https://www.who.int/mental_health/en/"
            onClick={(e) => {
              e.preventDefault();
              handleExternalLinkClick("https://www.who.int/mental_health/en/");
            }}
          >
            World Health Organization - Mental Health
          </a>
          <br />
          <a
            href="https://www.samhsa.gov/find-help/national-helpline"
            onClick={(e) => {
              e.preventDefault();
              handleExternalLinkClick("https://www.samhsa.gov/find-help/national-helpline");
            }}
          >
            SAMHSA National Helpline
          </a>
          <br />
          <a
            href="https://afsp.org/"
            onClick={(e) => {
              e.preventDefault();
              handleExternalLinkClick("https://afsp.org/");
            }}
          >
            American Foundation for Suicide Prevention (AFSP)
          </a>
        </p>
      </div>
    </div>
  );
};

export default Resources;
