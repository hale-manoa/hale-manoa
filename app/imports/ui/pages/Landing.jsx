import React from 'react';
import { Header, Grid, Search, Container, Card, Image } from 'semantic-ui-react';
import Selector from "/imports/ui/components/landing/Selector"

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
              <Header inverted>
                {this.state.title}
              </Header>
              <Grid.Row>
                <Selector
                    onClickFunction={this.changeTitle}
                />
              </Grid.Row>
              <Search
                  size="mini"
                  placeholder='Search...'
              />
            </Grid>
        </div>
        <Container>
          <Header>Explore Hale Manoa</Header>
          <hr/>
          <Card.Group>
            <Card
                href='body'
                image='/images/bedroom.jpg'
                header='Homes'
            />
            <Card
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
