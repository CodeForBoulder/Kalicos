import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography'

import { 
  faAmazon, faFacebook,
  faInstagram, faTwitter 
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from 'react-router-dom'


export default ({ social, edit }) => (
  <Card>
    <CardContent>
      <Typography variant='h5' color='textSecondary' gutterBottom>
        Social Info
      </Typography>
      { !Object.keys(social)[0] &&
          <Typography variant='body1'>No social links defined</Typography>
      }
      { social.website &&
          <Link to={social.website} style={{'text-decoration': 'inherit'}}>
            <Button variant='outlined'>Site</Button>
          </Link>
      }
      { social.facebook &&
          <Link to={social.facebook}>
            <IconButton>
              <FontAwesomeIcon icon={faFacebook} />
            </IconButton>
          </Link>
      }
      { social.instagram &&
          <Link to={social.instagram}>
            <IconButton>
              <FontAwesomeIcon icon={faInstagram} />
            </IconButton>
          </Link>
      }
      { social.twitter &&
          <Link to={social.twitter}>
            <IconButton>
              <FontAwesomeIcon icon={faTwitter} />
            </IconButton>
          </Link>
      }
      { social.amazon &&
          <Link to={social.amazon}>
            <IconButton>
              <FontAwesomeIcon icon={faAmazon} />
            </IconButton>
          </Link>
      }
    </CardContent>
    <CardActions>
      <IconButton onClick={edit}>
        <EditIcon />
      </IconButton>
    </CardActions>
  </Card>
)


