import React from 'react';
import { Grid, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <footer>
          <div className="footer-background">
            <Grid container columns="three">
              <Grid.Column>
                Lunch
                <hr/>
                <List>
                  <List.Item>Monday – Friday: 11:00am – 2:30pm</List.Item>
                  <List.Item>Saturday – Sunday: Not open for lunch</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                Bar
                <hr/>
                <List>
                  <List.Item>Monday- Friday from 11:00am</List.Item>
                  <List.Item>Saturday- Sunday from 4:00pm</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                Contact Us
                <hr/>
                <List>
                    Hale Manoa ICS 314 <br />
                    University of Hawaii<br />
                    Honolulu, HI 96822<br />
                    Github Development Page: <a href="https://hale-manoa.github.io/">
                    https://hale-manoa.github.io/</a>
                </List>
              </Grid.Column>
            </Grid>
          </div>
        </footer>
    );
  }
}

export default Footer;