// react bootstrap
import { Tab, Nav } from "react-bootstrap";

const CustomNavTabs = (props: any) => {
  return (
    <div>
      <Tab.Container defaultActiveKey="0">
        <Nav className="custom-nav-tabs-links" variant="pills">
          {props.data.map((item: any, index: any) => (
            <Nav.Item key={`nav-item-${index}`}>
              <Nav.Link key={`nav-item-${item.key}`} eventKey={index}>
                <small>{item.title}</small>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content className="mt-3">
          {props.data.map((item: any, index: any) => (
            <Tab.Pane key={`tab-pane-${item.key}`} eventKey={index}>
              {item.component}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default CustomNavTabs;
