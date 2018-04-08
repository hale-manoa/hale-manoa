import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='small' src="/images/halemanoa.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Issue-3</h1>
            <p>Implement User Bios. Sign in and select View Bios.</p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
