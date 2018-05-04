import React from 'react';
import { Grid, List, Container } from 'semantic-ui-react';

/** Renders the Page for adding a document. */
export default class ContactUs extends React.Component {
  render() {
    return (
        <Grid centered>
          <Grid.Column width={12}>
            <Container className="editprofile-container">
              <Grid centered>
                <Grid.Row>
                  <Grid.Column width={3}>
                    Kyle Chan
                    <hr/>
                    <List>
                      <a href="https://kyle-chan.github.io/">
                        https://kyle-chan.github.io/</a>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    Jonathan Lau
                    <hr/>
                    <List>
                      <a href="https://jon-lau.github.io/">
                        https://jon-lau.github.io/</a>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    Arnold Shek
                    <hr/>
                    <List>
                      <a href="https://arnoldshek.github.io/">
                        https://arnoldshek.github.io/</a>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    Akira Vernon
                    <hr/>
                    <List>
                      <a href="https://akirav.github.io/">
                        https://akirav.github.io/</a>
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Grid.Column>
        </Grid>
    );
  }
}

