import React from 'react';
import { Header, Grid, Search, Container, Card, Image } from 'semantic-ui-react';
import Selector from "/imports/ui/components/landing/Selector"
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  state = { title: "Buy a Home" };

  changeTitle = (title) => {
    this.setState({ title: title });
  };

  render() {
    return (
      <div>
        <div className="landing-main">
            <Grid
                centered
                verticalAlign="middle"
                textAlign="center"
            >
              <Grid.Row
                  className="title-main"
              >
                <Header inverted>
                  {this.state.title}
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Selector
                    onClickFunction={this.changeTitle}
                />
              </Grid.Row>
              <Grid.Row>
                <Search
                    size="massive"
                    placeholder='Search...'
                />
              </Grid.Row>

            </Grid>
        </div>
        <Container className="navigation-main">
          <Header>Explore Hale Manoa</Header>
          <hr/>
          <Card.Group>
            <Card
                as={NavLink} activeClassName="" exact to={`/list`}
                href='body'
                image='/images/bedroom.jpg'
                header='Homes'
            />
            <Card
                as={NavLink} activeClassName="" exact to={`/connect`}
                href='body'
                image='/images/people.jpg'
                header='People'
            />
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default Landing;
