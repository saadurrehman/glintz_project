import React from "react";
import { Container as ComponentContainer, Row } from "react-bootstrap";

type Props = {
  children: JSX.Element;
};

const Container: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <ComponentContainer>
      <Row>
        <div className="col-lg-12 mt-5">
          <div className="card profile-content-page mt-4 mt-lg-0">
            <div className="card-body p-4">
              <div className="tab-content" id="pills-tabContent">
                {children}
              </div>
            </div>
          </div>
        </div>
      </Row>
    </ComponentContainer>
  );
};

export default Container;
