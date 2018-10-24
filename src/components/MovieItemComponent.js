import Button from '@material-ui/core/Button';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/es/styles/withStyles';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

{
  /*<p key={item.id}>*/
}
// {item.id} - {item.title} - {item.release} - {item.format} - {item.stars}
const MovieItemComponent = props => {
  const { classes, id, title, release, format, stars } = props;
  return (
    <Card key={id} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title} - {release}
          </Typography>
          <Typography component="p">{stars}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" disabled>
          {format}
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => this.deleteHandler(item.id)}>
          remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(MovieItemComponent);
