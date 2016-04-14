import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import IconButton from 'material-ui/lib/icon-button';

class HomePage extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader title="Project Manager Application" avatar="http://lorempixel.com/100/100/nature/" />
        <CardMedia
          overlay={<CardTitle title="Manage Your Project" subtitle="Just for me" />}  >
          <img src="http://lorempixel.com/600/337/nature/" />
        </CardMedia>
        <CardActions>
          <IconButton tooltip="Add a new Project" tooltipPosition="top-right">
            <ContentAdd />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default HomePage;
