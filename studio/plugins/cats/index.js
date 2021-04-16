import React from 'react'
import PropTypes from 'prop-types'
import getIt from 'get-it'
import jsonResponse from 'get-it/lib/middleware/jsonResponse'
import promise from 'get-it/lib/middleware/promise'
import Button from 'part:@sanity/components/buttons/default'

import styles from './Cats.css'

const request = getIt([promise(), jsonResponse()])

class Cats extends React.Component {
  static propTypes = {
    imageWidth: PropTypes.number,
    success: 0,
  }

  static defaultProps = {
    imageWidth: 600,
  }

  state = {
    imageUrl: null,
    success: 0,
    error: null,
  }
  getCat = () => {
    request({ url: 'https://api.thecatapi.com/v1/images/search' })
      .then((response) => {
        const imageUrl = response.body[0].url
        this.setState({ imageUrl })
      })
      .catch((error) => this.setState({ error }))
  }

  deployPreview = () => {
    request({
      url: 'https://webhook.gatsbyjs.com/hooks/data_source/391bcb51-db31-4988-a857-0990f6b3e66b',
      method: 'POST',
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => this.setState({ error }))
  }

  componentDidMount() {
    this.getCat()
  }

  render() {
    const { imageUrl, error } = this.state
    if (error) {
      return <pre>{JSON.stringify(error, null, 2)}</pre>
    }
    const { imageWidth } = this.props
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }} className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Redeploy Preview</h2>
        </header>
        <div className={styles.content}>
          <figure>
            <img className={styles.img} src={imageUrl} />
          </figure>
          <div style={{ textAlign: 'center' }}>
            <Button color="primary" onClick={this.deployPreview}>
              Deploy Preview
            </Button>
          </div>
        </div>
        <div className={styles.footer}>
          <Button bleed color="primary" kind="simple" onClick={this.getCat}>
            Get a new cat
          </Button>
        </div>
      </div>
    )
  }
}

export default {
  name: 'cats',
  component: Cats,
}
