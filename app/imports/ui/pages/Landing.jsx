import React from 'react';
import { Icon, Grid, Search, Image, Card } from 'semantic-ui-react';
import Selector from "/imports/ui/components/landing/Selector"
import { NavLink } from 'react-router-dom';
import SearchBarCustom from '/imports/ui/components/landing/SearchBarCustom'

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  state = { image: "/images/manoa-area.jpg" };

  changeImage = (picture) => {
    this.setState({ image: picture });
  };

  render() {
    return (
        <div>
          <div
          style={{
            background: "url('"+ this.state.image +"') no-repeat center center",
            backgroundImage: 'cover',
            height: "600px"
          }}
          className="main-image"
          >
            <Grid
                centered
                verticalAlign="middle"
                textAlign="center"
            >
              <Grid.Row
                  className="title-main"
              >
                <p  className="main-text">
                  Hale Manoa
                </p>
              </Grid.Row>
              <Grid.Row>
                <Selector
                    onClickFunction={this.changeImage}
                />
              </Grid.Row>
              <Grid.Row>
                <SearchBarCustom
                    size="massive"
                    placeholder1='Search...'
                />
              </Grid.Row>
            </Grid>
          </div>
          <div>
            <Grid
                columns={2}
                textAlign="center"
                style={{padding: "60px", backgroundColor: "#424B54"}}
            >
              <Grid.Column centered>
                <Image
                    centered
                  src="/images/house-icon.png"
                  size="medium"
                />
              </Grid.Column>
              <Grid.Column>
                <p  className="landing-header font-blue">Live in Manoa<hr/></p>
                <p  className="landing-text font-white">Connect with the perfect roommate and explore available housing options </p>
              </Grid.Column>

            </Grid>

            <Grid
                textAlign="center"
                style={{padding: "60px", backgroundColor: "#ffffff"}}
            >
              <Grid.Row centered>

                <p  className="landing-text">
                  The Hale Manoa web portal is designed to help guide the UH Manoa community to discover compatible roommates and find affordable housing.
                </p>

              </Grid.Row>
            </Grid>
            <Grid
                textAlign="center"
                style={{padding: "30px", backgroundColor: "#424B54"}}
            >
              <Grid.Row>
                <p  className="landing-header font-blue">Explore Hale Manoa<hr/></p>

              </Grid.Row>

              <Card.Group>
                <Card
                    as={NavLink} activeClassName="" exact to={`/connect`}
                    href='body'
                    image='/images/people.jpg'
                    header='Find your next roommate'
                />
                <Card
                    as={NavLink} activeClassName="" exact to={`/list`}
                    href='body'
                    image='/images/bedroom.jpg'
                    header='View Homes'
                />
              </Card.Group>
            </Grid>
            <Grid
                columns={3}
                textAlign="center"
                style={{padding: "60px", backgroundColor: "#ffffff"}}
            >
              <Grid.Column centered>
                <Icon name="edit" size="huge"></Icon>
                <p className="landing-header font-green">Build your profile<hr/></p>
                <p  className="landing-text">Add interests, hobbies, and other information about yourself to find the perfect roommate! </p>

              </Grid.Column>
              <Grid.Column>
                <Icon name="users" size="huge"></Icon>
                <p  className="landing-header font-green">Meet Roommates<hr/></p>
                <p  className="landing-text"> View other user profiles and send them a message! </p>
              </Grid.Column>
              <Grid.Column>
                <Icon name="home" size="huge"></Icon>
                <p  className="landing-header font-green">Live in Manoa<hr/></p>
                <p  className="landing-text"> Find the most affordable and adequate housing for your living style </p>
              </Grid.Column>

            </Grid>
          </div>


        </div>
    );
  }
}

export default Landing;
