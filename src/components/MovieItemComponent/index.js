import Button from '@material-ui/core/Button';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/es/styles/withStyles';
import styles from './styles';
import Dotdotdot from 'react-dotdotdot';
import uuid from 'uuid';
import defaultImage from '../../../images/default.png'; //FIXME: weak


const Index = props => {
  const { classes, id, title, release, format, stars, deleteHandler } = props;
  return (
    <Card key={id} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={defaultImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title} - {release}
          </Typography>
          <Dotdotdot clamp={2}>
            <Typography component="p">
              <span>{stars.map((item, idx, total) => <a key={uuid()}
                href={"http://nolinkyet.com"}>{item}{idx !== (total.length - 1) && ", "}</a>)} </span>
            </Typography>
          </Dotdotdot>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" disabled>
          {format}
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => deleteHandler(id)}>
          remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(Index);
